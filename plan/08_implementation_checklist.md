# DELIVRY - Implementation Checklist (React Native)

## Status: Fresh Start
> Migrasi dari Flutter ke React Native. Semua checklist di-reset.

## Pre-Development Setup

- [ ] Init React Native project (React Native CLI atau Expo)
- [ ] Setup TypeScript configuration (strict mode)
- [ ] Setup folder structure sesuai `04_architecture.md`
- [ ] Install core dependencies (React Navigation, React Query, Zustand, Reanimated, etc.)
- [ ] Setup theme constants (`colors.ts`, `typography.ts`, `spacing.ts`) sesuai `type-font,color.md`
- [ ] Install & link Plus Jakarta Sans font
- [ ] Setup React Navigation (Stack + Bottom Tab + Native Stack)
- [ ] Setup Axios API client + interceptors + error handling
- [ ] Buat core UI components (`Button`, `Input`, `Card`, `Badge`, `Skeleton`)
- [ ] Setup validator & formatter (locale `id_ID`, date-fns)
- [ ] Setup ESLint + Prettier
- [ ] Setup React Query client & provider

### Ditunda (Manual Configuration)

- [ ] Setup Firebase project (`google-services.json`, `GoogleService-Info.plist`)
- [ ] Setup Google Maps API key (Android Manifest + iOS Info.plist)
- [ ] Ganti native bundle ID (com.delivry.app)
- [ ] Finalisasi file asset aktual (SVG, JSON lottie, logo PNG)
- [ ] Setup code signing (iOS certificates, Android keystore)

## Sprint 1: Auth & Home

### Auth
- [ ] Splash screen dengan logo DELIVRY (ungu, animation 1.2s)
- [ ] Onboarding (3 slides + smooth indicator, Reanimated)
- [ ] Login screen (phone +62 + Google/Apple sign-in buttons)
- [ ] OTP verification screen (6 digit + timer 60s + resend)
- [ ] Auth hooks (`useAuth`, `useSendOTP`, `useVerifyOTP`)
- [ ] Setup profile screen (untuk user baru)
- [ ] Persistent login (react-native-keychain untuk token)
- [ ] Mock mode OTP (`useMock=true`, OTP: `123456`)

### Home
- [ ] Home screen layout (sesuai `03_user_flow.md`)
- [ ] Service grid widget (4 kolom x 2 baris, sesuai pamflet)
- [ ] DELIVRY brand banner
- [ ] Promo banner carousel (auto-scroll 4 detik)
- [ ] Recent orders section
- [ ] Nearby restaurants section (horizontal FlatList)
- [ ] Search bar (navigasi ke search screen)
- [ ] Main Bottom Tab Navigator (5 tabs: Beranda, Pesanan, Dompet, Chat, Akun)

## Sprint 2: Ride

- [ ] Location search screen (autocomplete, Google Places)
- [ ] Pick location on map screen (react-native-maps)
- [ ] Saved places integration
- [ ] Choose ride screen (map + route + options)
- [ ] Price estimation API call (mock estimation)
- [ ] Payment method selector (Bottom Sheet)
- [ ] Searching driver screen (Lottie animation + fallback)
- [ ] Driver found - info card
- [ ] Live tracking screen (map + driver marker, animated)
- [ ] WebSocket connection untuk real-time location
- [ ] Ride complete screen (rating + tip)
- [ ] SOS button
- [ ] Share trip link

### iOS Specific
- [ ] iOS Live Activity untuk tracking (ActivityKit native module)
- [ ] iOS Dynamic Island compact + expanded view

## Sprint 3: Food

- [ ] Food home screen (categories + restaurant list)
- [ ] Restaurant card component
- [ ] Category filter chips
- [ ] Search restoran & makanan
- [ ] Restaurant detail screen (info + menu)
- [ ] Menu item detail (Bottom Sheet)
- [ ] Cart logic (Zustand store)
- [ ] Cart screen (items, qty, total)
- [ ] Cart badge / count indicator
- [ ] Food order confirmation screen
- [ ] Food tracking screen (status stepper + map)

## Sprint 4: Payment & Activity

### Payment
- [ ] Wallet screen (DELIVRY Pay — balance + actions + history)
- [ ] Top up screen (amount input + payment method)
- [ ] Top up flow (Midtrans/Xendit integration)
- [ ] Transaction history list
- [ ] Payment method management
- [ ] Apple Pay / Google Pay integration

### Activity
- [ ] Activity screen (tabs: ongoing / completed)
- [ ] Order card component
- [ ] Order detail screen
- [ ] Receipt view

### Notifications
- [ ] Firebase Messaging setup (Android & iOS)
- [ ] Notification center screen
- [ ] Push notification handling (foreground & background)
- [ ] Deep linking dari notification

## Sprint 5: Chat & Profile

### Chat
- [ ] Chat list screen
- [ ] Chat room screen
- [ ] Message bubble component
- [ ] Quick reply chips
- [ ] WebSocket real-time chat
- [ ] Image sharing

### Profile
- [ ] Profile screen (header + menu)
- [ ] Edit profile screen (name, photo, email)
- [ ] Photo picker & upload (react-native-image-picker)
- [ ] Saved addresses screen (CRUD)
- [ ] Settings screen (language, notification toggle)
- [ ] Help & FAQ screen
- [ ] Logout flow

## Sprint 6: Send/Delivery & Polish

### Send/Delivery
- [ ] Send package screen (pickup & delivery address)
- [ ] Package detail screen (size selector, photo, notes)
- [ ] Send tracking screen

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
