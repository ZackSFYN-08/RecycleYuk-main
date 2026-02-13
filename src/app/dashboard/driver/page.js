'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
    LayoutDashboard, Truck, MapPin, CheckCircle, History, User,
    LogOut, Menu, X, ChevronLeft, ChevronRight, Search,
    Navigation, Clock, Calendar, CheckCircle2, AlertCircle, Package,
    Loader2, Phone, MessageCircle, Wallet, DollarSign, TrendingUp, Download, Trophy, Bell, Recycle, Edit2
} from 'lucide-react';
import Swal from 'sweetalert2';
import { calculateDriverEarnings, formatRupiah, exportToExcel, uploadAvatar } from '@/utils/enhancedHelpers';
import ChatModal from '@/components/shared/ChatModal';
import {
    getDriverProfile, fetchGlobalTasks,
    acceptTask, finishTask, updateDriverLocation,
    supabase
} from '@/utils/services';
import useAuth from '@/hooks/useAuth';

// --- OPENLAYERS IMPORTS ---
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import { fromLonLat } from 'ol/proj';
import { Icon, Style, Stroke, Circle as CircleStyle, Fill } from 'ol/style';

// --- INISIALISASI SUPABASE ---
// Logic moved to services.js

// Koordinat Default (Bandung) [Lon, Lat]
const CENTER_COORDS = [107.6191, -6.9175];

