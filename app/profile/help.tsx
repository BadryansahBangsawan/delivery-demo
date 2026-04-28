import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ChevronRight } from '@/components/ui/TailwindIcon';

import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';

const faqs = [
  'Bagaimana cara membatalkan pesanan?',
  'Metode pembayaran apa yang didukung?',
  'Kenapa driver lama ditemukan?',
  'Bagaimana hubungi customer service?',
];

export default function HelpFaqScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>Bantuan & FAQ</Text>
        <View style={styles.headerGap} />
      </View>

      <View style={styles.content}>
        {faqs.map((faq) => (
          <Card key={faq} style={styles.item} onPress={() => {}}>
            <Text style={styles.question}>{faq}</Text>
            <ChevronRight size={16} color={Colors.textHint} strokeWidth={2} />
          </Card>
        ))}
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
  item: {
    minHeight: 56,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  question: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
});
