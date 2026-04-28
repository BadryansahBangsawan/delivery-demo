# Pick Up - Features & Services

## Core Services

### 1. PickRide (Transportasi)
- **Motor** - Ojek online
- **Car** - Taksi online (standar & premium)
- Fitur: estimasi harga, pilih metode pembayaran, share trip, SOS button

### 2. PickSend (Pengiriman Barang)
- Kirim barang antar lokasi dalam kota
- Pilih ukuran paket (kecil/sedang/besar)
- Foto barang sebelum dikirim
- Real-time tracking

### 3. PickFood (Pesan Makanan)
- Browse restoran terdekat
- Menu & harga
- Promo/diskon
- Real-time tracking pesanan
- Rating & review restoran

### 4. PickMart (Belanja Kebutuhan)
- Groceries, minimarket, apotek
- Kategori produk
- Search & filter

### 5. PickService (Jasa) - Phase 2
- Cleaning, tukang, laundry
- Booking jadwal
- Rating & review

---

## User Features

### Authentication
- Login via nomor HP (OTP)
- Login via Google / Apple Sign-In
- Profile setup (nama, foto, email)

### Home
- Search bar (kemana tujuan?)
- Service grid (PickRide, PickSend, PickFood, PickMart)
- Banner promo (carousel)
- Terakhir dipesan / favorit
- Rekomendasi restoran terdekat

### Booking Flow (PickRide)
1. Input lokasi jemput (auto-detect GPS)
2. Input lokasi tujuan
3. Pilih tipe kendaraan (motor/car)
4. Lihat estimasi harga & waktu
5. Pilih metode pembayaran
6. Konfirmasi & cari driver
7. Driver ditemukan - lihat info driver
8. Real-time tracking
9. Sampai tujuan - pembayaran
10. Rating & tip driver

### Booking Flow (PickFood)
1. Browse/search restoran
2. Lihat menu restoran
3. Tambah item ke keranjang
4. Review pesanan & alamat
5. Pilih metode pembayaran
6. Konfirmasi pesanan
7. Tracking (disiapkan -> dijemput driver -> dalam perjalanan -> sampai)
8. Rating restoran & driver

### Payment
- PickPay (e-wallet internal)
  - Top up via bank transfer, e-wallet lain
  - QR payment
  - Transfer antar user
- Cash
- Kartu debit/kredit

### Activity / Order History
- Ongoing orders (real-time)
- Completed orders
- Cancelled orders
- Detail & receipt setiap order

### Chat & Communication
- In-app chat dengan driver
- Pre-set quick messages
- Voice call (via VoIP atau redirect)

### Notifications
- Push notification (order status, promo)
- In-app notification center

### Profile & Settings
- Edit profile
- Alamat tersimpan (rumah, kantor, custom)
- Metode pembayaran
- Voucher & promo
- Pengaturan (bahasa, notifikasi, dark mode)
- Bantuan & FAQ
- Kebijakan privasi
- Logout

---

## Driver/Merchant Side (Phase 2)
- Terpisah di app berbeda atau mode toggle
- Accept/reject order
- Navigation ke lokasi
- Chat dengan customer
- Earnings dashboard
