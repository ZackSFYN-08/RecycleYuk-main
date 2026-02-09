# Setup Tabel `waste_types` di Supabase

Dokumen ini berisi SQL dan langkah singkat untuk membuat & mengisi tabel `waste_types` yang dipakai dropdown "Jenis Sampah" di halaman Request Pickup.

## 1. Struktur Tabel

Tabel ini dipakai di beberapa halaman:

- Dashboard User (request pickup, riwayat)
- Dashboard Driver
- Dashboard RT/RW & Admin

Kolom yang dipakai aplikasi:

- `id` → primary key, direferensikan oleh `transactions.waste_type_id`
- `name` → nama jenis sampah (misal: Plastik, Kertas)
- `price_per_kg` → harga per kg untuk perhitungan total transaksi

Jalankan SQL berikut di **Supabase SQL Editor**:

```sql
-- 1) Buat tabel waste_types
create table if not exists public.waste_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price_per_kg numeric(12,2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2) Trigger untuk auto-update updated_at
create or replace function public.set_current_timestamp_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_waste_types_updated_at
before update on public.waste_types
for each row
execute function public.set_current_timestamp_updated_at();

-- 3) Aktifkan Row Level Security
alter table public.waste_types enable row level security;

-- 4) Policy: izinkan semua user yang sudah login untuk membaca data
create policy "Allow authenticated read waste_types"
  on public.waste_types
  for select
  to authenticated
  using (true);
```

> Catatan: Jika kamu ingin `waste_types` juga bisa dibaca tanpa login (public), bisa tambah policy untuk role `anon` juga.

## 2. Data Awal (Seed)

Agar dropdown "Jenis Sampah" terisi, tambahkan beberapa data default:

```sql
insert into public.waste_types (name, description, price_per_kg) values
  ('Plastik', 'Sampah plastik rumah tangga (botol, kantong, dsb.)', 1500),
  ('Kertas', 'Kertas, kardus, dan sejenisnya', 1000),
  ('Logam', 'Kaleng, besi bekas, dan logam lain', 3000),
  ('Kaca', 'Botol kaca dan pecahan kaca yang aman dikemas', 1200),
  ('Organik', 'Sisa makanan & daun kering (jika layanan mendukung)', 500);
```

Kamu bisa menyesuaikan harga sesuai kebutuhan.

## 3. Langkah Eksekusi di Supabase

1. Buka **Supabase Dashboard** → pilih project kamu.
2. Di sidebar kiri, klik **SQL** → **SQL Editor**.
3. Klik **New query**.
4. Copy–paste blok SQL di bagian **1. Struktur Tabel** ke editor, lalu klik **Run**.
5. Setelah sukses, copy–paste blok SQL di bagian **2. Data Awal (Seed)**, lalu klik **Run** lagi.
6. Buka **Table Editor** → pilih tabel **waste_types** dan pastikan data sudah muncul.
7. Reload halaman `/dashboard/user` → dropdown "Jenis Sampah" seharusnya sudah menampilkan opsi sampah.

## 4. Relasi dengan Tabel Lain

Aplikasi menggunakan relasi berikut (secara logis, walaupun foreign key bisa opsional):

- `transactions.waste_type_id` → mengarah ke `waste_types.id`.

Jika ingin menambah foreign key secara eksplisit:

```sql
alter table public.transactions
  add constraint transactions_waste_type_id_fkey
  foreign key (waste_type_id)
  references public.waste_types(id)
  on update cascade
  on delete restrict;
```

Pastikan kolom `waste_type_id` sudah ada di tabel `transactions` sebelum menjalankan perintah ini.
