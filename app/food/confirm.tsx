import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ChevronDown } from '@/components/ui/TailwindIcon';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';
import { formatIDR } from '@/utils/currency';
import { useStore, cartTotal, clearCart, deductWallet } from '@/store';

const DELIVERY_FEE = 8000;

export default function FoodConfirmScreen() {
  const { cart, walletBalance } = useStore();
  const subtotal = useMemo(() => cartTotal(cart), [cart]);
  const total = subtotal + DELIVERY_FEE;

  const restaurantName = cart[0]?.restaurantName ?? 'Restoran';
  const canAfford = walletBalance >= total;

  function handleConfirm() {
    deductWallet(total);
    clearCart();
    router.replace('/food/tracking');
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>Konfirmasi Pesanan</Text>
        <View style={styles.headerGap} />
      </View>

      <View style={styles.content}>
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Restoran</Text>
          <Text style={styles.sectionText}>{restaurantName}</Text>
        </Card>

        <Card style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Alamat</Text>
          <Text style={styles.sectionText}>Rumah • Jl. Merdeka No. 5</Text>
        </Card>

        <Card style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Metode pembayaran</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.sectionText}>DELIVRY Pay • {formatIDR(walletBalance)}</Text>
            <ChevronDown size={16} color={Colors.textHint} strokeWidth={2} />
          </View>
        </Card>

        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatIDR(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ongkir</Text>
            <Text style={styles.summaryValue}>{formatIDR(DELIVERY_FEE)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatIDR(total)}</Text>
          </View>
        </Card>

        {!canAfford && (
          <Text style={styles.insufficientText}>
            Saldo DELIVRY Pay tidak cukup. Top up terlebih dahulu.
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        {canAfford ? (
          <Button label={`Pesan Sekarang • ${formatIDR(total)}`} onPress={handleConfirm} />
        ) : (
          <Button label="Top Up Saldo" onPress={() => router.push('/wallet/topup')} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  headerGap: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: Spacing.base,
    gap: Spacing.md,
  },
  sectionCard: {
    padding: Spacing.md,
    gap: 4,
  },
  sectionLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textHint,
  },
  sectionText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryCard: {
    padding: Spacing.md,
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
  totalLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  totalValue: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.bodyLarge,
    color: Colors.primary,
  },
  insufficientText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.error,
    textAlign: 'center',
  },
  footer: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
});
