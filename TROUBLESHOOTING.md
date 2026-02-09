# Troubleshooting Guide - RecycleYuk

## Error: "Email Rate Limit Exceeded"

### Penyebab

Supabase membatasi jumlah email verifikasi yang dapat dikirim dalam waktu singkat untuk mencegah spam.

### Solusi

#### Untuk Development (Recommended)

1. **Disable Email Confirmation di Supabase:**
   - Buka [Supabase Dashboard](https://supabase.com/dashboard)
   - Pilih project Anda
   - Navigate ke: **Authentication** → **Settings** → **Auth Settings**
   - Scroll ke bagian **Email Auth**
   - **Disable** opsi "Enable email confirmations"
   - Klik **Save**

2. **Gunakan Email Testing:**
   - Buka **Authentication** → **Settings** → **SMTP Settings**
   - Aktifkan "Enable Custom SMTP"
   - Gunakan layanan seperti [Mailtrap](https://mailtrap.io) untuk testing

#### Untuk Production

1. **Tunggu 5-10 menit** sebelum mencoba registrasi lagi
2. **Gunakan email berbeda** untuk testing
3. **Tingkatkan rate limit:**
   - Di Supabase Dashboard → **Authentication** → **Rate Limits**
   - Sesuaikan "Email sends per hour" (default: 4)

### Alternative: Auto-Confirm Users (Development Only)

Tambahkan di Supabase SQL Editor:

```sql
-- Auto-confirm semua user baru (DEVELOPMENT ONLY!)
CREATE OR REPLACE FUNCTION public.auto_confirm_user()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE auth.users
  SET email_confirmed_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auto_confirm_user();
```

⚠️ **PERINGATAN:** Jangan gunakan auto-confirm di production!

---

## Error Lainnya

### "Email already registered"

- Email sudah terdaftar di sistem
- Gunakan fitur "Lupa Password" atau login langsung

### "Invalid email format"

- Pastikan format email valid: `nama@domain.com`
- Tidak ada spasi atau karakter khusus yang tidak diizinkan

### "Password too weak"

- Password minimal 8 karakter
- Gunakan kombinasi huruf besar, kecil, angka, dan karakter khusus
