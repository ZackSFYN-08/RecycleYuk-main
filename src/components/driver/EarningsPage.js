'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { calculateDriverEarnings, formatRupiah, exportToExcel } from '@/utils/enhancedHelpers';
import { Wallet, TrendingUp, Calendar, Download, DollarSign, Package, Clock, Trophy } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function DriverEarningsPage({ driverId }) {
    const [earnings, setEarnings] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    useEffect(() => {
        fetchEarnings();
    }, []);

    const fetchEarnings = async () => {
        setLoading(true);
        try {
            // Fetch completed transactions for this driver
            const { data } = await supabase
                .from('transactions')
                .select(`
          *,
          profiles (full_name),
          waste_types (name)
        `)
                .eq('status', 'done')
                .order('created_at', { ascending: false });

            if (data) {
                setTransactions(data);
                const calculatedEarnings = calculateDriverEarnings(data);
                setEarnings(calculatedEarnings);
            }
        } catch (error) {
            console.error('Error fetching earnings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        if (!transactions.length) return alert('Tidak ada data untuk diexport');

        const exportData = transactions.map(t => ({
            'Tanggal': new Date(t.created_at).toLocaleDateString('id-ID'),
            'Pelanggan': t.profiles?.full_name || '-',
            'Jenis Sampah': t.waste_types?.name || '-',
            'Berat (kg)': t.weight,
            'Total Transaksi': formatRupiah(t.total_price),
            'Komisi Driver (15%)': formatRupiah((t.total_price || 0) * 0.15),
            'Status': t.status
        }));

        const success = await exportToExcel(exportData, 'driver_earnings');
        if (success) {
            alert('Laporan berhasil diexport!');
        } else {
            alert('Gagal export laporan');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Pendapatan Driver</h2>
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
            {earnings && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Today */}
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition">
                        <div className="flex items-center justify-between mb-2">
                            <p className="opacity-90 font-medium">Hari Ini</p>
                            <Calendar size={20} className="opacity-80" />
                        </div>
                        <h3 className="text-3xl font-bold mb-1">{formatRupiah(earnings.today)}</h3>
                        <p className="text-sm opacity-80">Komisi hari ini</p>
                    </div>

                    {/* This Week */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-500 font-medium">Minggu Ini</p>
                            <TrendingUp size={20} className="text-blue-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-1">{formatRupiah(earnings.thisWeek)}</h3>
                        <p className="text-sm text-gray-500">7 hari terakhir</p>
                    </div>

                    {/* This Month */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-500 font-medium">Bulan Ini</p>
                            <Wallet size={20} className="text-purple-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-1">{formatRupiah(earnings.thisMonth)}</h3>
                        <p className="text-sm text-gray-500">Periode bulan ini</p>
                    </div>

                    {/* Total All Time */}
                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition">
                        <div className="flex items-center justify-between mb-2">
                            <p className="opacity-90 font-medium">Total Keseluruhan</p>
                            <Trophy size={20} className="opacity-80" />
                        </div>
                        <h3 className="text-3xl font-bold mb-1">{formatRupiah(earnings.total)}</h3>
                        <p className="text-sm opacity-80">{earnings.transactionCount} transaksi</p>
                    </div>
                </div>
            )}

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Package size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Pickup</p>
                            <p className="text-2xl font-bold text-gray-800">{earnings?.transactionCount || 0}</p>
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
                                {earnings && earnings.transactionCount > 0
                                    ? formatRupiah(earnings.total / earnings.transactionCount)
                                    : formatRupiah(0)
                                }
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
                                {transactions.filter(t => {
                                    const today = new Date().toDateString();
                                    return new Date(t.created_at).toDateString() === today;
                                }).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp size={22} /> Riwayat Transaksi & Komisi
                </h3>

                {transactions.length === 0 ? (
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
                                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Jenis Sampah</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Berat</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Total</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Komisi (15%)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transactions.slice(0, 20).map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {new Date(t.created_at).toLocaleDateString('id-ID')}
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
}
