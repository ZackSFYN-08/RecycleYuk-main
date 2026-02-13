import { memo } from 'react';
import { Edit, Trash2 } from 'lucide-react';

function AdminDriversSection({
  drivers,
  onOpenModal,
  onDelete,
  onVerifyDriver,
}) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg text-gray-800">List Driver</h3>
        <button
          type="button"
          onClick={() => onOpenModal('driver')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex gap-2 hover:bg-green-700"
        >
          <span className="text-xl leading-none">+</span> Tambah Driver
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((d) => (
          <div
            key={d.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative group hover:shadow-md transition"
          >
            <div className="absolute top-4 right-4 flex gap-1 opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => onOpenModal('driver', d)}
                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                <Edit size={16} />
              </button>
              <button
                type="button"
                onClick={() => onDelete(d.id, 'driver')}
                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
                {d.name?.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800">{d.name}</h4>
                <p className="text-sm text-gray-500">{d.vehicle}</p>
                <div
                  className={`text-xs px-2 py-0.5 rounded-full w-fit mt-1 font-bold ${
                    d.verification_status === 'verified'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {d.verification_status === 'verified'
                    ? 'Terverifikasi'
                    : d.verification_status === 'rejected'
                    ? 'Ditolak'
                    : 'Menunggu Verifikasi'}
                </div>
              </div>
            </div>

            {d.verification_status !== 'verified' && (
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => onVerifyDriver(d.id, 'verified')}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-green-700"
                >
                  Verifikasi
                </button>
                {d.verification_status !== 'rejected' && (
                  <button
                    type="button"
                    onClick={() => onVerifyDriver(d.id, 'rejected')}
                    className="flex-1 bg-red-50 text-red-600 border border-red-200 py-2 rounded-lg text-xs font-bold hover:bg-red-100"
                  >
                    Tolak
                  </button>
                )}
              </div>
            )}

            <div className="flex justify-between items-center text-sm border-t pt-3 border-gray-100">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium">
                {d.shift}
              </span>
              <span
                className={`px-3 py-1 rounded-full font-bold ${
                  d.status === 'On Duty'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {d.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(AdminDriversSection);

