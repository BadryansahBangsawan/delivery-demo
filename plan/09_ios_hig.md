# Pick Up — iOS Plan (Apple Human Interface Guidelines)

> Referensi resmi: https://developer.apple.com/design/human-interface-guidelines
> Tujuan dokumen ini: membuat Pick Up **terasa native di iOS** meskipun dibangun dengan Flutter.
> **Wajib dibaca sebelum mulai sprint apa pun yang menyentuh layer presentation iOS.**
> Pair dokumen Android: [10_android_accessibility.md](10_android_accessibility.md)

---

## 0. Filosofi HIG → Diterapkan di Pick Up

| Prinsip Apple | Implementasi di Pick Up |
|---------------|-------------------------|
| **Clarity** — teks jelas, ikon presisi, fokus pada fungsi | SF Pro / system font, SF Symbols, hindari ornamen |
| **Deference** — UI mendukung konten, bukan saingan | Background putih solid, peta & makanan jadi "konten utama" |
| **Depth** — layer & transisi memberi hierarki | Bottom sheet untuk pilihan, large title yang collapse, blur material |
| **Aesthetic Integrity** | Tampilan utility-first, bukan playful |
| **Consistency** | Pakai Cupertino widget di moment yang penting (sheet, alert, picker) |
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

**Aturan Pick Up:**
- Bungkus setiap screen dengan `SafeArea` (sudah dilakukan di [home_screen.dart](../lib/features/home/presentation/screens/home_screen.dart), [login_screen.dart](../lib/features/auth/presentation/screens/login_screen.dart) dst.)
- Bottom tab bar **wajib** menyisakan jarak ≥ 8pt dari home indicator (gunakan `SafeArea(top: false)`)
- Konten peta full-screen boleh tembus safe area, tapi UI overlay (tombol back, info card) **harus** di dalam safe area
- Floating action button posisi minimal 16pt dari safe area bottom

### 1.2 Spacing — iOS Convention

| Token | Nilai | Pemakaian iOS |
|-------|-------|---------------|
| Edge inset | 16pt | Default horizontal padding screen |
| List row separator inset | 16pt | Divider mulai dari 16pt (bukan dari edge) |
| Section spacing | 32pt | Antar grup di Settings-style screen |
| Group inset list corner | 10pt | Inset grouped list (UITableView style) |

> Ini sudah selaras dengan `AppSpacing.base = 16` di [app_spacing.dart](../lib/core/constants/app_spacing.dart). **Tidak perlu** token terpisah untuk iOS.

### 1.3 Touch Target

- **Minimum HIG: 44pt × 44pt** (lebih kecil dari Material 48dp)
- Kita pakai **48** lintas-platform (sudah aman). Yang penting: **jangan pernah** bikin tap target < 44pt di iOS.
- Spacing antar tap target ≥ 8pt agar jari tidak salah pencet.

---

## 2. Typography (SF Pro + Dynamic Type)

### 2.1 SF Pro

iOS otomatis pakai **SF Pro Text** (≤ 19pt) dan **SF Pro Display** (≥ 20pt) ketika kita **tidak** men-set `fontFamily`. Flutter `ThemeData` default sudah memilih font sistem per-platform → biarkan kosong, **jangan** hardcode `Roboto` atau `SF Pro`.

✅ Yang sudah benar di [app_typography.dart](../lib/core/constants/app_typography.dart) — tidak ada `fontFamily`. Pertahankan.

### 2.2 iOS Type Scale (Dynamic Type)

