# Pick Up - User Flow & Navigation

## App Entry Flow

```
App Launch
  |
  v
Splash Screen (1.5s, logo + tagline)
  |
  v
[Cek Auth State]
  |
  +-- Belum login --> Onboarding (3 slides) --> Login/Register
  |
  +-- Sudah login --> Home Screen
```

## Onboarding Flow

```
Slide 1: "Pesan Ride Kapanpun"    (ilustrasi motor/car)
Slide 2: "Kirim Barang Mudah"     (ilustrasi paket)
Slide 3: "Pesan Makanan Favorit"  (ilustrasi makanan)
  |
  v
[Mulai] Button --> Login Screen
```

## Authentication Flow

```
Login Screen
  |
  +-- Input nomor HP --> Send OTP --> Verify OTP
  |     |
  |     +-- User baru --> Setup Profile (nama, foto) --> Home
  |     +-- User lama --> Home
  |
  +-- Google Sign-In --> [Cek existing] --> Home / Setup Profile
  +-- Apple Sign-In  --> [Cek existing] --> Home / Setup Profile
```

## Main Navigation (Bottom Tab)

```
[Home]  [Activity]  [Payment]  [Chat]  [Account]
  |        |           |         |        |
  v        v           v         v        v
Home    Order       PickPay   Chat     Profile
Screen  History     Wallet    List     Settings
```

## Home Screen Layout

```
+----------------------------------+
| [=] Pick Up            [Bell] [Q]|  <- Hamburger, Notif, QR scan
+----------------------------------+
| [Search: Mau kemana?           ] |  <- Search bar
+----------------------------------+
|                                  |
| [PickRide] [PickSend] [PickFood]|  <- Service grid
| [PickMart] [PickPay]  [More..] |
|                                  |
+----------------------------------+
| [ ====  Promo Banner  ==== ]    |  <- Carousel
| [  o     o     .     o    ]     |
+----------------------------------+
|                                  |
| Terakhir Dipesan                 |
| [Kantor - Jl. Sudirman]   [>]   |
| [Rumah - Jl. Merdeka]     [>]   |
|                                  |
+----------------------------------+
| Restoran Terdekat                |
| [Card] [Card] [Card] -->        |  <- Horizontal scroll
+----------------------------------+
```

## PickRide Flow

```
Home -> Tap Search / PickRide
  |
  v
+----------------------------------+
| Lokasi Jemput: [GPS auto]       |
| Tujuan: [Input alamat]          |
+----------------------------------+
| Suggestions / Recent / Saved     |
+----------------------------------+
  |
  v (setelah input tujuan)
+----------------------------------+
| [Map dengan route]               |
|                                  |
|  A -------- route -------- B    |
|                                  |
+----------------------------------+
| PickRide Motor    Rp 15.000  [v]|
| PickRide Car      Rp 35.000     |
| PickRide Premium  Rp 55.000     |
+----------------------------------+
| [Cash v]     [Pesan PickRide]   |
+----------------------------------+
  |
  v (tap Pesan)
+----------------------------------+
| Mencari driver...                |
| [Animasi searching]              |
|                                  |
| [Batalkan]                       |
+----------------------------------+
  |
  v (driver ditemukan)
+----------------------------------+
| [Map tracking real-time]         |
|                                  |
+----------------------------------+
| [Foto] Ahmad - B 1234 XY        |
| Honda Vario - Hitam              |
| Rating: 4.9                      |
+----------------------------------+
| [Chat]  [Call]  [Share]  [SOS]  |
+----------------------------------+
  |
  v (sampai tujuan)
+----------------------------------+
| Perjalanan Selesai!              |
|                                  |
| Total: Rp 15.000                |
|                                  |
| Beri Rating:                     |
| [1] [2] [3] [4] [5]            |
|                                  |
| Tip untuk driver?                |
| [Rp5k] [Rp10k] [Rp20k]        |
|                                  |
| [Selesai]                        |
+----------------------------------+
```

## PickFood Flow

```
Home -> Tap PickFood
  |
  v
+----------------------------------+
| [Search makanan / restoran]      |
+----------------------------------+
| Kategori: [Semua] [Promo] [Near]|
|           [Nasi] [Mie] [Snack] |
+----------------------------------+
| [Restoran Card + foto + rating] |
| [Restoran Card + foto + rating] |
| [...]                            |
+----------------------------------+
  |
  v (tap restoran)
+----------------------------------+
| [Hero Image Restoran]            |
| Nama Restoran                    |
| 4.8 | 2.3 km | 25-35 min        |
+----------------------------------+
| Menu Populer                     |
| [Item] [Item] [Item]            |
+----------------------------------+
| Semua Menu                       |
| [Nama Item]    [+] Rp 25.000   |
| [Nama Item]    [+] Rp 18.000   |
+----------------------------------+
| [Keranjang: 2 item - Rp 43.000] |
+----------------------------------+
  |
  v (tap keranjang)
+----------------------------------+
| Pesanan Kamu                     |
| [Item 1]  [-] 1 [+]  Rp 25.000 |
| [Item 2]  [-] 1 [+]  Rp 18.000 |
+----------------------------------+
| Catatan: [optional]              |
+----------------------------------+
| Alamat: [Rumah - Jl. Merdeka]   |
+----------------------------------+
| Subtotal       Rp 43.000        |
| Ongkir         Rp  8.000        |
| Total          Rp 51.000        |
+----------------------------------+
| [Cash v]    [Pesan Sekarang]    |
+----------------------------------+
  |
  v (tracking)
+----------------------------------+
| Status: Sedang disiapkan...      |
| [===========...........]         |
| Disiapkan > Dijemput > Diantar  |
+----------------------------------+
| [Map tracking driver]            |
+----------------------------------+
| Driver: Ahmad                    |
| [Chat] [Call]                    |
+----------------------------------+
```

## Payment (PickPay) Flow

```
Tab Payment
  |
  v
+----------------------------------+
| PickPay                          |
| Saldo: Rp 150.000               |
| [Top Up]  [Transfer]  [QR Pay] |
+----------------------------------+
| Riwayat Transaksi                |
| [PickRide - Rp 15.000]   Hari ini|
| [PickFood - Rp 51.000]   Kemarin|
| [Top Up + Rp 100.000]   20 Apr |
+----------------------------------+
```
