import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MessageCircle, Phone } from '@/components/ui/TailwindIcon';
import { LinearGradient } from 'expo-linear-gradient';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';

export default function SendTrackingScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <LinearGradient
        colors={[Colors.primary50, Colors.primaryLight]}
        style={styles.mapArea}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.mapTitle}>Send Tracking</Text>
        <Text style={styles.mapSub}>Kurir membawa paketmu ke tujuan</Text>
      </LinearGradient>

      <View style={styles.panel}>
        <Card style={styles.statusCard}>
          <Text style={styles.statusTitle}>Status: Dalam perjalanan</Text>
          <Text style={styles.statusSub}>Estimasi tiba 18 menit • Paket aman</Text>
        </Card>

        <View style={styles.actions}>
          <Pressable
            style={styles.actionBtn}
            onPress={() => router.push({ pathname: '/chat/[chatId]', params: { chatId: 'driver-ahmad' } })}
          >
            <MessageCircle size={18} color={Colors.primary} strokeWidth={2} />
            <Text style={styles.actionText}>Chat</Text>
          </Pressable>
          <Pressable style={styles.actionBtn}>
            <Phone size={18} color={Colors.primary} strokeWidth={2} />
            <Text style={styles.actionText}>Call</Text>
          </Pressable>
        </View>

        <Button label="Lihat Aktivitas" onPress={() => router.replace('/(tabs)/pesanan')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  mapArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapTitle: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h3,
    color: Colors.primaryDark,
  },
  mapSub: {
    marginTop: 4,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  panel: {
    padding: Spacing.base,
    gap: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  statusCard: {
    padding: Spacing.md,
    gap: 4,
  },
  statusTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  statusSub: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionBtn: {
    flex: 1,
    minHeight: 44,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  actionText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.primary,
  },
});
