# DELIVRY - Design System & UI Components

## Design Philosophy
> "Putih bersih, ungu premium, semuanya jelas."

Setiap elemen UI harus terasa ringan, premium, dan tidak membebani mata.
Hindari gradient berlebihan, pattern background, atau ornamen yang tidak perlu.
Warna ungu (#7B2FF2) memberikan kesan tech & trust — gunakan secara strategis.

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

### 1. Header / Navigation Bar
- Background: White (#FFFFFF)
- Elevation: 0 (flat) atau subtle shadow (0, 1, 4, rgba(0,0,0,0.05))
- Title: 18px SemiBold, Charcoal
- Actions: Icon 24px, Charcoal
- Bottom border: 1px #F0F0F0 (optional)

### 2. Bottom Navigation Bar
- Background: White
- Height: 64px + safe area
- Shadow: 0 -2px 10px rgba(0,0,0,0.06)
- Active icon: Primary Purple (#7B2FF2), filled
- Inactive icon: #9CA3AF, outlined
- Label: 12px, active = Primary, inactive = #9CA3AF
- Items: Beranda, Pesanan, Dompet, Chat, Akun

### 3. Primary Button (CTA)
- Background: Primary Purple (#7B2FF2)
- Text: White, 16px SemiBold
- Height: 52px
- Border radius: 12px
- Full width (horizontal padding 16px)
- Pressed: darken 10% (#5A1DB8)
- Disabled: opacity 40%
- Elevation: none (flat)

### 4. Secondary Button
- Background: White
- Border: 1.5px #E5E7EB
- Text: Charcoal, 16px Medium
- Height: 48px
- Border radius: 12px

### 5. Text Field / Input
- Background: #FAFAFA
- Border: 1.5px #E5E7EB (idle), Primary Purple (focused)
- Border radius: 12px
- Height: 52px
- Padding: 16px horizontal
- Label: 14px, #6B7280 (floating)
- Text: 16px, Charcoal
- Error: border Red (#EF4444), helper text Red 12px

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
- Icon: Search 20px, #9CA3AF
- Placeholder: "Mau ke mana?", 16px, #9CA3AF
- Tap -> navigate ke search screen

### 8. Service Grid Item
- Size: equal width (grid 4 kolom, 2 baris)
- Icon: 40px, warna per-service (sesuai pamflet)
- Label: 12px Medium, Charcoal
- Background: White card dengan subtle shadow
- Border radius: 12px
- Padding: 12px vertical

### 9. Promo Banner
- Height: 140px
- Border radius: 12px
- Full bleed image atau gradient ungu (#7B2FF2 → #5A1DB8) dengan overlay
- Auto-scroll 4 detik
- Dot indicator: active = Primary, inactive = #E5E7EB

### 10. List Tile (Order/Transaction)
- Height: auto (min 64px)
- Leading: Icon atau image 40px, border radius 8px
- Title: 16px Medium, Charcoal
- Subtitle: 14px Regular, #6B7280
- Trailing: price atau status badge
- Divider: 1px #F0F0F0

### 11. Bottom Sheet
- Background: White
- Top handle: 36x4px, #E5E7EB, border radius full, centered
- Border radius top: 20px
- Padding top: 12px (handle area) + 16px
- Max height: 90% screen
- Backdrop: rgba(0,0,0,0.4)

### 12. Chip / Tag
- Height: 32px
- Border radius: full (999px)
- Padding: 8px 16px
- Default: bg #F5F5F5, text #6B7280
- Selected: bg Primary Purple, text White
- Font: 14px Medium

### 13. Rating Stars
- Size: 24px per star
- Filled: #FBBF24 (amber/gold)
- Empty: #E5E7EB
- Tap area: 40px (larger hit target)

### 14. Avatar
- Size: 40px (small), 56px (medium), 80px (large)
- Border radius: full (circle)
- Border: 2px White (saat overlay di atas warna)
- Placeholder: initials, bg #EDE5FF (Primary Light), text #7B2FF2

### 15. Status Badge
- Border radius: full
- Padding: 4px 10px
- Font: 12px Medium
- Variants:
  - Active/Success: bg #DCFCE7, text #16A34A
  - Pending/Warning: bg #FEF3C7, text #D97706
  - Error/Cancelled: bg #FEE2E2, text #DC2626
  - Info: bg #DBEAFE, text #2563EB
  - Brand: bg #EDE5FF, text #7B2FF2

---

## React Native Component Library

Gunakan komponen-komponen berikut sebagai dasar, lalu customize sesuai brand DELIVRY:

| Kebutuhan UI DELIVRY | Library / Komponen | Integrasi di App |
|---|---|---|
| CTA utama (Login, Pesan) | Custom `DelivryButton` | Height 52, radius 12, ungu #7B2FF2 |
| Input form | Custom `DelivryInput` | Styled TextInput with label & validation |
| Card konten | Custom `DelivryCard` | Shadow, radius 16 |
| Badge status | Custom `DelivryBadge` | Status order/payment (active, pending, cancelled) |
| Bottom sheet | `@gorhom/bottom-sheet` | Payment selector, cancel confirmation |
| Toast/notification | `react-native-toast-message` atau `sonner-native` | Success, error, info messages |
| Skeleton loading | `react-native-skeleton-placeholder` | Home sections, list restoran, riwayat transaksi |
| Icons | `lucide-react-native` | Outlined, 1.5px stroke, consistent |

Prinsip: komponen umum dibungkus di `src/components/ui/` agar perubahan design system tidak menyentuh seluruh fitur.

## Accessibility Baseline (Android + iOS)

- Touch target minimum **48dp** (Android) dan minimal **44pt** iOS.
- Kontras teks minimum **4.5:1**, elemen non-teks minimum **3:1**.
- Jangan andalkan gesture-only action; sediakan tombol alternatif.
- Semua ikon fungsional wajib punya `accessibilityLabel`.
- Purple (#7B2FF2) on White memiliki kontras ~5.8:1 — **aman** untuk text besar, gunakan sebagai fill button untuk text kecil.
- Seluruh detail Android accessibility mengacu ke [10_android_accessibility.md](10_android_accessibility.md).

---

## Animations & Transitions

- **Screen transition**: `react-native-screens` + `react-navigation` shared element transitions
- **Bottom sheet**: Slide up 300ms, ease-out (via `@gorhom/bottom-sheet`)
- **Button press**: Scale 0.97, 100ms (via `react-native-reanimated`)
- **Loading**: Skeleton shimmer effect
- **Searching driver**: Lottie animation (radar/pulse) via `lottie-react-native`
- **Success**: Lottie checkmark animation
- **Map marker**: Subtle bounce saat appear
- **Page transition**: Shared element + fade for iOS, slide for Android

## Iconography
- Style: **Outlined / Linear** (bukan filled)
- Library: **Lucide React Native** (`lucide-react-native`)
- Size: 20px (compact), 24px (default), 28px (emphasis)
- Stroke: 1.5px
- Color: mengikuti text color, atau Primary (#7B2FF2) untuk active state

## Illustration Style
- Flat illustration, minimal detail
- Warna sesuai palette (purple, white, gray tones)
- Digunakan di: onboarding, empty states, error pages
- Tools: SVG illustrations via `react-native-svg`