export default function DriverDashboard() {
    const router = useRouter();
    const { user: authUser, loading: authLoading } = useAuth();

    // --- 1. STATE MANAGEMENT ---
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState('');

    // GPS & Maps State
    const [myLocation, setMyLocation] = useState(CENTER_COORDS);
    const [isGpsActive, setIsGpsActive] = useState(false);

    // UI States
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState('dashboard');

    // Data States
    const [currentUser, setCurrentUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [history, setHistory] = useState([]);
    const [driverProfile, setDriverProfile] = useState(null);
    const [totalIncome, setTotalIncome] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [taskFilter, setTaskFilter] = useState('pending'); // 'pending' or 'process'
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedChatTask, setSelectedChatTask] = useState(null);

    // OpenLayers Refs
    const mapElement = useRef();
    const mapRef = useRef(null);
    const vectorSourceRef = useRef(new VectorSource());

    const SIDEBAR_MENUS = [
        { id: 'dashboard', label: 'Ringkasan', icon: LayoutDashboard },
        { id: 'tasks', label: 'Tugas Jemput', icon: Truck },
        { id: 'map', label: 'Peta Lokasi', icon: MapPin },
        { id: 'history', label: 'Riwayat', icon: History },
        { id: 'earnings', label: 'Pendapatan', icon: Wallet },
    ];

    // --- 2. CORE LOGIC ---
    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
        }, 1000);

        startGpsTracking();

        const channel = supabase
            .channel('driver-dashboard')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, () => {
                // Play notification sound
                try { new Audio('/sounds/notification.mp3').play().catch(() => { }); } catch (e) { }
                Swal.fire({
                    title: '🚛 Order Baru!',
                    text: 'Ada permintaan pickup baru menunggu Anda.',
                    icon: 'info',
                    toast: true, position: 'top-end', showConfirmButton: false, timer: 5000,
                    background: '#ecfdf5', color: '#065f46'
                });
                refreshTasks();
            })
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'transactions' }, () => {
                refreshTasks();
            })
            .subscribe();

        const handleResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', handleResize);
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        const initializeDashboard = async () => {
            if (authLoading) return;
            setLoading(true);
            try {
                if (!authUser) { router.push('/login'); return; }

                // A. User Profile (Driver)
                setCurrentUser(authUser);

                // B. Driver Profile detail
                const profile = await getDriverProfile(authUser.id);
                setDriverProfile(profile);

                // C. Load tasks & history
                await refreshTasks();
            } catch (err) {
                console.error("Error fetching driver data:", err);
            } finally {
                setLoading(false);
            }
        };

        initializeDashboard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser, authLoading]);

    // --- 3. GPS LOGIC (WATCH POSITION) ---
    const [myHeading, setMyHeading] = useState(0);

    const startGpsTracking = () => {
        if (!navigator.geolocation) return;

        navigator.geolocation.watchPosition(
            async (position) => {
                const { latitude, longitude, heading } = position.coords;
                const newLoc = [longitude, latitude];
                setMyLocation(newLoc);
                if (heading !== null && !isNaN(heading)) setMyHeading(heading * (Math.PI / 180));
                setIsGpsActive(true);

                // --- REALTIME UPDATE TO DB VIA SERVICE ---
                if (driverProfile?.id) {
                    await updateDriverLocation(driverProfile.id, latitude, longitude);
                }
            },
            (err) => console.warn("GPS Error:", err.message),
            { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
        );
    };

    const centerToMyLocation = () => {
        if (mapRef.current && isGpsActive) {
            mapRef.current.getView().animate({ center: fromLonLat(myLocation), zoom: 17, duration: 1000 });
        } else {
            Swal.fire('GPS Mencari...', 'Pastikan izin lokasi aktif dan tunggu sinyal.', 'info');
        }
    };

    // --- 4. MAP INITIALIZATION ---
    useEffect(() => {
        if (activePage === 'map' && mapElement.current && !mapRef.current) {

            const vectorLayer = new VectorLayer({
                source: vectorSourceRef.current,
                zIndex: 100
            });

            const initialMap = new Map({
                target: mapElement.current,
                layers: [
                    new TileLayer({ source: new OSM() }),
                    vectorLayer
                ],
                view: new View({
                    center: fromLonLat(CENTER_COORDS),
                    zoom: 13
                }),
                controls: []
            });

            mapRef.current = initialMap;
            updateMapMarkers();
        }

        return () => {
            if (activePage !== 'map' && mapRef.current) {
                mapRef.current.setTarget(null);
                mapRef.current = null;
            }
        }
    }, [activePage, mounted]);

    // --- 5. UPDATE MAP MARKERS ---
    const updateMapMarkers = () => {
        if (!mapRef.current) return;

        vectorSourceRef.current.clear();

        // A. Marker Saya (Driver)
        if (isGpsActive) {
            const accuracyFeature = new Feature({ geometry: new Point(fromLonLat(myLocation)) });
            accuracyFeature.setStyle(new Style({
                image: new CircleStyle({
                    radius: 8,
                    fill: new Fill({ color: '#3b82f6' }),
                    stroke: new Stroke({ color: '#fff', width: 2 })
                })
            }));
            vectorSourceRef.current.addFeature(accuracyFeature);

            const driverFeature = new Feature({ geometry: new Point(fromLonLat(myLocation)) });
            driverFeature.setStyle(new Style({
                image: new Icon({
                    src: 'https://cdn-icons-png.flaticon.com/512/3096/3096673.png',
                    scale: 0.08, anchor: [0.5, 1]
                })
            }));
            vectorSourceRef.current.addFeature(driverFeature);
        }

        // B. Rute (Garis Hijau)
        tasks.filter(t => t.status === 'Pending' || (t.status === 'Process' && t.driver_id === currentUser?.id)).forEach(t => {
            if (t.lng && t.lat) {
                const taskLoc = [t.lng, t.lat];
                if (t.status === 'Process' && isGpsActive) {
                    const routeFeature = new Feature({
                        geometry: new LineString([fromLonLat(myLocation), fromLonLat(taskLoc)])
                    });
                    routeFeature.setStyle(new Style({
                        stroke: new Stroke({ color: '#10B981', width: 4, lineDash: [10, 10] })
                    }));
                    vectorSourceRef.current.addFeature(routeFeature);
                }
            }
        });
    };

    useEffect(() => {
        updateMapMarkers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks, myLocation, isGpsActive, currentUser, activePage]);


    // --- DATA FETCHING (REFACTORED) ---
    const initializeDashboard = async () => {
        try {
            setLoading(true);
            const user = await getCurrentUser();
            if (!user) { router.push('/login'); return; }
            setCurrentUser(user);

            const dProfile = await getDriverProfile(user.id);
            if (dProfile) setDriverProfile(dProfile);

            // Fetch History (This could be moved to service too, but simple enough here)
            const { data: historyData } = await supabase
                .from('transactions')
                .select('*, profiles(full_name, address), waste_types(name)')
                .eq('status', 'Done')
                .eq('driver_id', user.id)
                .order('updated_at', { ascending: false });

            setHistory(historyData || []);
            const income = (historyData || []).reduce((acc, curr) => acc + (curr.total_price || 0), 0);
            setTotalIncome(income);

            // Re-fetch tasks after profile is loaded
            await refreshTasks(user, dProfile);

        } catch (err) { console.error("Init Error:", err); } finally { setLoading(false); }
    };

    const refreshTasks = async (user = currentUser, dProfile = driverProfile) => {
        if (!user) return;
        try {
            const activeTasks = await fetchGlobalTasks();
            // ... rest of the code is fine, but let's ensure we use the passed dProfile
            const currentDProfile = dProfile || driverProfile;

            const filteredTasks = (activeTasks || []).filter(t => {
                const isMyProcess = t.status === 'Process' && t.driver_id === user.id;
                if (isMyProcess) return true;
                if (t.status === 'Pending') {
                    if (currentDProfile?.status !== 'On Duty') return false;
                    return true;
                }
                return false;
            });

            // Generate Coords
            const tasksWithCoords = filteredTasks.map(t => {
                let finalLat = t.latitude || (myLocation[1] + (Math.random() * 0.015 - 0.0075));
                let finalLng = t.longitude || (myLocation[0] + (Math.random() * 0.015 - 0.0075));
                return { ...t, lat: finalLat, lng: finalLng };
            });

            setTasks(tasksWithCoords);
        } catch (err) { console.error("Refresh Tasks Error:", err); }
    };

    const navigateTo = (pageId) => { setActivePage(pageId); setIsMobileMenuOpen(false); };
    const handleLogout = async () => { await supabase.auth.signOut(); router.push('/login'); };

    const contactUser = (type, phoneNumber, name) => {
        if (!phoneNumber) return Swal.fire('Gagal', 'Nomor HP tidak tersedia.', 'error');
        let formatted = phoneNumber.replace(/\D/g, '');
        if (formatted.startsWith('0')) formatted = '62' + formatted.slice(1);

        if (type === 'whatsapp') {
            const msg = `Halo Kak ${name}, saya Driver RecycleYuk sedang menuju lokasi.`;
            window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(msg)}`, '_blank');
        } else {
            window.open(`tel:${phoneNumber}`, '_self');
        }
    };

    const handleTaskAction = async (taskId, action) => {
        const myActiveTask = tasks.find(t => t.status === 'Process' && t.driver_id === currentUser.id);

        if (action === 'Process') {
            if (myActiveTask) return Swal.fire('Fokus!', 'Selesaikan tugas aktif dulu.', 'warning');

            const result = await Swal.fire({
                title: 'Ambil Tugas?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Ya, Jemput!',
                confirmButtonColor: '#10B981'
            });

            if (result.isConfirmed) {
                try {
                    await acceptTask(taskId, currentUser.id, currentUser.full_name);
                    Swal.fire('Berhasil!', 'Segera menuju lokasi!', 'success');
                    refreshTasks();
                } catch (err) { Swal.fire('Gagal', err.message, 'error'); }
            }
        }
        else if (action === 'Done') {
            const taskToFinish = tasks.find(t => t.id === taskId);
            const pricePerKg = taskToFinish?.waste_types?.price_per_kg || 0;
            const wasteName = taskToFinish?.waste_types?.name || 'Sampah';

            const { value: finalWeight } = await Swal.fire({
                title: 'Selesaikan Tugas',
                html: `
                    <div style="text-align: left">
                        <p class="mb-2">Jenis: <b>${wasteName}</b></p>
                        <p class="mb-2">Harga: <b>Rp ${pricePerKg.toLocaleString()}/kg</b></p>
                        <label class="block text-sm font-bold mb-1">Berat Aktual (Kg):</label>
                    </div>
                `,
                input: 'number',
                inputAttributes: { min: '0.1', step: '0.1', placeholder: 'Contoh: 5.5' },
                inputValue: taskToFinish?.weight || '',
                showCancelButton: true,
                confirmButtonText: 'Hitung & Selesai',
                confirmButtonColor: '#3b82f6',
                preConfirm: (weight) => {
                    if (!weight || weight <= 0) Swal.showValidationMessage('Masukkan berat yang valid!');
                    return weight;
                }
            });

            if (finalWeight) {
                const totalPrice = Math.round(parseFloat(finalWeight) * pricePerKg);
                const confirmResult = await Swal.fire({
                    title: 'Konfirmasi Akhir',
                    html: `
                        <div class="text-center">
                            <p>Berat: <b>${finalWeight} Kg</b></p>
                            <p class="text-xl font-bold text-green-600 mt-2">Total: Rp ${totalPrice.toLocaleString()}</p>
                        </div>
                    `,
                    icon: 'info', showCancelButton: true, confirmButtonText: 'Simpan & Selesai'
                });

                if (confirmResult.isConfirmed) {
                    try {
                        await finishTask(taskId, parseFloat(finalWeight), totalPrice);
                        Swal.fire('Tugas Selesai!', `Saldo Rp ${totalPrice.toLocaleString()} dicatat.`, 'success');
                        initializeDashboard(); // Refresh history too
                    } catch (err) { Swal.fire('Gagal', err.message, 'error'); }
                }
            }
        }
    };


    const handleDriverStatusToggle = async () => {
        if (!driverProfile) return;

        // --- CEK VERIFIKASI ---
        if (driverProfile.verification_status !== 'verified') {
            return Swal.fire({
                title: 'Akun Belum Terverifikasi',
                text: 'Harap hubungi Admin untuk verifikasi akun sebelum mulai bekerja.',
                icon: 'warning',
                confirmButtonColor: '#F59E0B'
            });
        }

        const newStatus = driverProfile.status === 'On Duty' ? 'Off Duty' : 'On Duty';
        try {
            await supabase.from('drivers').update({ status: newStatus }).eq('id', driverProfile.id);
            setDriverProfile({ ...driverProfile, status: newStatus });
            Swal.fire('Status', `Anda sekarang ${newStatus}`, 'success');
            refreshTasks(currentUser, { ...driverProfile, status: newStatus });
        } catch (err) { Swal.fire('Error', 'Gagal update status', 'error'); }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await supabase.from('profiles').update({ full_name: currentUser.full_name, address: currentUser.address }).eq('id', currentUser.id);
            if (driverProfile) await supabase.from('drivers').update({ name: currentUser.full_name, vehicle: driverProfile.vehicle }).eq('id', driverProfile.id);
            Swal.fire('Sukses', 'Profil berhasil disimpan!', 'success');
            initializeDashboard();
        } catch (err) { Swal.fire('Gagal', err.message, 'error'); }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            Swal.fire({
                title: 'Mengupload...',
                text: 'Mohon tunggu sebentar',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            const publicUrl = await uploadAvatar(file, currentUser.id);
            if (!publicUrl) throw new Error('Gagal mendapatkan URL gambar.');

            // Update profile in DB
            const { error } = await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', currentUser.id);
            if (error) throw error;

            setCurrentUser(prev => ({ ...prev, avatar_url: publicUrl }));
            Swal.fire('Sukses', 'Foto profil berhasil diperbarui!', 'success');
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Gagal upload foto: ' + err.message, 'error');
        }
    };

    // --- RENDERERS ---

    const renderDashboard = () => (
        <div className="space-y-6 animate-in fade-in pb-20 md:pb-0">
            {/* Banner */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Halo, {currentUser?.full_name?.split(' ')[0]}! 🚛</h2>
                    <p className="opacity-90">Siap menjemput rezeki dan menjaga lingkungan hari ini?</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                            <span className={`w-3 h-3 rounded-full mr-2 ${driverProfile?.status === 'On Duty' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                            <span className="font-medium text-sm">Status: {driverProfile ? (driverProfile.status || 'Off Duty') : (loading ? 'Loading...' : 'Tidak Terdaftar')}</span>
                        </div>

                        {/* Status Verifikasi Badge */}
                        <div className={`inline-flex items-center px-4 py-2 rounded-lg border border-white/30 backdrop-blur-sm ${driverProfile?.verification_status === 'verified' ? 'bg-green-500/20 text-white' : 'bg-yellow-500/20 text-yellow-100'}`}>
                            {driverProfile?.verification_status === 'verified' ? <CheckCircle2 size={16} className="mr-2" /> : <AlertCircle size={16} className="mr-2" />}
                            <span className="font-bold text-sm uppercase">{driverProfile?.verification_status || 'Pending'}</span>
                        </div>
                        <button
                            onClick={handleDriverStatusToggle}
                            disabled={!driverProfile && !loading}
                            className={`text-xs px-3 py-2 rounded-lg font-bold transition shadow-md ${!driverProfile && !loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-green-700 hover:bg-green-50'}`}
                        >
                            {loading ? '...' : (!driverProfile ? 'Hubungi Admin' : (driverProfile.status === 'On Duty' ? 'Matikan' : 'Aktifkan'))}
                        </button>
                    </div>
                </div>
                <Truck className="absolute right-[-10px] bottom-[-10px] opacity-10 w-32 h-32 md:w-40 md:h-40 transform -rotate-12" />
            </div>

            {/* Statistik Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md">
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Order Masuk</p>
                        <h3 className="text-3xl font-bold text-gray-800 mt-1">{tasks.filter(t => t.status === 'Pending').length}</h3>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-xl text-yellow-600 border border-yellow-100"><AlertCircle size={28} /></div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md border-l-4 border-l-green-500">
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Total Pendapatan</p>
                        <h3 className="text-2xl font-bold text-green-700 mt-1">Rp {totalIncome.toLocaleString('id-ID')}</h3>
                    </div>
                    <div className="bg-green-50 p-3 rounded-xl text-green-600 border border-green-100"><Wallet size={28} /></div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md">
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Tugas Selesai</p>
                        <h3 className="text-3xl font-bold text-blue-600 mt-1">{history.length}</h3>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600 border border-blue-100"><CheckCircle2 size={28} /></div>
                </div>
            </div>

            {/* Kartu Tugas Aktif */}
            {tasks.filter(t => t.status === 'Process' && t.driver_id === currentUser?.id).map(task => (
                <div key={task.id} className="bg-white border border-blue-200 rounded-2xl p-6 shadow-lg shadow-blue-50 animate-in slide-in-from-bottom duration-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                    <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                        <div>
                            <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2"><Truck className="text-blue-600" /> Sedang Dijemput</h3>
                            <p className="text-sm text-gray-500 mt-1">Order ID: #{String(task.id).slice(0, 8)}</p>
                        </div>
                        <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">PROCESS</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><User size={20} /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Nama Warga</p>
                                    <p className="text-gray-800 font-bold text-lg">{task.profiles?.full_name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-red-50 p-2 rounded-lg text-red-600"><MapPin size={20} /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Alamat</p>
                                    <p className="text-gray-800 font-medium leading-relaxed">{task.profiles?.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-orange-50 p-2 rounded-lg text-orange-600"><Package size={20} /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Detail Sampah</p>
                                    <p className="text-gray-800 font-medium">{task.waste_types?.name} • <span className="font-bold">{task.weight} Kg</span></p>
                                    <p className="text-sm text-green-600 font-bold mt-1">Rp {task.total_price?.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100 text-sm text-yellow-800 flex gap-2">
                                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                <p><strong>Catatan:</strong> &quot;{task.notes || 'Tidak ada catatan'}&quot;</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <button onClick={() => contactUser('whatsapp', task.profiles?.phone, task.profiles?.full_name)} className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition shadow-sm"><MessageCircle size={20} /> Chat WA</button>
                        <button onClick={() => contactUser('call', task.profiles?.phone)} className="flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow-sm"><Phone size={20} /> Telepon</button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(task.profiles?.address)}`} target="_blank" className="flex justify-center items-center gap-2 py-3 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-300 transition"><Navigation size={20} /> Buka Maps</a>
                        <button onClick={() => handleTaskAction(task.id, 'Done')} className="flex justify-center items-center gap-2 bg-blue-800 text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg shadow-blue-200"><CheckCircle size={20} /> Selesai Tugas</button>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderTasks = () => {
        // Filter tasks based on selected tab
        const pendingTasks = tasks.filter(t => t.status === 'Pending' && (t.profiles?.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()));
        const processTasks = tasks.filter(t => t.status === 'Process' && t.driver_id === currentUser?.id);

        return (
            <div className="space-y-6 animate-in slide-in-from-right pb-20 md:pb-0">
                {/* Header with Search */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-800 ml-2">Daftar Tugas</h3>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari lokasi atau nama warga..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 ring-green-500 transition"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tab Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    <button
                        onClick={() => setTaskFilter('pending')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition whitespace-nowrap ${taskFilter === 'pending'
                            ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-200'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        <Clock size={16} />
                        Pending
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${taskFilter === 'pending' ? 'bg-yellow-600' : 'bg-gray-200 text-gray-600'
                            }`}>
                            {pendingTasks.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setTaskFilter('process')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition whitespace-nowrap ${taskFilter === 'process'
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        <Truck size={16} />
                        Proses
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${taskFilter === 'process' ? 'bg-blue-600' : 'bg-gray-200 text-gray-600'
                            }`}>
                            {processTasks.length}
                        </span>
                    </button>
                </div>

                {/* Pending Tasks */}
                {taskFilter === 'pending' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pendingTasks.map(task => (
                            <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition duration-300 group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg group-hover:text-green-600 transition">{task.profiles?.full_name}</h4>
                                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded w-fit"><Clock size={12} /> {new Date(task.created_at).toLocaleString()}</p>
                                    </div>
                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200 shadow-sm">PENDING</span>
                                </div>

                                <div className="text-sm text-gray-600 space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="flex gap-3 items-start">
                                        <MapPin size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                                        <span className="line-clamp-2 font-medium">{task.profiles?.address}</span>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <Package size={18} className="text-blue-500 flex-shrink-0" />
                                        <span>{task.waste_types?.name} • <span className="font-bold text-gray-800">{task.weight} Kg</span></span>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <Clock size={18} className="text-orange-500 flex-shrink-0" />
                                        <span>Jadwal: {task.pickup_time}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleTaskAction(task.id, 'Process')}
                                    className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-md shadow-green-100"
                                >
                                    <Truck size={20} /> Ambil Tugas Ini
                                </button>
                            </div>
                        ))}

                        {pendingTasks.length === 0 && (
                            <div className="col-span-full py-16 text-center text-gray-400 bg-white border-2 border-dashed border-gray-200 rounded-2xl">
                                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock size={40} className="text-gray-300" />
                                </div>
                                <p className="text-lg font-medium text-gray-600">Tidak ada order pending saat ini.</p>
                                <p className="text-sm text-gray-400">Silakan tunggu notifikasi order baru.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Process Tasks */}
                {taskFilter === 'process' && (
                    <div className="space-y-4">
                        {processTasks.map(task => (
                            <div key={task.id} className="bg-white border border-blue-200 rounded-2xl p-6 shadow-lg shadow-blue-50 animate-in slide-in-from-bottom duration-500 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                                <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2"><Truck className="text-blue-600" /> Sedang Dijemput</h3>
                                        <p className="text-sm text-gray-500 mt-1">Order ID: #{String(task.id).slice(0, 8)}</p>
                                    </div>
                                    <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">PROCESS</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><User size={20} /></div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold uppercase">Nama Warga</p>
                                                <p className="text-gray-800 font-bold text-lg">{task.profiles?.full_name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="bg-red-50 p-2 rounded-lg text-red-600"><MapPin size={20} /></div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold uppercase">Alamat</p>
                                                <p className="text-gray-800 font-medium leading-relaxed">{task.profiles?.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-orange-50 p-2 rounded-lg text-orange-600"><Package size={20} /></div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold uppercase">Detail Sampah</p>
                                                <p className="text-gray-800 font-medium">{task.waste_types?.name} • <span className="font-bold">{task.weight} Kg</span></p>
                                                <p className="text-sm text-green-600 font-bold mt-1">Rp {task.total_price?.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100 text-sm text-yellow-800 flex gap-2">
                                            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                            <p><strong>Catatan:</strong> &quot;{task.notes || 'Tidak ada catatan'}&quot;</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                    <button onClick={() => { setSelectedChatTask(task); setIsChatOpen(true); }} className="flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition shadow-sm"><MessageCircle size={20} /> Chat App</button>
                                    <button onClick={() => contactUser('whatsapp', task.profiles?.phone, task.profiles?.full_name)} className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition shadow-sm"><MessageCircle size={20} /> WhatsApp</button>
                                    <button onClick={() => contactUser('call', task.profiles?.phone)} className="flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow-sm"><Phone size={20} /> Telepon</button>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(task.profiles?.address)}`} target="_blank" className="flex justify-center items-center gap-2 py-3 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-300 transition"><Navigation size={20} /> Buka Maps</a>
                                    <button onClick={() => handleTaskAction(task.id, 'Done')} className="flex justify-center items-center gap-2 bg-blue-800 text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg shadow-blue-200"><CheckCircle size={20} /> Selesai Tugas</button>
                                </div>
                            </div>
                        ))}

                        {processTasks.length === 0 && (
                            <div className="py-16 text-center text-gray-400 bg-white border-2 border-dashed border-gray-200 rounded-2xl">
                                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Truck size={40} className="text-gray-300" />
                                </div>
                                <p className="text-lg font-medium text-gray-600">Tidak ada tugas aktif saat ini.</p>
                                <p className="text-sm text-gray-400">Ambil tugas dari tab Pending untuk mulai bekerja.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const renderMap = () => (
        <div className="h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative animate-in fade-in z-0">
            {/* OpenLayers Map Container */}
            <div ref={mapElement} style={{ width: '100%', height: '100%' }} />

            <button onClick={centerToMyLocation} className="absolute bottom-6 right-6 z-[400] bg-white p-3 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 border border-gray-200 transition transform hover:scale-110" title="Lokasi Saya">
                <Navigation size={24} />
            </button>
            <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-md text-xs font-bold text-gray-700 border border-gray-200 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {tasks.filter(t => t.status === 'Pending').length} Lokasi Penjemputan
            </div>
        </div>
    );

    const renderHistory = () => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 animate-in slide-in-from-right overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2"><History className="text-gray-500" /> Riwayat Selesai</h3>
            </div>
            <div className="divide-y divide-gray-100">
                {history.map(h => (
                    <div key={h.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition duration-200">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2 md:mb-0 md:justify-start md:gap-4">
                                <p className="font-bold text-gray-800 text-lg">{h.profiles?.full_name}</p>
                                <span className="md:hidden bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Done</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                <span className="flex items-center gap-1 bg-white border px-2 py-0.5 rounded"><Calendar size={12} /> {new Date(h.updated_at).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1 bg-white border px-2 py-0.5 rounded"><Clock size={12} /> {new Date(h.updated_at).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><MapPin size={12} /> {h.profiles?.address}</p>
                        </div>
                        <div className="text-right flex flex-col items-end min-w-[120px]">
                            <span className="hidden md:flex bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-green-200 items-center gap-1 mb-2">
                                <CheckCircle2 size={12} /> Selesai
                            </span>
                            <p className="text-xl font-bold text-green-700">Rp {h.total_price?.toLocaleString()}</p>
                            <p className="text-xs text-gray-400">{h.waste_types?.name} ({h.weight} Kg)</p>
                        </div>
                    </div>
                ))}
                {history.length === 0 && (
                    <div className="p-16 text-center text-gray-400 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <History size={32} className="text-gray-300" />
                        </div>
                        <p className="font-medium text-gray-600">Belum ada riwayat tugas selesai.</p>
                        <p className="text-sm">Riwayat akan muncul setelah Anda menyelesaikan tugas.</p>
                    </div>
                )}
            </div>
        </div>
    );

    // --- EARNINGS PAGE RENDERER ---
    const renderEarnings = () => {
        const earnings = calculateDriverEarnings(history.map(h => ({
            ...h,
            created_at: h.updated_at || new Date().toISOString(),
            total_price: h.total_price || 0,
            status: 'done'
        })));

        const handleExport = async () => {
            if (!history.length) {
                Swal.fire('Info', 'Tidak ada data untuk diexport', 'info');
                return;
            }

            const exportData = history.map(t => ({
                'Tanggal': new Date(t.updated_at).toLocaleDateString('id-ID'),
                'Pelanggan': t.profiles?.full_name || '-',
                'Jenis Sampah': t.waste_types?.name || '-',
                'Berat (kg)': t.weight,
                'Total Transaksi': formatRupiah(t.total_price || 0),
                'Komisi Driver (15%)': formatRupiah((t.total_price || 0) * 0.15),
                'Status': t.status
            }));

            const success = await exportToExcel(exportData, 'driver_earnings');
            if (success) {
                Swal.fire('Berhasil!', 'Laporan berhasil diexport ke CSV', 'success');
            }
        };

        return (
            <div className="space-y-6 animate-in slide-in-from-right pb-20 md:pb-0">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Pendapatan Driver</h2>
                        <p className="text-gray-500 mt-1">Tracking komisi dan performa Anda</p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2 transition"
                    >
                        <Download size={18} /> Export Laporan
                    </button>
                </div>

                {/* Earning Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Today */}
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition">
                        <div className="flex items-center justify-between mb-2">
                            <p className="opacity-90 font-medium">Hari Ini</p>
                            <Calendar size={20} className="opacity-80" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-1">{formatRupiah(earnings.today)}</h3>
                        <p className="text-sm opacity-80">Komisi hari ini</p>
                    </div>

                    {/* This Week */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-500 font-medium">Minggu Ini</p>
                            <TrendingUp size={20} className="text-blue-500" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{formatRupiah(earnings.thisWeek)}</h3>
                        <p className="text-sm text-gray-500">7 hari terakhir</p>
                    </div>

                    {/* This Month */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-500 font-medium">Bulan Ini</p>
                            <Wallet size={20} className="text-purple-500" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{formatRupiah(earnings.thisMonth)}</h3>
                        <p className="text-sm text-gray-500">Periode bulan ini</p>
                    </div>

                    {/* Total All Time */}
                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition">
                        <div className="flex items-center justify-between mb-2">
                            <p className="opacity-90 font-medium">Total Keseluruhan</p>
                            <Trophy size={20} className="opacity-80" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-1">{formatRupiah(earnings.total)}</h3>
                        <p className="text-sm opacity-80">{earnings.transactionCount} transaksi</p>
                    </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-white p-5 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Package size={24} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Pickup</p>
                                <p className="text-2xl font-bold text-gray-800">{earnings.transactionCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <DollarSign size={24} className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Rata-rata Komisi</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {earnings.transactionCount > 0 ? formatRupiah(earnings.total / earnings.transactionCount) : formatRupiah(0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Clock size={24} className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Pickup Hari Ini</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {history.filter(t => {
                                        const today = new Date().toDateString();
                                        return new Date(t.updated_at).toDateString() === today;
                                    }).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 md:p-6 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <TrendingUp size={22} /> Riwayat Transaksi & Komisi
                        </h3>
                    </div>

                    {history.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <Package size={48} className="mx-auto mb-3 opacity-30" />
                            <p>Belum ada transaksi selesai</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Tanggal</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Pelanggan</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Jenis</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Berat</th>
                                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Total</th>
                                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Komisi (15%)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {history.slice(0, 20).map((t) => (
                                        <tr key={t.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {new Date(t.updated_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                                                {t.profiles?.full_name || 'N/A'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {t.waste_types?.name || 'N/A'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {t.weight} kg
                                            </td>
                                            <td className="px-4 py-3 text-sm text-right font-medium text-gray-800">
                                                {formatRupiah(t.total_price || 0)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-right font-bold text-green-600">
                                                {formatRupiah((t.total_price || 0) * 0.15)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Info Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        <span className="font-bold">ℹ️ Catatan:</span> Komisi driver adalah 15% dari setiap transaksi yang selesai.
                        Pembayaran komisi dilakukan setiap akhir bulan.
                    </p>
                </div>
            </div>
        );
    };

    // --- PROFILE PAGE RENDERER ---
    const renderProfile = () => (
        <div className="space-y-6 animate-in slide-in-from-right pb-20 md:pb-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white text-center">
                    <div className="relative group w-24 h-24 mx-auto mb-4 cursor-pointer" onClick={() => document.getElementById('driver-avatar-upload').click()}>
                        <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur overflow-hidden border-2 border-white/30">
                            {currentUser?.avatar_url ? (
                                <img src={currentUser.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                currentUser?.full_name?.charAt(0) || 'D'
                            )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <Edit2 className="text-white" size={24} />
                        </div>
                    </div>
                    <input type="file" id="driver-avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />

                    <h2 className="text-2xl font-bold">{currentUser?.full_name || 'Driver'}</h2>
                    <p className="opacity-80 mt-1">{currentUser?.email}</p>
                    <span className="inline-block mt-3 bg-white/20 px-4 py-1 rounded-full text-sm font-bold backdrop-blur">
                        🚛 Driver Aktif
                    </span>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <p className="text-xs text-gray-500 font-bold uppercase mb-1">Nama Lengkap</p>
                            <p className="text-gray-800 font-medium">{currentUser?.full_name || '-'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <p className="text-xs text-gray-500 font-bold uppercase mb-1">Email</p>
                            <p className="text-gray-800 font-medium">{currentUser?.email || '-'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <p className="text-xs text-gray-500 font-bold uppercase mb-1">No. Telepon</p>
                            <p className="text-gray-800 font-medium">{driverProfile?.phone || currentUser?.phone || '-'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <p className="text-xs text-gray-500 font-bold uppercase mb-1">Kendaraan</p>
                            <p className="text-gray-800 font-medium">{driverProfile?.vehicle || 'Pickup Truck'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                            <p className="text-2xl font-bold text-green-700">{history.length}</p>
                            <p className="text-xs text-green-600 font-medium">Total Selesai</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                            <p className="text-2xl font-bold text-blue-700">{tasks.filter(t => t.status === 'Process' && t.driver_id === currentUser?.id).length}</p>
                            <p className="text-xs text-blue-600 font-medium">Tugas Aktif</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-xl">
                            <p className="text-2xl font-bold text-purple-700">{formatRupiah(totalIncome)}</p>
                            <p className="text-xs text-purple-600 font-medium">Total Komisi</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-xl">
                            <p className="text-2xl font-bold text-orange-700">⭐ 4.8</p>
                            <p className="text-xs text-orange-600 font-medium">Rating</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard': return renderDashboard();
            case 'tasks': return renderTasks();
            case 'map': return renderMap();
            case 'history': return renderHistory();
            case 'earnings': return renderEarnings();
            case 'profile': return renderProfile();
            default: return <div>Halaman tidak ditemukan</div>;
        }
    };

    if (loading) return <div className="min-h-screen flex justify-center items-center text-gray-800 font-bold"><Loader2 className="animate-spin mr-2" /> Memuat...</div>;

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-gray-800 overflow-x-hidden">
            {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}
            <aside className={`fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} ${isSidebarOpen ? 'md:w-64' : 'md:w-20'} flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}>
                <div className="h-20 flex items-center justify-between px-5 border-b border-gray-100">

                    {/* LOGO & BADGE DRIVER (Tampil saat Sidebar TERBUKA) */}
                    {/* LOGO & BADGE DRIVER */}
                    <div className={`flex items-center gap-3 transition-all duration-300 ${!isSidebarOpen ? 'justify-center w-full px-0' : 'px-0'}`}>
                        {isSidebarOpen ? (
                            <div className="flex flex-col animate-in fade-in slide-in-from-left duration-300">
                                <img src="/images/logo.png" alt="Logo" className="w-36 h-auto object-contain mb-1" />
                            </div>
                        ) : (
                            <button onClick={() => setIsSidebarOpen(true)} className="mx-auto relative group">
                                <img src="/images/mini-logo.png" alt="RecycleYuk" className="w-10 h-10 object-contain transition-transform group-hover:scale-110" />
                                <div className="absolute -right-2 -bottom-2 bg-green-100 text-green-600 rounded-full p-0.5 shadow-sm border border-white">
                                    <ChevronRight size={12} />
                                </div>
                            </button>
                        )}
                    </div>

                    {/* TOMBOL TOGGLE */}
                    {isSidebarOpen && (
                        <button onClick={() => setIsSidebarOpen(false)} className="hidden md:block p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition">
                            <ChevronLeft />
                        </button>
                    )}
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 text-gray-500"><X /></button>
                </div>

                {/* MENU NAVIGASI */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {SIDEBAR_MENUS.map(m => (
                        <button key={m.id} onClick={() => navigateTo(m.id)} className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 font-medium ${activePage === m.id ? 'bg-green-50 text-green-700 shadow-sm ring-1 ring-green-100' : 'text-gray-500 hover:bg-gray-50 hover:text-green-600'} ${!isSidebarOpen && 'justify-center px-0'}`}>
                            <m.icon size={22} strokeWidth={activePage === m.id ? 2.5 : 2} />
                            <span className={`${!isSidebarOpen ? 'md:hidden' : 'block'}`}>{m.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <button onClick={handleLogout} className={`w-full flex items-center rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all h-12 ${isSidebarOpen ? 'px-4 gap-3 justify-start' : 'justify-center px-0'}`}>
                        <LogOut size={22} className="min-w-[22px]" /> {isSidebarOpen && "Keluar"}
                    </button>
                </div>
            </aside>
            <main className={`flex-1 p-4 md:p-8 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
                <div className="md:hidden flex justify-between items-center mb-6 sticky top-0 bg-slate-50/90 backdrop-blur-md z-30 py-3 px-1 border-b border-slate-200">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2"><Menu /></button>
                    <span className="font-bold text-lg capitalize text-gray-800">{activePage}</span>
                    <button onClick={() => navigateTo('profile')} className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 border border-green-200">{currentUser?.full_name?.charAt(0)}</button>
                </div>
                <div className="max-w-6xl mx-auto">
                    <header className="hidden md:flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold capitalize text-gray-800 tracking-tight">
                                {activePage === 'dashboard' ? 'Ringkasan' :
                                    activePage === 'history' ? 'Riwayat' :
                                        activePage === 'tasks' ? 'Tugas Jemput' :
                                            activePage === 'map' ? 'Peta Lokasi' :
                                                'Profil'}
                            </h2>
                            <p className="text-gray-500 mt-1">Dashboard Operasional Driver</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                            <button className="p-2 rounded-lg hover:bg-gray-100 relative text-gray-600 group transition">
                                <Bell size={20} className="group-hover:text-green-600" />
                            </button>
                            <div className="w-px h-6 bg-gray-200"></div>
                            <button onClick={() => navigateTo('profile')} className="flex items-center gap-3 pl-2 pr-3 py-1 rounded-lg hover:bg-gray-50 transition">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200 overflow-hidden">
                                    {currentUser?.avatar_url ? (
                                        <img src={currentUser.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        currentUser?.full_name?.charAt(0) || 'D'
                                    )}
                                </div>
                                <div className="text-left hidden md:block">
                                    <p className="text-xs font-bold text-gray-800 line-clamp-1 max-w-[100px]">{currentUser?.full_name}</p>
                                    <p className="text-0 text-gray-500">Driver</p>
                                </div>
                            </button>
                        </div>
                    </header>
                    {renderContent()}

                    {/* CHAT MODAL - Driver to User */}
                    {selectedChatTask && (
                        <ChatModal
                            isOpen={isChatOpen}
                            onClose={() => setIsChatOpen(false)}
                            transactionId={selectedChatTask.id}
                            currentUserId={currentUser?.id}
                            currentUserName={currentUser?.full_name}
                            otherUserName={selectedChatTask.profiles?.full_name || 'User'}
                            isDriver={true}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}