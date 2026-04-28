# Pick Up - Architecture & Project Structure

## Architecture Pattern
**Clean Architecture + BLoC Pattern**

```
Presentation (UI)  -->  Domain (Business Logic)  -->  Data (Repository)
     |                        |                           |
   Widgets               Use Cases                  API / Local DB
   Screens               Entities                   Models
   BLoC/Cubit            Repositories (abstract)    Data Sources
```

## State Management
- **BLoC / Cubit** untuk state management feature flow (auth, booking, tracking)
- **flutter_riverpod** untuk dependency injection + global app state ringan (theme/session/helper provider)
- Hindari `Provider` legacy, fokus ke kombinasi BLoC + Riverpod

## Folder Structure

```
lib/
|
+-- main.dart                       # App entry point
+-- app.dart                        # MaterialApp configuration
|
+-- core/
|   +-- constants/
|   |   +-- app_colors.dart         # Color palette
|   |   +-- app_typography.dart     # Text styles
|   |   +-- app_spacing.dart        # Padding, margin, radius values
|   |   +-- app_assets.dart         # Asset paths
|   |   +-- api_endpoints.dart      # API base URLs & endpoints
|   |
|   +-- theme/
|   |   +-- app_theme.dart          # ThemeData (light)
|   |   +-- app_theme_dark.dart     # ThemeData (dark) - future
|   |
|   +-- utils/
|   |   +-- validators.dart         # Form validation
|   |   +-- formatters.dart         # Currency, date, phone format
|   |   +-- location_helper.dart    # GPS utilities
|   |
|   +-- widgets/
|   |   +-- pickup_button.dart      # Primary button
|   |   +-- pickup_text_field.dart  # Custom text input
|   |   +-- pickup_card.dart        # Card with shadow
|   |   +-- pickup_app_bar.dart     # Custom app bar
|   |   +-- pickup_bottom_sheet.dart
|   |   +-- loading_overlay.dart
|   |   +-- rating_stars.dart
|   |
|   +-- network/
|   |   +-- api_client.dart         # Dio/http client setup
|   |   +-- api_interceptor.dart    # Auth token, logging
|   |   +-- api_exceptions.dart     # Custom exceptions
|   |
|   +-- router/
|       +-- app_router.dart         # GoRouter configuration
|       +-- route_names.dart        # Named route constants
|
+-- features/
|   |
|   +-- auth/
|   |   +-- data/
|   |   |   +-- models/
|   |   |   |   +-- user_model.dart
|   |   |   +-- repositories/
|   |   |   |   +-- auth_repository_impl.dart
|   |   |   +-- datasources/
|   |   |       +-- auth_remote_datasource.dart
|   |   |       +-- auth_local_datasource.dart
|   |   +-- domain/
|   |   |   +-- entities/
|   |   |   |   +-- user.dart
|   |   |   +-- repositories/
|   |   |   |   +-- auth_repository.dart
|   |   |   +-- usecases/
|   |   |       +-- send_otp.dart
|   |   |       +-- verify_otp.dart
|   |   |       +-- login_google.dart
|   |   |       +-- logout.dart
|   |   +-- presentation/
|   |       +-- bloc/
|   |       |   +-- auth_bloc.dart
|   |       |   +-- auth_event.dart
|   |       |   +-- auth_state.dart
|   |       +-- screens/
|   |       |   +-- splash_screen.dart
|   |       |   +-- onboarding_screen.dart
|   |       |   +-- login_screen.dart
|   |       |   +-- otp_screen.dart
|   |       |   +-- setup_profile_screen.dart
|   |       +-- widgets/
|   |           +-- phone_input.dart
|   |           +-- otp_input.dart
|   |
|   +-- home/
|   |   +-- data/
|   |   +-- domain/
|   |   +-- presentation/
|   |       +-- bloc/
|   |       +-- screens/
|   |       |   +-- home_screen.dart
|   |       +-- widgets/
|   |           +-- service_grid.dart
|   |           +-- promo_banner.dart
|   |           +-- recent_orders.dart
|   |           +-- nearby_restaurants.dart
|   |           +-- search_bar_widget.dart
|   |
|   +-- ride/
|   |   +-- data/
|   |   |   +-- models/
|   |   |   |   +-- ride_model.dart
|   |   |   |   +-- driver_model.dart
|   |   |   |   +-- route_model.dart
|   |   |   +-- repositories/
|   |   |   +-- datasources/
|   |   +-- domain/
|   |   |   +-- entities/
|   |   |   +-- repositories/
|   |   |   +-- usecases/
|   |   |       +-- search_location.dart
|   |   |       +-- get_price_estimate.dart
|   |   |       +-- book_ride.dart
|   |   |       +-- cancel_ride.dart
|   |   |       +-- rate_driver.dart
|   |   +-- presentation/
|   |       +-- bloc/
|   |       |   +-- ride_bloc.dart
|   |       |   +-- location_bloc.dart
|   |       +-- screens/
|   |       |   +-- pick_location_screen.dart
|   |       |   +-- choose_ride_screen.dart
|   |       |   +-- searching_driver_screen.dart
|   |       |   +-- tracking_screen.dart
|   |       |   +-- ride_complete_screen.dart
|   |       +-- widgets/
|   |           +-- location_input.dart
|   |           +-- ride_option_card.dart
|   |           +-- driver_info_card.dart
|   |           +-- map_widget.dart
|   |
|   +-- food/
|   |   +-- data/
|   |   |   +-- models/
|   |   |   |   +-- restaurant_model.dart
|   |   |   |   +-- menu_item_model.dart
|   |   |   |   +-- cart_model.dart
|   |   |   +-- repositories/
|   |   |   +-- datasources/
|   |   +-- domain/
|   |   |   +-- entities/
|   |   |   +-- repositories/
|   |   |   +-- usecases/
|   |   |       +-- get_restaurants.dart
|   |   |       +-- get_menu.dart
|   |   |       +-- place_order.dart
|   |   +-- presentation/
|   |       +-- bloc/
|   |       |   +-- food_bloc.dart
|   |       |   +-- cart_bloc.dart
|   |       +-- screens/
|   |       |   +-- food_home_screen.dart
|   |       |   +-- restaurant_detail_screen.dart
|   |       |   +-- cart_screen.dart
|   |       |   +-- food_tracking_screen.dart
|   |       +-- widgets/
|   |           +-- restaurant_card.dart
|   |           +-- menu_item_tile.dart
|   |           +-- cart_item_tile.dart
|   |           +-- category_chips.dart
|   |
|   +-- send/
|   |   +-- data/
|   |   +-- domain/
|   |   +-- presentation/
|   |       +-- bloc/
|   |       +-- screens/
|   |       |   +-- send_package_screen.dart
|   |       |   +-- package_detail_screen.dart
|   |       |   +-- send_tracking_screen.dart
|   |       +-- widgets/
|   |
|   +-- payment/
|   |   +-- data/
|   |   +-- domain/
|   |   +-- presentation/
|   |       +-- bloc/
|   |       |   +-- payment_bloc.dart
|   |       |   +-- wallet_bloc.dart
|   |       +-- screens/
|   |       |   +-- wallet_screen.dart
|   |       |   +-- top_up_screen.dart
|   |       |   +-- transfer_screen.dart
|   |       |   +-- payment_method_screen.dart
|   |       +-- widgets/
|   |           +-- balance_card.dart
|   |           +-- transaction_tile.dart
|   |
|   +-- activity/
|   |   +-- data/
|   |   +-- domain/
|   |   +-- presentation/
|   |       +-- screens/
|   |       |   +-- activity_screen.dart
|   |       |   +-- order_detail_screen.dart
|   |       +-- widgets/
|   |           +-- order_card.dart
|   |
|   +-- chat/
|   |   +-- data/
|   |   +-- domain/
|   |   +-- presentation/
|   |       +-- screens/
|   |       |   +-- chat_list_screen.dart
|   |       |   +-- chat_room_screen.dart
|   |       +-- widgets/
|   |           +-- message_bubble.dart
|   |           +-- quick_reply_chips.dart
|   |
|   +-- profile/
|       +-- data/
|       +-- domain/
|       +-- presentation/
|           +-- screens/
|           |   +-- profile_screen.dart
|           |   +-- edit_profile_screen.dart
|           |   +-- saved_addresses_screen.dart
|           |   +-- settings_screen.dart
|           |   +-- help_screen.dart
|           +-- widgets/
|               +-- profile_header.dart
|               +-- menu_item_tile.dart
|
+-- l10n/                           # Localization
    +-- app_id.arb                  # Bahasa Indonesia
    +-- app_en.arb                  # English
```

