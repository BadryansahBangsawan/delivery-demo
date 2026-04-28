import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';

type Size = 'sm' | 'md' | 'lg';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: Size;
}

const sizePx: Record<Size, number> = { sm: 40, md: 56, lg: 80 };
const fontSz: Record<Size, number> = { sm: FontSize.body, md: FontSize.h4, lg: FontSize.h2 };

function initials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ uri, name = '', size = 'md' }: AvatarProps) {
  const px = sizePx[size];

  return (
    <View style={[styles.base, { width: px, height: px, borderRadius: px / 2 }]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: px, height: px, borderRadius: px / 2 }}
          accessibilityLabel={name || 'Avatar'}
        />
      ) : (
        <Text style={[styles.initials, { fontSize: fontSz[size] }]}>
          {initials(name) || '?'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  initials: {
    fontFamily: FontFamily.semiBold,
    color: Colors.primary,
    includeFontPadding: false,
  },
});
