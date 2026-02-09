<<<<<<< HEAD
'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Plus, Send, X, CheckCheck, MessageCircle, Eye } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Hook untuk Complaint Management
export const useComplaint = (profile) => {
    const [complaints, setComplaints] = useState([]);
    const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
    const [complaintForm, setComplaintForm] = useState({ subject: '', category: 'Layanan', content: '' });
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchComplaints = async () => {
        if (!profile?.id) return;
        try {
            const { data } = await supabase
                .from('complaints')
                .select('*')
                .eq('profile_id', profile.id)
                .order('created_at', { ascending: false });
            if (data) setComplaints(data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    const handleComplaintSubmit = async (e, addNotificationCallback) => {
        e.preventDefault();
        if (!profile || !complaintForm.subject || !complaintForm.content) {
            alert("Mohon lengkapi semua field!");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from('complaints').insert({
                profile_id: profile.id,
                subject: complaintForm.subject,
                category: complaintForm.category,
                content: complaintForm.content,
                status: 'Pending'
            });

            if (error) throw error;

            alert("Pengaduan berhasil dikirim!");
            if (addNotificationCallback) {
                addNotificationCallback("Pengaduan Terkirim", "Pengaduan Anda sedang diproses oleh RT/RW.", "info");
            }

            setComplaintForm({ subject: '', category: 'Layanan', content: '' });
            setIsComplaintModalOpen(false);
            await fetchComplaints();
        } catch (err) {
            alert("Gagal mengirim pengaduan: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        complaints,
        isComplaintModalOpen,
        setIsComplaintModalOpen,
        complaintForm,
        setComplaintForm,
        selectedComplaint,
        setSelectedComplaint,
        loading,
        fetchComplaints,
        handleComplaintSubmit
    };
};

// Component: Pengaduan List
export const PengaduanList = ({ complaints, onOpenModal, onSelectComplaint }) => (
    <div className="space-y-6 animate-in slide-in-from-right">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <MessageCircle size={20} /> Pengaduan Saya
                </h3>
                <button
                    onClick={onOpenModal}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2 transition"
                >
                    <Plus size={18} /> Buat Pengaduan
                </button>
            </div>

            {complaints.length === 0 ? (
                <div className="text-center py-12 text-gray-400 border-2 border-dashed rounded-lg bg-gray-50">
                    <MessageCircle size={48} className="mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Belum ada pengaduan.</p>
                    <button
                        onClick={onOpenModal}
                        className="mt-3 text-green-600 font-bold hover:underline"
                    >
                        Buat Pengaduan Pertama
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {complaints.map(c => (
                        <div
                            key={c.id}
                            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition cursor-pointer group"
                            onClick={() => onSelectComplaint(c)}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2 flex-wrap">
                                        {c.subject}
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${c.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                                c.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {c.status}
                                        </span>
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Kategori: <span className="font-medium">{c.category}</span> • {new Date(c.created_at).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                                <Eye size={18} className="text-gray-400 group-hover:text-green-600 transition" />
                            </div>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm line-clamp-2 border border-gray-100">
                                {c.content}
                            </p>
                            {c.response && (
                                <div className="mt-3 pl-4 border-l-4 border-green-500 bg-green-50 p-3 rounded-r">
                                    <p className="text-xs text-green-600 font-bold mb-1 flex items-center gap-1">
                                        <CheckCheck size={12} /> Tanggapan RT/RW
                                    </p>
                                    <p className="text-sm text-gray-700 line-clamp-2">{c.response}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

// Component: Complaint Form Modal
export const ComplaintFormModal = ({ isOpen, onClose, onSubmit, formData, setFormData, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl animate-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                        <MessageCircle size={22} className="text-green-600" /> Buat Pengaduan Baru
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition">
                        <X size={22} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Kategori Pengaduan</label>
                        <select
                            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 bg-white focus:ring-2 ring-green-500 outline-none transition"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            required
                        >
                            <option value="Layanan">Layanan Pickup</option>
                            <option value="Driver">Driver</option>
                            <option value="Pembayaran">Pembayaran</option>
                            <option value="Fasilitas">Fasilitas</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Judul Pengaduan</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 bg-white focus:ring-2 ring-green-500 outline-none transition"
                            placeholder="Contoh: Sampah belum diambil selama 3 hari"
                            value={formData.subject}
                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            required
                            maxLength={150}
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.subject.length}/150 karakter</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Isi Pengaduan Detail</label>
                        <textarea
                            className="w-full border border-gray-300 p-3 rounded-lg h-32 text-gray-800 bg-white resize-none focus:ring-2 ring-green-500 outline-none transition"
                            placeholder="Jelaskan pengaduan Anda secara detail agar kami dapat membantu dengan lebih baik..."
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            required
                            maxLength={500}
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.content.length}/500 karakter</p>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition"
                            disabled={loading}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Mengirim...' : <><Send size={16} /> Kirim Pengaduan</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Component: Complaint Detail Modal
export const ComplaintDetailModal = ({ complaint, onClose }) => {
    if (!complaint) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="font-bold text-xl text-gray-800">Detail Pengaduan</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition">
                        <X size={22} />
                    </button>
                </div>

                <div className="space-y-5">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Judul Pengaduan</label>
                        <p className="font-bold text-lg text-gray-900">{complaint.subject}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Kategori</label>
                            <p className="text-gray-800 font-medium bg-gray-50 px-3 py-2 rounded border border-gray-200">{complaint.category}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Status</label>
                            <span className={`inline-block px-3 py-1.5 rounded text-sm font-bold ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-700 border border-green-300' :
                                    complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                                        'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                }`}>
                                {complaint.status}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Tanggal Dibuat</label>
                        <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded border border-gray-200">
                            {new Date(complaint.created_at).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}
                        </p>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Isi Pengaduan</label>
                        <div className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">
                            {complaint.content}
                        </div>
                    </div>

                    {complaint.response && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-5">
                            <label className="text-xs font-bold text-green-700 uppercase flex items-center gap-1.5 mb-3">
                                <CheckCheck size={16} /> Tanggapan dari RT/RW
                            </label>
                            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{complaint.response}</p>
                            {complaint.updated_at && (
                                <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-green-200">
                                    Ditanggapi pada: {new Date(complaint.updated_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                                </p>
                            )}
                        </div>
                    )}

                    {!complaint.response && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm text-yellow-800">
                                <span className="font-bold">⏳ Pengaduan Anda sedang diproses</span><br />
                                Tim RT/RW akan merespons dalam waktu 1-2 hari kerja.
                            </p>
                        </div>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 py-3 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 text-gray-800 transition"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};
=======
'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Plus, Send, X, CheckCheck, MessageCircle, Eye } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Hook untuk Complaint Management
export const useComplaint = (profile) => {
    const [complaints, setComplaints] = useState([]);
    const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
    const [complaintForm, setComplaintForm] = useState({ subject: '', category: 'Layanan', content: '' });
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchComplaints = async () => {
        if (!profile?.id) return;
        try {
            const { data } = await supabase
                .from('complaints')
                .select('*')
                .eq('profile_id', profile.id)
                .order('created_at', { ascending: false });
            if (data) setComplaints(data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    const handleComplaintSubmit = async (e, addNotificationCallback) => {
        e.preventDefault();
        if (!profile || !complaintForm.subject || !complaintForm.content) {
            alert("Mohon lengkapi semua field!");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from('complaints').insert({
                profile_id: profile.id,
                subject: complaintForm.subject,
                category: complaintForm.category,
                content: complaintForm.content,
                status: 'Pending'
            });

            if (error) throw error;

            alert("Pengaduan berhasil dikirim!");
            if (addNotificationCallback) {
                addNotificationCallback("Pengaduan Terkirim", "Pengaduan Anda sedang diproses oleh RT/RW.", "info");
            }

            setComplaintForm({ subject: '', category: 'Layanan', content: '' });
            setIsComplaintModalOpen(false);
            await fetchComplaints();
        } catch (err) {
            alert("Gagal mengirim pengaduan: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        complaints,
        isComplaintModalOpen,
        setIsComplaintModalOpen,
        complaintForm,
        setComplaintForm,
        selectedComplaint,
        setSelectedComplaint,
        loading,
        fetchComplaints,
        handleComplaintSubmit
    };
};

// Component: Pengaduan List
export const PengaduanList = ({ complaints, onOpenModal, onSelectComplaint }) => (
    <div className="space-y-6 animate-in slide-in-from-right">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <MessageCircle size={20} /> Pengaduan Saya
                </h3>
                <button
                    onClick={onOpenModal}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2 transition"
                >
                    <Plus size={18} /> Buat Pengaduan
                </button>
            </div>

            {complaints.length === 0 ? (
                <div className="text-center py-12 text-gray-400 border-2 border-dashed rounded-lg bg-gray-50">
                    <MessageCircle size={48} className="mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Belum ada pengaduan.</p>
                    <button
                        onClick={onOpenModal}
                        className="mt-3 text-green-600 font-bold hover:underline"
                    >
                        Buat Pengaduan Pertama
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {complaints.map(c => (
                        <div
                            key={c.id}
                            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition cursor-pointer group"
                            onClick={() => onSelectComplaint(c)}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2 flex-wrap">
                                        {c.subject}
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${c.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                                c.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {c.status}
                                        </span>
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Kategori: <span className="font-medium">{c.category}</span> • {new Date(c.created_at).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                                <Eye size={18} className="text-gray-400 group-hover:text-green-600 transition" />
                            </div>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm line-clamp-2 border border-gray-100">
                                {c.content}
                            </p>
                            {c.response && (
                                <div className="mt-3 pl-4 border-l-4 border-green-500 bg-green-50 p-3 rounded-r">
                                    <p className="text-xs text-green-600 font-bold mb-1 flex items-center gap-1">
                                        <CheckCheck size={12} /> Tanggapan RT/RW
                                    </p>
                                    <p className="text-sm text-gray-700 line-clamp-2">{c.response}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

// Component: Complaint Form Modal
export const ComplaintFormModal = ({ isOpen, onClose, onSubmit, formData, setFormData, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl animate-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                        <MessageCircle size={22} className="text-green-600" /> Buat Pengaduan Baru
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition">
                        <X size={22} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Kategori Pengaduan</label>
                        <select
                            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 bg-white focus:ring-2 ring-green-500 outline-none transition"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            required
                        >
                            <option value="Layanan">Layanan Pickup</option>
                            <option value="Driver">Driver</option>
                            <option value="Pembayaran">Pembayaran</option>
                            <option value="Fasilitas">Fasilitas</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Judul Pengaduan</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 bg-white focus:ring-2 ring-green-500 outline-none transition"
                            placeholder="Contoh: Sampah belum diambil selama 3 hari"
                            value={formData.subject}
                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            required
                            maxLength={150}
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.subject.length}/150 karakter</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Isi Pengaduan Detail</label>
                        <textarea
                            className="w-full border border-gray-300 p-3 rounded-lg h-32 text-gray-800 bg-white resize-none focus:ring-2 ring-green-500 outline-none transition"
                            placeholder="Jelaskan pengaduan Anda secara detail agar kami dapat membantu dengan lebih baik..."
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            required
                            maxLength={500}
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.content.length}/500 karakter</p>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition"
                            disabled={loading}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Mengirim...' : <><Send size={16} /> Kirim Pengaduan</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Component: Complaint Detail Modal
export const ComplaintDetailModal = ({ complaint, onClose }) => {
    if (!complaint) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="font-bold text-xl text-gray-800">Detail Pengaduan</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition">
                        <X size={22} />
                    </button>
                </div>

                <div className="space-y-5">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Judul Pengaduan</label>
                        <p className="font-bold text-lg text-gray-900">{complaint.subject}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Kategori</label>
                            <p className="text-gray-800 font-medium bg-gray-50 px-3 py-2 rounded border border-gray-200">{complaint.category}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Status</label>
                            <span className={`inline-block px-3 py-1.5 rounded text-sm font-bold ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-700 border border-green-300' :
                                    complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                                        'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                }`}>
                                {complaint.status}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Tanggal Dibuat</label>
                        <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded border border-gray-200">
                            {new Date(complaint.created_at).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}
                        </p>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Isi Pengaduan</label>
                        <div className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">
                            {complaint.content}
                        </div>
                    </div>

                    {complaint.response && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-5">
                            <label className="text-xs font-bold text-green-700 uppercase flex items-center gap-1.5 mb-3">
                                <CheckCheck size={16} /> Tanggapan dari RT/RW
                            </label>
                            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{complaint.response}</p>
                            {complaint.updated_at && (
                                <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-green-200">
                                    Ditanggapi pada: {new Date(complaint.updated_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                                </p>
                            )}
                        </div>
                    )}

                    {!complaint.response && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm text-yellow-800">
                                <span className="font-bold">⏳ Pengaduan Anda sedang diproses</span><br />
                                Tim RT/RW akan merespons dalam waktu 1-2 hari kerja.
                            </p>
                        </div>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 py-3 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 text-gray-800 transition"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};
>>>>>>> d5956acd52d8fd280f895235942efa52d8477f33
