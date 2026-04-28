import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Plus } from 'lucide-react-native';

import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';

const addresses = [
  { id: 'home', title: 'Rumah', detail: 'Jl. Merdeka No. 5, Jakarta' },
  { id: 'office', title: 'Kantor', detail: 'Jl. Sudirman No. 10, Jakarta' },
  { id: 'other', title: 'Kos', detail: 'Jl. Tebet Barat No. 9, Jakarta' },
];

export default function SavedAddressesScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>Alamat Tersimpan</Text>
        <View style={styles.headerGap} />
      </View>

      <View style={styles.content}>
        {addresses.map((item) => (
          <Card key={item.id} style={styles.addressCard} onPress={() => {}}>
            <View style={styles.iconWrap}>
              <MapPin size={18} color={Colors.primary} strokeWidth={2} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.detail}>{item.detail}</Text>
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.addBtn}>
          <Plus size={18} color={Colors.white} strokeWidth={2.5} />
          <Text style={styles.addText}>Tambah alamat baru</Text>
        </Pressable>
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
  addressCard: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.md,
    alignItems: 'center',
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  detail: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  footer: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  addBtn: {
    minHeight: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.white,
  },
});
