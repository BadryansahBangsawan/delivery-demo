import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Star } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Radius, Spacing } from '@/constants/Spacing';
import { formatIDR } from '@/utils/currency';

const tips = [0, 5000, 10000, 20000];

export default function RideCompleteScreen() {
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState(0);

  const fare = 15000;
  const total = fare + tip;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.emoji}>✅</Text>
        <Text style={styles.title}>Perjalanan Selesai!</Text>
        <Text style={styles.total}>{formatIDR(total)}</Text>
        <Text style={styles.sub}>Tarif {formatIDR(fare)}{tip > 0 ? ` + tip ${formatIDR(tip)}` : ''}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beri rating driver</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Pressable key={item} onPress={() => setRating(item)} style={styles.starBtn}>
                <Star
                  size={28}
                  color={item <= rating ? Colors.ratingStar : Colors.ratingEmpty}
                  fill={item <= rating ? Colors.ratingStar : 'transparent'}
                  strokeWidth={item <= rating ? 0 : 2}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tip untuk driver?</Text>
          <View style={styles.tipRow}>
            {tips.map((item) => {
              const active = tip === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setTip(item)}
                  style={[styles.tipBtn, active && styles.tipBtnActive]}
                >
                  <Text style={[styles.tipText, active && styles.tipTextActive]}>
                    {item === 0 ? 'Tidak' : formatIDR(item)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button label="Selesai" onPress={() => router.replace('/(tabs)/pesanan')} />
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
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing['2xl'],
    alignItems: 'center',
  },
  emoji: {
    fontSize: 42,
  },
  title: {
    marginTop: Spacing.sm,
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h2,
    color: Colors.textPrimary,
  },
  total: {
    marginTop: Spacing.base,
    fontFamily: FontFamily.extraBold,
    fontSize: FontSize.display,
    color: Colors.primary,
  },
  sub: {
    marginTop: 4,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  section: {
    marginTop: Spacing['2xl'],
    width: '100%',
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tipBtn: {
    flex: 1,
    minHeight: 42,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  tipBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary50,
  },
  tipText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  tipTextActive: {
    color: Colors.primary,
  },
  footer: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.white,
  },
});
