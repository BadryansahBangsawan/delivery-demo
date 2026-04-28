# DELIVRY — iOS Plan (Apple Human Interface Guidelines)

> Referensi resmi: https://developer.apple.com/design/human-interface-guidelines
> Tujuan dokumen ini: membuat DELIVRY **terasa native di iOS** meskipun dibangun dengan React Native.
> **Wajib dibaca sebelum mulai sprint apa pun yang menyentuh layer presentation iOS.**
> Pair dokumen Android: [10_android_accessibility.md](10_android_accessibility.md)

---

## 0. Filosofi HIG → Diterapkan di DELIVRY

| Prinsip Apple | Implementasi di DELIVRY |
|---------------|-------------------------|
| **Clarity** — teks jelas, ikon presisi, fokus pada fungsi | Plus Jakarta Sans / system font, Lucide icons, hindari ornamen |
| **Deference** — UI mendukung konten, bukan saingan | Background putih solid, peta & makanan jadi "konten utama" |
| **Depth** — layer & transisi memberi hierarki | Bottom sheet untuk pilihan, large title yang collapse, blur material |
| **Aesthetic Integrity** | Tampilan utility-first, premium via purple accent |
| **Consistency** | Pakai native iOS behavior via React Navigation + native-stack |
| **Direct Manipulation** | Tap marker peta = langsung interaksi, drag bottom sheet |
| **Feedback** | Haptics + state change visual setiap aksi |
| **User Control** | Tombol "Batalkan" selalu ada di flow OTP, ride, order |

---

## 1. Foundations

### 1.1 Layout & Safe Area

```
iPhone (notch / Dynamic Island):
┌─────────────────┐  ← Status bar (dynamic, hindari konten di sini)
│  ▭▭ Notch ▭▭   │
├─────────────────┤  ← Safe area top (~47-59pt tergantung device)
│                 │
│   Konten utama  │
│                 │
├─────────────────┤  ← Safe area bottom (~34pt untuk home indicator)
│   ───────       │  ← Home indicator
└─────────────────┘
```

**Aturan DELIVRY:**
- Gunakan `<SafeAreaView>` dari `react-native-safe-area-context` di setiap screen
- Bottom tab bar **wajib** menyisakan jarak dari home indicator (React Navigation handles ini otomatis)
- Konten peta full-screen boleh tembus safe area, tapi UI overlay (tombol back, info card) **harus** di dalam safe area
- Floating action button posisi minimal 16pt dari safe area bottom

### 1.2 Spacing — iOS Convention

| Token | Nilai | Pemakaian iOS |
|-------|-------|---------------|
| Edge inset | 16pt | Default horizontal padding screen |
| List row separator inset | 16pt | Divider mulai dari 16pt (bukan dari edge) |
| Section spacing | 32pt | Antar grup di Settings-style screen |
| Group inset list corner | 10pt | Inset grouped list style |

### 1.3 Touch Target

- **Minimum HIG: 44pt × 44pt** (lebih kecil dari Material 48dp)
- Kita pakai **48** lintas-platform (sudah aman). Yang penting: **jangan pernah** bikin tap target < 44pt di iOS.
- Spacing antar tap target ≥ 8pt agar jari tidak salah pencet.

---

## 2. Typography

### 2.1 Font Handling

React Native di iOS otomatis pakai **SF Pro** sebagai system font. Kita menggunakan **Plus Jakarta Sans** sebagai brand font. Pastikan:
- Font di-load via `expo-font` atau di-link via `react-native-asset`
- Fallback ke SF Pro jika font gagal load

### 2.2 iOS Type Scale (Dynamic Type)

| HIG Style | Default | Mapping ke DELIVRY `typography.ts` |
|-----------|---------|------|
| Large Title | 34pt | Khusus di nav bar collapse (React Navigation large title) |
| Title 1 | 28pt | `h1` ✅ |
| Title 2 | 22pt | `h2` (kita pakai 24) — close enough |
| Title 3 | 20pt | `h3` ✅ |
| Headline | 17pt | `h4` (kita pakai 18) — close enough |
| Body | 17pt | `bodyLarge` (kita pakai 16) |
| Callout | 16pt | `bodyLarge` ✅ |
| Footnote | 13pt | `caption` (kita pakai 12) |

