/**
 * OTP Verification Screen
 * 6-digit OTP input with auto-focus, 60s countdown timer & resend.
 * iOS autofill from SMS via textContentType="oneTimeCode".
 */
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Spacing, Radius, HIT_SLOP } from '@/constants/Spacing';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;
const MOCK_OTP = '123456';

export default function OTPScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<TextInput>(null);

  // Shake animation on error
  const shakeX = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  // Countdown timer
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  function shake() {
    shakeX.value = withSequence(
      withTiming(-8, { duration: 60 }),
      withTiming(8, { duration: 60 }),
      withTiming(-6, { duration: 60 }),
      withTiming(6, { duration: 60 }),
      withTiming(0, { duration: 60 })
    );
  }

  async function handleVerify() {
    if (otp.length < OTP_LENGTH) return;
    setLoading(true);
    setError('');

    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    if (otp !== MOCK_OTP) {
      setError('Kode OTP tidak valid. Coba lagi.');
      setOtp('');
      shake();
      inputRef.current?.focus();
      return;
    }

    // Success → go to tabs (home)
    router.replace('/(tabs)');
  }

  function handleResend() {
    setSeconds(RESEND_SECONDS);
    setOtp('');
    setError('');
    inputRef.current?.focus();
  }

  function handleOTPChange(text: string) {
    const clean = text.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
    setOtp(clean);
    setError('');
    if (clean.length === OTP_LENGTH) {
      // Auto-verify
      setLoading(true);
      setTimeout(async () => {
        setLoading(false);
        if (clean !== MOCK_OTP) {
          setError('Kode OTP tidak valid. Coba lagi.');
          setOtp('');
          shake();
          inputRef.current?.focus();
        } else {
          router.replace('/(tabs)');
        }
      }, 800);
    }
  }

  // Build the digit boxes from the otp string
  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => otp[i] ?? '');

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <Pressable
          style={styles.backBtn}
          onPress={() => router.back()}
          hitSlop={HIT_SLOP}
          accessibilityRole="button"
          accessibilityLabel="Kembali"
        >
          <ArrowLeft size={24} color={Colors.textPrimary} strokeWidth={2} />
        </Pressable>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headline}>Masukkan kode{'\n'}OTP</Text>
          <Text style={styles.subtext}>
            Kode dikirim ke{' '}
            <Text style={styles.phone}>{phone ?? '+62...'}</Text>
          </Text>
        </View>

        {/* OTP boxes — hidden TextInput + visual digits */}
        <View style={styles.otpSection}>
          <Animated.View style={[styles.digitRow, shakeStyle]}>
            {digits.map((d, i) => (
              <Pressable
                key={i}
                style={[
                  styles.digitBox,
                  otp.length === i && styles.digitBoxActive,
                  otp.length > i && styles.digitBoxFilled,
                  error && styles.digitBoxError,
                ]}
                onPress={() => inputRef.current?.focus()}
                accessibilityElementsHidden
              >
                <Text style={styles.digitText}>{d}</Text>
              </Pressable>
            ))}
          </Animated.View>

          {/* Hidden real input capturing keyboard */}
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={otp}
            onChangeText={handleOTPChange}
            keyboardType="number-pad"
            maxLength={OTP_LENGTH}
            autoFocus
            allowFontScaling={false}
            textContentType="oneTimeCode"  // iOS SMS autofill
            accessibilityLabel="Kode OTP 6 digit"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Verify button */}
        <Button
          label="Verifikasi"
          onPress={handleVerify}
          loading={loading}
          disabled={otp.length < OTP_LENGTH}
        />

        {/* Resend */}
        <View style={styles.resendRow}>
          <Text style={styles.resendBase}>Tidak menerima kode? </Text>
          {seconds > 0 ? (
            <Text style={styles.resendTimer}>Kirim ulang dalam {seconds}s</Text>
          ) : (
            <Pressable onPress={handleResend} hitSlop={HIT_SLOP}>
              <Text style={styles.resendLink}>Kirim ulang</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.base,
    paddingTop: 56,
    paddingBottom: 40,
    gap: Spacing.xl,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  header: {
    gap: Spacing.sm,
  },
  headline: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h1,
    color: Colors.textPrimary,
    lineHeight: 38,
  },
  subtext: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.bodyLarge,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  phone: {
    fontFamily: FontFamily.semiBold,
    color: Colors.textPrimary,
  },
  otpSection: {
    gap: Spacing.sm,
    alignItems: 'center',
  },
  digitRow: {
    flexDirection: 'row',
    gap: 10,
  },
  digitBox: {
    width: 48,
    height: 58,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitBoxActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  digitBoxFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary50,
  },
  digitBoxError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },
  digitText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h3,
    color: Colors.textPrimary,
    includeFontPadding: false,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  errorText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.error,
    textAlign: 'center',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendBase: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  resendTimer: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textHint,
  },
  resendLink: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.primary,
  },
});
