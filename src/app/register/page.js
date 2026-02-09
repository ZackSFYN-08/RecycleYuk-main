"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
  Recycle,
  ArrowLeft,
  User,
  CreditCard,
  MapPin,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Truck,
  Crown,
  Home,
} from "lucide-react";
import Swal from "sweetalert2";

// Inisialisasi Supabase
// NOTE: Untuk development, jika sering kena rate limit email:
// 1. Buka Supabase Dashboard > Authentication > Settings
// 2. Disable "Enable email confirmations"
// 3. Atau tunggu 5-10 menit antara registrasi
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    alamat: "",
    rt: "",
    rw: "",
    email: "",
    password: "",
    confirmPassword: "",
    platNomor: "",
    kelurahan: "",
  });

  const [role, setRole] = useState("user"); // Default role: Warga
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Trim whitespace dari semua input
    const cleanedData = {
      nama: formData.nama.trim(),
      nik: formData.nik.trim(),
      alamat: formData.alamat.trim(),
      rt: formData.rt.trim(),
      rw: formData.rw.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      platNomor: formData.platNomor.trim(),
      kelurahan: formData.kelurahan.trim(),
    };

    // --- VALIDASI INPUT ---
    // Validasi Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedData.email)) {
      setError("Format email tidak valid!");
      setLoading(false);
      return;
    }

    if (cleanedData.password !== cleanedData.confirmPassword) {
      setError("Password dan Konfirmasi tidak sama!");
      setLoading(false);
      return;
    }

    if (cleanedData.password.length < 8) {
      setError("Password minimal 8 karakter!");
      setLoading(false);
      return;
    }

    if (cleanedData.nik.length !== 16 || isNaN(cleanedData.nik)) {
      setError("NIK harus 16 digit angka!");
      setLoading(false);
      return;
    }

    // Validasi RT/RW wajib diisi untuk user dan rt
    if (
      (role === "user" || role === "rt") &&
      (!cleanedData.rt || !cleanedData.rw)
    ) {
      setError("RT dan RW wajib diisi!");
      setLoading(false);
      return;
    }

    try {
      // 1. Daftar ke Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanedData.email,
        password: cleanedData.password,
        options: {
          data: { full_name: cleanedData.nama, role: role },
        },
      });

      if (authError) {
        // Handle specific Supabase errors
        let errorMsg = authError.message;

        if (
          errorMsg.toLowerCase().includes("rate limit") ||
          errorMsg.toLowerCase().includes("email rate")
        ) {
          errorMsg =
            "Terlalu banyak percobaan registrasi. Silakan tunggu 5-10 menit atau hubungi admin untuk bypass verifikasi email.";
        } else if (errorMsg.includes("invalid")) {
          errorMsg = "Format email tidak valid atau sudah terdaftar";
        } else if (errorMsg.includes("already registered")) {
          errorMsg = "Email sudah terdaftar, silakan login";
        } else if (errorMsg.includes("weak password")) {
          errorMsg =
            "Password terlalu lemah. Gunakan kombinasi huruf, angka, dan karakter khusus.";
        }

        throw new Error(errorMsg);
      }

      if (authData?.user) {
        // 2. Simpan Data Profil (termasuk Role & RT/RW)
        const profilePayload = {
          id: authData.user.id,
          full_name: cleanedData.nama,
          nik: cleanedData.nik,
          address: cleanedData.alamat,
          email: cleanedData.email,
          role: role,
          rt: cleanedData.rt,
          rw: cleanedData.rw,
          kelurahan: cleanedData.kelurahan,
          updated_at: new Date().toISOString(),
        };

        // Hindari error 409 "on_conflict" dengan manual cek lalu insert/update
        const { data: existingProfile, error: selectProfileError } =
          await supabase
            .from("profiles")
            .select("id")
            .eq("id", authData.user.id)
            .maybeSingle();

        if (selectProfileError) {
          throw new Error("Gagal cek profil: " + selectProfileError.message);
        }

        let profileError;
        if (existingProfile) {
          const { error } = await supabase
            .from("profiles")
            .update(profilePayload)
            .eq("id", authData.user.id);
          profileError = error;
        } else {
          const { error } = await supabase
            .from("profiles")
            .insert(profilePayload);
          profileError = error;
        }

        if (profileError) {
          throw new Error("Gagal simpan profil: " + profileError.message);
        }

        // 3. Khusus Driver: Tambahkan ke tabel drivers (untuk status aktif/nonaktif)
        if (role === "driver") {
          await supabase.from("drivers").insert({
            id: authData.user.id,
            name: cleanedData.nama,
            status: "Off Duty",
            vehicle: "-",
            plat_nomor: cleanedData.platNomor, // Simpan Plat Nomor
            verification_status: "pending", // Default status: pending
          });
        }

        // 4. Sukses -> Redirect ke Login
        Swal.fire({
          title: "Registrasi Berhasil!",
          text: `Akun ${role === "rt" ? "Ketua RT" : role === "driver" ? "Driver" : "Warga"} berhasil dibuat.`,
          icon: "success",
          confirmButtonColor: "#10B981",
        }).then((res) => {
          if (res.isConfirmed) router.push("/login");
        });
      }
    } catch (err) {
      let msg = err.message;
      let title = "Gagal";

      // Handle specific error messages
      if (msg.includes("already registered")) {
        msg = "Email sudah terdaftar. Silakan login.";
      } else if (msg.toLowerCase().includes("rate limit")) {
        title = "Rate Limit Tercapai";
        msg =
          "Terlalu banyak percobaan registrasi dalam waktu singkat.\n\n" +
          "Solusi:\n" +
          "1. Tunggu 5-10 menit lalu coba lagi\n" +
          "2. Atau gunakan email berbeda\n" +
          "3. Hubungi admin untuk bantuan";
      } else if (msg.includes("weak password")) {
        msg =
          "Password terlalu lemah. Gunakan minimal 8 karakter dengan kombinasi huruf, angka, dan karakter khusus.";
      }

      setError(msg);
      Swal.fire({
        title: title,
        text: msg,
        icon: "error",
        confirmButtonColor: "#EF4444",
        width: "500px",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-teal-200 rounded-full opacity-20 animate-bounce"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        ></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center flex flex-col items-center">
            <div className="mb-4 bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-inner inline-block">
              <img
                src="/images/logo.png"
                alt="RecycleYuk Logo"
                className="h-20 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-green-50 text-sm font-medium tracking-wide">
              Daftar Akun Baru
            </p>
          </div>

          <div className="p-8">
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-bold"
            >
              <ArrowLeft size={16} /> Kembali ke Login
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Pilih Peran
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Daftar sesuai peran Anda di lingkungan.
            </p>

            {/* TABS PILIHAN ROLE */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {[
                { id: "user", label: "Warga", icon: User },
                { id: "driver", label: "Driver", icon: Truck },
                { id: "rt", label: "Ketua RT", icon: Crown },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${role === r.id ? "border-green-500 bg-green-50 text-green-700 shadow-md transform scale-105" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                >
                  <r.icon
                    className={`w-6 h-6 mb-2 ${role === r.id ? "text-green-600" : "text-gray-400"}`}
                  />
                  <span className="text-sm font-bold">{r.label}</span>
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
                <span className="font-bold">!</span> {error}
              </div>
            )}

            <form
              onSubmit={handleRegister}
              className="space-y-5"
              suppressHydrationWarning
            >
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
                    placeholder="Nama Lengkap"
                    autoComplete="name"
                    suppressHydrationWarning
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NIK
                </label>
                <div className="relative">
                  <CreditCard
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="nik"
                    value={formData.nik}
                    onChange={(e) => {
                      if (
                        /^\d*$/.test(e.target.value) &&
                        e.target.value.length <= 16
                      )
                        handleChange(e);
                    }}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
                    placeholder="16 Digit NIK"
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat Lengkap
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-4 text-gray-400"
                    size={20}
                  />
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    rows="2"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none text-gray-800"
                    placeholder="Jalan, No Rumah"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kelurahan
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="kelurahan"
                    value={formData.kelurahan}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
                    placeholder="Nama Kelurahan"
                    required
                  />
                </div>
              </div>

              {/* INPUT RT & RW (Muncul untuk User dan RT) */}
              {(role === "user" || role === "rt") && (
                <div className="grid grid-cols-2 gap-4 bg-green-50 p-4 rounded-xl border border-green-100">
                  <div>
                    <label className="block text-sm font-bold text-green-800 mb-1">
                      RT
                    </label>
                    <div className="relative">
                      <Home
                        className="absolute left-3 top-3 text-green-600"
                        size={18}
                      />
                      <input
                        type="text"
                        name="rt"
                        value={formData.rt}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
                        placeholder="001"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-green-800 mb-1">
                      RW
                    </label>
                    <div className="relative">
                      <Home
                        className="absolute left-3 top-3 text-green-600"
                        size={18}
                      />
                      <input
                        type="text"
                        name="rw"
                        value={formData.rw}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
                        placeholder="005"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* INPUT PLAT NOMOR (Hanya Driver) */}
              {role === "driver" && (
                <div className="relative group">
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Plat Nomor Kendaraan
                  </label>
                  <div className="relative">
                    <Truck
                      className="absolute left-3 top-3 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      name="platNomor"
                      value={formData.platNomor}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800 uppercase"
                      placeholder="D 1234 ABC"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      // Hapus whitespace dan konversi ke lowercase
                      const cleanEmail = e.target.value
                        .replace(/\s/g, "")
                        .toLowerCase();
                      setFormData({ ...formData, email: cleanEmail });
                      if (error) setError("");
                    }}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
                    placeholder="email@contoh.com"
                    autoComplete="email"
                    title="Masukkan email yang valid (contoh: nama@domain.com)"
                    suppressHydrationWarning
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-3 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
                      placeholder="Min 8 karakter"
                      minLength={8}
                      autoComplete="new-password"
                      title="Password minimal 8 karakter"
                      suppressHydrationWarning
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                      suppressHydrationWarning
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Konfirmasi
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-3 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
                      placeholder="Ulangi password"
                      minLength={8}
                      autoComplete="new-password"
                      suppressHydrationWarning
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 text-gray-400"
                      suppressHydrationWarning
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-lg font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                suppressHydrationWarning
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    Daftar Sekarang <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
