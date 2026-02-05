'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  Recycle, ArrowLeft, User, CreditCard, MapPin,
  Mail, Lock, Eye, EyeOff, ArrowRight, Truck, Crown, Home
} from 'lucide-react';
import Swal from 'sweetalert2';

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    alamat: '',
    rt: '',
    rw: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [role, setRole] = useState('user'); // Default role: Warga
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- VALIDASI INPUT ---
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan Konfirmasi tidak sama!"); setLoading(false); return;
    }
    if (formData.nik.length !== 16 || isNaN(formData.nik)) {
      setError("NIK harus 16 digit angka!"); setLoading(false); return;
    }
    // Validasi RT/RW wajib diisi (kecuali Driver & Admin, opsional)
    if ((role === 'user' || role === 'rt') && (!formData.rt || !formData.rw)) {
      setError("RT dan RW wajib diisi!"); setLoading(false); return;
    }

    try {
      // 1. Daftar ke Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.nama, role: role },
        },
      });

      if (authError) throw new Error(authError.message);

      if (authData?.user) {
        // 2. Simpan Data Profil (termasuk Role & RT/RW)
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            full_name: formData.nama,
            nik: formData.nik,
            address: formData.alamat,
            email: formData.email,
            role: role,        // Simpan Role
            rt: formData.rt,   // Simpan RT
            rw: formData.rw,   // Simpan RW
            updated_at: new Date().toISOString()
          },
            { onConflict: 'id' }
          );

        if (profileError) throw new Error("Gagal simpan profil: " + profileError.message);

        // 3. Khusus Driver: Tambahkan ke tabel drivers (untuk status aktif/nonaktif)
        if (role === 'driver') {
          await supabase.from('drivers').insert({
            id: authData.user.id,
            name: formData.nama,
            status: 'Off Duty',
            vehicle: '-'
          });
        }

        // 4. Sukses -> Redirect ke Login
        Swal.fire({
          title: 'Registrasi Berhasil!',
          text: `Akun ${role === 'rt' ? 'Ketua RT' : role === 'driver' ? 'Driver' : 'Warga'} berhasil dibuat.`,
          icon: 'success',
          confirmButtonColor: '#10B981'
        }).then((res) => {
          if (res.isConfirmed) router.push('/login');
        });
      }

    } catch (err) {
      let msg = err.message;
      if (msg.includes("already registered")) msg = "Email sudah terdaftar. Silakan login.";
      setError(msg);
      Swal.fire({ title: 'Gagal', text: msg, icon: 'error', confirmButtonColor: '#EF4444' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-teal-200 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center flex flex-col items-center">
            <div className="mb-4 bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-inner inline-block">
              <img src="/images/logo.png" alt="RecycleYuk Logo" className="h-20 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-green-50 text-sm font-medium tracking-wide">Daftar Akun Baru</p>
          </div>

          <div className="p-8">
            <button onClick={() => router.push('/login')} className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-bold"><ArrowLeft size={16} /> Kembali ke Login</button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pilih Peran</h2>
            <p className="text-gray-600 mb-6 text-sm">Daftar sesuai peran Anda di lingkungan.</p>

            {/* TABS PILIHAN ROLE */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {[
                { id: 'user', label: 'Warga', icon: User },
                { id: 'driver', label: 'Driver', icon: Truck },
                { id: 'rt', label: 'Ketua RT', icon: Crown }
              ].map((r) => (
                <button key={r.id} type="button" onClick={() => setRole(r.id)} className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${role === r.id ? 'border-green-500 bg-green-50 text-green-700 shadow-md transform scale-105' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                  <r.icon className={`w-6 h-6 mb-2 ${role === r.id ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="text-sm font-bold">{r.label}</span>
                </button>
              ))}
            </div>

            {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2"><span className="font-bold">!</span> {error}</div>}

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <div className="relative"><User className="absolute left-3 top-3 text-gray-400" size={20} /><input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800" placeholder="Nama Lengkap" required /></div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                <div className="relative"><CreditCard className="absolute left-3 top-3 text-gray-400" size={20} /><input type="text" name="nik" value={formData.nik} onChange={(e) => { if (/^\d*$/.test(e.target.value) && e.target.value.length <= 16) handleChange(e) }} className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800" placeholder="16 Digit NIK" required /></div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <div className="relative"><MapPin className="absolute left-3 top-4 text-gray-400" size={20} /><textarea name="alamat" value={formData.alamat} onChange={handleChange} rows="2" className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none text-gray-800" placeholder="Jalan, No Rumah" required></textarea></div>
              </div>

              {/* INPUT RT & RW (Hanya muncul jika bukan Driver) */}
              {(role === 'user' || role === 'rt') && (
                <div className="grid grid-cols-2 gap-4 bg-green-50 p-4 rounded-xl border border-green-100">
                  <div>
                    <label className="block text-sm font-bold text-green-800 mb-1">RT</label>
                    <div className="relative"><Home className="absolute left-3 top-3 text-green-600" size={18} /><input type="text" name="rt" value={formData.rt} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800" placeholder="001" /></div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-green-800 mb-1">RW</label>
                    <div className="relative"><Home className="absolute left-3 top-3 text-green-600" size={18} /><input type="text" name="rw" value={formData.rw} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800" placeholder="005" /></div>
                  </div>
                </div>
              )}

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative"><Mail className="absolute left-3 top-3 text-gray-400" size={20} /><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800" placeholder="email@contoh.com" required /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative"><Lock className="absolute left-3 top-3 text-gray-400" size={20} /><input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800" placeholder="Min 8 karakter" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button></div>
                </div>
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi</label>
                  <div className="relative"><Lock className="absolute left-3 top-3 text-gray-400" size={20} /><input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800" placeholder="Ulangi password" required /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400">{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button></div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-lg font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-70">
                {loading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Memproses...</span></> : <>Daftar Sekarang <ArrowRight size={20} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}