export const Colors = {
  // Brand
  primary: '#7B2FF2',
  primaryDark: '#5A1DB8',
  primaryLight: '#EDE5FF',
  primary50: '#F5F0FF',
  primaryAlpha80: 'rgba(123,47,242,0.8)',

  // Neutral
  white: '#FFFFFF',
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

  // Shadows
  shadow: 'rgba(0,0,0,0.06)',
} as const;

export type ColorKeys = keyof typeof Colors;
