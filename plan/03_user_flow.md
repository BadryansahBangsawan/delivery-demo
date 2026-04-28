# DELIVRY - User Flow & Navigation

## App Entry Flow

```
App Launch
  |
  v
Splash Screen (1.5s, logo DELIVRY + tagline)
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
Slide 1: "Move Anything Anytime"      (ilustrasi motor/delivery)
Slide 2: "Kirim Barang Tanpa Ribet"   (ilustrasi paket)
Slide 3: "Pesan Makanan Favorit"      (ilustrasi makanan)
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
[Beranda]  [Pesanan]  [Dompet]  [Chat]  [Akun]
    |          |          |        |       |
    v          v          v        v       v
  Home      Order     DELIVRY    Chat   Profile
  Screen    History    Pay       List   Settings
```

## Home Screen Layout

```
+----------------------------------+
| DELIVRY                [Bell] [Q]|  <- Logo, Notif, QR scan
+----------------------------------+
| Hai, Andi 👋                     |
| Mau ke mana hari ini?            |
+----------------------------------+
| [Search: Cari tujuan...        ] |  <- Search bar
+----------------------------------+
| [   DELIVRY Promo Banner      ] |  <- Banner brand
+----------------------------------+
| Layanan kami          Lihat semua|
| [Ride] [Car] [Delivery] [Food] |  <- Service grid
| [Send] [Package] [Mart] [More] |
+----------------------------------+
| Promo untukmu         Lihat semua|
| [ ====  Promo Banner  ==== ]    |  <- Carousel
| [  o     o     .     o    ]     |
+----------------------------------+
| Terakhir Dipesan                 |
| [Kantor - Jl. Sudirman]    [>] |
| [Rumah - Jl. Merdeka]      [>] |
+----------------------------------+
```

## Ride Flow

```
Home -> Tap Search / Ride
  |
  v
+----------------------------------+
| Lokasi penjemputan               |
| [Jl. Sudirman No. 10      ]     |
| Tujuan                           |
| [Mall Kota Kasablanka      ]    |
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
| Layanan                          |
| Ride                        >   |
|   Ride   1-4 menit              |
+----------------------------------+
| Metode pembayaran                |
| DELIVRY Pay                      |
| Saldo: Rp120.000           >    |
+----------------------------------+
| [     Pesan sekarang       ]    |  <- Purple CTA
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

## Food Flow

```
Home -> Tap Food
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

## Payment (DELIVRY Pay) Flow

```
Tab Dompet
  |
  v
+----------------------------------+
| DELIVRY Pay                      |
| Saldo: Rp 150.000               |
| [Top Up]  [Transfer]  [QR Pay] |
+----------------------------------+
| Riwayat Transaksi                |
| [Ride - Rp 15.000]      Hari ini|
| [Food - Rp 51.000]      Kemarin|
| [Top Up + Rp 100.000]   20 Apr |
+----------------------------------+
```