| HIG Style | Default | Weight | Mapping ke `AppTypography` |
|-----------|---------|--------|------|
| Large Title | 34pt | Bold | dipakai khusus di nav bar collapse — pakai Cupertino |
| Title 1 | 28pt | Bold | `h1` ✅ |
| Title 2 | 22pt | Bold/Semibold | `h2` ✅ |
| Title 3 | 20pt | Semibold | `h3` (geser jadi 20) — opsional |
| Headline | 17pt | Semibold | `bodyMedium` (saat ini 16) |
| Body | 17pt | Regular | `body` (saat ini 16) |
| Callout | 16pt | Regular | sudah cocok |
| Subhead | 15pt | Regular | tambahkan jika perlu |
| Footnote | 13pt | Regular | `small` (saat ini 12) — naikkan ke 13 di iOS opsional |
| Caption 1/2 | 12/11pt | Regular | `small` |

> **Keputusan untuk Pick Up:** kita pakai 16pt body (lebih dekat ke Material) supaya konsisten Android. **Tapi** wajib mendukung Dynamic Type:

```dart
// app.dart — tambahkan saat MaterialApp.router
builder: (context, child) {
  final mq = MediaQuery.of(context);
  // Clamp scale 0.85–1.6 supaya layout tidak pecah di Larger Accessibility Sizes
  final scaler = mq.textScaler.clamp(minScaleFactor: 0.85, maxScaleFactor: 1.6);
  return MediaQuery(data: mq.copyWith(textScaler: scaler), child: child!);
}
```

### 2.3 Large Title Navigation

iOS punya pola "large title yang collapse saat scroll" (Mail, Settings, Music, App Store). Untuk Pick Up:
- **Pakai** di: Activity (order history), Notifications, Profile, Wallet
- **Jangan pakai** di: Home (sudah custom), Tracking screen (peta full-bleed), Onboarding

Implementasi Flutter:

```dart
CustomScrollView(
  slivers: [
    SliverAppBar.large(
      title: const Text('Aktivitas'),
      pinned: true,
      backgroundColor: AppColors.background,
    ),
    // konten...
  ],
)
```

---

## 3. Color & Materials

### 3.1 Light & Dark Mode

HIG **mensyaratkan** dukungan Dark Mode untuk app modern (sejak iOS 13). Walaupun MVP kita "putih bersih", **siapkan** struktur dark dari awal:

- Tambah `AppColors.dark*` di [app_colors.dart](../lib/core/constants/app_colors.dart) (Phase 2 di [08_implementation_checklist.md](08_implementation_checklist.md) — geser ke Sprint 6)
- Background gelap iOS rekomendasi: `#000000` (true black untuk OLED) atau `#1C1C1E` (system grouped background)
- Brand green **tidak boleh** dipakai apa adanya di dark mode — naikkan saturasi/lighten ~10-15%

### 3.2 System Colors (HIG)

iOS punya semantic system colors yang **adaptif** light/dark. Mapping kita:

| HIG | Light | Dark | Pakai di |
|-----|-------|------|----------|
| `systemBackground` | white | black | Scaffold background |
| `secondarySystemBackground` | #F2F2F7 | #1C1C1E | Card / surface |
| `label` | #000000 | white | Text primary |
| `secondaryLabel` | #3C3C43 60% | white 60% | Text secondary |
| `separator` | #3C3C43 29% | white 16% | Divider |
| `systemBlue` | #007AFF | #0A84FF | iOS-native CTA (kita pakai green, tapi tahu trade-off-nya) |

### 3.3 Materials (Blur)

iOS sangat sering pakai blur translucency (mis. tab bar transparan, header sheet). Untuk Pick Up:
- **Choose Ride** screen: bottom panel pakai `BackdropFilter` (blur) di atas peta
- **Searching Driver**: tetap solid putih (fokus tinggi)
- **Notification banner in-app**: blur background

```dart
ClipRect(
  child: BackdropFilter(
    filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
    child: Container(color: Colors.white.withValues(alpha: 0.72), ...),
  ),
)
```

---

## 4. Navigation Patterns

### 4.1 Navigation Bar (top)

