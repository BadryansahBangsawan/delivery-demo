# Pick Up — Android Accessibility Plan

> Referensi utama: https://developer.android.com/design/ui/mobile/guides/foundations/accessibility  
> Dokumen ini melengkapi `09_ios_hig.md` agar implementasi Flutter tetap native-feel dan aksesibel di Android.

---

## 0. Tujuan

Menetapkan baseline aksesibilitas Android untuk seluruh UI Pick Up, terutama komponen hasil Sprint 1 (Auth & Home), supaya:

- bisa dipakai dengan TalkBack dan fitur aksesibilitas Android lain,
- tetap terbaca di berbagai ukuran teks,
- tetap mudah ditap untuk pengguna dengan keterbatasan motorik.

---

## 1. Aturan Wajib (Android Foundations)

### 1.1 Vision

- Ukuran font harus dalam skala yang bisa membesar (respect text scaling).
- Body text jangan di bawah **12sp**.
- Kontras teks vs background minimum **4.5:1**.
- Kontras non-text (ikon, garis, state indicator) minimum **3:1**.
- Jangan pakai warna sebagai satu-satunya indikator status (tambahkan ikon/label).

### 1.2 Sound / Screen Reader

- Semua icon/image yang punya fungsi wajib punya label aksesibilitas.
- Elemen dekoratif harus disembunyikan dari screen reader.
- Struktur heading dan urutan baca harus jelas per section.

### 1.3 Motor Skill

- Semua target sentuh minimum **48dp x 48dp**.
- Jangan gesture-only; selalu sediakan aksi alternatif berbasis tombol.
- Tambahkan feedback (visual + haptic ringan) untuk aksi penting.

---

## 2. Mapping ke Komponen Pick Up

### 2.1 Core Widgets

| Komponen | Rule A11y Android | Implementasi |
|---|---|---|
| `pickup_button.dart` | min tinggi 48dp (spec kita 52px), label jelas | Tetap 52 untuk konsistensi brand |
| `pickup_text_field.dart` | label + helper + error text terbaca screen reader | Integrasi `flutter_form_builder` + semantics label |
| `pickup_card.dart` | jika card tappable, area tap full card minimal 48dp | Gunakan `InkWell`/tap wrapper dengan semantics |
| `pickup_app_bar.dart` | action icon wajib label | Back, notif, QR harus punya semantics label |

### 2.2 Komponen `shadcn_ui` yang Direkomendasikan

| Kebutuhan | `shadcn_ui` | Catatan Aksesibilitas |
|---|---|---|
| CTA / aksi utama | `ShadButton` | Pastikan label teks deskriptif, bukan hanya ikon |
| Input form | `ShadInput` | Hubungkan ke validator + helper text |
| Card status | `ShadCard` | Jika clickable, beri hint aksi |
| Badge status | `ShadBadge` | Tambahkan teks status, jangan warna-only |
| Tab Activity | `ShadTabs` | Label tab singkat dan jelas |
| Dialog/sheet konfirmasi | `ShadDialog`, `ShadSheet` | Fokus awal ke judul/aksi utama |
| Skeleton loading | `ShadSkeleton` | Jangan dibaca screen reader sebagai konten real |

---

## 3. Mapping ke Screen Sprint 1 (Auth & Home)

### 3.1 Auth

- **Splash**: elemen animasi dekoratif jangan jadi noise untuk TalkBack.
- **Onboarding**: setiap slide punya judul + deskripsi terstruktur, indikator slide tetap bisa dipahami (mis. "Slide 1 dari 3").
- **Login**: field nomor HP punya label jelas; tombol social login wajib label lengkap.
- **OTP**: input 6 digit tetap bisa dipakai keyboard/switch access; timer & resend punya status teks.
- **Setup Profile**: pesan error validasi harus terbaca screen reader.

### 3.2 Home

- **Service Grid**: tiap item service harus announce nama service + aksi (mis. "PickRide, tombol").
- **Promo Banner**: auto-scroll harus tetap bisa dihentikan/dikontrol user.
- **Recent Orders / Nearby Restaurants**: item list announce ringkas (nama, status/rating, jarak).
- **Bottom Nav (5 tab)**: state tab aktif harus jelas (bukan warna saja).

---

## 4. Dependency Baseline yang Dipakai

Paket yang diprioritaskan sesuai instruksi:

```yaml
go_router: ^latest
flutter_riverpod: ^latest
shadcn_ui: ^latest
flutter_form_builder: ^latest
cached_network_image: ^latest
flutter_svg: ^latest
lottie: ^latest
fl_chart: ^latest
```

Tambahan stack yang sudah dipakai tetap berlaku (`flutter_bloc`, `dio`, `firebase_*`, `google_maps_flutter`, `flutter_secure_storage`, dll).

---

## 5. Test Checklist (Wajib per Sprint)

- [ ] Jalankan TalkBack dan cek seluruh flow auth + home tanpa layar visual.
- [ ] Cek semua tap target interaktif >= 48dp.
- [ ] Verifikasi kontras teks/ikon terhadap background (4.5:1 dan 3:1).
- [ ] Pastikan tiap icon button punya semantics label.
- [ ] Pastikan gesture-only action punya tombol alternatif.
- [ ] Cek text scale besar tidak merusak layout utama.

---

## 6. Definition of Done (A11y Android)

Satu screen dianggap selesai hanya jika:

1. Flow utama bisa diselesaikan pakai TalkBack.
2. Tidak ada elemen interaktif dengan tap target < 48dp.
3. Tidak ada informasi penting yang hanya disampaikan lewat warna.
4. Kontras teks dan elemen visual lolos baseline.

Jika salah satu gagal, screen belum masuk status done meskipun fitur berfungsi.
