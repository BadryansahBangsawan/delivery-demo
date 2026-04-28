# DELIVRY - Implementation Checklist (React Native)

## Status: In Progress (Sprint 1-6 Partial)
> Migrasi dari Flutter ke React Native berjalan. Auth/Home sudah jalan, flow Ride/Food/Payment/Activity/Chat/Profile/Send sudah tersedia dengan mock data.

## Pre-Development Setup

- [x] Init React Native project (React Native CLI atau Expo)
- [x] Setup TypeScript configuration (strict mode)
- [x] Setup folder structure sesuai `04_architecture.md`
- [ ] Install core dependencies (React Navigation, React Query, Zustand, Reanimated, etc.)
- [x] Setup theme constants (`colors.ts`, `typography.ts`, `spacing.ts`) sesuai `type-font,color.md`
- [x] Install & link Plus Jakarta Sans font
- [x] Setup React Navigation (Stack + Bottom Tab + Native Stack)
- [ ] Setup Axios API client + interceptors + error handling
- [ ] Buat core UI components (`Button`, `Input`, `Card`, `Badge`, `Skeleton`)
- [ ] Setup validator & formatter (locale `id_ID`, date-fns)
- [x] Setup ESLint + Prettier
- [ ] Setup React Query client & provider

### Ditunda (Manual Configuration)

- [ ] Setup Firebase project (`google-services.json`, `GoogleService-Info.plist`)
- [ ] Setup Google Maps API key (Android Manifest + iOS Info.plist)
- [ ] Ganti native bundle ID (com.delivry.app)
- [ ] Finalisasi file asset aktual (SVG, JSON lottie, logo PNG)
- [ ] Setup code signing (iOS certificates, Android keystore)

## Sprint 1: Auth & Home

### Auth
- [x] Splash screen dengan logo DELIVRY (ungu, animation 1.2s)
- [x] Onboarding (3 slides + smooth indicator, Reanimated)
- [x] Login screen (phone +62 + Google/Apple sign-in buttons)
- [x] OTP verification screen (6 digit + timer 60s + resend)
- [ ] Auth hooks (`useAuth`, `useSendOTP`, `useVerifyOTP`)
- [ ] Setup profile screen (untuk user baru)
- [ ] Persistent login (react-native-keychain untuk token)
- [x] Mock mode OTP (`useMock=true`, OTP: `123456`)

### Home
- [x] Home screen layout (sesuai `03_user_flow.md`)
- [x] Service grid widget (4 kolom x 2 baris, sesuai pamflet)
- [x] DELIVRY brand banner
- [ ] Promo banner carousel (auto-scroll 4 detik)
- [x] Recent orders section
- [x] Nearby restaurants section (horizontal FlatList)
- [x] Search bar (navigasi ke search screen)
- [x] Main Bottom Tab Navigator (5 tabs: Beranda, Pesanan, Dompet, Chat, Akun)

## Sprint 2: Ride

- [ ] Location search screen (autocomplete, Google Places)
- [ ] Pick location on map screen (react-native-maps)
- [ ] Saved places integration
- [x] Choose ride screen (map + route + options)
- [x] Price estimation API call (mock estimation)
- [ ] Payment method selector (Bottom Sheet)
- [ ] Searching driver screen (Lottie animation + fallback)
- [x] Driver found - info card
- [ ] Live tracking screen (map + driver marker, animated)
- [ ] WebSocket connection untuk real-time location
- [x] Ride complete screen (rating + tip)
- [x] SOS button
- [x] Share trip link

### iOS Specific
- [ ] iOS Live Activity untuk tracking (ActivityKit native module)
- [ ] iOS Dynamic Island compact + expanded view

## Sprint 3: Food

- [x] Food home screen (categories + restaurant list)
- [ ] Restaurant card component
- [x] Category filter chips
- [x] Search restoran & makanan
- [x] Restaurant detail screen (info + menu)
- [ ] Menu item detail (Bottom Sheet)
- [ ] Cart logic (Zustand store)
- [x] Cart screen (items, qty, total)
- [ ] Cart badge / count indicator
- [x] Food order confirmation screen
- [x] Food tracking screen (status stepper + map)

## Sprint 4: Payment & Activity

### Payment
- [x] Wallet screen (DELIVRY Pay — balance + actions + history)
- [x] Top up screen (amount input + payment method)
- [ ] Top up flow (Midtrans/Xendit integration)
- [x] Transaction history list
- [x] Payment method management
- [ ] Apple Pay / Google Pay integration

### Activity
- [x] Activity screen (tabs: ongoing / completed)
- [x] Order card component
- [x] Order detail screen
- [x] Receipt view

### Notifications
- [ ] Firebase Messaging setup (Android & iOS)
- [ ] Notification center screen
- [ ] Push notification handling (foreground & background)
- [ ] Deep linking dari notification

## Sprint 5: Chat & Profile

### Chat
- [x] Chat list screen
- [x] Chat room screen
- [x] Message bubble component
- [x] Quick reply chips
- [ ] WebSocket real-time chat
- [ ] Image sharing

### Profile
- [x] Profile screen (header + menu)
- [x] Edit profile screen (name, photo, email)
- [ ] Photo picker & upload (react-native-image-picker)
- [ ] Saved addresses screen (CRUD)
- [x] Settings screen (language, notification toggle)
- [x] Help & FAQ screen
- [ ] Logout flow

## Sprint 6: Send/Delivery & Polish

### Send/Delivery
- [x] Send package screen (pickup & delivery address)
- [x] Package detail screen (size selector, photo, notes)
- [x] Send tracking screen

### Polish
- [ ] Skeleton loading untuk semua list screens
- [ ] Empty state illustrations
- [ ] Error handling screens (no internet, server error)
- [ ] Pull to refresh
- [ ] Smooth page transitions (Reanimated shared transitions)
- [ ] Haptic feedback pada button press
- [ ] App icon & splash screen asset
- [ ] Performance profiling & optimization (Flipper, Hermes)
- [ ] Unit tests (hooks, services, stores)
- [ ] Component tests (React Native Testing Library)
- [ ] E2E tests (Detox atau Maestro)

### iOS-Specific Setup
- [ ] Set bundle ID di Xcode (com.delivry.app)
- [ ] Enable "Sign In with Apple" capability
- [ ] Konfigurasi APNS key untuk Firebase Messaging
- [ ] Info.plist usage descriptions (location, camera, photo)
- [ ] PrivacyInfo.xcprivacy (iOS 17+)
- [ ] Set minimum iOS deployment target = 15.0

### Android-Specific Setup
- [ ] Set package name (com.delivry.app)
- [ ] Android permissions di AndroidManifest.xml
- [ ] ProGuard rules untuk production build
- [ ] Set minimum SDK = 24 (Android 7.0)

---

## Post-Launch
- [ ] Analytics (Firebase Analytics / Mixpanel)
- [ ] Crashlytics
- [ ] A/B testing
- [ ] Dark mode
- [ ] Multi-language (i18n — react-i18next)
- [ ] Mart feature
- [ ] Service feature (jasa)
- [ ] Driver app
- [ ] Admin dashboard (web)
