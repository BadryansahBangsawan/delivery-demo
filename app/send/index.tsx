import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, MapPin } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';

export default function SendPackageScreen() {
  const [pickup, setPickup] = useState('Jl. Sudirman No. 10');
  const [destination, setDestination] = useState('Jl. Merdeka No. 5');

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>Kirim Paket</Text>
        <View style={styles.headerGap} />
      </View>

      <View style={styles.content}>
        <Input
          label="Pickup address"
          value={pickup}
          onChangeText={setPickup}
          leftIcon={<MapPin size={16} color={Colors.primary} strokeWidth={2} />}
        />

        <Input
          label="Delivery address"
          value={destination}
          onChangeText={setDestination}
          leftIcon={<MapPin size={16} color={Colors.primaryDark} strokeWidth={2} />}
        />

        <Card style={styles.noteCard}>
          <Text style={styles.noteTitle}>Estimasi cepat</Text>
          <Text style={styles.noteText}>Kurir tiba 5-8 menit, kirim dalam hari yang sama.</Text>
        </Card>
      </View>

      <View style={styles.footer}>
        <Button label="Lanjut Detail Paket" onPress={() => router.push('/send/details')} />
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
    gap: Spacing.base,
  },
  noteCard: {
    padding: Spacing.md,
    gap: 4,
  },
  noteTitle: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  noteText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  footer: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
});
