import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ChevronDown } from '@/components/ui/TailwindIcon';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';

const sizes = ['Kecil', 'Sedang', 'Besar'];

export default function PackageDetailScreen() {
  const [selectedSize, setSelectedSize] = useState('Sedang');
  const [notes, setNotes] = useState('Dokumen penting, jangan dilipat.');

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>Detail Paket</Text>
        <View style={styles.headerGap} />
      </View>

      <View style={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Ukuran paket</Text>
          <View style={styles.sizeRow}>
            {sizes.map((size) => {
              const active = selectedSize === size;
              return (
                <Pressable key={size} onPress={() => setSelectedSize(size)} style={[styles.sizeBtn, active && styles.sizeBtnActive]}>
                  <Text style={[styles.sizeText, active && styles.sizeTextActive]}>{size}</Text>
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Catatan kurir</Text>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="Tambahkan instruksi"
            placeholderTextColor={Colors.textHint}
            multiline
          />
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Pembayaran</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentValue}>DELIVRY Pay</Text>
            <ChevronDown size={16} color={Colors.textHint} strokeWidth={2} />
          </View>
        </Card>
      </View>

      <View style={styles.footer}>
        <Button label="Kirim Sekarang" onPress={() => router.replace('/send/tracking')} />
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
  headerGap: { width: 40 },
  content: {
    flex: 1,
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  card: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  cardTitle: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeBtn: {
    flex: 1,
    minHeight: 40,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary50,
  },
  sizeText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  sizeTextActive: {
    color: Colors.primary,
  },
  notesInput: {
    minHeight: 84,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: 12,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentValue: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  footer: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
});
