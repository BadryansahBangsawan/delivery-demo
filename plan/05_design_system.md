# Pick Up - Design System & UI Components

## Design Philosophy
> "Putih bersih, hijau segar, semuanya jelas."

Setiap elemen UI harus terasa ringan dan tidak membebani mata.
Hindari gradient, pattern background, atau ornamen berlebihan.

---

## Spacing System (8px grid)

| Token  | Value |
|--------|-------|
| xs     | 4px   |
| sm     | 8px   |
| md     | 12px  |
| base   | 16px  |
| lg     | 20px  |
| xl     | 24px  |
| 2xl    | 32px  |
| 3xl    | 40px  |
| 4xl    | 48px  |

## Border Radius

| Token    | Value |
|----------|-------|
| sm       | 8px   |
| md       | 12px  |
| lg       | 16px  |
| xl       | 20px  |
| full     | 999px |

---

## Component Specs

### 1. App Bar
- Background: White (#FFFFFF)
- Elevation: 0 (flat) atau subtle shadow (0, 1, 4, rgba(0,0,0,0.05))
- Title: 18sp SemiBold, Charcoal
- Actions: Icon 24px, Charcoal
- Bottom border: 1px #F0F0F0 (optional)

### 2. Bottom Navigation Bar
- Background: White
- Height: 64px + safe area
- Shadow: 0 -2px 10px rgba(0,0,0,0.06)
- Active icon: Primary Green, filled
- Inactive icon: #BDBDBD, outlined
- Label: 12sp, active = Primary, inactive = #BDBDBD
- Items: Home, Activity, Payment, Chat, Account

### 3. Primary Button (CTA)
- Background: Primary Green (#00C853)
- Text: White, 16sp SemiBold
- Height: 52px
- Border radius: 12px
- Full width (horizontal padding 16px)
- Pressed: darken 10%
- Disabled: opacity 40%
- Elevation: none (flat)

### 4. Secondary Button
- Background: White
- Border: 1.5px #E0E0E0
- Text: Charcoal, 16sp Medium
- Height: 48px
- Border radius: 12px

### 5. Text Field / Input
- Background: #FAFAFA
- Border: 1.5px #E8E8E8 (idle), Primary Green (focused)
- Border radius: 12px
- Height: 52px
- Padding: 16px horizontal
- Label: 14sp, #757575 (floating)
- Text: 16sp, Charcoal
- Error: border Red, helper text Red 12sp

### 6. Card
- Background: White
- Border radius: 16px
- Shadow: 0 2px 8px rgba(0,0,0,0.06)
- Padding: 16px
- Tidak ada border (shadow saja)

### 7. Search Bar (Home)
- Background: #F5F5F5
- Border radius: 12px
- Height: 48px
- Icon: Search 20px, #BDBDBD
- Placeholder: "Mau kemana?", 16sp, #BDBDBD
- Tap -> navigate ke search screen

### 8. Service Grid Item
- Size: equal width (grid 3 kolom)
- Icon: 40px, warna per-service
- Label: 12sp Medium, Charcoal
- Background: White card dengan subtle shadow
- Border radius: 12px
- Padding: 12px vertical

### 9. Promo Banner
- Height: 140px
- Border radius: 12px
- Full bleed image dengan overlay gradient (optional)
- Auto-scroll 4 detik
- Dot indicator: active = Primary, inactive = #E0E0E0

### 10. List Tile (Order/Transaction)
- Height: auto (min 64px)
- Leading: Icon atau image 40px, border radius 8px
- Title: 16sp Medium, Charcoal
- Subtitle: 14sp Regular, #757575
- Trailing: price atau status badge
- Divider: 1px #F0F0F0

### 11. Bottom Sheet
- Background: White
- Top handle: 36x4px, #E0E0E0, border radius full, centered
- Border radius top: 20px
- Padding top: 12px (handle area) + 16px
- Max height: 90% screen
- Backdrop: rgba(0,0,0,0.3)

### 12. Chip / Tag
- Height: 32px
- Border radius: full (999px)
- Padding: 8px 16px
- Default: bg #F5F5F5, text #757575
- Selected: bg Primary Green, text White
- Font: 14sp Medium

### 13. Rating Stars
- Size: 24px per star
- Filled: #FFB800 (amber)
- Empty: #E0E0E0
- Tap area: 40px (larger hit target)

### 14. Avatar
- Size: 40px (small), 56px (medium), 80px (large)
- Border radius: full (circle)
- Border: 2px White (saat overlay di atas warna)
- Placeholder: initials, bg #F0F0F0

### 15. Status Badge
- Border radius: full
- Padding: 4px 10px
- Font: 12sp Medium
- Variants:
  - Active/Success: bg #E8F5E9, text #2E7D32
  - Pending/Warning: bg #FFF3E0, text #E65100
  - Error/Cancelled: bg #FFEBEE, text #C62828
  - Info: bg #E3F2FD, text #1565C0

---

## Komponen `shadcn_ui` yang Dipakai

Pakai komponen `shadcn_ui` sebagai dasar, lalu override token warna/spacing supaya tetap sesuai brand Pick Up.

| Kebutuhan UI Pick Up | Komponen Dasar `shadcn_ui` | Integrasi di App |
|---|---|---|
| CTA utama (Login, Pesan) | `ShadButton` | Dibungkus di `pickup_button.dart` (height 52, radius 12, hijau #00C853) |
| Input form (HP, OTP helper, profile) | `ShadInput` + komponen form `flutter_form_builder` | Dibungkus di `pickup_text_field.dart` |
| Card konten | `ShadCard` | Dibungkus di `pickup_card.dart` |
| Badge status | `ShadBadge` | Status order/payment (active, pending, cancelled) |
| Tabs riwayat | `ShadTabs` | Activity: ongoing/completed |
| Bottom sheet / dialog konfirmasi | `ShadSheet`, `ShadDialog` | Payment selector, cancel confirmation |
| Loading skeleton | `ShadSkeleton` | Home sections, list restoran, riwayat transaksi |

Prinsip: API komponen umum tetap lewat `core/widgets/pickup_*` agar migrasi toolkit tidak menyentuh seluruh fitur.

## Accessibility Baseline (Android + iOS)

- Touch target minimum **48dp** (Android) dan minimal **44pt** iOS.
- Kontras teks minimum **4.5:1**, elemen non-teks minimum **3:1**.
- Jangan andalkan gesture-only action; sediakan tombol alternatif (contoh swipe delete + ikon hapus).
- Semua ikon fungsional wajib punya label semantics, ikon dekoratif harus diset dekoratif (hidden dari screen reader).
- Seluruh detail Android accessibility mengacu ke [plan/10_android_accessibility.md](10_android_accessibility.md).

---

## Animations & Transitions

- **Page transition**: Slide dari kanan (iOS style), fade + slide up (Android)
- **Bottom sheet**: Slide up 300ms, ease-out
- **Button press**: Scale 0.97, 100ms
- **Loading**: Shimmer effect untuk skeleton screens
- **Searching driver**: Lottie animation (radar/pulse)
- **Success**: Lottie checkmark animation
- **Map marker**: Subtle bounce saat appear

## Iconography
- Style: **Outlined / Linear** (bukan filled)
- Recommended: Iconsax icon set (modern, consistent)
- Size: 20px (compact), 24px (default), 28px (emphasis)
- Stroke: 1.5px

## Illustration Style
- Flat illustration, minimal detail
- Warna sesuai palette (green, white, gray tones)
- Digunakan di: onboarding, empty states, error pages
