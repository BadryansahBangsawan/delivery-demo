# DELIVRY — Android Accessibility Plan

> Referensi utama: https://developer.android.com/design/ui/mobile/guides/foundations/accessibility
> Dokumen ini melengkapi `09_ios_hig.md` agar implementasi React Native tetap native-feel dan aksesibel di Android.

---

## 0. Tujuan

Menetapkan baseline aksesibilitas Android untuk seluruh UI DELIVRY, supaya:

- bisa dipakai dengan TalkBack dan fitur aksesibilitas Android lain,
- tetap terbaca di berbagai ukuran teks,
- tetap mudah ditap untuk pengguna dengan keterbatasan motorik.

---

## 1. Aturan Wajib (Android Foundations)

### 1.1 Vision

- Ukuran font harus dalam skala yang bisa membesar (`allowFontScaling={true}`).
- Body text jangan di bawah **12px**.
- Kontras teks vs background minimum **4.5:1**.
- Kontras non-text (ikon, garis, state indicator) minimum **3:1**.
- Jangan pakai warna sebagai satu-satunya indikator status (tambahkan ikon/label).
- Purple (#7B2FF2) on White = ~5.8:1 ✅ PASS

### 1.2 Sound / Screen Reader

- Semua icon/image yang punya fungsi wajib punya `accessibilityLabel`.
- Elemen dekoratif harus set `accessible={false}` atau `importantForAccessibility="no"`.
- Struktur heading dan urutan baca harus jelas per section.
- Gunakan `accessibilityRole` yang tepat (button, header, link, etc.)

### 1.3 Motor Skill

- Semua target sentuh minimum **48dp x 48dp**.
- Jangan gesture-only; selalu sediakan aksi alternatif berbasis tombol.
- Tambahkan feedback (visual + haptic ringan) untuk aksi penting.

---

## 2. Mapping ke Komponen DELIVRY

### 2.1 Core Components (`src/components/ui/`)

| Komponen | Rule A11y Android | Implementasi |
|---|---|---|
| `Button.tsx` | min height 48dp (spec kita 52px), label jelas | `accessibilityRole="button"` + label |
| `Input.tsx` | label + helper + error text terbaca screen reader | `accessibilityLabel` + `accessibilityHint` |
| `Card.tsx` | jika card tappable, area tap full card minimal 48dp | `accessible={true}` + `accessibilityRole="button"` |
| Header components | action icon wajib label | Back, notif, QR harus punya `accessibilityLabel` |

### 2.2 React Native Accessibility Props

```tsx
// Contoh button accessible
<TouchableOpacity
  accessibilityRole="button"
  accessibilityLabel="Pesan Ride sekarang"
  accessibilityState={{ disabled: isLoading }}
  onPress={handlePress}
>
  <Text>Pesan Sekarang</Text>
</TouchableOpacity>

// Contoh heading
<Text accessibilityRole="header">Layanan Kami</Text>

// Contoh decorative image
<Image
  source={decorativeImage}
  accessible={false}
  importantForAccessibility="no"
/>
```

---

## 3. Mapping ke Screen Sprint 1 (Auth & Home)

### 3.1 Auth

- **Splash**: elemen animasi dekoratif jangan jadi noise untuk TalkBack (`accessible={false}`).
- **Onboarding**: setiap slide punya judul + deskripsi, indikator slide announce "Slide 1 dari 3".
- **Login**: field nomor HP punya label jelas; tombol social login wajib label lengkap ("Masuk dengan Google").
- **OTP**: input 6 digit tetap bisa dipakai keyboard; timer & resend punya status teks.
- **Setup Profile**: pesan error validasi harus terbaca screen reader via `accessibilityLiveRegion="polite"`.

### 3.2 Home

- **Service Grid**: tiap item service harus announce nama service + aksi ("Ride, tombol").
- **Promo Banner**: auto-scroll harus bisa dihentikan; announce konten promo saat fokus.
- **Recent Orders / Nearby Restaurants**: item list announce ringkas (nama, status/rating, jarak).
- **Bottom Nav (5 tab)**: state tab aktif harus jelas — `accessibilityState={{ selected: true }}`.

---

## 4. Dependency & Tools

### Testing Tools
- **Accessibility Scanner** (Android app) — scan UI untuk issues
- **TalkBack** — screen reader testing
- React Native Accessibility Inspector (Flipper plugin)

### Useful Libraries
- `react-native-haptic-feedback` — haptic feedback
- `react-native-permissions` — permission handling
- Built-in React Native accessibility props (no extra library needed)

---

## 5. Test Checklist (Wajib per Sprint)

- [ ] Jalankan TalkBack dan cek seluruh flow tanpa melihat layar.
- [ ] Cek semua tap target interaktif >= 48dp.
- [ ] Verifikasi kontras teks/ikon terhadap background (4.5:1 dan 3:1).
- [ ] Pastikan tiap icon button punya `accessibilityLabel`.
- [ ] Pastikan gesture-only action punya tombol alternatif.
- [ ] Cek font scaling besar tidak merusak layout (`maxFontSizeMultiplier`).
- [ ] Pastikan `accessibilityRole` yang tepat di semua interactive elements.
- [ ] Test dengan Android Accessibility Scanner.

---

## 6. Definition of Done (A11y Android)

Satu screen dianggap selesai hanya jika:

1. Flow utama bisa diselesaikan pakai TalkBack.
2. Tidak ada elemen interaktif dengan tap target < 48dp.
3. Tidak ada informasi penting yang hanya disampaikan lewat warna.
4. Kontras teks dan elemen visual lolos baseline.
5. Font scaling 1.6x tidak merusak layout.

Jika salah satu gagal, screen belum masuk status done meskipun fitur berfungsi.
