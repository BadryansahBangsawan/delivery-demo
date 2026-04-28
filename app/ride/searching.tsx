import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Radius, Spacing } from '@/constants/Spacing';
import { formatIDR } from '@/utils/currency';

const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);

export default function SearchingDriverScreen() {
  const params = useLocalSearchParams<{ ride?: string; price?: string }>();
  const pulse = useSharedValue(0.95);
  const opacity = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1.08, { duration: 900, easing: EASE_OUT }), -1, true);
    opacity.value = withRepeat(withTiming(0.5, { duration: 900, easing: EASE_OUT }), -1, true);

    const timer = setTimeout(() => {
      router.replace('/ride/tracking');
    }, 3000);

    return () => clearTimeout(timer);
  }, [opacity, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>Mencari driver...</Text>
        <Text style={styles.subtitle}>
          Kami sedang mencarikan driver {params.ride ?? 'Ride'} terbaik untukmu
        </Text>

        <View style={styles.radarWrap}>
          <Animated.View style={[styles.radarOuter, pulseStyle]} />
          <View style={styles.radarInner}>
            <Text style={styles.radarIcon}>🛵</Text>
          </View>
        </View>

        <View style={styles.fareCard}>
          <Text style={styles.fareLabel}>Estimasi biaya</Text>
          <Text style={styles.fareValue}>{formatIDR(Number(params.price ?? 15000))}</Text>
          <Text style={styles.fareSub}>Biasanya dapat driver dalam 1-3 menit</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button label="Batalkan" variant="ghost" onPress={() => router.back()} />
        <Pressable onPress={() => router.replace('/ride/tracking')} style={styles.skipBtn}>
          <Text style={styles.skipText}>Lanjutkan simulasi</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.lg,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h2,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  radarWrap: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarOuter: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.primaryLight,
  },
  radarInner: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarIcon: {
    fontSize: 36,
  },
  fareCard: {
    width: '100%',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.divider,
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    alignItems: 'center',
    gap: 2,
  },
  fareLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textHint,
  },
  fareValue: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h2,
    color: Colors.primary,
  },
  fareSub: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  footer: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['2xl'],
    gap: Spacing.sm,
  },
  skipBtn: {
    alignSelf: 'center',
    paddingVertical: Spacing.sm,
  },
  skipText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.primary,
  },
});
