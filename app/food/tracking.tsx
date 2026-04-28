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

const steps = ['Disiapkan', 'Dijemput', 'Diantar'];

export default function FoodTrackingScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <LinearGradient
        colors={[Colors.primary50, Colors.primaryLight]}
        style={styles.mapArea}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.mapTitle}>Map Tracking Driver</Text>
        <Text style={styles.mapSub}>Driver sedang menuju lokasi restoran</Text>
      </LinearGradient>

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