| HIG | Pick Up |
|-----|---------|
| Title posisi center, ringkas | ✅ pakai `PickupAppBar` — sesuaikan `centerTitle: true` di iOS jika perlu |
| Back button: chevron + label screen sebelumnya (opsional) | Sudah pakai chevron `Icons.arrow_back_ios_new` ✅ |
| Edge-swipe-from-left = back | **Wajib** aktif. GoRouter + Cupertino page transition sudah handle |
| Action di trailing (kanan), maksimal 2 ikon | Notif + QR di Home ✅ |

**Aktifkan iOS swipe-back** di GoRouter:

```dart
// app_router.dart — gunakan CupertinoPage di iOS
import 'package:flutter/cupertino.dart';

GoRoute(
  path: RouteNames.otp,
  pageBuilder: (context, state) => CupertinoPage(
    key: state.pageKey,
    child: const OtpScreen(),
  ),
),
```

Atau pakai `MaterialPage` dengan flag `fullscreenDialog: false` — `CupertinoPageRoute` sudah jadi default Material di iOS, tapi **eksplisit lebih aman**.

### 4.2 Tab Bar (bottom)

HIG: 2-5 tab, ikon + label, tab aktif highlighted, **tidak** ada hamburger menu sebagai pengganti tab.

✅ Pick Up sudah punya 5 tab (Home/Activity/Payment/Chat/Akun). Pastikan:
- Ikon outline (inactive) → filled (active) — sudah ada di [main_shell.dart](../lib/features/home/presentation/screens/main_shell.dart)
- Tap ulang tab aktif = scroll-to-top + pop ke root (iOS convention)

```dart
onTap: (i) {
  if (i == _currentIndex(context)) {
    // Pop sampai root + scroll ke atas
    // pakai Scrollable.ensureVisible(...) atau ScrollController.animateTo
  } else {
    context.go(_tabs[i].path);
  }
}
```

### 4.3 Modal Presentation

| Use case Pick Up | Cupertino widget | Catatan |
|------------------|------------------|---------|
| Konfirmasi destruktif (batalkan ride, hapus alamat) | `showCupertinoDialog` + `CupertinoAlertDialog` | Action destruktif merah di kanan |
| Pilih payment method | `showCupertinoModalPopup` + `CupertinoActionSheet` | Slide dari bawah |
| Pilih tanggal/waktu (jadwal kirim) | `CupertinoDatePicker` di dalam bottom sheet | Bukan pop-up modal |
| Edit data form (Setup Profile) | Full-screen route biasa | OK pakai Material |
| Detail menu makanan | `showModalBottomSheet` dengan `isScrollControlled: true`, drag handle | Sudah disiapkan di theme |

**Aturan modality (HIG):**
- Modal hanya untuk **task pendek** (≤ 30 detik)
- Selalu sediakan **cara dismiss** (tombol Cancel/×, atau swipe down)
- Page sheet (modal yang stack di atas, sisakan ~10pt root visible) dipakai untuk: Cart, Filter, Edit alamat

---

## 5. Touch, Gesture & Haptics

### 5.1 Gesture HIG-standard

| Gesture | Maknanya di iOS | Pemakaian Pick Up |
|---------|-----------------|--------------------|
| Tap | Aktivasi | Semua tombol |
| Long press | Show preview / context menu | Long-press alamat → preview di peta |
| Swipe left/right pada list row | Reveal action (Delete/Edit) | Swipe alamat tersimpan → edit/hapus |
| Pull down dari atas | Refresh | Activity, Home, Restoran list |
| Drag handle bottom sheet | Resize/dismiss | Cart, Choose Ride |
| Pinch | Zoom | Peta tracking |
| Edge swipe left | Back | Otomatis di Cupertino route |

### 5.2 Haptic Feedback (`HapticFeedback` — built-in Flutter)

**Wajib pakai untuk:**

