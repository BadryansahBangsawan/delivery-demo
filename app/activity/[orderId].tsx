import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Colors } from '@/constants/Colors';
import { activityOrders } from '@/constants/MockData';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';
import { formatIDR } from '@/utils/currency';

export default function ActivityDetailScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const order = useMemo(
    () => activityOrders.find((item) => item.id === orderId) ?? activityOrders[0],
    [orderId]
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>Detail Pesanan</Text>
        <View style={styles.headerGap} />
      </View>

      <View style={styles.content}>
        <Card style={styles.mainCard}>
          <Text style={styles.service}>{order.service}</Text>
          <Text style={styles.title}>{order.title}</Text>
          <Text style={styles.subtitle}>{order.subtitle}</Text>
          <Badge label={order.status === 'ongoing' ? 'Ongoing' : 'Completed'} variant={order.status === 'ongoing' ? 'warning' : 'success'} />
        </Card>

        <Card style={styles.receiptCard}>
          <Text style={styles.receiptTitle}>Receipt</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Order ID</Text>
            <Text style={styles.rowValue}>{order.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Tanggal</Text>
            <Text style={styles.rowValue}>{order.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Subtotal</Text>
            <Text style={styles.rowValue}>{formatIDR(Math.floor(order.total * 0.88))}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Biaya layanan</Text>
            <Text style={styles.rowValue}>{formatIDR(order.total - Math.floor(order.total * 0.88))}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatIDR(order.total)}</Text>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
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
    gap: Spacing.base,
  },
  mainCard: {
    padding: Spacing.md,
    gap: 6,
  },
  service: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.primary,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.h4,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  receiptCard: {
    padding: Spacing.md,
    gap: 10,
  },
  receiptTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  rowLabel: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  rowValue: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  divider: {
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
});
