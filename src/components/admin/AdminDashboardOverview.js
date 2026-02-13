import { memo } from 'react';
import {
  Users,
  Truck,
  Bell,
  Wallet,
  Clock,
  FileText,
  MapPin,
  Trash2,
  Settings,
  PlayCircle,
  CheckCircle2,
} from 'lucide-react';
import { formatRupiah } from '@/utils/enhancedHelpers';

function AdminDashboardOverview({
  users,
  pickups,
  notifications,
  financeStats,
  transactions,
  drivers,
  onOpenModal,
  onNavigate,
}) {
  const activePickupsCount = pickups.filter((p) => p.status !== 'Done').length;
  const unreadNotifications = notifications.filter((n) => !n.is_read).length;

  const summaryCards = [
    { label: 'Total User', value: users.length, Icon: Users, color: 'blue' },
    { label: 'Pickup Aktif', value: activePickupsCount, Icon: Truck, color: 'green' },
    { label: 'Laporan Baru', value: unreadNotifications, Icon: Bell, color: 'red' },
    { label: 'Pendapatan', value: formatRupiah(financeStats.income), Icon: Wallet, color: 'purple' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in text-gray-800">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Dashboard Admin 👋</h2>
          <p>Ringkasan aktivitas sistem RecycleYuk hari ini.</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {summaryCards.map(({ label, value, Icon, color }, index) => (
          <div
            key={label}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <p className="text-gray-500 text-sm font-medium">{label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            </div>
            <div className={`bg-${color}-50 p-3 rounded-lg text-${color}-600`}>
              <Icon size={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Clock size={18} className="text-blue-500" />
              Aktivitas Terbaru
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('reports')}
              className="text-sm text-blue-600 hover:underline"
            >
              Lihat Semua
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {transactions.slice(0, 5).map((trx) => (
              <div
                key={trx.id}
                className="p-4 hover:bg-gray-50 transition flex items-center gap-4"
              >
                <div
                  className={`p-2 rounded-full ${
                    trx.status === 'Done'
                      ? 'bg-green-100 text-green-600'
                      : trx.status === 'Process'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {trx.status === 'Done' ? (
                    <CheckCircle2 size={18} />
                  ) : trx.status === 'Process' ? (
                    <Truck size={18} />
                  ) : (
                    <Clock size={18} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">
                    {trx.status === 'Pending'
                      ? 'Permintaan Pickup Baru'
                      : trx.status === 'Process'
                      ? 'Sedang Dijemput'
                      : 'Pickup Selesai'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {trx.profiles?.full_name} • {trx.waste_types?.name} ({trx.weight} kg)
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-gray-400">
                    {new Date(trx.created_at).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="p-8 text-center text-gray-400">Belum ada aktivitas</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <PlayCircle size={18} className="text-green-500" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => onOpenModal('driver')}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-green-50 hover:text-green-700 rounded-xl transition border border-gray-100"
            >
              <div className="bg-green-100 p-2 rounded-lg text-green-700">
                <Truck size={18} />
              </div>
              <span className="font-medium text-sm">Tambah Driver Baru</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenModal('area')}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition border border-gray-100"
            >
              <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                <MapPin size={18} />
              </div>
              <span className="font-medium text-sm">Tambah Wilayah</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('pickups')}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-orange-50 hover:text-orange-700 rounded-xl transition border border-gray-100"
            >
              <div className="bg-orange-100 p-2 rounded-lg text-orange-700">
                <Trash2 size={18} />
              </div>
              <span className="font-medium text-sm">Kelola Pickup</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('settings')}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition border border-gray-100"
            >
              <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                <Settings size={18} />
              </div>
              <span className="font-medium text-sm">Pengaturan Tarif</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
            <FileText size={20} />
            Aktivitas Terbaru
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Berat</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {pickups.slice(0, 5).map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">{p.user}</td>
                    <td className="p-3 text-gray-600">{p.weightLabel}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          p.status === 'Done'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
            <MapPin size={20} />
            Status Driver
          </h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {drivers.map((d) => (
              <div
                key={d.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {d.name?.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-gray-800">{d.name}</span>
                    <br />
                    <span className="text-xs text-gray-500">{d.vehicle}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    d.status === 'On Duty'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AdminDashboardOverview);