| Aksi Pick Up | Haptic | Kode Flutter |
|--------------|--------|--------------|
| Tap tombol primary (Login, Pesan Ride) | `lightImpact` | `HapticFeedback.lightImpact()` |
| OTP berhasil diverifikasi | `mediumImpact` | `HapticFeedback.mediumImpact()` |
| Driver ditemukan | `mediumImpact` 2× | `await HF.mediumImpact(); await Future.delayed(150ms); HF.mediumImpact();` |
| Order selesai / pembayaran sukses | `heavyImpact` atau `selectionClick` 3× | success haptic |
| Error (OTP salah, payment gagal) | `vibrate` (notification error) | `HapticFeedback.vibrate()` |
| Tap chip filter / select option | `selectionClick` | `HapticFeedback.selectionClick()` |

**Jangan over-use** — setiap scroll bukan haptic moment.

### 5.3 Pull-to-Refresh iOS-style

Gunakan `CupertinoSliverRefreshControl` di iOS untuk feel native (animated drop):

```dart
CustomScrollView(
  slivers: [
    if (Platform.isIOS)
      CupertinoSliverRefreshControl(onRefresh: _onRefresh)
    else
      // PageStorage handled by RefreshIndicator wrapper at parent
    ...
  ],
)
```

---

## 6. Input — Keyboard & Form

### 6.1 Hint Keyboard yang Tepat

| Field Pick Up | `keyboardType` | `textContentType` (iOS) |
|---------------|----------------|--------------------------|
| Nomor HP | `TextInputType.phone` | `TextInputType.phone` (iOS auto fill phone) |
| **OTP 6 digit** | `TextInputType.number` | **`AutofillHints.oneTimeCode`** ⚠️ wajib |
| Email | `TextInputType.emailAddress` | `AutofillHints.email` |
| Nama lengkap | `TextInputType.name` + capitalization words | `AutofillHints.name` |
| Alamat | `TextInputType.streetAddress` | `AutofillHints.streetAddressLine1` |
| Nominal top-up | `TextInputType.numberWithOptions(decimal: false)` | — |

**OTP autofill dari SMS** (hadiah HIG iOS): tambahkan ke OTP TextField:

```dart
TextField(
  autofillHints: const [AutofillHints.oneTimeCode],
  keyboardType: TextInputType.number,
)
```
→ Apple iOS akan otomatis baca SMS OTP & sodorkan di keyboard suggestion bar. Update [otp_input.dart](../lib/features/auth/presentation/widgets/otp_input.dart) untuk pass `autofillHints`.

### 6.2 Toolbar di atas Keyboard

iOS sering punya toolbar "Done" di atas keyboard untuk tipe number (yang tidak punya tombol Return). Untuk field OTP/nominal:

```dart
KeyboardActions(
  config: KeyboardActionsConfig(
    actions: [KeyboardActionsItem(focusNode: _focus, displayDoneButton: true)],
  ),
  child: TextField(...),
)
```
(package: `keyboard_actions` — opsional, atau handle manual via `FocusNode`)

---

## 7. Sign in with Apple — **WAJIB**

> **App Store Review Guideline §4.8:** Jika app menyediakan login pihak ketiga (Google/Facebook/dll), **wajib** menyediakan **Sign in with Apple** dengan posisi minimal sejajar.

Konsekuensi untuk Pick Up:
- [login_screen.dart](../lib/features/auth/presentation/screens/login_screen.dart) sudah punya placeholder Apple Sign-In ✅
- **Wajib implement** sebelum submit ke App Store, **bukan** opsional
- Package: `sign_in_with_apple: ^6.0.0`
- Konfigurasi: enable "Sign In with Apple" di Apple Developer → App ID Capabilities, lalu `Runner.entitlements`
- Backend: verifikasi `identityToken` (JWT) ke Apple's public keys

