/**
 * Onboarding — 3 slides with FlatList (horizontal)
 * Reanimated indicator dots. FlatList + React.memo for performance.
 */
import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  ListRenderItemInfo,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Slide {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  gradient: [string, string];
}

const SLIDES: Slide[] = [
  {
    id: '1',
    emoji: '🛵',
    title: 'Move Anything\nAnytime',
    subtitle: 'Ride, kirim barang, atau pesan makanan — semua dalam satu app yang cepat.',
    gradient: [Colors.primary, Colors.primaryDark],
  },
  {
    id: '2',
    emoji: '📦',
    title: 'Kirim Barang\nTanpa Ribet',
    subtitle: 'Instant courier & same-day delivery. Tracking real-time langsung dari app.',
    gradient: ['#6C2BD9', '#4C1FA8'],
  },
  {
    id: '3',
    emoji: '🍜',
    title: 'Pesan Makanan\nFavorit',
    subtitle: 'Restoran terdekat, menu lengkap, langsung diantar. Cepat dan terpercaya.',
    gradient: ['#8B4CF7', '#5A1DB8'],
  },
];

// Memoised slide item — prevents re-render on scroll position changes
const SlideItem = React.memo(function SlideItem({ item }: { item: Slide }) {
  return (
    <View style={styles.slide}>
      <LinearGradient colors={item.gradient} style={styles.illustrationBg} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </LinearGradient>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
});

function Dot({ index, scrollX }: { index: number; scrollX: import('react-native-reanimated').SharedValue<number> }) {
  const style = useAnimatedStyle(() => {
    const input = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];
    const width = interpolate(scrollX.value, input, [8, 24, 8], Extrapolation.CLAMP);
    const opacity = interpolate(scrollX.value, input, [0.35, 1, 0.35], Extrapolation.CLAMP);

    return { width, opacity };
  });

  return <Animated.View style={[styles.dot, style]} />;
}

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatRef = useRef<FlatList<Slide>>(null);
  const scrollX = useSharedValue(0);

  const keyExtractor = useCallback((item: Slide) => item.id, []);
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Slide>) => <SlideItem item={item} />,
    []
  );

  function handleNext() {
    if (currentIndex < SLIDES.length - 1) {
      flatRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      router.replace('/(auth)/login');
    }
  }

  function handleSkip() {
    router.replace('/(auth)/login');
  }

  return (
    <View style={styles.container}>
      {/* Skip button */}
      {currentIndex < SLIDES.length - 1 && (
        <View style={styles.skipWrap}>
          <Button
            label="Lewati"
            variant="ghost"
            size="sm"
            fullWidth={false}
            onPress={handleSkip}
          />
        </View>
      )}

      {/* Slides */}
      <FlatList
        ref={flatRef}
        data={SLIDES}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollX.value = e.nativeEvent.contentOffset.x;
        }}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setCurrentIndex(idx);
        }}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        removeClippedSubviews
      />

      {/* Footer */}
      <View style={styles.footer}>
        {/* Indicator dots */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <Dot key={i} index={i} scrollX={scrollX} />
          ))}
        </View>

        <Button
          label={currentIndex === SLIDES.length - 1 ? 'Mulai' : 'Selanjutnya'}
          onPress={handleNext}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  skipWrap: {
    position: 'absolute',
    top: 56,
    right: Spacing.base,
    zIndex: 10,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 60,
    gap: Spacing.xl,
  },
  illustrationBg: {
    width: SCREEN_WIDTH - 80,
    height: SCREEN_WIDTH - 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  emoji: {
    fontSize: 96,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h1,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 38,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  footer: {
    paddingHorizontal: Spacing.base,
    paddingBottom: 40,
    paddingTop: Spacing.xl,
    gap: Spacing.xl,
    backgroundColor: Colors.white,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
});
