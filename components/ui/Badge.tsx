import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Radius } from '@/constants/Spacing';

type Variant = 'success' | 'warning' | 'error' | 'info' | 'brand' | 'default';

interface BadgeProps {
  label: string;
  variant?: Variant;
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const v = variantMap[variant];
  return (
    <View style={[styles.base, { backgroundColor: v.bg }]}>
      <Text style={[styles.label, { color: v.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    includeFontPadding: false,
  },
});

const variantMap: Record<Variant, { bg: string; text: string }> = {
  success: { bg: Colors.successLight, text: '#16A34A' },
  warning: { bg: Colors.warningLight, text: '#D97706' },
  error:   { bg: Colors.errorLight,   text: '#DC2626' },
  info:    { bg: Colors.infoLight,    text: '#2563EB' },
  brand:   { bg: Colors.primaryLight, text: Colors.primary },
  default: { bg: Colors.surfaceAlt,   text: Colors.textSecondary },
};