Style tombol harus mengikuti [Apple's sign-in button guidelines](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple) — gunakan `SignInWithAppleButton` widget bawaan package supaya lulus review.

---

## 8. Apple Pay — Untuk PickPay & Top-Up

HIG: Apple Pay = **express checkout favorit** di iOS. Konversinya jauh di atas form manual.

| Use case | Implementasi |
|----------|--------------|
| Top up wallet (Sprint 4) | Apple Pay → Midtrans/Xendit (mereka support Apple Pay merchant) |
| Bayar PickRide / PickFood | Apple Pay sebagai payment method ke-3 di samping Cash & PickPay |
| Tombol Apple Pay | Pakai `pay` package atau widget custom yang ikut [HIG Apple Pay button style](https://developer.apple.com/design/human-interface-guidelines/apple-pay) — **hitam dengan logo Apple Pay**, bukan custom |

Update [02_features.md](02_features.md) → tambahkan Apple Pay ke daftar payment method.

---

## 9. Live Activity & Dynamic Island — **Killer Feature untuk PickRide & PickFood**

iOS 16.1+ punya **Live Activity** (Lock Screen widget yang update real-time) dan **Dynamic Island** (iPhone 14 Pro+). Ini **fit sempurna** untuk Pick Up:

### 9.1 PickRide Live Activity

```
Lock Screen:
┌────────────────────────────┐
│ 🚕 Driver dalam perjalanan  │
│ Ahmad — B 1234 XY          │
│ ETA 4 menit                 │
│ ━━━━━━━━━━░░░░░░  60%      │
└────────────────────────────┘

Dynamic Island (compact):
( 🚕 4 min )

Dynamic Island (expanded):
┌─────────────────────────┐
│ Ahmad   ●━━━●   Rumah   │
│         4 menit          │
└─────────────────────────┘
```

### 9.2 PickFood Live Activity

```
Status: Disiapkan → Dijemput → Dalam perjalanan → Sampai
Update setiap step.
```

**Implementasi Flutter:** Live Activity butuh **native iOS code** (Swift + ActivityKit). Tidak ada plugin Flutter resmi yang fully featured, tapi:
- Package: `live_activities: ^2.x` (community) atau tulis platform channel sendiri
- Backend kirim push token APNS khusus Live Activity untuk update remote
- **Ditambahkan ke Sprint 2 (PickRide) sebagai P1** — strong differentiator

→ **Action item:** tambahkan ke [08_implementation_checklist.md](08_implementation_checklist.md) di Sprint 2:
```
- [ ] iOS Live Activity untuk PickRide tracking (ActivityKit native)
- [ ] iOS Dynamic Island compact + expanded view
```

---

## 10. Push Notifications (APNS)

| Aspek | Aturan iOS |
|-------|------------|
| Permission prompt | **Hanya** muncul sekali. Salah waktu = user tolak permanen → wajib lewat Settings |
| **Kapan minta?** | **JANGAN** di splash. Minta setelah user merasakan value (mis. setelah order pertama, atau saat user explicit toggle "Notifikasi promo") |
| Provisional authorization | iOS 12+: bisa kirim notif silent ke Notification Center tanpa prompt → "trial" dulu |
| Notification categories | Pakai action button: "Lihat detail", "Telepon driver" |
| Critical alerts | Tidak relevan untuk Pick Up (hanya untuk health/safety apps berijin) |

**Flow yang direkomendasikan:**
1. Setelah OTP sukses → **tidak** minta notif
2. User pesan ride pertama → setelah driver ditemukan → minta permission ("Aktifkan notifikasi agar tahu driver sudah dekat")
3. Pakai `firebase_messaging` (sudah di pubspec) — di iOS dia wrap APNS

Info.plist:
```xml
<key>UIBackgroundModes</key>
<array>
  <string>remote-notification</string>
  <string>fetch</string>
</array>
```

---

## 11. Permissions & Privacy (Info.plist) — **WAJIB**

App Store akan **reject** kalau ada usage description hilang. Setiap permission iOS butuh string penjelasan **dalam bahasa Indonesia**:

| Key | String contoh |
|-----|---------------|
| `NSLocationWhenInUseUsageDescription` | "Pick Up butuh lokasimu untuk menemukan driver terdekat dan mengantar pesananmu." |
| `NSLocationAlwaysAndWhenInUseUsageDescription` | "Untuk melacak perjalananmu meski app berjalan di latar belakang." |
| `NSCameraUsageDescription` | "Untuk mengambil foto profil dan dokumentasi paket." |
| `NSPhotoLibraryUsageDescription` | "Untuk memilih foto profil dari galeri." |
| `NSPhotoLibraryAddUsageDescription` | "Untuk menyimpan struk perjalanan ke galeri." |
| `NSContactsUsageDescription` | (jangan pakai kalau tidak perlu) |
| `NSFaceIDUsageDescription` | "Untuk membuka PickPay dengan Face ID." (bila Sprint 4 pakai biometric) |
| `NSUserTrackingUsageDescription` | (skip kalau tidak ada SDK iklan; kalau ada → "Untuk personalisasi promo") |

**File yang harus di-edit:** `ios/Runner/Info.plist` (akan dibuat saat masuk Sprint 2 PickRide karena di situ pertama kali butuh location).

### 11.1 Privacy Manifest (iOS 17+)

Sejak Mei 2024, **wajib** ada `PrivacyInfo.xcprivacy` di bundle iOS yang mendeklarasikan:
- Data type yang dikumpulkan (location, identifier, contacts)
- Required reason API yang dipakai (UserDefaults, FileTimestamp, dll.)

Template-nya akan di-generate saat upload ke App Store Connect (Xcode Cloud auto-warn). **Catat untuk Sprint 6 (Polish & Launch).**

---

## 12. Maps di iOS — Apple Maps vs Google Maps

| Aspek | Google Maps Flutter | Apple MapKit (via plugin) |
|-------|---------------------|---------------------------|
| Konsistensi cross-platform | ✅ identik Android & iOS | ❌ beda total |
| Familiar di iOS | ⚠️ user iOS lebih kenal Apple Maps | ✅ |
| Routing & ETA Indonesia | ✅ kuat | ⚠️ data Indonesia tidak selengkap Google |
| Place autocomplete | ✅ Places API | ❌ harus pakai backend sendiri |
| Cost | $$ Google Maps Platform | Free (sampai limit) |

**Keputusan untuk Pick Up:** **tetap Google Maps** lintas-platform demi data Indonesia & feature parity. Tapi:
- Tap "Buka di Maps" di tracking screen → tawarkan **dialog pilihan** (Google Maps / Apple Maps) di iOS via `url_launcher` ke `comgooglemaps://` atau `maps://`

```dart
if (Platform.isIOS) {
  showCupertinoActionSheet(... actions: [
    CupertinoActionSheetAction(child: Text('Apple Maps'), onPressed: () => launch('maps://?daddr=$lat,$lng')),
    CupertinoActionSheetAction(child: Text('Google Maps'), onPressed: () => launch('comgooglemaps://?daddr=$lat,$lng')),
  ]);
}
```

---

## 13. App Icon & Launch Screen

### 13.1 App Icon (Pick Up)

- **Asset Catalog** di `ios/Runner/Assets.xcassets/AppIcon.appiconset`
- Wajib semua ukuran: 20pt, 29pt, 40pt, 60pt, 76pt, 83.5pt, 1024pt (App Store)
- Tool: pakai `flutter_launcher_icons` package untuk auto-generate semua size dari 1 PNG 1024×1024
- HIG: jangan sertakan **teks "Pick Up"** di icon — recognizable shape only
- Hindari corner rounded di asset (iOS auto-mask)
- Tidak ada layer transparan (background harus opaque)

```yaml
# pubspec.yaml — tambahkan
dev_dependencies:
  flutter_launcher_icons: ^0.14.0

flutter_launcher_icons:
  ios: true
  android: true
  image_path: "assets/branding/icon_1024.png"
  remove_alpha_ios: true
```

### 13.2 Launch Screen

iOS **tidak** mengizinkan loading-spinner / branding heavy di launch screen. HIG: launch screen = **ilusi instan**, harusnya identik dengan layout pertama app.

- Edit `ios/Runner/Base.lproj/LaunchScreen.storyboard` di Xcode
- Background putih + logo Pick Up di tengah (kecil)
- **Bukan** copy-paste SplashScreen Flutter (itu jalan **setelah** launch screen native)
- Jangan pakai `flutter_native_splash` dengan animasi → static only di iOS

---

## 14. Accessibility (HIG-required)

### 14.1 VoiceOver

Semua interactive widget **wajib** punya semantik:

```dart
IconButton(
  icon: const Icon(Icons.notifications_outlined),
  tooltip: 'Notifikasi',  // Material tooltip → diserap VoiceOver
  onPressed: () {},
)

// Atau eksplisit:
Semantics(
  label: 'Pesan PickRide ke kantor',
  button: true,
  child: PickupCard(...),
)
```

### 14.2 Dynamic Type

Sudah dibahas di §2.2 — clamp scale 0.85–1.6.

### 14.3 Reduce Motion

Hormati `MediaQuery.disableAnimations`:

```dart
final reduce = MediaQuery.disableAnimationsOf(context);
final duration = reduce ? Duration.zero : const Duration(milliseconds: 300);
```

Terapkan di: PromoBanner auto-scroll, Splash animation, page transitions, Lottie loop.

### 14.4 Color Contrast

WCAG AA minimum:
- Text reguler: kontras ≥ 4.5:1
- Text besar / bold: ≥ 3:1
- Cek `AppColors.primary (#00C853)` di atas putih: kontras 1.84 ❌ **gagal** untuk text body. Solusi: jangan pakai green sebagai text di background putih — hanya untuk fill button (white text on green = OK).

---

## 15. iOS-specific Adaptasi per Layar Pick Up

| Layar | Adaptasi iOS yang harus dilakukan |
|-------|-----------------------------------|
| **Splash** | Geser ke `LaunchScreen.storyboard` native; SplashScreen Flutter jadi just-auth-check (≤ 200ms) |
| **Onboarding** | Indikator pakai dot expanding (sudah ✅); tombol "Lewati" di trailing nav, bukan center |
| **Login** | Tambah `SignInWithAppleButton` resmi; tombol Google harus **di bawah** Apple di iOS |
| **OTP** | Pasang `autofillHints: [AutofillHints.oneTimeCode]` di [otp_input.dart](../lib/features/auth/presentation/widgets/otp_input.dart) |
| **Setup Profile** | Photo picker pakai `image_picker` → di iOS akan munculkan native sheet (Camera / Photo Library) |
| **Home** | Status bar dark icons di atas putih (sudah di-set di theme ✅); pull-to-refresh CupertinoSliverRefreshControl |
| **Bottom Tab** | Tab tap-tap = scroll-to-top + pop |
| **Pick Location** | Pakai `CupertinoSearchTextField` look saat search alamat |
| **Choose Ride** | Bottom panel blur (BackdropFilter); payment method picker = `CupertinoActionSheet` |
| **Searching Driver** | Lottie radar + haptic `lightImpact` setiap 2 detik (subtle pulse) |
| **Tracking** | **Live Activity + Dynamic Island** (§9); SOS button = long-press untuk konfirmasi (anti-accidental) |
| **Ride Complete** | Rating 5-star bisa tap & drag (drag pengalaman lebih iOS); haptic `selectionClick` setiap bintang |
| **Cart** | Sheet dengan drag handle; swipe-to-delete item |
| **Wallet** | Large title nav bar; Apple Pay tombol top-up |
| **Activity** | Large title; pull to refresh CupertinoSliverRefreshControl |
| **Chat** | Keyboard avoiding pakai `MediaQuery.viewInsets`; iMessage-like bubble (rounded 18pt) |
| **Profile / Settings** | Inset grouped list style (`CupertinoListSection.insetGrouped`) |

---

## 16. Penambahan ke Checklist

Tambahkan ke [08_implementation_checklist.md](08_implementation_checklist.md) section **Pre-Development Setup**:

```
## iOS-Specific Setup
- [ ] Set bundle ID di Xcode (com.pickup.app)
- [ ] Enable "Sign In with Apple" capability
- [ ] Buat App ID di Apple Developer Portal
- [ ] Konfigurasi APNS key untuk Firebase Messaging
- [ ] Generate App Icon set via flutter_launcher_icons
- [ ] Edit LaunchScreen.storyboard (logo only, white bg)
- [ ] Set minimum iOS deployment target = 13.0
- [ ] Enable Background Modes: location, remote-notification
- [ ] Tambah Info.plist usage descriptions (location, camera, photo)
- [ ] Buat PrivacyInfo.xcprivacy (template Apple)
- [ ] Test di Dynamic Type Larger Accessibility Sizes
- [ ] Test VoiceOver flow auth → home → order
```

Tambahkan ke **Sprint 2 (PickRide)**:
```
- [ ] iOS Live Activity untuk tracking (ActivityKit native code via platform channel)
- [ ] iOS Dynamic Island compact + expanded view
- [ ] CupertinoActionSheet untuk pilih Apple Maps / Google Maps saat "Buka di Maps"
```

Tambahkan ke **Sprint 4 (Payment)**:
```
- [ ] Apple Pay integration via Midtrans/Xendit merchant
- [ ] Apple Pay button (HIG-style hitam) di Top Up & Checkout
- [ ] Face ID / Touch Face untuk unlock PickPay (LocalAuth)
```

Tambahkan ke **Sprint 6 (Polish & Launch)**:
```
- [ ] PrivacyInfo.xcprivacy isi sesuai data collection real
- [ ] App Store screenshot 6.7"/6.5"/5.5" (iPhone Pro Max ke 8 Plus)
- [ ] App Store description, keywords (Bahasa Indonesia + English)
- [ ] App Privacy questionnaire di App Store Connect
- [ ] Test pada iOS terbaru (iOS 18) dan minimum target (iOS 13)
```

---

## 17. Ringkasan Aksi Cepat

> Yang **harus dikerjakan sekarang** (sebelum mulai Sprint 2):

1. **Kembalikan `MaterialApp.router` di [app.dart](../lib/app.dart)** dengan `builder` MediaQuery clamp text scale (0.85–1.6).
2. **Set Cupertino page transition di [app_router.dart](../lib/core/router/app_router.dart)** — semua route pakai `CupertinoPage` (atau biarkan Material default; Material di iOS sudah pakai CupertinoPageTransitionsBuilder).
3. **Update [otp_input.dart](../lib/features/auth/presentation/widgets/otp_input.dart):** tambah `autoDismissKeyboard: true` dan `autofillHints` untuk SMS OTP autofill.
4. **Tambah haptic feedback** di [pickup_button.dart](../lib/core/widgets/pickup_button.dart) — call `HapticFeedback.lightImpact()` saat `onTap`.
5. **Set deployment target iOS 13.0** di `ios/Podfile` (`platform :ios, '13.0'`) supaya semua dependency Firebase 5.x lolos.
6. **Buat task spike: Live Activity** — explore package `live_activities` atau plan platform channel native. Diperlukan untuk Sprint 2.

---

## Referensi

- **HIG utama:** https://developer.apple.com/design/human-interface-guidelines
- **SF Symbols (icon):** https://developer.apple.com/sf-symbols/ — tidak dipakai langsung di Flutter, tapi inspirasi
- **App Store Review Guidelines:** https://developer.apple.com/app-store/review/guidelines/
- **Sign in with Apple:** https://developer.apple.com/sign-in-with-apple/
- **Apple Pay:** https://developer.apple.com/design/human-interface-guidelines/apple-pay
- **ActivityKit (Live Activity):** https://developer.apple.com/documentation/activitykit
- **Privacy Manifest:** https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
