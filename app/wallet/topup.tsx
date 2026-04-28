import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft } from '@/components/ui/TailwindIcon';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';
import { formatIDR } from '@/utils/currency';

const quickAmounts = [50000, 100000, 200000, 500000];

export default function TopUpScreen() {
  const [amount, setAmount] = useState('100000');

  const numeric = Number(amount.replace(/[^0-9]/g, '')) || 0;

  function submitTopUp() {
    router.replace('/(tabs)/dompet');
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>Top Up</Text>
        <View style={styles.headerGap} />
      </View>

      <View style={styles.content}>
        <Card style={styles.inputCard}>
          <Text style={styles.label}>Masukkan nominal</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            placeholder="100000"
            placeholderTextColor={Colors.textHint}
          />
          <Text style={styles.preview}>{formatIDR(numeric)}</Text>
        </Card>

        <View style={styles.quickRow}>
          {quickAmounts.map((item) => {
            const active = numeric === item;
            return (
              <Pressable key={item} onPress={() => setAmount(String(item))} style={[styles.quickBtn, active && styles.quickBtnActive]}>
                <Text style={[styles.quickText, active && styles.quickTextActive]}>{formatIDR(item)}</Text>
              </Pressable>
            );
          })}
        </View>

        <Card style={styles.methodCard} onPress={() => router.push('/wallet/methods')}>
          <Text style={styles.methodLabel}>Metode top up</Text>
          <Text style={styles.methodValue}>Virtual Account BCA</Text>
        </Card>
      </View>

      <View style={styles.footer}>
        <Button label={`Lanjut Top Up ${formatIDR(numeric)}`} onPress={submitTopUp} disabled={numeric < 10000} />
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
  inputCard: {
    padding: Spacing.md,
    gap: 8,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textHint,
  },
  input: {
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 48,
    paddingHorizontal: 14,
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.h4,
    color: Colors.textPrimary,
    backgroundColor: Colors.surface,
  },
  preview: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h3,
    color: Colors.primary,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickBtn: {
    width: '48%',
    minHeight: 42,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  quickBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary50,
  },
  quickText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  quickTextActive: {
    color: Colors.primary,
  },
  methodCard: {
    padding: Spacing.md,
    gap: 4,
  },
  methodLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textHint,
  },
  methodValue: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  footer: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
});
