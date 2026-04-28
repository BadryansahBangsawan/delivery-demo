/**
 * Login Screen
 * Phone number input with +62 prefix, Google & Apple social login.
 * Keyboard-aware layout using padding from useKeyboardHeight.
 */
import { useRef, useState } from 'react';
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
import { router } from 'expo-router';
import { Phone, ArrowRight } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Spacing, Radius, HIT_SLOP } from '@/constants/Spacing';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const isValid = phone.replace(/\D/g, '').length >= 9;

  async function handleSendOTP() {
    if (!isValid) return;
    setLoading(true);

    // Mock: simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    router.push({ pathname: '/(auth)/otp', params: { phone: `+62${phone}` } });
  }

  function handlePhoneChange(text: string) {
    // Strip leading 0 from paste, only allow digits
    const cleaned = text.replace(/[^0-9]/g, '');
    const stripped = cleaned.startsWith('0') ? cleaned.slice(1) : cleaned;
    setPhone(stripped);
  }

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
        {/* Header */}
        <View style={styles.header}>
          {/* Logo */}
          <View style={styles.logoRow}>
            <View style={styles.iconBg}>
              <Text style={styles.iconText}>D</Text>
            </View>
            <Text style={styles.logoText}>DELIVRY</Text>
          </View>

          <Text style={styles.headline}>Masuk ke akun{'\n'}kamu</Text>
          <Text style={styles.subtext}>Kami kirimkan kode OTP ke nomor HP-mu</Text>
        </View>

        {/* Phone input */}
        <View style={styles.form}>
          <Text style={styles.label}>Nomor HP</Text>
          <View style={styles.phoneRow}>
            <View style={styles.prefix}>
              <Phone size={16} color={Colors.primary} strokeWidth={2} />
              <Text style={styles.prefixText}>+62</Text>
            </View>
            <TextInput
              ref={inputRef}
              style={styles.phoneInput}
              value={phone}
              onChangeText={handlePhoneChange}
              placeholder="812 3456 7890"
              placeholderTextColor={Colors.textHint}
              keyboardType="number-pad"
              returnKeyType="done"
              autoFocus
              maxLength={13}
              allowFontScaling
              maxFontSizeMultiplier={1.3}
              accessibilityLabel="Nomor HP"
              accessibilityHint="Masukkan nomor HP tanpa angka 0 di depan"
              onSubmitEditing={handleSendOTP}
            />
          </View>

          <Button
            label="Kirim Kode OTP"
            onPress={handleSendOTP}
            loading={loading}
            disabled={!isValid}
            rightIcon={!loading ? <ArrowRight size={18} color={Colors.white} strokeWidth={2.5} /> : undefined}
            style={styles.ctaBtn}
          />
        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>atau masuk dengan</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social buttons */}
        <View style={styles.socialRow}>
          <Pressable
            style={styles.socialBtn}
            accessibilityRole="button"
            accessibilityLabel="Masuk dengan Google"
            hitSlop={HIT_SLOP}
          >
            <Text style={styles.socialEmoji}>🇬</Text>
            <Text style={styles.socialLabel}>Google</Text>
          </Pressable>

          {Platform.OS === 'ios' && (
            <Pressable
              style={styles.socialBtn}
              accessibilityRole="button"
              accessibilityLabel="Masuk dengan Apple"
              hitSlop={HIT_SLOP}
            >
              <Text style={styles.socialEmoji}>🍎</Text>
              <Text style={styles.socialLabel}>Apple</Text>
            </Pressable>
          )}
        </View>

        {/* Terms */}
        <Text style={styles.terms}>
          Dengan masuk, kamu menyetujui{' '}
          <Text style={styles.termsLink}>Syarat & Ketentuan</Text>
          {' '}dan{' '}
          <Text style={styles.termsLink}>Kebijakan Privasi</Text>
          {' '}DELIVRY.
        </Text>
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
    paddingTop: 64,
    paddingBottom: 40,
    gap: Spacing.xl,
  },
  header: {
    gap: Spacing.md,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.sm,
  },
  iconBg: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontFamily: FontFamily.extraBold,
    fontSize: 20,
    color: Colors.white,
    includeFontPadding: false,
    lineHeight: 24,
  },
  logoText: {
    fontFamily: FontFamily.extraBold,
    fontSize: 22,
    color: Colors.primary,
    letterSpacing: 0.8,
    includeFontPadding: false,
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
  form: {
    gap: Spacing.sm,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  phoneRow: {
    flexDirection: 'row',
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
  },
  prefix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    backgroundColor: Colors.primary50,
  },
  prefixText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
    color: Colors.primary,
    includeFontPadding: false,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  ctaBtn: {
    marginTop: Spacing.sm,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.divider,
  },
  dividerText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textHint,
  },
  socialRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  socialBtn: {
    flex: 1,
    height: 48,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  socialEmoji: {
    fontSize: 18,
  },
  socialLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  terms: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textHint,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: Colors.primary,
    fontFamily: FontFamily.medium,
  },
});
