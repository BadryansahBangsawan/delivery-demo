import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Clock3, MapPin, MessageCircle, Phone, Send, Star } from '@/components/ui/TailwindIcon';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Map, MapMarker, MapPolyline, MapTileLayer } from '@/components/ui/map';
import { ServiceIcon, type ServiceIconName } from '@/components/ui/ServiceIcon';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Radius, Spacing } from '@/constants/Spacing';

const TRACKING_COORDINATES = [-6.2146, 106.8451] as const;
const DRIVER_COORDINATES = [-6.2146, 106.8451] as const;
const PICKUP_COORDINATES = [-6.2088, 106.8456] as const;
const DESTINATION_COORDINATES = [-6.2243, 106.8415] as const;
const ROUTE_COORDINATES = [
  PICKUP_COORDINATES,
  [-6.213, 106.8468] as const,
  [-6.2185, 106.844] as const,
  DESTINATION_COORDINATES,
];

function toIconName(rideName?: string): ServiceIconName {
  const lower = (rideName ?? '').toLowerCase();
  if (lower === 'car') return 'car';
  if (lower === 'delivery') return 'delivery';
  return 'ride';
}

export default function LiveTrackingScreen() {
  const params = useLocalSearchParams<{ ride?: string }>();
  const iconName = toIconName(params.ride);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.mapArea}>
        <Map center={TRACKING_COORDINATES} zoom={14} style={styles.mapCanvas}>
          <MapTileLayer />
          <MapPolyline coordinates={ROUTE_COORDINATES} strokeWidth={5} />
          <MapPolyline
            coordinates={[DRIVER_COORDINATES, PICKUP_COORDINATES]}
            strokeColor={Colors.info}
            strokeWidth={3}
            lineDashPattern={[8, 8]}
          />
          <MapMarker coordinate={PICKUP_COORDINATES} title="Lokasi jemput">
            <View style={styles.pickupMarker}>
              <MapPin size={16} color={Colors.white} strokeWidth={2.4} />
            </View>
          </MapMarker>
          <MapMarker coordinate={DESTINATION_COORDINATES} title="Tujuan">
            <View style={styles.destinationMarker}>
              <MapPin size={16} color={Colors.white} strokeWidth={2.4} />
            </View>
          </MapMarker>
          <MapMarker coordinate={DRIVER_COORDINATES} title="Ahmad">
            <View style={styles.driverMarker}>
              <ServiceIcon name={iconName} size={30} />
            </View>
          </MapMarker>
        </Map>
        <View style={styles.mapBadge}>
          <ServiceIcon name={iconName} size={24} />
          <Text style={styles.mapBadgeText}>Driver mendekat</Text>
        </View>
        <View pointerEvents="none" style={styles.mapEtaCard}>
          <View style={styles.etaIcon}>
            <Clock3 size={16} color={Colors.primary} strokeWidth={2.2} />
          </View>
          <View style={styles.etaInfo}>
            <Text style={styles.mapTitle}>2 menit lagi</Text>
            <Text style={styles.mapSub}>Ahmad menuju lokasi jemputmu</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.tripSummary}>
          <View style={styles.tripPoint}>
            <View style={styles.tripDotPrimary} />
            <View style={styles.tripTextWrap}>
              <Text style={styles.tripLabel}>Jemput</Text>
              <Text style={styles.tripValue} numberOfLines={1}>Jl. Sudirman No. 10</Text>
            </View>
          </View>
          <View style={styles.tripLine} />
          <View style={styles.tripPoint}>
            <View style={styles.tripDotDark} />
            <View style={styles.tripTextWrap}>
              <Text style={styles.tripLabel}>Tujuan</Text>
              <Text style={styles.tripValue} numberOfLines={1}>Mall Kota Kasablanka</Text>
            </View>
          </View>
        </View>

        <Card style={styles.driverCard}>
          <View style={styles.driverTop}>
            <Avatar name="Ahmad" size="md" />
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Ahmad</Text>
              <Text style={styles.driverVehicle}>Honda Vario • B 1234 XY</Text>
              <View style={styles.ratingRow}>
                <Star size={14} color={Colors.ratingStar} fill={Colors.ratingStar} strokeWidth={0} />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>
            <Badge label="ON TRIP" variant="success" />
          </View>

          <View style={styles.actionRow}>
            <Pressable
              style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}
              onPress={() => router.push({ pathname: '/chat/[chatId]', params: { chatId: 'driver-ahmad' } })}
            >
              <MessageCircle size={18} color={Colors.primary} strokeWidth={2} />
              <Text style={styles.actionText}>Chat</Text>
            </Pressable>

            <Pressable style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}>
              <Phone size={18} color={Colors.primary} strokeWidth={2} />
              <Text style={styles.actionText}>Call</Text>
            </Pressable>

            <Pressable style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}>
              <Send size={18} color={Colors.primary} strokeWidth={2} />
              <Text style={styles.actionText}>Share</Text>
            </Pressable>

            <Pressable style={({ pressed }) => [styles.actionBtn, styles.actionDanger, pressed && styles.actionBtnPressed]}>
              <Text style={styles.actionDangerText}>SOS</Text>
            </Pressable>
          </View>
        </Card>

        <Button label="Sampai Tujuan (Simulasi)" onPress={() => router.push('/ride/complete')} />
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
    top: 28,
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
  mapBadgeText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textPrimary,
  },
  mapEtaCard: {
    position: 'absolute',
    left: Spacing.base,
    right: Spacing.base,
    bottom: Spacing.base,
    minHeight: 58,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'rgba(255,255,255,0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  etaIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  etaInfo: {
    flex: 1,
    gap: 2,
  },
  mapTitle: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.bodyLarge,
    color: Colors.primaryDark,
  },
  mapSub: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  bottomSheet: {
    padding: Spacing.base,
    gap: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.white,
  },
  pickupMarker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  destinationMarker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  driverMarker: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.info,
  },
  tripSummary: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    backgroundColor: Colors.white,
  },
  tripPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  tripDotPrimary: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  tripDotDark: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primaryDark,
  },
  tripLine: {
    width: 1,
    height: 18,
    marginLeft: 4.5,
    marginVertical: 3,
    backgroundColor: Colors.border,
  },
  tripTextWrap: {
    flex: 1,
    gap: 1,
  },
  tripLabel: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textHint,
  },
  tripValue: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  driverCard: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  driverTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  driverInfo: {
    flex: 1,
    gap: 2,
  },
  driverName: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  driverVehicle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionBtn: {
    flex: 1,
    minHeight: 46,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  actionBtnPressed: {
    transform: [{ scale: 0.97 }],
  },
  actionText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.primary,
  },
  actionDanger: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },
  actionDangerText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.error,
  },
});
