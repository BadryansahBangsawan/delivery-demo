# DELIVRY — Typography & Color System

> Panduan warna dan tipografi untuk seluruh aplikasi DELIVRY.
> Referensi visual: [pamflet.jpg](pamflet.jpg) dan [dna-bisnis.md](dna-bisnis.md)
> Brand positioning: Ungu → premium + tech + trust

---

## Color Palette

### Brand Colors

| Role            | Name          | Hex       | Penggunaan                                      |
|-----------------|---------------|-----------|------------------------------------------------|
| Primary         | Purple        | `#7B2FF2` | CTA buttons, active tabs, links, brand accent  |
| Primary Dark    | Deep Purple   | `#5A1DB8` | Pressed/active states, headers, gradients      |
| Primary Light   | Lavender      | `#EDE5FF` | Light backgrounds, selected chips, badges      |
| Primary 50      | Ghost Purple  | `#F5F0FF` | Very light wash, hover states, surface tint    |

### Neutral Colors

| Role            | Name          | Hex       | Penggunaan                                      |
|-----------------|---------------|-----------|------------------------------------------------|
| Background      | White         | `#FFFFFF` | Main background, cards                         |
| Surface         | Snow          | `#FAFAFA` | Input backgrounds, secondary surfaces          |
| Surface Alt     | Smoke         | `#F5F5F5` | Search bar, disabled input, section background |
| Text Primary    | Charcoal      | `#1A1A1A` | Headlines, body text, primary labels           |
| Text Secondary  | Gray          | `#6B7280` | Subtitles, captions, secondary info            |
| Text Hint       | Silver        | `#9CA3AF` | Placeholders, disabled text                    |
| Border          | Light Gray    | `#E5E7EB` | Input borders, card borders                    |
| Divider         | Whisper       | `#F0F0F0` | List separators, section dividers              |

### Semantic Colors

| Role      | Name    | Hex       | Light BG    | Penggunaan                      |
|-----------|---------|-----------|-------------|--------------------------------|
| Success   | Green   | `#22C55E` | `#DCFCE7`   | Order selesai, payment sukses  |
| Warning   | Amber   | `#F59E0B` | `#FEF3C7`   | Pending, perlu perhatian       |
| Error     | Red     | `#EF4444` | `#FEE2E2`   | Error, cancelled, gagal        |
| Info      | Blue    | `#3B82F6` | `#DBEAFE`   | Informasi, tips, link          |

### Special Colors

| Role              | Hex       | Penggunaan                                |
|-------------------|-----------|------------------------------------------|
| Rating Star       | `#FBBF24` | Bintang rating (filled)                  |
| Rating Empty      | `#E5E7EB` | Bintang rating (empty)                   |
| Overlay/Backdrop  | `rgba(0,0,0,0.4)` | Bottom sheet backdrop, modal overlay |
| Map Marker        | `#7B2FF2` | Pin lokasi di map                        |

### Dark Mode (Phase 2)

| Role            | Light       | Dark        |
|-----------------|-------------|-------------|
| Background      | `#FFFFFF`   | `#0F0F0F`   |
| Surface         | `#FAFAFA`   | `#1A1A1A`   |
| Text Primary    | `#1A1A1A`   | `#F9FAFB`   |
| Text Secondary  | `#6B7280`   | `#9CA3AF`   |
| Primary         | `#7B2FF2`   | `#9B6FF7`   |
| Border          | `#E5E7EB`   | `#374151`   |
| Divider         | `#F0F0F0`   | `#1F2937`   |

---

## Typography

### Font Family

| Platform  | Font                | Alasan                                             |
|-----------|---------------------|----------------------------------------------------|
| Primary   | **Plus Jakarta Sans** | Modern, clean, Indonesian design roots, great x-height for mobile readability |
| iOS Fallback | SF Pro            | System font iOS — dipakai otomatis jika font tidak load |
| Android Fallback | Roboto         | System font Android — dipakai otomatis jika font tidak load |

> **Install di React Native:** gunakan `expo-font` atau `react-native-asset` untuk linking. Download dari Google Fonts.

### Font Weights

