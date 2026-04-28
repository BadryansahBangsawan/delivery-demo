import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Radius } from '@/constants/Spacing';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  style,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = withTiming(0.97, { duration: 100 });
  }

  function handlePressOut() {
    scale.value = withTiming(1, { duration: 120 });
  }

  const isDisabled = disabled || loading;
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled }}
      style={[
        animatedStyle,
        styles.base,
        variantStyle.container,
        sizeStyle.container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? Colors.white : Colors.primary}
          />
        ) : (
          <>
            {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
            <Text style={[styles.label, variantStyle.label, sizeStyle.label]}>
              {label}
            </Text>
            {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
          </>
        )}
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: FontFamily.semiBold,
    includeFontPadding: false,
  },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});

const variantStyles: Record<Variant, { container: ViewStyle; label: object }> = {
  primary: {
    container: {
      backgroundColor: Colors.primary,
    },
    label: {
      color: Colors.white,
    },
  },
  secondary: {
    container: {
      backgroundColor: Colors.white,
      borderWidth: 1.5,
      borderColor: Colors.border,
    },
    label: {
      color: Colors.textPrimary,
    },
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
    },
    label: {
      color: Colors.primary,
    },
  },
  danger: {
    container: {
      backgroundColor: Colors.error,
    },
    label: {
      color: Colors.white,
    },
  },
};

const sizeStyles: Record<Size, { container: ViewStyle; label: object }> = {
  lg: {
    container: { height: 52, paddingHorizontal: 16 },
    label: { fontSize: FontSize.bodyLarge },
  },
  md: {
    container: { height: 44, paddingHorizontal: 14 },
    label: { fontSize: FontSize.body },
  },
  sm: {
    container: { height: 36, paddingHorizontal: 12 },
    label: { fontSize: FontSize.caption },
  },
};
