import { useEffect, useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { Phone, ArrowRight } from '@/components/ui/TailwindIcon';

import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Spacing, Radius, HIT_SLOP } from '@/constants/Spacing';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const isValid = phone.replace(/\D/g, '').length >= 9;

  // Input border color animation
  const borderProgress = useSharedValue(0);

  useEffect(() => {
    borderProgress.value = withTiming(focused ? 1 : 0, { duration: 200 });
  }, [focused, borderProgress]);

  const inputBorderStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      borderProgress.value,
      [0, 1],
      [Colors.border, Colors.primary]
    ),
  }));

  async function handleSendOTP() {
    if (!isValid) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push({ pathname: '/(auth)/otp', params: { phone: `+62${phone}` } });
  }

  function handlePhoneChange(text: string) {
    const cleaned = text.replace(/[^0-9]/g, '');
    const stripped = cleaned.startsWith('0') ? cleaned.slice(1) : cleaned;
    setPhone(stripped);
  }

  // Social button press feedback
  const googleScale = useSharedValue(1);
  const appleScale = useSharedValue(1);
  const googleAnim = useAnimatedStyle(() => ({ transform: [{ scale: googleScale.value }] }));
  const appleAnim = useAnimatedStyle(() => ({ transform: [{ scale: appleScale.value }] }));

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
        {/* Hero gradient */}
        <LinearGradient
          colors={[Colors.primary50, Colors.white]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.heroBg}
        />

        <SafeAreaView edges={['top']} style={styles.safeTop}>
          {/* Logo */}
          <Animated.View entering={FadeInDown.duration(400).delay(0)} style={styles.logoWrap}>
            <Image
              source={require('../../assets/brand/logo-full.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Headline */}
          <Animated.View entering={FadeInDown.duration(400).delay(60)} style={styles.headlineWrap}>
            <Text style={styles.headline}>Masuk ke akun{'\n'}kamu</Text>
            <Text style={styles.subtext}>Kami kirimkan kode OTP ke nomor HP-mu</Text>
          </Animated.View>

          {/* Phone input card */}
          <Animated.View entering={FadeInDown.duration(400).delay(120)} style={styles.formCard}>
            <Text style={styles.label}>Nomor HP</Text>
            <Animated.View style={[styles.phoneRow, inputBorderStyle]}>
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
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            </Animated.View>

            <Button
              label="Kirim Kode OTP"
              onPress={handleSendOTP}
              loading={loading}
              disabled={!isValid}
              rightIcon={!loading ? <ArrowRight size={18} color={Colors.white} strokeWidth={2.5} /> : undefined}
              style={styles.ctaBtn}
            />
          </Animated.View>

          {/* Divider */}
          <Animated.View entering={FadeInDown.duration(400).delay(180)} style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>atau masuk dengan</Text>
            <View style={styles.dividerLine} />
          </Animated.View>

          {/* Social buttons */}
          <Animated.View entering={FadeInDown.duration(400).delay(240)} style={styles.socialRow}>
            <AnimatedPressable
              style={[styles.socialBtn, googleAnim]}
              onPressIn={() => { googleScale.value = withTiming(0.97, { duration: 100 }); }}
              onPressOut={() => { googleScale.value = withTiming(1, { duration: 120 }); }}
              accessibilityRole="button"
              accessibilityLabel="Masuk dengan Google"
              hitSlop={HIT_SLOP}
            >
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialLabel}>Google</Text>
            </AnimatedPressable>

            {Platform.OS === 'ios' && (
              <AnimatedPressable
                style={[styles.socialBtn, appleAnim]}
                onPressIn={() => { appleScale.value = withTiming(0.97, { duration: 100 }); }}
                onPressOut={() => { appleScale.value = withTiming(1, { duration: 120 }); }}
                accessibilityRole="button"
              accessibilityLabel="Masuk dengan Apple"
                hitSlop={HIT_SLOP}
              >
                <AntDesign name="apple" size={20} color={Colors.textPrimary} />
                <Text style={styles.socialLabel}>Apple</Text>
              </AnimatedPressable>
            )}
          </Animated.View>

          {/* Terms */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <Text style={styles.terms}>
              Dengan masuk, kamu menyetujui{' '}
              <Text style={styles.termsLink}>Syarat & Ketentuan</Text>
              {' '}dan{' '}
              <Text style={styles.termsLink}>Kebijakan Privasi</Text>
              {' '}DELIVRY.
            </Text>
          </Animated.View>
        </SafeAreaView>
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
  },
  heroBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
  },
  safeTop: {
    flex: 1,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    paddingBottom: 40,
    gap: Spacing.xl,
  },

  // Logo
  logoWrap: {
    alignSelf: 'flex-start',
  },
  logoImage: {
    width: 148,
    height: 36,
  },

  // Headline
  headlineWrap: {
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

  // Form card
  formCard: {
    gap: Spacing.sm,
    padding: Spacing.base,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.divider,
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
    marginTop: Spacing.xs,
  },

  // Divider
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

  // Social
  socialRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  socialBtn: {
    flex: 1,
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  socialIcon: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    color: Colors.textPrimary,
  },
  socialLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },

  // Terms
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
