import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Minus, Plus } from '@/components/ui/TailwindIcon';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';
import { formatIDR } from '@/utils/currency';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

const initialItems: CartItem[] = [
  { id: '1', name: 'Mie Ayam Bakso', price: 22000, qty: 1 },
  { id: '2', name: 'Pangsit Goreng', price: 12000, qty: 1 },
];

export default function CartScreen() {
  const [items, setItems] = useState(initialItems);
  const [note, setNote] = useState('');

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.qty, 0), [items]);
  const deliveryFee = 8000;
  const total = subtotal + deliveryFee;

  function updateQty(id: string, delta: number) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>Pesanan Kamu</Text>
        <View style={styles.headerGap} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.itemList}>
          {items.map((item) => (
            <Card key={item.id} style={styles.itemCard}>
              <View style={styles.itemTop}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{formatIDR(item.price)}</Text>
                </View>

                <View style={styles.qtyRow}>
                  <Pressable style={styles.qtyBtn} onPress={() => updateQty(item.id, -1)}>
                    <Minus size={14} color={Colors.primary} strokeWidth={2.5} />
                  </Pressable>
                  <Text style={styles.qtyText}>{item.qty}</Text>
                  <Pressable style={styles.qtyBtn} onPress={() => updateQty(item.id, 1)}>
                    <Plus size={14} color={Colors.primary} strokeWidth={2.5} />
                  </Pressable>
                </View>
              </View>
            </Card>
          ))}
        </View>

        <Card style={styles.addressCard}>
          <Text style={styles.addressTitle}>Alamat pengantaran</Text>
          <Text style={styles.addressText}>Rumah • Jl. Merdeka No. 5, Jakarta</Text>
        </Card>

        <View style={styles.noteWrap}>
          <Text style={styles.noteLabel}>Catatan (opsional)</Text>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder="Contoh: sambal dipisah"
            placeholderTextColor={Colors.textHint}
          />
        </View>

        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatIDR(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ongkir</Text>
            <Text style={styles.summaryValue}>{formatIDR(deliveryFee)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatIDR(total)}</Text>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Pesan Sekarang" onPress={() => router.push('/food/confirm')} disabled={items.length === 0} />
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
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.base,
    gap: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
  itemList: {
    gap: Spacing.sm,
  },
  itemCard: {
    padding: Spacing.md,
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  itemInfo: {
    flex: 1,
    gap: 4,
  },
  itemName: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  itemPrice: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.body,
    color: Colors.primary,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    minWidth: 18,
    textAlign: 'center',
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  addressCard: {
    padding: Spacing.md,
    gap: 4,
  },
  addressTitle: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textHint,
  },
  addressText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  noteWrap: {
    gap: 6,
  },
  noteLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  noteInput: {
    minHeight: 48,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: 14,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  summaryCard: {
    padding: Spacing.md,
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  footer: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.white,
  },
});
