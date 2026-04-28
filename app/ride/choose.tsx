import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Bike, Car, ChevronRight, MapPin, Package, Wallet } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Colors } from '@/constants/Colors';
import { rideOptions } from '@/constants/MockData';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';
import { formatIDR } from '@/utils/currency';

const iconById = {
  ride: Bike,
  car: Car,
  delivery: Package,
} as const;

export default function ChooseRideScreen() {
  const params = useLocalSearchParams<{ pickup?: string; destination?: string }>();
  const [selectedRide, setSelectedRide] = useState(rideOptions[0].id);

  const currentRide = useMemo(
    () => rideOptions.find((item) => item.id === selectedRide) ?? rideOptions[0],
    [selectedRide]
  );

  function handleOrderRide() {
    router.push({
      pathname: '/ride/searching',
      params: {
        ride: currentRide.name,
        price: String(currentRide.price),
      },
    });
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Kembali">
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.title}>Pilih Layanan</Text>
        <View style={styles.headerGap} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[Colors.primary50, Colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.routeMap}
        >
          <View style={styles.routeRow}>
            <MapPin size={16} color={Colors.primary} strokeWidth={2} />
            <Text style={styles.routeText} numberOfLines={1}>{params.pickup ?? 'Lokasi jemput'}</Text>
          </View>
          <View style={styles.routeDivider} />
          <View style={styles.routeRow}>
            <MapPin size={16} color={Colors.primaryDark} strokeWidth={2} />
            <Text style={styles.routeText} numberOfLines={1}>{params.destination ?? 'Tujuan'}</Text>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Opsi Ride</Text>
        <View style={styles.optionList}>
          {rideOptions.map((option) => {
            const isActive = option.id === selectedRide;
            const Icon = iconById[option.id as keyof typeof iconById] ?? Bike;

            return (
              <Card
                key={option.id}
                onPress={() => setSelectedRide(option.id)}
                style={[styles.optionCard, isActive && styles.optionCardActive]}
                accessibilityLabel={`${option.name}, ${option.eta}, ${formatIDR(option.price)}`}
              >
                <View style={[styles.optionIconWrap, isActive && styles.optionIconWrapActive]}>
                  <Icon size={20} color={isActive ? Colors.white : Colors.primary} strokeWidth={2} />
                </View>

                <View style={styles.optionInfo}>
                  <Text style={styles.optionName}>{option.name}</Text>
                  <Text style={styles.optionMeta}>{option.eta} • {option.capacity}</Text>
                </View>

                <View style={styles.optionPriceWrap}>
                  <Text style={styles.optionPrice}>{formatIDR(option.price)}</Text>
                  {isActive ? <Badge variant="brand" label="Dipilih" /> : null}
                </View>
              </Card>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Metode pembayaran</Text>
        <Card
          style={styles.paymentCard}
          onPress={() => router.push('/wallet/methods')}
          accessibilityLabel="Metode pembayaran DELIVRY Pay"
        >
          <View style={styles.paymentLeft}>
            <View style={styles.paymentIconWrap}>
              <Wallet size={18} color={Colors.primary} strokeWidth={2} />
            </View>
            <View>
              <Text style={styles.paymentTitle}>DELIVRY Pay</Text>
              <Text style={styles.paymentSub}>Saldo: {formatIDR(120000)}</Text>
            </View>
          </View>
          <ChevronRight size={18} color={Colors.textHint} strokeWidth={2} />
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button label={`Pesan ${currentRide.name} • ${formatIDR(currentRide.price)}`} onPress={handleOrderRide} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
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
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h3,
    color: Colors.textPrimary,
  },
  headerGap: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.base,
    gap: Spacing.base,
  },
  routeMap: {
    borderRadius: Radius.lg,
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeDivider: {
    marginLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: Colors.primary,
    height: 16,
    opacity: 0.4,
  },
  routeText: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  sectionTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  optionList: {
    gap: Spacing.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary50,
  },
  optionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconWrapActive: {
    backgroundColor: Colors.primary,
  },
  optionInfo: {
    flex: 1,
    gap: 2,
  },
  optionName: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  optionMeta: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  optionPriceWrap: {
    alignItems: 'flex-end',
    gap: 4,
  },
  optionPrice: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  paymentIconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentTitle: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  paymentSub: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  footer: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.white,
  },
});
