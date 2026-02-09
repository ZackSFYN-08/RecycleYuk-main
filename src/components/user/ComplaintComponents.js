<<<<<<< HEAD
// Helper untuk meng-generate import icons yang dibutuhkan
import { Plus, Send, X, CheckCheck } from 'lucide-react';

// Render Pengaduan Component untuk User Dashboard
export const renderPengaduan = (complaints, setIsComplaintModalOpen, setSelectedComplaint) => (
    <div className="space-y-6 animate-in slide-in-from-right">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <MessageCircle size={20} /> Pengaduan Saya
                </h3>
                <button
                    onClick={() => setIsComplaintModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2"
                >
                    <Plus size={18} /> Buat Pengaduan
                </button>
            </div>

            {complaints.length === 0 ? (
                <div className="text-center py-12 text-gray-400 border-2 border-dashed rounded-lg">
                    <MessageCircle size={48} className="mx-auto mb-3 opacity-30" />
                    <p>Belum ada pengaduan.</p>
                    <button
                        onClick={() => setIsComplaintModalOpen(true)}
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
                            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition cursor-pointer"
                            onClick={() => setSelectedComplaint(c)}
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
                                        Kategori: {c.category} • {new Date(c.created_at).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm line-clamp-2">{c.content}</p>
                            {c.response && (
                                <div className="mt-3 pl-4 border-l-4 border-green-500">
                                    <p className="text-xs text-green-600 font-bold mb-1">Tanggapan RT/RW:</p>
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

// Modal Form Pengaduan
export const ComplaintModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                        <MessageCircle size={22} /> Buat Pengaduan Baru
                    </h3>
                    <button onClick={onClose}>
                        <X size={20} className="text-gray-400 hover:text-red-500" />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">Kategori</label>
                        <select
                            className="w-full border p-2 rounded text-gray-800 bg-white"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            required
                        >
                            <option value="Layanan">Layanan Pickup</option>
                            <option value="Driver">Driver</option>
                            <option value="Pembayaran">Pembayaran</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">Judul Pengaduan</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded text-gray-800 bg-white"
                            placeholder="Contoh: Sampah belum diambil"
                            value={formData.subject}
                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">Isi Pengaduan</label>
                        <textarea
                            className="w-full border p-2 rounded h-32 text-gray-800 bg-white resize-none"
                            placeholder="Jelaskan pengaduan Anda secara detail..."
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 border rounded font-bold text-gray-600 hover:bg-gray-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 flex items-center justify-center gap-2"
                        >
                            <Send size={16} /> Kirim Pengaduan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Modal Detail Complaint
export const ComplaintDetailModal = ({ complaint, onClose }) => {
    if (!complaint) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="font-bold text-xl text-gray-800">Detail Pengaduan</h3>
                    <button onClick={onClose}>
                        <X size={20} className="text-gray-400 hover:text-red-500" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Judul</label>
                        <p className="font-bold text-lg text-gray-800 mt-1">{complaint.subject}</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Kategori</label>
                            <p className="text-gray-800 mt-1">{complaint.category}</p>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
                            <p className="mt-1">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                        complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                            'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {complaint.status}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Tanggal Dibuat</label>
                        <p className="text-gray-800 mt-1">{new Date(complaint.created_at).toLocaleString('id-ID')}</p>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Isi Pengaduan</label>
                        <p className="text-gray-700 mt-1 bg-gray-50 p-3 rounded-lg border">{complaint.content}</p>
                    </div>

                    {complaint.response && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <label className="text-xs font-bold text-green-700 uppercase flex items-center gap-1">
                                <CheckCheck size={14} /> Tanggapan RT/RW
                            </label>
                            <p className="text-gray-800 mt-2">{complaint.response}</p>
                            {complaint.updated_at && (
                                <p className="text-xs text-gray-500 mt-2">
                                    Ditanggapi: {new Date(complaint.updated_at).toLocaleString('id-ID')}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 py-2 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 text-gray-800"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};
=======
// Helper untuk meng-generate import icons yang dibutuhkan
import { Plus, Send, X, CheckCheck } from 'lucide-react';

// Render Pengaduan Component untuk User Dashboard
export const renderPengaduan = (complaints, setIsComplaintModalOpen, setSelectedComplaint) => (
    <div className="space-y-6 animate-in slide-in-from-right">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <MessageCircle size={20} /> Pengaduan Saya
                </h3>
                <button
                    onClick={() => setIsComplaintModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2"
                >
                    <Plus size={18} /> Buat Pengaduan
                </button>
            </div>

            {complaints.length === 0 ? (
                <div className="text-center py-12 text-gray-400 border-2 border-dashed rounded-lg">
                    <MessageCircle size={48} className="mx-auto mb-3 opacity-30" />
                    <p>Belum ada pengaduan.</p>
                    <button
                        onClick={() => setIsComplaintModalOpen(true)}
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
                            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition cursor-pointer"
                            onClick={() => setSelectedComplaint(c)}
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
                                        Kategori: {c.category} • {new Date(c.created_at).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm line-clamp-2">{c.content}</p>
                            {c.response && (
                                <div className="mt-3 pl-4 border-l-4 border-green-500">
                                    <p className="text-xs text-green-600 font-bold mb-1">Tanggapan RT/RW:</p>
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

// Modal Form Pengaduan
export const ComplaintModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                        <MessageCircle size={22} /> Buat Pengaduan Baru
                    </h3>
                    <button onClick={onClose}>
                        <X size={20} className="text-gray-400 hover:text-red-500" />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">Kategori</label>
                        <select
                            className="w-full border p-2 rounded text-gray-800 bg-white"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            required
                        >
                            <option value="Layanan">Layanan Pickup</option>
                            <option value="Driver">Driver</option>
                            <option value="Pembayaran">Pembayaran</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">Judul Pengaduan</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded text-gray-800 bg-white"
                            placeholder="Contoh: Sampah belum diambil"
                            value={formData.subject}
                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">Isi Pengaduan</label>
                        <textarea
                            className="w-full border p-2 rounded h-32 text-gray-800 bg-white resize-none"
                            placeholder="Jelaskan pengaduan Anda secara detail..."
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 border rounded font-bold text-gray-600 hover:bg-gray-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 flex items-center justify-center gap-2"
                        >
                            <Send size={16} /> Kirim Pengaduan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Modal Detail Complaint
export const ComplaintDetailModal = ({ complaint, onClose }) => {
    if (!complaint) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="font-bold text-xl text-gray-800">Detail Pengaduan</h3>
                    <button onClick={onClose}>
                        <X size={20} className="text-gray-400 hover:text-red-500" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Judul</label>
                        <p className="font-bold text-lg text-gray-800 mt-1">{complaint.subject}</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Kategori</label>
                            <p className="text-gray-800 mt-1">{complaint.category}</p>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
                            <p className="mt-1">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                        complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                            'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {complaint.status}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Tanggal Dibuat</label>
                        <p className="text-gray-800 mt-1">{new Date(complaint.created_at).toLocaleString('id-ID')}</p>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Isi Pengaduan</label>
                        <p className="text-gray-700 mt-1 bg-gray-50 p-3 rounded-lg border">{complaint.content}</p>
                    </div>

                    {complaint.response && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <label className="text-xs font-bold text-green-700 uppercase flex items-center gap-1">
                                <CheckCheck size={14} /> Tanggapan RT/RW
                            </label>
                            <p className="text-gray-800 mt-2">{complaint.response}</p>
                            {complaint.updated_at && (
                                <p className="text-xs text-gray-500 mt-2">
                                    Ditanggapi: {new Date(complaint.updated_at).toLocaleString('id-ID')}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 py-2 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 text-gray-800"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};
>>>>>>> d5956acd52d8fd280f895235942efa52d8477f33
