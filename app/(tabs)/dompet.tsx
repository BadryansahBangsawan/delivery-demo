import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from '@/components/ui/TailwindIcon';

import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Spacing, Radius } from '@/constants/Spacing';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatIDR } from '@/utils/currency';
import { walletTransactions } from '@/constants/MockData';
import { useStore } from '@/store';

export default function DompetScreen() {
  const { walletBalance } = useStore();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>DELIVRY Pay</Text>
        <Pressable onPress={() => router.push('/wallet/methods')}>
          <Text style={styles.manageLink}>Kelola</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard}
        >
          <Text style={styles.balanceLabel}>Saldo kamu</Text>
          <Text style={styles.balanceAmount}>{formatIDR(walletBalance)}</Text>
          <View style={styles.balanceActions}>
            <Button label="Top Up" variant="secondary" size="sm" fullWidth={false} onPress={() => router.push('/wallet/topup')} />
            <Button label="Transfer" variant="secondary" size="sm" fullWidth={false} />
            <Button label="QR Pay" variant="secondary" size="sm" fullWidth={false} />
          </View>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Riwayat transaksi</Text>
        </View>

        <View style={styles.txList}>
          {walletTransactions.map((tx) => (
            <Card key={tx.id} style={styles.txCard} onPress={() => router.push('/(tabs)/pesanan')}>
              <View style={styles.txLeft}>
                <Text style={styles.txTitle}>{tx.title}</Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>

              <View style={styles.txRight}>
                <Text style={[styles.txAmount, tx.type === 'credit' ? styles.credit : styles.debit]}>
                  {tx.type === 'credit' ? '+' : '-'}{formatIDR(tx.amount).replace('Rp ', 'Rp')}
                </Text>
                <Badge
                  label={tx.status === 'success' ? 'Success' : tx.status === 'pending' ? 'Pending' : 'Failed'}
                  variant={tx.status === 'success' ? 'success' : tx.status === 'pending' ? 'warning' : 'error'}
                />
              </View>

              <ChevronRight size={16} color={Colors.textHint} strokeWidth={2} />
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  header: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.h3, color: Colors.textPrimary },
  manageLink: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.primary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.base,
    gap: Spacing.base,
    paddingBottom: Spacing['2xl'],
  },
  balanceCard: { borderRadius: Radius.lg, padding: Spacing.base, gap: 8, minHeight: 140 },
  balanceLabel: { fontFamily: FontFamily.medium, fontSize: FontSize.body, color: 'rgba(255,255,255,0.8)' },
  balanceAmount: { fontFamily: FontFamily.bold, fontSize: FontSize.h1, color: Colors.white },
  balanceActions: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  sectionHeader: {
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  txList: {
    gap: Spacing.sm,
  },
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  txLeft: {
    flex: 1,
    gap: 2,
  },
  txTitle: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  txDate: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  txRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  txAmount: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.body,
  },
  credit: {
    color: Colors.success,
  },
  debit: {
    color: Colors.textPrimary,
  },
});
