# DELIVRY - Architecture & Project Structure

## Architecture Pattern
**Feature-based Architecture + React Query + Zustand**

```
Screens (UI)  -->  Hooks (Business Logic)  -->  Services (API/Data)
     |                     |                           |
  Components          React Query               API Client
  Navigation          Zustand Store              Local Storage
  Forms               Custom Hooks               WebSocket
```

## State Management
- **React Query (TanStack Query)** untuk server state (API calls, caching, sync)
- **Zustand** untuk client state ringan (auth session, theme, UI state)
- **React Hook Form + Zod** untuk form state & validation
- Hindari Redux — terlalu boilerplate untuk kebutuhan ini

## Navigation
- **React Navigation v7** (@react-navigation/native)
  - Stack Navigator: flow screens (auth, booking)
  - Bottom Tab Navigator: main tabs
  - Native Stack: native transitions per-platform

## Folder Structure

```
src/
|
+-- app/                              # App entry & providers
|   +-- App.tsx                       # Root component
|   +-- providers.tsx                 # Query, Navigation, Theme providers
|
+-- assets/                           # Static assets
|   +-- fonts/                        # Plus Jakarta Sans font files
|   +-- images/                       # PNG/JPG assets
|   +-- icons/                        # Custom SVG icons (jika ada)
|   +-- lottie/                       # Lottie animation files
|
+-- components/                       # Shared UI components
|   +-- ui/                           # Base design system components
|   |   +-- Button.tsx                # DelivryButton
|   |   +-- Input.tsx                 # DelivryInput
|   |   +-- Card.tsx                  # DelivryCard
|   |   +-- Badge.tsx                 # Status badges
|   |   +-- Avatar.tsx                # User avatar
|   |   +-- Skeleton.tsx             # Loading skeleton
|   |   +-- BottomSheet.tsx          # Bottom sheet wrapper
|   |   +-- Chip.tsx                  # Filter chips
|   +-- layout/                       # Layout components
|   |   +-- SafeAreaWrapper.tsx       # Safe area with consistent padding
|   |   +-- ScreenWrapper.tsx        # Standard screen container
|   +-- feedback/                     # Loading, error, empty states
|   |   +-- LoadingOverlay.tsx
|   |   +-- ErrorView.tsx
|   |   +-- EmptyState.tsx
|
+-- constants/                        # App-wide constants
|   +-- colors.ts                     # Color palette
|   +-- typography.ts                 # Font sizes, weights, families
|   +-- spacing.ts                    # Spacing tokens
|   +-- api.ts                        # API base URLs & endpoints
|
+-- features/                         # Feature modules
|   |
|   +-- auth/
|   |   +-- screens/
|   |   |   +-- SplashScreen.tsx
|   |   |   +-- OnboardingScreen.tsx
|   |   |   +-- LoginScreen.tsx
|   |   |   +-- OTPScreen.tsx
|   |   |   +-- SetupProfileScreen.tsx
|   |   +-- components/
|   |   |   +-- PhoneInput.tsx
|   |   |   +-- OTPInput.tsx
|   |   +-- hooks/
|   |   |   +-- useAuth.ts
|   |   |   +-- useSendOTP.ts
|   |   |   +-- useVerifyOTP.ts
|   |   +-- services/
|   |   |   +-- authService.ts
|   |   +-- types.ts
|   |
|   +-- home/
|   |   +-- screens/
|   |   |   +-- HomeScreen.tsx
|   |   +-- components/
|   |   |   +-- ServiceGrid.tsx
|   |   |   +-- PromoBanner.tsx
|   |   |   +-- RecentOrders.tsx
|   |   |   +-- NearbyRestaurants.tsx
|   |   |   +-- SearchBar.tsx
|   |   +-- hooks/
|   |   |   +-- useHome.ts
|   |
|   +-- ride/
|   |   +-- screens/
|   |   |   +-- PickLocationScreen.tsx
|   |   |   +-- ChooseRideScreen.tsx
|   |   |   +-- SearchingDriverScreen.tsx
|   |   |   +-- TrackingScreen.tsx
|   |   |   +-- RideCompleteScreen.tsx
|   |   +-- components/
|   |   |   +-- LocationInput.tsx
|   |   |   +-- RideOptionCard.tsx
|   |   |   +-- DriverInfoCard.tsx
|   |   |   +-- MapView.tsx
|   |   +-- hooks/
|   |   |   +-- useRide.ts
|   |   |   +-- useLocation.ts
|   |   |   +-- usePriceEstimate.ts
|   |   +-- services/
|   |   |   +-- rideService.ts
|   |   +-- types.ts
|   |
|   +-- food/
|   |   +-- screens/
|   |   |   +-- FoodHomeScreen.tsx
|   |   |   +-- RestaurantDetailScreen.tsx
|   |   |   +-- CartScreen.tsx
|   |   |   +-- FoodTrackingScreen.tsx
|   |   +-- components/
|   |   |   +-- RestaurantCard.tsx
|   |   |   +-- MenuItemTile.tsx
|   |   |   +-- CartItemTile.tsx
|   |   |   +-- CategoryChips.tsx
|   |   +-- hooks/
|   |   |   +-- useRestaurants.ts
|   |   |   +-- useMenu.ts
|   |   |   +-- useCart.ts
|   |   +-- services/
|   |   |   +-- foodService.ts
|   |   +-- types.ts
|   |
|   +-- send/
|   |   +-- screens/
|   |   |   +-- SendPackageScreen.tsx
|   |   |   +-- PackageDetailScreen.tsx
|   |   |   +-- SendTrackingScreen.tsx
|   |   +-- components/
|   |   +-- hooks/
|   |   +-- services/
|   |
|   +-- payment/
|   |   +-- screens/
|   |   |   +-- WalletScreen.tsx
|   |   |   +-- TopUpScreen.tsx
|   |   |   +-- TransferScreen.tsx
|   |   |   +-- PaymentMethodScreen.tsx
|   |   +-- components/
|   |   |   +-- BalanceCard.tsx
|   |   |   +-- TransactionTile.tsx
|   |   +-- hooks/
|   |   |   +-- useWallet.ts
|   |   |   +-- useTransactions.ts
|   |   +-- services/
|   |   |   +-- paymentService.ts
|   |
|   +-- activity/
|   |   +-- screens/
|   |   |   +-- ActivityScreen.tsx
|   |   |   +-- OrderDetailScreen.tsx
|   |   +-- components/
|   |   |   +-- OrderCard.tsx
|   |   +-- hooks/
|   |
|   +-- chat/
|   |   +-- screens/
|   |   |   +-- ChatListScreen.tsx
|   |   |   +-- ChatRoomScreen.tsx
|   |   +-- components/
|   |   |   +-- MessageBubble.tsx
|   |   |   +-- QuickReplyChips.tsx
|   |   +-- hooks/
|   |   |   +-- useChat.ts
|   |
|   +-- profile/
|       +-- screens/
|       |   +-- ProfileScreen.tsx
|       |   +-- EditProfileScreen.tsx
|       |   +-- SavedAddressesScreen.tsx
|       |   +-- SettingsScreen.tsx
|       |   +-- HelpScreen.tsx
|       +-- components/
|       |   +-- ProfileHeader.tsx
|       |   +-- MenuItemTile.tsx
|       +-- hooks/
|
+-- hooks/                            # Shared hooks
|   +-- useAppState.ts                # App foreground/background
|   +-- useKeyboard.ts               # Keyboard visibility
|   +-- useLocation.ts               # GPS location
|   +-- useNetworkStatus.ts          # Online/offline detection
|
+-- lib/                              # Utilities & configurations
|   +-- api.ts                        # Axios/fetch client setup
|   +-- queryClient.ts               # React Query client config
|   +-- storage.ts                    # AsyncStorage / SecureStore helpers
|   +-- validators.ts                # Zod schemas
|   +-- formatters.ts                # Currency, date, phone formatters
|
+-- navigation/                       # Navigation configuration
|   +-- RootNavigator.tsx            # Root stack (auth/main switch)
|   +-- MainTabNavigator.tsx         # Bottom tab navigator
|   +-- AuthStackNavigator.tsx       # Auth flow stack
|   +-- RideStackNavigator.tsx       # Ride booking flow
|   +-- FoodStackNavigator.tsx       # Food ordering flow
|   +-- types.ts                      # Navigation param types
|
+-- store/                            # Zustand stores
|   +-- authStore.ts                  # Auth state (token, user)
|   +-- cartStore.ts                  # Food cart state
|   +-- locationStore.ts             # Current GPS location
|
+-- theme/                            # Theme configuration
|   +-- index.ts                      # Combined theme export
|   +-- light.ts                      # Light theme tokens
|   +-- dark.ts                       # Dark theme tokens (Phase 2)
|
+-- types/                            # Shared TypeScript types
    +-- api.ts                        # API response types
    +-- navigation.ts                 # Navigation params
    +-- models.ts                     # Data models (User, Ride, Order)
```

