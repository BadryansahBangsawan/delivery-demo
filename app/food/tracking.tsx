import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
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

const steps = ['Disiapkan', 'Dijemput', 'Diantar'];
const TRACKING_COORDINATES = [-6.1939, 106.823] as const;

export default function FoodTrackingScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.mapArea}>
        <Map center={TRACKING_COORDINATES} style={styles.mapCanvas}>
          <MapTileLayer />
        </Map>
        <View style={styles.mapBadge}>
          <ServiceIcon name="food" size={24} />
          <Text style={styles.mapBadgeText}>Pesanan diproses</Text>
        </View>
        <View pointerEvents="none" style={styles.mapContent}>
          <Text style={styles.mapTitle}>Map Tracking Driver</Text>
          <Text style={styles.mapSub}>Driver sedang menuju lokasi restoran</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.status}>Status: Sedang disiapkan...</Text>

        <View style={styles.progressWrap}>
          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
          <View style={styles.stepRow}>
            {steps.map((step, index) => (
              <Text key={step} style={[styles.stepText, index === 0 && styles.stepTextActive]}>
                {step}
              </Text>
            ))}
          </View>
        </View>

        <Card style={styles.driverCard}>
          <Text style={styles.driverTitle}>Driver: Ahmad</Text>
          <View style={styles.driverActions}>
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
        </Card>

        <Button label="Lihat Aktivitas" onPress={() => router.replace('/(tabs)/pesanan')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
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
    right: Spacing.base,
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
  status: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  progressWrap: {
    gap: 8,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 999,
    backgroundColor: Colors.divider,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '40%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textHint,
  },
  stepTextActive: {
    color: Colors.primary,
    fontFamily: FontFamily.medium,
  },
  driverCard: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  driverTitle: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  driverActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionBtn: {
    flex: 1,
    minHeight: 42,
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
