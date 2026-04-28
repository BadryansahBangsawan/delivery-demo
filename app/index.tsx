/**
 * Splash Screen
 * Animates in → then redirects to onboarding or tabs based on auth state.
 * Uses only transform + opacity per performance guidelines.
 */
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { router } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';

const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);

/** Simulate auth check — replace with real SecureStore token lookup */
function checkAuthState(): 'onboarding' | 'tabs' {
  return 'onboarding'; // Always go to onboarding for now
}

export default function SplashScreen() {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.92);
  const taglineOpacity = useSharedValue(0);
  const taglineTranslateY = useSharedValue(12);
  const containerOpacity = useSharedValue(1);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineTranslateY.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  useEffect(() => {
    // Logo fade-in + scale
    logoOpacity.value = withTiming(1, { duration: 500, easing: EASE_OUT });
    logoScale.value = withTiming(1, { duration: 500, easing: EASE_OUT });

    // Tagline slides up after logo
    taglineOpacity.value = withDelay(300, withTiming(1, { duration: 400, easing: EASE_OUT }));
    taglineTranslateY.value = withDelay(300, withTiming(0, { duration: 400, easing: EASE_OUT }));

    // Fade out entire screen → then navigate
    containerOpacity.value = withDelay(
      1600,
      withTiming(0, { duration: 300, easing: EASE_OUT }, (finished) => {
        if (finished) {
          runOnJS(navigate)();
        }
      })
    );
  }, []);

  function navigate() {
    const dest = checkAuthState();
    router.replace(dest === 'tabs' ? '/(tabs)' : '/onboarding');
  }

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.logoWrap, logoStyle]}>
        {/* D icon — purple circle with D */}
        <View style={styles.iconBg}>
          <Text style={styles.iconText}>D</Text>
        </View>

        <Text style={styles.logoText}>DELIVRY</Text>
      </Animated.View>

      <Animated.Text style={[styles.tagline, taglineStyle]}>
        Move Anything Anytime
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontFamily: FontFamily.extraBold,
    fontSize: 26,
    color: Colors.white,
    includeFontPadding: false,
    lineHeight: 30,
  },
  logoText: {
    fontFamily: FontFamily.extraBold,
    fontSize: 34,
    color: Colors.primary,
    letterSpacing: 1,
    includeFontPadding: false,
  },
  tagline: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },
});