## Key Dependencies (pubspec.yaml)

```yaml
dependencies:
  flutter:
    sdk: flutter

  # State Management
  flutter_bloc: ^9.0.0
  equatable: ^2.0.7

  # Navigation
  go_router: ^latest
  flutter_riverpod: ^latest

  # Network
  dio: ^5.4.0

  # Local Storage
  shared_preferences: ^2.3.0
  flutter_secure_storage: ^9.2.0

  # Maps
  google_maps_flutter: ^2.9.0
  geolocator: ^13.0.0
  geocoding: ^3.0.0

  # Firebase
  firebase_core: ^3.0.0
  firebase_auth: ^5.0.0
  firebase_messaging: ^15.0.0
  cloud_firestore: ^5.0.0

  # UI
  shadcn_ui: ^latest
  flutter_form_builder: ^latest
  cached_network_image: ^latest
  flutter_svg: ^latest
  lottie: ^latest
  fl_chart: ^latest
  shimmer: ^3.0.0

  # Utils
  intl: ^0.19.0
  url_launcher: ^6.3.0
  image_picker: ^1.1.0
  permission_handler: ^11.3.0

  # Icons
  iconsax_flutter: ^1.0.0
```

## Komponen UI Prioritas (`shadcn_ui`)

Gunakan `shadcn_ui` sebagai building blocks, lalu bungkus ke komponen internal `pickup_*` agar desain tetap konsisten lintas fitur:

- `ShadButton` -> wrapper di `pickup_button.dart` (tinggi 52, radius 12, state loading/disabled)
- `ShadInput` / form controls -> wrapper di `pickup_text_field.dart` + integrasi `flutter_form_builder`
- `ShadCard` -> wrapper di `pickup_card.dart` untuk list, promo, dan summary
- `ShadBadge` -> status order/payment
- `ShadSheet` / `ShadDialog` -> payment picker, konfirmasi cancel
- `ShadTabs` -> Activity (ongoing/completed), riwayat transaksi
- `ShadSkeleton` -> loading state list (home, restoran, history)

Catatan: seluruh wrapper tetap wajib mengikuti spec `plan/05_design_system.md` + aksesibilitas Android di `plan/10_android_accessibility.md`.

## Naming Convention
- **Files**: snake_case (`home_screen.dart`)
- **Classes**: PascalCase (`HomeScreen`)
- **Variables**: camelCase (`userName`)
- **Constants**: camelCase (`primaryColor`) atau SCREAMING_SNAKE_CASE untuk env
- **BLoC Events**: PascalCase verb (`RideBooked`, `OtpSent`)
- **BLoC States**: PascalCase adjective (`RideLoading`, `RideSuccess`)