> **Keputusan DELIVRY:** kita pakai 16px body (Plus Jakarta Sans) supaya konsisten cross-platform. Wajib mendukung Dynamic Type via `allowFontScaling` dan `maxFontSizeMultiplier`:

```tsx
<Text allowFontScaling={true} maxFontSizeMultiplier={1.6}>
  Body text
</Text>
```

### 2.3 Large Title Navigation

iOS punya pola "large title yang collapse saat scroll". Untuk DELIVRY:
- **Pakai** di: Activity (order history), Notifications, Profile, Wallet
- **Jangan pakai** di: Home (sudah custom), Tracking screen (peta full-bleed), Onboarding

Implementasi via React Navigation:

```tsx
<Stack.Screen
  name="Activity"
  component={ActivityScreen}
  options={{
    headerLargeTitle: true,
    headerLargeTitleStyle: { fontFamily: 'PlusJakartaSans-Bold' },
  }}
/>
```

---

## 3. Color & Materials

### 3.1 Light & Dark Mode

HIG **mensyaratkan** dukungan Dark Mode. Walaupun MVP kita fokus light mode, **siapkan** struktur dark dari awal:

- Definisikan dark palette di `theme/dark.ts` (Phase 2)
- Background gelap iOS: `#0F0F0F` (near-black OLED) atau `#1A1A1A`
- Brand purple **tidak boleh** dipakai apa adanya di dark mode — lighten ~10-15% (#9B6FF7)

### 3.2 Blur / Materials

iOS sering pakai blur translucency. Untuk DELIVRY:
- **Choose Ride** screen: bottom panel blur di atas peta (via `@react-native-community/blur`)
- **Searching Driver**: tetap solid putih (fokus tinggi)

```tsx
import { BlurView } from '@react-native-community/blur';

<BlurView blurType="light" blurAmount={20} style={styles.overlay}>
  {/* content */}
</BlurView>
```

---

## 4. Navigation Patterns

### 4.1 Navigation Bar (top)

| HIG | DELIVRY |
|-----|---------|
| Title posisi center | React Navigation default di iOS ✅ |
| Back button: chevron | `headerBackTitleVisible: false` + chevron icon ✅ |
| Edge-swipe-from-left = back | Native Stack Navigator handles ini otomatis ✅ |
| Action di trailing (kanan), maksimal 2 ikon | Notif + QR di Home |

### 4.2 Tab Bar (bottom)

HIG: 2-5 tab, ikon + label, tab aktif highlighted.

✅ DELIVRY punya 5 tab (Beranda/Pesanan/Dompet/Chat/Akun). Pastikan:
- Ikon outline (inactive) → filled (active)
- Active color: Primary Purple (#7B2FF2)
- Inactive color: #9CA3AF
- Tap ulang tab aktif = scroll-to-top + pop ke root (iOS convention)

### 4.3 Modal Presentation

| Use case DELIVRY | Implementasi | Catatan |
|------------------|--------------|---------|
| Konfirmasi destruktif (batalkan ride, hapus alamat) | `Alert.alert()` (native iOS alert) | Action destruktif warna merah |
| Pilih payment method | `@gorhom/bottom-sheet` | Slide dari bawah |
| Pilih tanggal/waktu | `@react-native-community/datetimepicker` | Native picker |
| Detail menu makanan | `@gorhom/bottom-sheet` dengan `enableDynamicSizing` | Drag handle |

---

## 5. Touch, Gesture & Haptics

### 5.1 Haptic Feedback

**Wajib pakai untuk:**

| Aksi DELIVRY | Haptic | React Native |
|--------------|--------|--------------|
| Tap tombol primary (Login, Pesan) | `selection` | `ReactNativeHapticFeedback.trigger('selection')` |
| OTP berhasil diverifikasi | `notificationSuccess` | `trigger('notificationSuccess')` |
| Driver ditemukan | `impactMedium` 2× | Double trigger dengan delay 150ms |
| Order selesai / payment sukses | `notificationSuccess` | `trigger('notificationSuccess')` |
| Error (OTP salah, payment gagal) | `notificationError` | `trigger('notificationError')` |
| Tap chip filter / select option | `selection` | `trigger('selection')` |

### 5.2 Pull-to-Refresh

React Native di iOS sudah menggunakan native `UIRefreshControl`:

```tsx
<FlatList
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="#7B2FF2" // Purple spinner
    />
  }
/>
```

---

## 6. Sign in with Apple — **WAJIB**

> **App Store Review Guideline §4.8:** Jika app menyediakan login pihak ketiga (Google), **wajib** menyediakan **Sign in with Apple**.

- Package: `@invertase/react-native-apple-authentication`
- Enable "Sign In with Apple" di Apple Developer → App ID Capabilities
- Posisi tombol Apple Sign-In **minimal sejajar** dengan Google Sign-In di login screen
- Style: gunakan `AppleButton` bawaan package (HIG-compliant)

---

## 7. Live Activity & Dynamic Island

Fit sempurna untuk DELIVRY ride & food tracking:

### Ride Live Activity (Lock Screen)
```
┌────────────────────────────┐
│ 🚕 Driver dalam perjalanan  │
│ Ahmad — B 1234 XY          │
│ ETA 4 menit                 │
│ ━━━━━━━━━━░░░░░░  60%      │
└────────────────────────────┘
```

### Dynamic Island (compact)
```
( 🚕 4 min )
```

**Implementasi:** Live Activity butuh **native iOS code** (Swift + ActivityKit). Buat native module via React Native bridge. Ditambahkan ke Sprint 2 sebagai P1.

---

## 8. Push Notifications (APNS)

| Aspek | Aturan iOS |
|-------|------------|
| Permission prompt | Hanya muncul sekali — salah waktu = user tolak permanen |
| **Kapan minta?** | Setelah user merasakan value (setelah order pertama) |
| Notification actions | "Lihat detail", "Telepon driver" |

**Flow yang direkomendasikan:**
1. Setelah OTP sukses → **tidak** minta notif
2. User pesan ride pertama → setelah driver ditemukan → minta permission
3. Pakai `@react-native-firebase/messaging` (wrap APNS)

---

## 9. Permissions & Privacy (Info.plist) — **WAJIB**

| Key | String |
|-----|--------|
| `NSLocationWhenInUseUsageDescription` | "DELIVRY butuh lokasimu untuk menemukan driver terdekat." |
| `NSLocationAlwaysAndWhenInUseUsageDescription` | "Untuk melacak perjalananmu meski app di background." |
| `NSCameraUsageDescription` | "Untuk mengambil foto profil dan dokumentasi paket." |
| `NSPhotoLibraryUsageDescription` | "Untuk memilih foto dari galeri." |
| `NSFaceIDUsageDescription` | "Untuk membuka DELIVRY Pay dengan Face ID." |

### Privacy Manifest (iOS 17+)
Wajib ada `PrivacyInfo.xcprivacy`. Catat untuk Sprint 6.

---

## 10. Color Contrast

WCAG AA minimum:
- Text reguler: kontras ≥ 4.5:1
- Text besar / bold: ≥ 3:1
- Purple (#7B2FF2) di atas putih: kontras ~5.8:1 ✅ **PASS** — aman untuk text besar
- White text di atas purple: kontras ~5.8:1 ✅ **PASS** — aman untuk buttons
- Jangan pakai purple sebagai body text kecil di background putih — gunakan Charcoal (#1A1A1A)

---

## 11. Referensi

- **HIG utama:** https://developer.apple.com/design/human-interface-guidelines
- **App Store Review Guidelines:** https://developer.apple.com/app-store/review/guidelines/
- **Sign in with Apple:** https://developer.apple.com/sign-in-with-apple/
- **ActivityKit (Live Activity):** https://developer.apple.com/documentation/activitykit
- **Privacy Manifest:** https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
