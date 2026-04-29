import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MessageCircle, Phone } from '@/components/ui/TailwindIcon';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Map, MapTileLayer } from '@/components/ui/map';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';

const TRACKING_COORDINATES = [-6.1966, 106.8331] as const;

export default function SendTrackingScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.mapArea}>
        <Map center={TRACKING_COORDINATES} style={styles.mapCanvas}>
          <MapTileLayer />
        </Map>
        <View style={styles.mapBadge}>
          <ServiceIcon name="package" size={24} />
          <Text style={styles.mapBadgeText}>Paket dalam rute</Text>
        </View>
        <View pointerEvents="none" style={styles.mapContent}>
          <Text style={styles.mapTitle}>Send Tracking</Text>
          <Text style={styles.mapSub}>Kurir membawa paketmu ke tujuan</Text>
        </View>
      </View>

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
    position: 'relative',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    overflow: 'hidden',
  },
  mapCanvas: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 0,
    borderWidth: 0,
  },
  mapBadge: {
    position: 'absolute',
    top: 24,
    left: Spacing.base,
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  mapContent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.base,
  },
  mapBadgeText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textPrimary,
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
    textAlign: 'center',
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
