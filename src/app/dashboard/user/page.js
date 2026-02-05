'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
    Trash2, Calendar, Award, Truck, MapPin, User, FileText,
    Bell, BookOpen, Clock, X, LogOut, ChevronLeft, ChevronRight, HelpCircle,
    Wallet, CheckCircle2, AlertCircle, Search, PlayCircle,
    Phone, MessageCircle, Star, ArrowRight, Megaphone, CheckCheck, Trash,
    CreditCard, QrCode, Building, Loader2, Lock, Edit2, Menu, Send, Home,
    Navigation, Trophy, Recycle // Icon Navigasi GPS + Trophy + Recycle
} from 'lucide-react';
import Swal from 'sweetalert2';
import { getRewardBadge, formatRupiah, calculateRewardPoints, uploadAvatar } from '@/utils/enhancedHelpers';
import ChatModal from '@/components/shared/ChatModal';

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

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Koordinat Default [Lon, Lat]
const DEFAULT_COORDS = [107.6191, -6.9175];
const DRIVER_START = [107.6250, -6.9250];

const WEIGHT_OPTIONS = [
    { label: 'Ringan (0 - 5 KG)', value: 5 },
    { label: 'Sedang (5 - 10 KG)', value: 10 },
    { label: 'Berat (10 - 20 KG)', value: 20 },
    { label: 'Sangat Berat (> 20 KG)', value: 30 }
];

const TIME_OPTIONS = [
    { label: 'Pagi (08:00 - 11:00)', value: '09:00' },
    { label: 'Sore (15:00 - 18:00)', value: '16:00' }
];

const COMPLAINT_CATEGORIES = ['Sampah Menumpuk', 'Jadwal Terlewat', 'Fasilitas Rusak', 'Pelayanan Petugas', 'Lainnya'];