## Key Dependencies (package.json)

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-native": "^0.76.0",

    "// Navigation": "",
    "@react-navigation/native": "^7.0.0",
    "@react-navigation/native-stack": "^7.0.0",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "react-native-screens": "^4.0.0",
    "react-native-safe-area-context": "^5.0.0",

    "// State & Data": "",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^5.0.0",
    "axios": "^1.7.0",

    "// Forms": "",
    "react-hook-form": "^7.0.0",
    "@hookform/resolvers": "^3.0.0",
    "zod": "^3.23.0",

    "// Maps": "",
    "react-native-maps": "^1.18.0",
    "react-native-maps-directions": "^1.9.0",

    "// UI": "",
    "@gorhom/bottom-sheet": "^5.0.0",
    "react-native-reanimated": "^3.16.0",
    "react-native-gesture-handler": "^2.20.0",
    "react-native-svg": "^15.0.0",
    "lottie-react-native": "^7.0.0",
    "react-native-skeleton-placeholder": "^5.0.0",
    "react-native-fast-image": "^8.0.0",
    "lucide-react-native": "^0.460.0",

    "// Storage": "",
    "@react-native-async-storage/async-storage": "^2.0.0",
    "react-native-keychain": "^9.0.0",

    "// Notifications": "",
    "@react-native-firebase/app": "^21.0.0",
    "@react-native-firebase/messaging": "^21.0.0",

    "// Auth": "",
    "@react-native-google-signin/google-signin": "^13.0.0",

    "// Utils": "",
    "react-native-image-picker": "^7.0.0",
    "react-native-permissions": "^5.0.0",
    "date-fns": "^4.0.0",
    "react-native-haptic-feedback": "^2.3.0"
  }
}
```

## Naming Convention
- **Files**: PascalCase for components (`HomeScreen.tsx`), camelCase for utils/hooks (`useAuth.ts`)
- **Components**: PascalCase (`HomeScreen`)
- **Hooks**: camelCase with `use` prefix (`useAuth`)
- **Variables**: camelCase (`userName`)
- **Constants**: camelCase (`primaryColor`) atau SCREAMING_SNAKE_CASE untuk env
- **Types/Interfaces**: PascalCase (`User`, `RideEstimate`)
- **Folders**: kebab-case atau camelCase (consistent within project)