| Weight Name | Value | Penggunaan                    |
|-------------|-------|-------------------------------|
| Regular     | 400   | Body text, caption            |
| Medium      | 500   | Labels, menu items, chips     |
| SemiBold    | 600   | Headings, subheadings, CTAs   |
| Bold        | 700   | Display, large titles, prices |
| ExtraBold   | 800   | Hero headlines (sparingly)    |

### Type Scale

| Token      | Size  | Line Height | Weight   | Penggunaan                              |
|------------|-------|-------------|----------|-----------------------------------------|
| display    | 32px  | 40px        | Bold     | Splash, onboarding hero text            |
| h1         | 28px  | 36px        | Bold     | Screen titles (Profile, Settings)       |
| h2         | 24px  | 32px        | SemiBold | Section titles                          |
| h3         | 20px  | 28px        | SemiBold | Card titles, dialog titles              |
| h4         | 18px  | 26px        | SemiBold | Subheadings, navigation titles          |
| bodyLarge  | 16px  | 24px        | Regular  | Main body text, descriptions            |
| body       | 14px  | 22px        | Regular  | Default body, list items                |
| caption    | 12px  | 18px        | Regular  | Timestamps, helper text, metadata       |
| small      | 10px  | 14px        | Medium   | Badges, very small labels (sparingly)   |

### Button Text

| Button Type | Size  | Weight   | Case       |
|-------------|-------|----------|------------|
| Primary CTA | 16px  | SemiBold | Normal     |
| Secondary   | 16px  | Medium   | Normal     |
| Text/Link   | 14px  | Medium   | Normal     |
| Small       | 12px  | Medium   | Normal     |

---

## React Native Implementation

### Theme Constants

```typescript
// src/constants/colors.ts
export const Colors = {
  // Brand
  primary: '#7B2FF2',
  primaryDark: '#5A1DB8',
  primaryLight: '#EDE5FF',
  primary50: '#F5F0FF',

  // Neutral
  background: '#FFFFFF',
  surface: '#FAFAFA',
  surfaceAlt: '#F5F5F5',
  textPrimary: '#1A1A1A',
  textSecondary: '#6B7280',
  textHint: '#9CA3AF',
  border: '#E5E7EB',
  divider: '#F0F0F0',

  // Semantic
  success: '#22C55E',
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Special
  ratingStar: '#FBBF24',
  ratingEmpty: '#E5E7EB',
  overlay: 'rgba(0,0,0,0.4)',
} as const;
```

```typescript
// src/constants/typography.ts
export const FontFamily = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semiBold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
  extraBold: 'PlusJakartaSans-ExtraBold',
} as const;

export const FontSize = {
  display: 32,
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 18,
  bodyLarge: 16,
  body: 14,
  caption: 12,
  small: 10,
} as const;

export const LineHeight = {
  display: 40,
  h1: 36,
  h2: 32,
  h3: 28,
  h4: 26,
  bodyLarge: 24,
  body: 22,
  caption: 18,
  small: 14,
} as const;
```

---

## Color Accessibility Notes

| Kombinasi                    | Contrast Ratio | Status |
|------------------------------|---------------|--------|
| White text on Primary (#7B2FF2) | ~5.8:1     | PASS (AA & AAA) |
| Charcoal text on White       | ~16.7:1       | PASS   |
| Secondary text on White      | ~5.4:1        | PASS   |
| Hint text on White           | ~3.5:1        | PASS (large text only) |
| Primary text on Primary50    | ~5.2:1        | PASS   |

> **Penting:** Jangan pakai Primary Purple (#7B2FF2) sebagai teks di atas background putih untuk ukuran < 14px bold / 18px regular. Gunakan untuk filled buttons (white text on purple) yang kontrasnya sudah aman.

---

## Gradient (Optional, untuk banner/promo)

```
Linear gradient (135°):
  Start: #7B2FF2 (Primary)
  End:   #5A1DB8 (Primary Dark)
```

Gunakan hanya untuk:
- Promo banner background
- Header hero sections
- Special offer cards
- Splash/onboarding accents

**Jangan** gunakan gradient untuk buttons, nav bar, atau elemen UI reguler.
