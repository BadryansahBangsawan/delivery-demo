import React, { forwardRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Radius } from '@/constants/Spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, error, hint, leftIcon, rightIcon, containerStyle, style, onFocus, onBlur, ...rest },
  ref
) {
  const [focused, setFocused] = useState(false);

  function handleFocus(e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) {
    setFocused(true);
    onFocus?.(e);
  }

  function handleBlur(e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) {
    setFocused(false);
    onBlur?.(e);
  }

  const containerBorderColor = error
    ? Colors.error
    : focused
    ? Colors.primary
    : Colors.border;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.container,
          { borderColor: containerBorderColor },
          focused && styles.containerFocused,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          ref={ref}
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeft : undefined,
            rightIcon ? styles.inputWithRight : undefined,
            style,
          ]}
          placeholderTextColor={Colors.textHint}
          onFocus={handleFocus}
          onBlur={handleBlur}
          allowFontScaling
          maxFontSizeMultiplier={1.4}
          {...rest}
        />

        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {(error || hint) && (
        <Text style={[styles.helper, error ? styles.errorText : styles.hintText]}>
          {error ?? hint}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  container: {
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  containerFocused: {
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  inputWithLeft: {
    marginLeft: 10,
  },
  inputWithRight: {
    marginRight: 10,
  },
  leftIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  helper: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
  },
  errorText: {
    color: Colors.error,
  },
  hintText: {
    color: Colors.textHint,
  },
});
