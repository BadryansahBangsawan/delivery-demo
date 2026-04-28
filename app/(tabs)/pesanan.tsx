import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { activityOrders } from '@/constants/MockData';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';
import { formatIDR } from '@/utils/currency';

type Filter = 'ongoing' | 'completed';

export default function PesananScreen() {
  const [filter, setFilter] = useState<Filter>('ongoing');

  const filtered = useMemo(
    () => activityOrders.filter((item) => item.status === filter),
    [filter]
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Aktivitas</Text>
      </View>

      <View style={styles.segmentWrap}>
        <Pressable onPress={() => setFilter('ongoing')} style={[styles.segmentBtn, filter === 'ongoing' && styles.segmentBtnActive]}>
          <Text style={[styles.segmentText, filter === 'ongoing' && styles.segmentTextActive]}>Ongoing</Text>
        </Pressable>
        <Pressable onPress={() => setFilter('completed')} style={[styles.segmentBtn, filter === 'completed' && styles.segmentBtnActive]}>
          <Text style={[styles.segmentText, filter === 'completed' && styles.segmentTextActive]}>Completed</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Belum ada aktivitas</Text>
            <Text style={styles.emptySubtitle}>Aktivitas kamu akan muncul di sini</Text>
          </View>
        ) : (
          filtered.map((order) => (
            <Card
              key={order.id}
              style={styles.orderCard}
              onPress={() => router.push({ pathname: '/activity/[orderId]', params: { orderId: order.id } })}
              accessibilityLabel={`${order.title}, ${order.status}`}
            >
              <View style={styles.orderLeft}>
                <Text style={styles.orderService}>{order.service}</Text>
                <Text style={styles.orderTitle}>{order.title}</Text>
                <Text style={styles.orderSub}>{order.subtitle}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>

              <View style={styles.orderRight}>
                <Text style={styles.orderTotal}>{formatIDR(order.total)}</Text>
                <Badge
                  label={order.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                  variant={order.status === 'ongoing' ? 'warning' : 'success'}
                />
              </View>

              <ChevronRight size={16} color={Colors.textHint} strokeWidth={2} />
            </Card>
          ))
        )}
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
  },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.h3, color: Colors.textPrimary },
  segmentWrap: {
    flexDirection: 'row',
    margin: Spacing.base,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    padding: 4,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    minHeight: 40,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentBtnActive: {
    backgroundColor: Colors.white,
  },
  segmentText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  segmentTextActive: {
    color: Colors.primary,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['2xl'],
    gap: Spacing.sm,
  },
  orderCard: {
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  orderLeft: {
    flex: 1,
    gap: 2,
  },
  orderService: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.primary,
  },
  orderTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  orderSub: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  orderDate: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.small,
    color: Colors.textHint,
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  orderTotal: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing['3xl'],
    gap: 8,
  },
  emptyTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.h4,
    color: Colors.textPrimary,
  },
  emptySubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
});
