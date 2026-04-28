# Pick Up - Implementation Checklist

## Status Terakhir (Current Progress)

Progress terakhir sudah sampai:

- **Step 1 — Pre-Development Setup**: selesai
- **Step 2 — Sprint 1: Auth & Home**: selesai
- **Step 3 — Sprint 2: PickRide**: selesai (kecuali WebSocket real-time)
- **Step 4 — Sprint 3: PickFood**: selesai
- **Step 7 — Sprint 4: Payment & Activity**: selesai
- **Step 8 — Notifications + Wiring**: selesai
- **Step 9 — Sprint 5: Chat & Profile**: selesai
- **Step 10 — Sprint 6: Polish (code-level)**: selesai parsial
- Bagian yang memang ditunda karena butuh konfigurasi manual tetap ditandai terpisah

## Pre-Development Setup

- [x] Rename project dari `demo_pick` ke `pickup` di pubspec.yaml
- [x] Setup folder structure sesuai `04_architecture.md`
- [x] Install dependencies inti (BLoC, GoRouter, Dio, Maps, Firebase, secure storage, pin code, lottie, dll)
- [x] Setup `app_theme.dart` sesuai design system (Material 3, putih, hijau #00C853, button 52, radius 12)
- [x] Setup `app_colors.dart`, `app_typography.dart`, `app_spacing.dart`, `app_assets.dart`, `api_endpoints.dart`
- [x] Setup GoRouter + ShellRoute + auth redirect + route names
- [x] Setup Dio API client + interceptor + error mapper
- [x] Buat core widgets (button, text field, card, app bar)
- [x] Setup validator & formatter (locale `id_ID`)

### Ditunda (Manual Configuration)

- [ ] Setup Firebase project (`firebase init`, `google-services.json`, `GoogleService-Info.plist`)
- [ ] Setup Google Maps API key (Android Manifest + iOS AppDelegate)
- [ ] Ganti native bundle ID (masih `com.example.demo_pick`)
- [ ] Finalisasi file asset aktual (SVG, JSON lottie, logo PNG)

## Sprint 1: Auth & Home

### Auth
- [x] Splash screen dengan logo animation 1.2s
- [x] Onboarding (3 slides + smooth indicator)
- [x] Login screen (phone +62 + placeholder Google/Apple)
- [x] OTP verification screen (pin code 6 digit + timer 60s + resend)
- [x] Auth BLoC (send OTP, verify OTP, check auth state)
- [x] Setup profile screen (untuk user baru)
- [x] Persistent login (`flutter_secure_storage` untuk token, bukan SharedPreferences)
- [x] Mock mode OTP (`useMock=true`, OTP: `123456`)

### Home
- [x] Home screen layout
- [x] Service grid widget (3 kolom)
- [x] Promo banner carousel (auto-scroll 4 detik)
- [x] Recent orders section
- [x] Nearby restaurants section (horizontal scroll)
- [x] Search bar (navigasi ke search screen)
- [x] Main shell + bottom navigation bar (5 tabs)

## Sprint 2: PickRide

- [x] Location search screen (autocomplete)
- [x] Pick location on map screen (mode mock map)
- [x] Saved places integration
- [x] Choose ride screen (map + route + options)
- [x] Price estimation API call (mock estimation)
- [x] Payment method selector bottom sheet
- [x] Searching driver screen (Lottie animation + fallback)
- [x] Driver found - info card
- [x] Live tracking screen (map + driver marker)
- [ ] WebSocket connection untuk real-time location
- [x] Ride complete screen (rating + tip)
- [x] SOS button
- [x] Share trip link

## Sprint 3: PickFood

- [x] Food home screen (categories + restaurant list)
- [x] Restaurant card widget
- [x] Category filter chips
- [x] Search restoran & makanan
- [x] Restaurant detail screen (info + menu)
- [x] Menu item detail bottom sheet
- [x] Add to cart logic (BLoC/Cubit)
- [x] Cart screen (items, qty, total)
- [x] Cart badge / count indicator sebelum checkout
- [x] Food order confirmation screen
- [x] Food tracking screen (status stepper + map)

## Sprint 4: Payment & Activity

### Payment
- [x] Wallet screen (balance + actions + history)
- [x] Top up screen (amount input + payment method)
- [ ] Top up flow dengan Midtrans/Xendit (butuh integrasi backend)
- [x] Transaction history list
- [x] Payment method management

### Activity
- [x] Activity screen (tabs: ongoing / completed)
- [x] Order card widget
- [x] Order detail screen
- [x] Receipt view

### Notifications
- [ ] FCM setup (Android & iOS) (butuh konfigurasi Firebase)
- [x] Notification center screen
- [ ] Push notification handling (foreground & background) (butuh FCM)
- [x] Deep linking dari notification

## Sprint 5: Chat & Profile

### Chat
- [x] Chat list screen
- [x] Chat room screen
- [x] Message bubble widget
- [x] Quick reply chips
- [x] WebSocket real-time chat
- [x] Image sharing (optional)

### Profile
- [x] Profile screen (header + menu)
- [x] Edit profile screen (name, photo, email)
- [x] Photo picker & upload
- [x] Saved addresses screen (CRUD)
- [x] Settings screen (language, notification toggle)
- [x] Help & FAQ screen
- [x] Logout flow

## Sprint 6: PickSend & Polish

### PickSend
- [x] Send package screen (pickup & delivery address)
- [x] Package detail screen (size selector, photo, notes)
- [x] Send tracking screen

### Polish
- [x] Shimmer loading untuk semua list screens
- [x] Empty state illustrations
- [x] Error handling screens (no internet, server error)
- [x] Pull to refresh
- [x] Smooth page transitions
- [x] Haptic feedback pada button press
- [ ] App icon & splash screen asset
- [ ] Performance profiling & optimization
- [x] Unit tests (BLoC, repository, use cases)
- [x] Widget tests (core widgets)
- [x] Integration tests (critical flows)

---

## Post-Launch
- [ ] Analytics (Firebase Analytics / Mixpanel)
- [ ] Crashlytics
- [ ] A/B testing
- [ ] Dark mode
- [ ] Multi-language (l10n)
- [ ] PickMart feature
- [ ] PickService feature
- [ ] Driver app
- [ ] Admin dashboard
