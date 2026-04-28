import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MessageCircle, Phone, Send, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Radius, Spacing } from '@/constants/Spacing';

export default function LiveTrackingScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <LinearGradient
        colors={[Colors.primary50, Colors.primaryLight]}
        style={styles.mapArea}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.mapTitle}>Tracking Driver Real-time</Text>
        <Text style={styles.mapSub}>Ahmad menuju lokasi jemputmu • 2 menit lagi</Text>
      </LinearGradient>

      <View style={styles.bottomSheet}>
        <Card style={styles.driverCard}>
          <View style={styles.driverTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Ahmad</Text>
              <Text style={styles.driverVehicle}>Honda Vario • B 1234 XY</Text>
              <View style={styles.ratingRow}>
                <Star size={14} color={Colors.ratingStar} fill={Colors.ratingStar} strokeWidth={0} />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>ON TRIP</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
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

            <Pressable style={styles.actionBtn}>
              <Send size={18} color={Colors.primary} strokeWidth={2} />
              <Text style={styles.actionText}>Share</Text>
            </Pressable>

            <Pressable style={[styles.actionBtn, styles.actionDanger]}>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.base,
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
  bottomSheet: {
    padding: Spacing.base,
    gap: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.white,
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
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h4,
    color: Colors.primary,
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
  badge: {
    borderRadius: Radius.full,
    backgroundColor: Colors.successLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.small,
    color: Colors.success,
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