export default function UserDashboard() {
    const router = useRouter();

    // --- STATE MANAGEMENT ---
    const [loading, setLoading] = useState(true);
    const [activePage, setActivePage] = useState('dashboard');
    const [currentTime, setCurrentTime] = useState('');

    // --- GPS STATE ---
    const [userLocation, setUserLocation] = useState(DEFAULT_COORDS);
    const [isGpsActive, setIsGpsActive] = useState(false);

    // UI States
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Data States
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState({ totalWaste: 0, lastPickup: '-', points: 0 });
    const [wasteTypes, setWasteTypes] = useState([]);
    const [pickupHistory, setPickupHistory] = useState([]);
    const [activePickup, setActivePickup] = useState(null);
    const [driverLocation, setDriverLocation] = useState(DRIVER_START);
    const [complaints, setComplaints] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Forms
    const [complaintForm, setComplaintForm] = useState({ title: '', category: '', content: '' });
    const [formRequest, setFormRequest] = useState({ wasteTypeId: '', weight: 5, date: '', time: '09:00', notes: '' });

    // Payment & Modals
    const [paymentModal, setPaymentModal] = useState({ open: false, bill: null, step: 'method' });
    const [bills, setBills] = useState([{ id: 101, title: 'Iuran Kebersihan - Feb 2026', amount: 25000, status: 'Unpaid', due_date: '2026-02-10' }]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [isEditProfile, setIsEditProfile] = useState(false);

    // --- OPENLAYERS REFS ---
    const mapElement = useRef();
    const mapRef = useRef(null);
    const vectorSourceRef = useRef(new VectorSource());

    const SIDEBAR_MENUS = [
        { id: 'dashboard', label: 'Dashboard', icon: Award },
        { id: 'request', label: 'Request Pickup', icon: Truck },
        { id: 'history', label: 'Riwayat', icon: FileText },
        { id: 'pengaduan', label: 'Pengaduan', icon: Megaphone },
        { id: 'iuran', label: 'Bayar Iuran', icon: Wallet },
        { id: 'tracking', label: 'Tracking', icon: MapPin },
        { id: 'edukasi', label: 'Edukasi', icon: BookOpen },
    ];

    const EDUCATION_DATA = [
        { id: 1, type: 'article', category: 'Tips', title: 'Cara Memilah Sampah', desc: 'Panduan dasar.', content: '...', readTime: '3 min' },
        { id: 2, type: 'video', category: 'Tutorial', title: 'Membuat Kompos', desc: 'Video tutorial.', content: 'Video Placeholder', readTime: '5 min' },
        { id: 3, type: 'article', category: 'Info', title: 'Bahaya B3', desc: 'Kenapa baterai berbahaya?', content: '...', readTime: '4 min' },
    ];

    // --- 1. SETUP MIDTRANS ---
    useEffect(() => {
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
        const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY; // Pastikan ada di .env.local

        const script = document.createElement('script');
        script.src = snapScript;
        script.setAttribute('data-client-key', clientKey);
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) document.body.removeChild(script);
        }
    }, []);

    // --- 2. LOGIC & EFFECTS ---
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
        }, 1000);

        fetchData();
        startGpsTracking();

        // Realtime Listener
        const channel = supabase
            .channel('user-dashboard-realtime')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, (payload) => {
                fetchData();
                if (payload.eventType === 'UPDATE' && payload.new.status === 'Process') {
                    Swal.fire({
                        title: 'Pengangkutan Aktif!',
                        text: 'Driver sedang menuju lokasi Anda.',
                        icon: 'info',
                        timer: 3000,
                        showConfirmButton: false,
                        toast: true,
                        position: 'top-end',
                        background: '#d1fae5',
                        color: '#065f46'
                    });
                    setActivePage('tracking');
                }
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

    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true) }, []);

    // --- 3. GPS LOGIC (WATCH POSITION) ---
    const startGpsTracking = () => {
        if (!navigator.geolocation) {
            console.warn("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newLoc = [longitude, latitude];
                setUserLocation(newLoc);
                setIsGpsActive(true);
            },
            (error) => {
                // Handle GPS errors gracefully - don't show in console for common permission issues
                if (error.code === 1) {
                    console.warn("GPS permission denied by user");
                } else if (error.code === 2) {
                    console.warn("GPS position unavailable");
                } else if (error.code === 3) {
                    console.warn("GPS timeout");
                }
                // Keep default coordinates when GPS fails
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
        );
    };

    const centerToUserLocation = () => {
        if (mapRef.current && isGpsActive) {
            mapRef.current.getView().animate({ center: fromLonLat(userLocation), zoom: 17, duration: 1000 });
        } else {
            Swal.fire('GPS Mencari...', 'Pastikan izin lokasi aktif.', 'info');
        }
    };

    // Simulasi Pergerakan Driver
    // Simulasi Pergerakan Driver & Heading
    const [driverHeading, setDriverHeading] = useState(0);

    useEffect(() => {
        if (activePage === 'tracking' && activePickup && activePickup.rawStatus === 'Process') {
            const interval = setInterval(() => {
                setDriverLocation(prev => {
                    const lonDiff = (userLocation[0] - prev[0]) * 0.05;
                    const latDiff = (userLocation[1] - prev[1]) * 0.05;

                    // Jika dekat, stop
                    if (Math.abs(lonDiff) < 0.00001 && Math.abs(latDiff) < 0.00001) return prev;

                    // Calculate Bearing (Angle)
                    // Math.atan2(y, x). We want 0 at North? OpenLayers rotation 0 is UP? No, usually 0 is UP for Icons if image is facing UP.
                    // If image faces UP (North), standard math angle (0 at East) needs correction.
                    // Let's assume positive Y is North.
                    // Bearing = Math.atan2(dx, dy) -> returns angle from Y axis (North) in radians? No.
                    // Let's use standard Math.atan2(dy, dx) which is angle from X (East).
                    // And correct for OpenLayers rotation.
                    // Ideally: calculate rotation needed.

                    // Simple approach: Point towards target.
                    // Angle from North (Clockwise) is commonly used for headings.
                    // theta = atan2(dx, dy) (swapped).
                    const angle = Math.atan2(lonDiff, latDiff); // Angle from North, clockwise?
                    // Let's test. If dy is pos (North), dx 0 -> atan2(0, 1) = 0. Correct.
                    // If dx is pos (East), dy 0 -> atan2(1, 0) = PI/2. Correct (90 deg).
                    setDriverHeading(angle);

                    return [prev[0] + lonDiff, prev[1] + latDiff];
                });
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setDriverLocation(DRIVER_START);
        }
    }, [activePage, activePickup, userLocation]);

    // --- 4. MAP INITIALIZATION ---
    useEffect(() => {
        if (activePage === 'tracking' && mapElement.current && !mapRef.current) {

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
                    center: fromLonLat(DEFAULT_COORDS),
                    zoom: 13
                }),
                controls: []
            });

            mapRef.current = initialMap;
            updateMapMarkers();
        }

        return () => {
            if (activePage !== 'tracking' && mapRef.current) {
                mapRef.current.setTarget(null);
                mapRef.current = null;
            }
        }
    }, [activePage]);

    // --- 5. UPDATE MARKER & RUTE ---
    const updateMapMarkers = () => {
        if (!mapRef.current) return;

        vectorSourceRef.current.clear();

        // A. Marker Rumah User (DIHAPUS dan Diganti Dot Biru Akurasi Saja)
        if (isGpsActive) {
            const accuracyFeature = new Feature({ geometry: new Point(fromLonLat(userLocation)) });
            accuracyFeature.setStyle(new Style({
                image: new CircleStyle({
                    radius: 8,
                    fill: new Fill({ color: '#3b82f6' }),
                    stroke: new Stroke({ color: '#fff', width: 2 })
                })
            }));
            vectorSourceRef.current.addFeature(accuracyFeature);
        }

        // Home Icon removed as per request

        // B. Marker Driver
        if (activePickup?.rawStatus === 'Process') {
            const driverFeature = new Feature({ geometry: new Point(fromLonLat(driverLocation)) });
            driverFeature.setStyle(new Style({
                image: new Icon({
                    src: 'https://cdn-icons-png.flaticon.com/512/4047/4047448.png', // Green truck icon
                    scale: 0.10, anchor: [0.5, 1]
                })
            }));
            vectorSourceRef.current.addFeature(driverFeature);

            // C. Garis Rute
            const routeFeature = new Feature({
                geometry: new LineString([fromLonLat(driverLocation), fromLonLat(userLocation)])
            });
            routeFeature.setStyle(new Style({
                stroke: new Stroke({ color: '#10B981', width: 4, lineDash: [10, 10] })
            }));
            vectorSourceRef.current.addFeature(routeFeature);
        }
    };

    useEffect(() => {
        updateMapMarkers();
    }, [userLocation, driverLocation, activePickup, activePage, driverHeading]);


    // --- DATA FETCHING ---
    const fetchData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { router.push('/login'); return; }

            const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setProfile(profileData);

            const { data: wastes } = await supabase.from('waste_types').select('*');
            if (wastes) setWasteTypes(wastes);

            if (profileData?.rt) {
                const { data: notifData } = await supabase.from('notifications')
                    .select('*').or(`rt.eq.${profileData.rt},rt.is.null`).order('created_at', { ascending: false });
                setNotifications(notifData || []);
            }

            const { data: transactions } = await supabase
                .from('transactions')
                .select(`*, waste_types(name, price_per_kg), drivers:driver_id(full_name)`)
                .eq('profile_id', user.id)
                .order('created_at', { ascending: false });

            if (transactions) {
                setPickupHistory(transactions.map(t => ({
                    id: `#REQ-${String(t.id).slice(0, 6)}`,
                    type: t.waste_types?.name,
                    weight: t.weight,
                    date: new Date(t.created_at).toLocaleDateString('id-ID'),
                    time: new Date(t.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                    status: t.status, fee: t.total_price || 0
                })));

                const totalW = transactions.reduce((acc, curr) => acc + (Number(curr.weight) || 0), 0);
                setStats({ totalWaste: totalW, lastPickup: transactions[0] ? new Date(transactions[0].created_at).toLocaleDateString('id-ID') : '-', points: Math.floor(totalW * 10) });

                const active = transactions.find(t => t.status === 'Pending' || t.status === 'Process');
                if (active) {
                    setActivePickup({
                        id: active.id,
                        status: active.status === 'Process' ? 'Pengangkutan Aktif' : 'Menunggu Konfirmasi',
                        rawStatus: active.status,
                        driver: active.drivers?.full_name || 'Mencari Driver...',
                        vehicle: 'Pickup Layanan',
                        rating: 4.8,
                        eta: active.status === 'Process' ? 'Sedang Jalan' : 'Menunggu'
                    });
                } else { setActivePickup(null); }
            }

            const { data: complaintsData } = await supabase.from('complaints').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
            setComplaints(complaintsData || []);

        } catch (error) { console.error("Error data:", error); } finally { setLoading(false); }
    };

    const navigateTo = (pageId) => { setActivePage(pageId); setIsMobileMenuOpen(false); };

    const handleLogout = async () => {
        const result = await Swal.fire({ title: 'Keluar?', text: "Sesi Anda akan berakhir.", icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Ya' });
        if (result.isConfirmed) { await supabase.auth.signOut(); router.push('/login'); }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = { full_name: formData.get('fullName'), email: formData.get('email'), address: formData.get('address'), rt: formData.get('rt'), rw: formData.get('rw') };
        try { await supabase.from('profiles').update(updatedData).eq('id', profile.id); setProfile({ ...profile, ...updatedData }); setIsEditProfile(false); Swal.fire('Sukses', 'Profil disimpan', 'success'); fetchData(); } catch (e) { }
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

            const publicUrl = await uploadAvatar(file, profile.id);
            if (!publicUrl) throw new Error('Gagal mendapatkan URL gambar.');

            // Update profile in DB
            const { error } = await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', profile.id);
            if (error) throw error;

            setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
            Swal.fire('Sukses', 'Foto profil berhasil diperbarui!', 'success');
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Gagal upload foto: ' + err.message, 'error');
        }
    };

    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        if (!formRequest.wasteTypeId) { Swal.fire('Gagal', 'Pilih sampah', 'error'); return; }
        try {
            const { error } = await supabase.from('transactions').insert({ profile_id: profile.id, waste_type_id: formRequest.wasteTypeId, weight: formRequest.weight, status: 'Pending', pickup_time: formRequest.time, notes: formRequest.notes });
            if (error) throw error;
            Swal.fire('Berhasil', 'Request terkirim', 'success');
            setFormRequest({ wasteTypeId: '', weight: 5, date: '', time: '09:00', notes: '' });
            setActivePage('tracking');
        } catch (err) { Swal.fire('Gagal', err.message, 'error'); }
    };

    const handleComplaintSubmit = async (e) => { e.preventDefault(); try { await supabase.from('complaints').insert({ user_id: profile.id, subject: complaintForm.title, category: complaintForm.category, content: complaintForm.content, status: 'Pending', created_at: new Date() }); Swal.fire('Terkirim', 'Aduan dikirim', 'success'); setComplaintForm({ title: '', category: '', content: '' }); fetchData(); } catch (e) { } };

    const handlePayClick = (b) => setPaymentModal({ open: true, bill: b, step: 'method' });

    // --- PEMBAYARAN IURAN (REAL MIDTRANS) ---
    const processPayment = async () => {
        // 1. Validasi Snap
        if (!window.snap) {
            Swal.fire('Error', 'Sistem pembayaran sedang memuat, mohon tunggu.', 'error');
            return;
        }

        const currentBill = paymentModal.bill;

        // Ubah status modal jadi loading
        setPaymentModal(p => ({ ...p, step: 'processing' }));

        try {
            // 2. Request Token dari Backend
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: currentBill.id,
                    amount: currentBill.amount,
                    firstName: profile?.full_name || "Warga",
                    email: profile?.email || "warga@example.com",
                    title: currentBill.title
                })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Gagal membuat transaksi");

            // 3. Munculkan Popup Midtrans
            window.snap.pay(data.token, {
                onSuccess: async function (result) {
                    // Update State Lokal
                    setBills(prev => prev.map(b => b.id === currentBill.id ? { ...b, status: 'Paid' } : b));
                    setPaymentModal(p => ({ ...p, step: 'success' }));

                    // (Opsional) Update ke Supabase jika tabel bills ada di DB
                    // await supabase.from('bills').update({ status: 'Paid' }).eq('id', currentBill.id);
                },
                onPending: function (result) {
                    Swal.fire('Pending', 'Menunggu pembayaran diselesaikan', 'info');
                    setPaymentModal(p => ({ ...p, open: false }));
                },
                onError: function (result) {
                    Swal.fire('Gagal', 'Pembayaran gagal atau dibatalkan', 'error');
                    setPaymentModal(p => ({ ...p, open: false }));
                },
                onClose: function () {
                    setPaymentModal(p => ({ ...p, step: 'method' }));
                }
            });

        } catch (error) {
            console.error(error);
            Swal.fire('Error', error.message, 'error');
            setPaymentModal(p => ({ ...p, step: 'method' }));
        }
    };

    const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
    const markAsRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    const deleteNotification = (id) => setNotifications(notifications.filter(n => n.id !== id));
    const unreadCount = notifications.filter(n => !n.read).length;
    const getStatusColor = (s) => (s === 'Done' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700');

    // --- RENDERERS ---
    const rewardBadge = getRewardBadge(stats.points);

    const renderDashboard = () => (
        <div className="space-y-6 animate-in fade-in text-gray-800 pb-20 md:pb-0">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 md:p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl md:text-3xl font-bold">Halo, {profile?.full_name?.split(' ')[0]}! 👋</h2>
                        <div className={`${rewardBadge.color} px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white font-bold text-sm shadow-md`}>
                            <span className="text-lg">{rewardBadge.icon}</span>
                            <span>{rewardBadge.level}</span>
                        </div>
                    </div>
                    <p className="opacity-90">{profile?.rt ? `Warga RT ${profile.rt} / RW ${profile.rw}` : 'Lengkapi data RT/RW di profil.'}</p>
                    <p className="text-xs mt-2 opacity-75">Kumpulkan poin untuk naik level! ({stats.points} poin)</p>
                </div>
                <Award className="absolute right-[-20px] bottom-[-20px] opacity-10 w-40 h-40 transform rotate-12" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {[{ l: 'Total Sampah', v: `${stats.totalWaste} kg`, i: Trash2 }, { l: 'Poin', v: stats.points, i: Award }, { l: 'Pickup Terakhir', v: stats.lastPickup, i: Calendar }].map((s, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                        <div><p className="text-gray-500 text-xs md:text-sm font-medium">{s.l}</p><h3 className="text-xl md:text-2xl font-bold text-gray-800">{s.v}</h3></div>
                        <div className="bg-gray-100 p-3 rounded-lg text-gray-600"><s.i size={24} /></div>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-gray-800">Status Pickup Terbaru</h3>{activePickup ? (<span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(activePickup.status)}`}>{activePickup.status}</span>) : (<span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">Standby</span>)}</div>
                {activePickup ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="bg-blue-600 text-white p-3 rounded-lg"><Truck size={24} /></div>
                            <div><p className="font-bold text-gray-900 text-lg">{activePickup.status}</p><p className="text-sm text-gray-700">Driver: {activePickup.driver}</p></div>
                        </div>
                        <button onClick={() => navigateTo('tracking')} className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 font-medium">Lacak</button>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg bg-gray-50"><Truck size={32} className="mx-auto mb-2 opacity-50" /><p>Belum ada request pickup aktif.</p><button onClick={() => navigateTo('request')} className="mt-2 text-green-600 font-bold hover:underline">Buat Request Baru</button></div>
                )}
            </div>
        </div>
    );

    const renderRequest = () => (
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 border border-gray-200 animate-in slide-in-from-right text-gray-800 pb-20 md:pb-0">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-800"><Truck /> Form Request</h3>
            <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1 text-gray-600">Jenis Sampah</label><select className="w-full border p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" value={formRequest.wasteTypeId} onChange={e => setFormRequest({ ...formRequest, wasteTypeId: e.target.value })} required><option value="">Pilih Sampah</option>{wasteTypes.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}</select></div>
                    <div><label className="block text-sm font-medium mb-1 text-gray-600">Klasifikasi Berat</label><select className="w-full border p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" value={formRequest.weight} onChange={e => setFormRequest({ ...formRequest, weight: e.target.value })} required><option value="">Pilih Kategori...</option>{WEIGHT_OPTIONS.map((opt, i) => (<option key={i} value={opt.value}>{opt.label}</option>))}</select></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1 text-gray-600">Tanggal</label><input type="date" className="w-full border p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" value={formRequest.date} onChange={e => setFormRequest({ ...formRequest, date: e.target.value })} required /></div>
                    <div><label className="block text-sm font-medium mb-1 text-gray-600">Waktu Pengangkutan</label><select className="w-full border p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" value={formRequest.time} onChange={e => setFormRequest({ ...formRequest, time: e.target.value })} required><option value="">Pilih Waktu...</option>{TIME_OPTIONS.map((opt, i) => (<option key={i} value={opt.value}>{opt.label}</option>))}</select></div>
                </div>
                <div><label className="block text-sm font-medium mb-1 text-gray-600">Catatan</label><textarea className="w-full border p-3 rounded-lg h-24 bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Lokasi detail..." value={formRequest.notes} onChange={e => setFormRequest({ ...formRequest, notes: e.target.value })}></textarea></div>
                <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">Kirim Request</button>
            </form>
        </div>
    );

    const renderPengaduan = () => (
        <div className="space-y-6 animate-in slide-in-from-right pb-20 md:pb-0">
            <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 border border-gray-200 text-gray-800">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-800"><Megaphone /> Layanan Pengaduan</h3>
                <form onSubmit={handleComplaintSubmit} className="space-y-4 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium mb-1 text-gray-600">Judul</label><input className="w-full border p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Judul Masalah" value={complaintForm.title} onChange={e => setComplaintForm({ ...complaintForm, title: e.target.value })} required /></div>
                        <div><label className="block text-sm font-medium mb-1 text-gray-600">Kategori</label><select className="w-full border p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" value={complaintForm.category} onChange={e => setComplaintForm({ ...complaintForm, category: e.target.value })} required><option value="">Pilih...</option>{COMPLAINT_CATEGORIES.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}</select></div>
                    </div>
                    <div><label className="block text-sm font-medium mb-1 text-gray-600">Deskripsi</label><textarea className="w-full border p-3 rounded-lg h-24 bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none resize-none" placeholder="Jelaskan detail..." value={complaintForm.content} onChange={e => setComplaintForm({ ...complaintForm, content: e.target.value })} required></textarea></div>
                    <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2"><Send size={18} /> Kirim Pengaduan</button>
                </form>
                <h4 className="font-bold text-gray-700 mb-3 border-b pb-2">Riwayat Pengaduan</h4>
                <div className="space-y-3">{complaints.length > 0 ? complaints.map(c => <div key={c.id} className="border p-4 rounded-xl hover:bg-gray-50 transition bg-white"><div className="flex justify-between items-start mb-2"><div><p className="font-bold text-gray-800">{c.subject}</p><p className="text-xs text-gray-500">{new Date(c.created_at).toLocaleDateString('id-ID')} • {c.category}</p></div><span className={`px-2 py-1 text-xs font-bold rounded ${c.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{c.status}</span></div><p className="text-sm text-gray-700 bg-gray-50 p-2 rounded mb-2 italic">"{c.content}"</p>{c.response && <div className="mt-2 pl-3 border-l-4 border-green-500"><p className="text-xs font-bold text-green-700">Tanggapan RT/RW:</p><p className="text-sm text-gray-700">{c.response}</p></div>}</div>) : <div className="text-center py-6 text-gray-400 border border-dashed rounded-lg">Belum ada riwayat.</div>}</div>
            </div>
        </div>
    );

    const renderTracking = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-right pb-20 md:pb-0">
            <div className="lg:col-span-2 bg-gray-200 rounded-xl h-64 md:h-[450px] relative overflow-hidden border shadow-inner z-0">
                {/* OPENLAYERS MAP CONTAINER */}
                <div ref={mapElement} style={{ width: '100%', height: '100%' }} />

                {/* Tombol Re-center GPS */}
                <button
                    onClick={centerToUserLocation}
                    className="absolute bottom-16 right-4 z-[400] bg-white p-2 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 transition border border-gray-200"
                    title="Lokasi Saya"
                >
                    <Navigation size={24} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce w-max border border-gray-200">
                    <div className="bg-green-600 text-white p-1 rounded-full"><Truck size={16} /></div>
                    <div><p className="text-xs font-bold text-gray-500">Estimasi</p><p className="font-bold text-green-700 text-sm">{activePickup?.eta || 'Menunggu'}</p></div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Info Pengangkutan</h3>
                {activePickup ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3"><div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">BS</div><div><h4 className="font-bold text-gray-800">{activePickup.driver}</h4><p className="text-xs text-gray-500">{activePickup.vehicle}</p></div></div>
                        <div className="p-3 bg-yellow-50 text-yellow-800 rounded text-sm border border-yellow-200">Mohon bersiap, driver sedang menuju titik lokasi Anda.</div>
                        <div className="grid grid-cols-2 gap-2"><button className="py-2 bg-green-50 text-green-700 rounded font-bold text-sm flex justify-center gap-1 hover:bg-green-100 transition"><MessageCircle size={16} /> Chat</button><button className="py-2 bg-blue-50 text-blue-700 rounded font-bold text-sm flex justify-center gap-1 hover:bg-blue-100 transition"><Phone size={16} /> Call</button></div>
                    </div>
                ) : <p className="text-gray-500 text-center py-4">Belum ada pickup aktif.</p>}
            </div>
        </div>
    );

    const renderIuran = () => (
        <div className="space-y-6 animate-in slide-in-from-right pb-20 md:pb-0">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-6"><div className="bg-purple-100 p-3 rounded-lg text-purple-600"><Wallet size={24} /></div><div><h3 className="text-xl font-bold text-gray-800">Tagihan Iuran</h3><p className="text-sm text-gray-500">Kelola pembayaran bulanan Anda.</p></div></div>
                {bills.map(bill => (
                    <div key={bill.id} className="border p-4 rounded-xl flex justify-between items-center mb-3 hover:bg-gray-50 transition">
                        <div className="flex items-center gap-4"><div className="bg-gray-100 p-2 rounded-lg text-gray-600"><Building size={24} /></div><div><p className="font-bold text-gray-800">{bill.title}</p><p className="text-sm text-gray-500">Status: <span className={bill.status === 'Paid' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{bill.status}</span></p></div></div>
                        {bill.status === 'Unpaid' ? <button onClick={() => handlePayClick(bill)} className="w-full md:w-auto bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition">Bayar</button> : <span className="w-full md:w-auto text-green-600 font-bold flex items-center justify-center md:justify-end gap-1"><CheckCheck size={16} /> Lunas</span>}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderEdukasi = () => (
        <div className="space-y-6 animate-in slide-in-from-right pb-20 md:pb-0">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">{['Semua', 'Tips', 'Tutorial', 'Info'].map(cat => <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition ${selectedCategory === cat ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{cat}</button>)}</div>
                <div className="flex items-center gap-2 w-full md:w-64 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"><Search className="text-gray-400" size={18} /><input type="text" placeholder="Cari artikel..." className="w-full outline-none text-sm bg-transparent text-gray-800" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{EDUCATION_DATA.filter(i => (selectedCategory === 'Semua' || i.category === selectedCategory) && i.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (<div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group cursor-pointer" onClick={() => setSelectedArticle(item)}><div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-green-50 transition">{item.type === 'video' ? <PlayCircle size={40} className="group-hover:text-green-600" /> : <BookOpen size={40} className="group-hover:text-green-600" />}</div><div className="p-5"><span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{item.category}</span><h3 className="font-bold text-lg mt-2 mb-2 text-gray-800 group-hover:text-green-600">{item.title}</h3><p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.desc}</p><button className="text-green-600 font-bold text-sm flex items-center gap-1">Baca <ArrowRight size={16} /></button></div></div>))}</div>
        </div>
    );

    const renderNotifikasi = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-in slide-in-from-right pb-20 md:pb-0">
            <div className="flex justify-between mb-4"><h3 className="font-bold text-xl text-gray-800">Notifikasi</h3>{unreadCount > 0 && <button onClick={markAllRead} className="text-green-600 text-sm font-bold hover:underline">Tandai dibaca</button>}</div>
            <div className="space-y-2">{notifications.length > 0 ? notifications.map(n => (<div key={n.id} onClick={() => markAsRead(n.id)} className={`p-4 border-b flex gap-4 cursor-pointer hover:bg-gray-50 transition rounded-lg ${!n.read && 'bg-green-50'}`}><div className={`p-2 rounded-full h-fit flex-shrink-0 ${n.type === 'payment' ? 'bg-green-100 text-green-600' : n.type === 'pickup' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>{n.type === 'payment' ? <Wallet size={20} /> : n.type === 'pickup' ? <Truck size={20} /> : <Bell size={20} />}</div><div className="flex-1"><div className="flex justify-between items-start"><h4 className={`font-bold text-sm ${n.read ? 'text-gray-600' : 'text-black'}`}>{n.title}</h4><span className="text-xs text-gray-400 whitespace-nowrap ml-2">{n.time}</span></div><p className="text-sm text-gray-600 mt-1">{n.message}</p></div><button onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }} className="text-gray-400 hover:text-red-500"><Trash size={16} /></button></div>)) : <div className="text-center py-8 text-gray-400">Belum ada notifikasi.</div>}</div>
        </div>
    );

    const renderProfile = () => (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 animate-in slide-in-from-right pb-20 md:pb-0">
            <div className="flex justify-between items-center mb-6"><h3 className="text-lg font-bold flex items-center gap-2 text-gray-800"><User /> Profil Saya</h3><button onClick={() => setIsEditProfile(true)} className="text-sm font-bold text-green-600 flex items-center gap-1 hover:underline"><Edit2 size={16} /> Edit</button></div>

            <div className="flex flex-col items-center mb-8">
                <div className="relative group cursor-pointer" onClick={() => document.getElementById('avatar-upload').click()}>
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-100 shadow-sm">
                        {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-600">
                                {profile?.full_name?.charAt(0) || 'U'}
                            </div>
                        )}
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Edit2 className="text-white" size={20} />
                    </div>
                </div>
                <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                <p className="text-xs text-gray-400 mt-2">Klik foto untuk mengganti</p>
            </div>

            <div className="space-y-4 text-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100"><label className="text-xs font-bold text-gray-500 uppercase">Nama Lengkap</label><p className="font-medium text-lg text-gray-900">{profile?.full_name}</p></div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100"><label className="text-xs font-bold text-gray-500 uppercase">Email</label><p className="font-medium text-lg text-gray-900">{profile?.email}</p></div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100"><label className="text-xs font-bold text-gray-500 uppercase">NIK</label><p className="font-medium text-lg text-gray-900">{profile?.nik || '-'}</p></div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100"><label className="text-xs font-bold text-green-700 uppercase">RT / RW</label><p className="font-medium text-lg text-green-900">{profile?.rt ? `${profile.rt} / ${profile.rw}` : <span className="text-red-500 text-sm italic">Belum diisi</span>}</p></div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100"><label className="text-xs font-bold text-gray-500 uppercase">Alamat</label><p className="font-medium text-lg text-gray-900">{profile?.address}</p></div>
            </div>
        </div>
    );

    const renderHistory = () => (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 animate-in slide-in-from-right pb-20 md:pb-0">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-800"><FileText /> Riwayat Transaksi</h3>
            <div className="space-y-3">{pickupHistory.length > 0 ? pickupHistory.map((pickup, idx) => (<div key={idx} className="border p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center mb-3 hover:bg-gray-50 cursor-pointer transition gap-2" onClick={() => setSelectedHistory(pickup)}><div className="flex gap-4 items-center"><div className="bg-green-100 p-3 rounded-lg"><Trash2 size={24} className="text-green-600" /></div><div><p className="font-bold text-gray-800">{pickup.type}</p><p className="text-sm text-gray-500">{pickup.date} • {pickup.time}</p></div></div><p className="font-bold text-lg text-gray-800">Rp {pickup.fee.toLocaleString()}</p></div>)) : <div className="text-center py-12 text-gray-400">Belum ada riwayat.</div>}</div>
        </div>
    );

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard': return renderDashboard();
            case 'request': return renderRequest();
            case 'history': return renderHistory();
            case 'pengaduan': return renderPengaduan();
            case 'iuran': return renderIuran();
            case 'tracking': return renderTracking();
            case 'edukasi': return renderEdukasi();
            case 'profile': return renderProfile();
            case 'notifikasi': return renderNotifikasi();
            default: return <div>Halaman tidak ditemukan</div>;
        }
    };

    if (loading) return <div className="min-h-screen flex justify-center items-center text-gray-800 font-bold"><Loader2 className="animate-spin mr-2" /> Memuat Data...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800 overflow-x-hidden">
            {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}
            <aside className={`fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} ${isSidebarOpen ? 'md:w-64' : 'md:w-20'} flex flex-col`}>
                <div className="h-16 md:h-20 flex items-center justify-between px-4 border-b border-gray-100">
                    {/* LOGO & BRAND */}
                    <div className={`flex items-center gap-3 transition-all duration-300 ${!isSidebarOpen ? 'justify-center w-full px-0' : 'px-0'}`}>
                        {isSidebarOpen ? (
                            <div className="flex flex-col animate-in fade-in slide-in-from-left duration-300">
                                <img src="/images/logo.png" alt="RecycleYuk" className="w-36 h-auto object-contain mb-1" />
                                <span className="text-[10px] font-bold text-green-600 tracking-[0.2em] uppercase pl-1">
                                    User App
                                </span>
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
                    {isSidebarOpen && <button onClick={() => setIsSidebarOpen(false)} className="hidden md:block p-2 rounded-lg hover:bg-gray-100 text-gray-500"><ChevronLeft size={20} /></button>}
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 text-gray-500"><X size={24} /></button>
                </div>
                <nav className="flex-1 p-3 space-y-2 overflow-y-auto overflow-x-hidden">{SIDEBAR_MENUS.map(menu => (<button key={menu.id} onClick={() => navigateTo(menu.id)} className={`w-full flex items-center rounded-xl font-medium transition-all duration-200 h-12 ${activePage === menu.id ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'} ${isSidebarOpen ? 'px-4 gap-3 justify-start' : 'justify-center px-0 md:justify-center'} ${!isSidebarOpen && 'md:px-0'}`}><menu.icon size={22} className={`min-w-[22px] ${activePage === menu.id ? 'text-green-600' : 'text-gray-400'}`} /> <span className={`${!isSidebarOpen ? 'md:hidden' : 'block'}`}>{menu.label}</span></button>))}</nav>
                <div className="p-4 border-t border-gray-100">
                    <button onClick={handleLogout} className={`w-full flex items-center rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all h-12 ${isSidebarOpen ? 'px-4 gap-3 justify-start' : 'justify-center px-0 md:justify-center'}`}>
                        <LogOut size={22} className="min-w-[22px]" /> <span className={`${!isSidebarOpen ? 'md:hidden' : 'block'}`}>Keluar</span>
                    </button>
                </div>
            </aside>
            <main className={`flex-1 p-4 md:p-8 overflow-y-auto transition-all duration-300 w-full ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
                <div className="md:hidden flex justify-between items-center mb-6 sticky top-0 bg-gray-50 z-30 py-2"><button onClick={() => setIsMobileMenuOpen(true)}><Menu size={28} /></button><span className="font-bold text-lg capitalize">{activePage}</span><div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">{profile?.full_name?.charAt(0)}</div></div>
                <div className="max-w-5xl mx-auto">
                    <header className="hidden md:flex justify-between items-center mb-8 gap-4">
                        <div><h2 className="text-2xl font-bold capitalize text-gray-800">{activePage === 'dashboard' ? 'Overview' : activePage.replace('-', ' ')}</h2><p className="text-gray-500 text-sm">Pantau aktivitas lingkunganmu.</p></div>
                        <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                            <button onClick={() => setActivePage('notifikasi')} className="p-2 rounded-lg hover:bg-gray-100 relative text-gray-600 group transition">
                                <Bell size={20} className="group-hover:text-green-600" />
                                {notifications.filter(n => !n.read).length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>}
                            </button>
                            <div className="w-px h-6 bg-gray-200"></div>
                            <button onClick={() => setActivePage('profile')} className="flex items-center gap-3 pl-2 pr-3 py-1 rounded-lg hover:bg-gray-50 transition">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200 overflow-hidden">
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        profile?.full_name?.charAt(0) || 'U'
                                    )}
                                </div>
                                <div className="text-left hidden md:block">
                                    <p className="text-xs font-bold text-gray-800 line-clamp-1 max-w-[100px]">{profile?.full_name}</p>
                                    <p className="text-0 text-gray-500">Warga</p>
                                </div>
                            </button>
                        </div>
                    </header>
                    {renderContent()}
                </div>
            </main>

            {/* MODAL EDIT */}
            {isEditProfile && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Edit Profil</h3>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <input name="fullName" defaultValue={profile?.full_name} className="w-full border p-2 rounded text-gray-800" />
                            <div className="grid grid-cols-2 gap-4"><input name="rt" defaultValue={profile?.rt} className="w-full border p-2 rounded text-gray-800" placeholder="RT" /><input name="rw" defaultValue={profile?.rw} className="w-full border p-2 rounded text-gray-800" placeholder="RW" /></div>
                            <input name="email" defaultValue={profile?.email} className="w-full border p-2 rounded text-gray-800" />
                            <textarea name="address" defaultValue={profile?.address} className="w-full border p-2 rounded text-gray-800 h-24" />
                            <div className="flex gap-2"><button type="button" onClick={() => setIsEditProfile(false)} className="flex-1 py-2 border rounded">Batal</button><button type="submit" className="flex-1 py-2 bg-green-600 text-white rounded">Simpan</button></div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL DETAIL */}
            {(selectedHistory || selectedArticle) && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl max-h-[85vh] overflow-y-auto">
                        <div className="flex justify-between mb-4 border-b pb-2"><h3 className="font-bold text-lg text-gray-800">Detail</h3><button onClick={() => { setSelectedHistory(null); setSelectedArticle(null) }}><X /></button></div>
                        {selectedHistory && (<div className="space-y-2 text-gray-800"><p>ID: {selectedHistory.id}</p><p>Status: {selectedHistory.status}</p><p className="font-bold text-green-600">Total: Rp {selectedHistory.fee.toLocaleString()}</p></div>)}
                        {selectedArticle && (<div className="space-y-2 text-gray-800"><h4 className="font-bold">{selectedArticle.title}</h4><p className="text-sm">{selectedArticle.desc}</p></div>)}
                    </div>
                </div>
            )}

            {/* MODAL PAYMENT (WITH REAL MIDTRANS INTEGRATION) */}
            {paymentModal.open && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-md p-6 text-center shadow-xl">
                        <div className="flex justify-between mb-4"><h3 className="font-bold text-lg text-gray-800">Pembayaran</h3><button onClick={() => setPaymentModal({ ...paymentModal, open: false })}><X /></button></div>
                        {paymentModal.step === 'method' && <div><h2 className="text-3xl font-bold mb-4 text-gray-800">Rp {paymentModal.bill.amount.toLocaleString()}</h2><button onClick={processPayment} className="w-full py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700">Bayar Sekarang</button></div>}
                        {paymentModal.step === 'processing' && <div><Loader2 className="animate-spin mx-auto mb-2 text-green-600" /><p className="text-gray-600">Memproses pembayaran...</p></div>}
                        {paymentModal.step === 'success' && <div><CheckCheck className="mx-auto mb-2 text-green-600" size={40} /><h3 className="font-bold text-xl text-gray-800">Berhasil!</h3></div>}
                    </div>
                </div>
            )}

            {/* CHAT MODAL - User to Driver */}
            {activePickup && (
                <ChatModal
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    transactionId={activePickup.rawId}
                    currentUserId={profile?.id}
                    currentUserName={profile?.full_name}
                    otherUserName={activePickup.driverName || 'Driver'}
                    isDriver={false}
                />
            )}

            {/* Floating Chat Button - Only when pickup is active */}
            {activePickup?.rawStatus === 'Process' && (
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-24 right-6 md:bottom-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition z-40 animate-bounce"
                    title="Chat dengan Driver"
                >
                    <MessageCircle size={24} />
                </button>
            )}
        </div>
    );
}