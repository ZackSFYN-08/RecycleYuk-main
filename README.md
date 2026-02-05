# RecycleYuk - Smart Waste Management System

RecycleYuk adalah platform manajemen sampah pintar yang menghubungkan Warga, Driver Pengangkut, RT/RW, dan Admin untuk menciptakan lingkungan yang lebih bersih dan efisien.

## 🚀 Cara Install & Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda:

### Prasyarat
- **Node.js**: Pastikan Node.js (v18 atau terbaru) sudah terinstall.
- **Git**: Untuk clone repository.
- **Supabase Account**: Untuk backend database dan authentication.

### Instalasi

1.  **Clone Repository**
    ```bash
    git clone https://github.com/username/RecycleYuk.git
    cd RecycleYuk
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Konfigurasi Environment Variables**
    Buat file `.env.local` di root folder dan tambahkan konfigurasi berikut (sesuaikan dengan kredensial Supabase Anda):
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
    ```
    *(Pastikan database Supabase sudah memiliki tabel `profiles`, `transactions`, `drivers`, `areas`, `notifications`, `complaints`, dan bucket storage `avatars`)*

4.  **Jalankan Development Server**
    ```bash
    npm run dev
    ```

5.  **Buka Aplikasi**
    Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## ✨ Fitur-Fitur Utama

### 1. 👥 User (Warga)
- **Dashboard Interaktif**: Ringkasan poin reward, berat sampah total, dan status penjemputan.
- **Request Pickup**: Buat permintaan jemput sampah dengan deteksi lokasi otomatis.
- **Riwayat Transaksi**: Lihat histori penjemputan, status (Pending, Process, Done), dan total pembayaran.
- **Profil & Avatar**: Edit profil dan upload foto profil custom.
- **Notifikasi**: Status order dan informasi penting dari sistem.

### 2. 🚛 Driver Pengangkut
- **Real-time GPS Tracking**: Lacak lokasi driver saat ini dan perbarui di peta.
- **Manajemen Tugas**:
    - **Tab Pending**: Lihat order baru di wilayah kerja (RW) yang ditugaskan.
    - **Tab Proses**: Tugas yang sedang dikerjakan.
- **Peta Interaktif (OpenLayers)**: Visualisasi lokasi penjemputan dan rute perjalanan.
- **Status Kerja**: Toggle status On Duty / Off Duty.
- **Verifikasi Kendaraan**: Input plat nomor kendaraan saat registrasi.
- **Pendapatan**: Hitung dan lihat total pendapatan dari tugas yang selesai.
- **Komunikasi**: Tombol cepat untuk WhatsApp atau Telepon warga.

### 3. 🛡️ Admin
- **Dashboard Monitoring**: Pantau total user, pickup aktif, laporan baru, dan keuangan.
- **Manajemen User & Driver**:
    - Kelola data warga.
    - Verifikasi pendaftaran driver baru.
    - Assign driver ke wilayah tertentu.
- **Manajemen Wilayah**: Tambah dan edit data RT/RW beserta penanggung jawabnya.
- **Pengaturan Sistem**: Atur tarif per kg dan jam operasional.
- **Laporan & Export**: Filter laporan (harian/bulanan) dan export data ke Excel.

### 4. 🏘️ Kepala RT/RW
- **Monitoring Wilayah**: Pantau aktivitas sampah warga di lingkup RT/RW.
- **Pusat Pengaduan**:
    - Terima keluhan warga.
    - Kirim tanggapan resmi.
- **Analitik Sampah**: Grafik tren sampah bulanan di wilayahnya.
- **Laporan Khusus**: List transaksi warga spesifik untuk RT/RW tersebut.

### 5. 🔐 Fitur Keamanan & Teknis
- **Role-Based Access Control**: Login diverifikasi berdasarkan role (User, Driver, Admin, RT/RW).
- **Supabase Storage**: Penyimpanan aman untuk foto profil (Avatar).
- **Enkripsi**: Password handling via Supabase Auth.
- **Responsive Design**: Tampilan optimal di Desktop dan Mobile.
