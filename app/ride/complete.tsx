import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CheckCircle, CreditCard, MapPin, Star } from '@/components/ui/TailwindIcon';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Radius, Spacing } from '@/constants/Spacing';
import { formatIDR } from '@/utils/currency';
import { deductWallet } from '@/store';

const tips = [0, 5000, 10000, 20000];

export default function RideCompleteScreen() {
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState(0);

  const fare = 15000;
  const platformFee = 2500;
  const total = fare + platformFee + tip;
  const receiptRows = [
    ['Tarif perjalanan', formatIDR(fare)],
    ['Tip driver', tip > 0 ? formatIDR(tip) : '-'],
    ['Biaya layanan', formatIDR(platformFee)],
    ['Pembayaran', 'DELIVRY Pay'],
  ];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.successIcon}>
          <CheckCircle size={38} color={Colors.success} strokeWidth={2.2} />
        </View>
        <Text style={styles.title}>Perjalanan Selesai!</Text>
        <Text style={styles.total}>{formatIDR(total)}</Text>
        <Text style={styles.sub}>
          Tarif {formatIDR(fare)} + layanan {formatIDR(platformFee)}
          {tip > 0 ? ` + tip ${formatIDR(tip)}` : ''}
        </Text>

        <Card style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryTitle}>Ahmad</Text>
              <Text style={styles.summarySub}>Honda Vario • B 1234 XY</Text>
            </View>
            <Badge label="Completed" variant="success" />
          </View>
          <View style={styles.routeLine}>
            <MapPin size={16} color={Colors.primary} strokeWidth={2.2} />
            <Text style={styles.routeText} numberOfLines={1}>Jl. Sudirman No. 10 ke Mall Kota Kasablanka</Text>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beri rating driver</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Pressable
                key={item}
                onPress={() => setRating(item)}
                accessibilityRole="button"
                accessibilityLabel={`Beri rating ${item}`}
                style={({ pressed }) => [styles.starBtn, pressed && styles.starBtnPressed]}
              >
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
                  accessibilityRole="button"
                  accessibilityLabel={item === 0 ? 'Tanpa tip' : `Tip ${formatIDR(item)}`}
                  style={({ pressed }) => [
                    styles.tipBtn,
                    active && styles.tipBtnActive,
                    pressed && styles.tipBtnPressed,
                  ]}
                >
                  <Text style={[styles.tipText, active && styles.tipTextActive]}>
                    {item === 0 ? 'Tidak' : formatIDR(item)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Card style={styles.receiptCard}>
          <View style={styles.receiptHeader}>
            <View style={styles.receiptIcon}>
              <CreditCard size={16} color={Colors.primary} strokeWidth={2.2} />
            </View>
            <View>
              <Text style={styles.receiptTitle}>Receipt</Text>
              <Text style={styles.receiptSub}>DLV-RD-240428-001</Text>
            </View>
          </View>

          {receiptRows.map(([label, value]) => (
            <View key={label} style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>{label}</Text>
              <Text style={styles.receiptValue}>{value}</Text>
            </View>
          ))}

          <View style={styles.receiptDivider} />
          <View style={styles.receiptRow}>
            <Text style={styles.receiptTotalLabel}>Total dibayar</Text>
            <Text style={styles.receiptTotalValue}>{formatIDR(total)}</Text>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Selesai" onPress={() => { deductWallet(total); router.replace('/(tabs)/pesanan'); }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing.base,
    alignItems: 'center',
    gap: Spacing.base,
  },
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
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
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  summaryCard: {
    width: '100%',
    padding: Spacing.md,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  summaryTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  summarySub: {
    marginTop: 2,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  routeLine: {
    minHeight: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  routeText: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.primaryDark,
  },
  section: {
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
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starBtnPressed: {
    transform: [{ scale: 0.97 }],
  },
  tipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tipBtn: {
    flex: 1,
    minHeight: 48,
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
  tipBtnPressed: {
    transform: [{ scale: 0.97 }],
  },
  tipText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  tipTextActive: {
    color: Colors.primary,
  },
  receiptCard: {
    width: '100%',
    padding: Spacing.md,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  receiptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 2,
  },
  receiptIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  receiptSub: {
    marginTop: 1,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textHint,
  },
  receiptRow: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.base,
  },
  receiptLabel: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  receiptValue: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  receiptDivider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
  receiptTotalLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  receiptTotalValue: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.bodyLarge,
    color: Colors.primary,
  },
  footer: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.white,
  },
});
