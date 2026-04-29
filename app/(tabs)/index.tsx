/**
 * Home Screen — Beranda
 * Static layout per plan/03_user_flow.md:
 *   • Header (greeting + icons)
 *   • Search bar
 *   • DELIVRY promo banner
 *   • Service grid (4×2)
 *   • Promo carousel (static)
 *   • Recent orders
 *   • Nearby restaurants
 *
 * Performance: FlatList for horizontal lists, React.memo for list items.
 * Solid white (#FFFFFF) backgrounds throughout.
 */
import React, { useCallback } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Bell,
  QrCode,
  Search,
  Star,
  Clock,
  MapPin,
  ChevronRight,
  Plus,
} from '@/components/ui/TailwindIcon';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { router } from 'expo-router';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ServiceIcon, type ServiceIconName } from '@/components/ui/ServiceIcon';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Spacing, Radius, HIT_SLOP } from '@/constants/Spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.62;

// ─── Types ───────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  label: string;
  serviceIcon?: ServiceIconName;
  icon?: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}

interface RecentOrder {
  id: string;
  service: string;
  destination: string;
  label: string;
  serviceIcon: ServiceIconName;
}

interface Restaurant {
  id: string;
  name: string;
  rating: string;
  distance: string;
  time: string;
  category: string;
  image: ImageSourcePropType;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  { id: 'ride',     label: 'Ride',     serviceIcon: 'ride' },
  { id: 'car',      label: 'Car',      serviceIcon: 'car' },
  { id: 'delivery', label: 'Delivery', serviceIcon: 'delivery' },
  { id: 'food',     label: 'Food',     serviceIcon: 'food' },
  { id: 'send',     label: 'Send',     serviceIcon: 'send' },
  { id: 'package',  label: 'Package',  serviceIcon: 'package' },
  { id: 'mart',     label: 'Mart',     serviceIcon: 'mart' },
  { id: 'more',     label: 'Lainnya',  icon: Plus },
];

const RECENT_ORDERS: RecentOrder[] = [
  { id: '1', service: 'Ride', destination: 'Kantor', label: 'Jl. Sudirman No.10', serviceIcon: 'ride' },
  { id: '2', service: 'Food', destination: 'Rumah',  label: 'Jl. Merdeka 5',      serviceIcon: 'food' },
];

const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Warung Nasi Goreng',
    rating: '4.9',
    distance: '1.2 km',
    time: '20-30 min',
    category: 'Nasi',
    image: require('../../assets/images/splash-icon.png'),
  },
  {
    id: '2',
    name: 'Mie Ayam Pak Joko',
    rating: '4.7',
    distance: '0.8 km',
    time: '15-25 min',
    category: 'Mie',
    image: require('../../assets/images/icon.png'),
  },
  {
    id: '3',
    name: 'Soto Betawi Bu Sari',
    rating: '4.8',
    distance: '2.1 km',
    time: '25-35 min',
    category: 'Soto',
    image: require('../../assets/images/android-icon-foreground.png'),
  },
];

// ─── Sub-components (memoised) ────────────────────────────────────────────────

const ServiceItem = React.memo(function ServiceItem({
  item,
  onPress,
}: {
  item: Service;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const Icon = item.icon;

  return (
    <Animated.View style={animStyle}>
      <Pressable
        style={styles.serviceItem}
        onPress={onPress}
        onPressIn={() => { scale.value = withTiming(0.93, { duration: 90 }); }}
        onPressOut={() => { scale.value = withTiming(1, { duration: 120 }); }}
        accessibilityRole="button"
        accessibilityLabel={`${item.label}, tombol`}
        hitSlop={HIT_SLOP}
      >
        <View style={styles.serviceIcon}>
          {item.serviceIcon ? (
            <ServiceIcon name={item.serviceIcon} size={42} />
          ) : Icon ? (
            <Icon size={22} color={Colors.white} strokeWidth={2.1} />
          ) : null}
        </View>
        <Text style={styles.serviceLabel}>{item.label}</Text>
      </Pressable>
    </Animated.View>
  );
});

const RestaurantCard = React.memo(function RestaurantCard({ item }: { item: Restaurant }) {
  return (
    <Card
      style={styles.restaurantCard}
      onPress={() => router.push({ pathname: '/food/[restaurantId]', params: { restaurantId: item.id } })}
      accessibilityLabel={`${item.name}, rating ${item.rating}, ${item.distance}`}
    >
      <View style={styles.restaurantImgPlaceholder}>
        <Image source={item.image} style={styles.restaurantImage} resizeMode="contain" />
      </View>

      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName} numberOfLines={1}>{item.name}</Text>

        <View style={styles.restaurantMeta}>
          <Star size={12} color={Colors.ratingStar} fill={Colors.ratingStar} strokeWidth={0} />
          <Text style={styles.restaurantMetaText}>{item.rating}</Text>
          <Text style={styles.restaurantDot}>·</Text>
          <MapPin size={12} color={Colors.textHint} strokeWidth={2} />
          <Text style={styles.restaurantMetaText}>{item.distance}</Text>
          <Text style={styles.restaurantDot}>·</Text>
          <Clock size={12} color={Colors.textHint} strokeWidth={2} />
          <Text style={styles.restaurantMetaText}>{item.time}</Text>
        </View>

        <Badge label={item.category} variant="brand" />
      </View>
    </Card>
  );
});

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const handleServicePress = useCallback((serviceId: string) => {
    if (serviceId === 'ride' || serviceId === 'car' || serviceId === 'delivery') {
      router.push('/ride');
      return;
    }

    if (serviceId === 'food') {
      router.push('/food');
      return;
    }

    if (serviceId === 'send' || serviceId === 'package') {
      router.push('/send');
      return;
    }
  }, []);

  const renderRestaurant = useCallback(
    ({ item }: ListRenderItemInfo<Restaurant>) => <RestaurantCard item={item} />,
    []
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hai, Andi</Text>
            <Text style={styles.tagline}>Mau ke mana hari ini?</Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable
              style={styles.headerBtn}
              hitSlop={HIT_SLOP}
              accessibilityRole="button"
              accessibilityLabel="Notifikasi"
            >
              <Bell size={22} color={Colors.textPrimary} strokeWidth={2} />
            </Pressable>
            <Pressable
              style={styles.headerBtn}
              hitSlop={HIT_SLOP}
              accessibilityRole="button"
              accessibilityLabel="Scan QR"
            >
              <QrCode size={22} color={Colors.textPrimary} strokeWidth={2} />
            </Pressable>
          </View>
        </View>

        {/* ── Search bar ── */}
        <Pressable
          style={styles.searchBar}
          accessibilityRole="search"
          accessibilityLabel="Cari tujuan"
          onPress={() => router.push('/ride')}
        >
          <Search size={18} color={Colors.textHint} strokeWidth={2} />
          <Text style={styles.searchText}>Cari tujuan...</Text>
        </Pressable>

        {/* ── DELIVRY brand banner ── */}
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.brandBanner}
        >
          <View style={styles.brandBannerLeft}>
            <Text style={styles.brandBannerBadge}>DISKON 20%</Text>
            <Text style={styles.brandBannerTitle}>Untuk semua{'\n'}layanan</Text>
            <Text style={styles.brandBannerSub}>Pakai kode: MOVE20</Text>
          </View>
          <Image source={require('../../assets/images/icon.png')} style={styles.bannerImage} resizeMode="contain" />
        </LinearGradient>

        {/* ── Service Grid ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Layanan kami</Text>
          <Pressable hitSlop={HIT_SLOP} accessibilityRole="button" accessibilityLabel="Lihat semua layanan">
            <Text style={styles.sectionLink}>Lihat semua</Text>
          </Pressable>
        </View>

        <View style={styles.serviceGrid}>
          {SERVICES.map((item) => (
            <ServiceItem key={item.id} item={item} onPress={() => handleServicePress(item.id)} />
          ))}
        </View>

        {/* ── Promo carousel ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Promo untukmu</Text>
          <Pressable hitSlop={HIT_SLOP} accessibilityRole="button" accessibilityLabel="Lihat semua promo">
            <Text style={styles.sectionLink}>Lihat semua</Text>
          </Pressable>
        </View>

        <View style={styles.promoContainer}>
          <LinearGradient
            colors={['#6C2BD9', '#4C1FA8']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={styles.promoCard}
          >
            <View>
              <Text style={styles.promoLabel}>Gratis Ongkir</Text>
              <Text style={styles.promoTitle}>Order Food{'\n'}pertamamu</Text>
            </View>
            <Image source={require('../../assets/images/splash-icon.png')} style={styles.promoImage} resizeMode="contain" />
          </LinearGradient>

          <LinearGradient
            colors={['#D97706', '#B45309']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={styles.promoCard}
          >
            <View>
              <Text style={styles.promoLabel}>Hemat 15%</Text>
              <Text style={styles.promoTitle}>Ride ke{'\n'}kantormu</Text>
            </View>
            <Image source={require('../../assets/images/android-icon-foreground.png')} style={styles.promoImage} resizeMode="contain" />
          </LinearGradient>
        </View>

        {/* ── Recent orders ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Terakhir dipesan</Text>
        </View>

        <View style={styles.recentList}>
          {RECENT_ORDERS.map((order) => {
            return (
              <Card
                key={order.id}
                onPress={() => {}}
                style={styles.recentCard}
                accessibilityLabel={`${order.service} ke ${order.destination}`}
              >
                <View style={[styles.recentIcon, { backgroundColor: Colors.primaryLight }]}>
                  <ServiceIcon name={order.serviceIcon} size={28} />
                </View>
                <View style={styles.recentInfo}>
                  <Text style={styles.recentService}>{order.service}</Text>
                  <Text style={styles.recentDest} numberOfLines={1}>{order.label}</Text>
                </View>
                <ChevronRight size={18} color={Colors.textHint} strokeWidth={2} />
              </Card>
            );
          })}
        </View>

        {/* ── Nearby restaurants ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Restoran terdekat</Text>
          <Pressable hitSlop={HIT_SLOP} accessibilityRole="button" accessibilityLabel="Lihat semua restoran">
            <Text style={styles.sectionLink}>Lihat semua</Text>
          </Pressable>
        </View>

        <FlatList
          data={RESTAURANTS}
          renderItem={renderRestaurant}
          keyExtractor={(r) => r.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.restaurantList}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          scrollEventThrottle={16}
          removeClippedSubviews
          getItemLayout={(_, index) => ({
            length: CARD_WIDTH + 12,
            offset: (CARD_WIDTH + 12) * index,
            index,
          })}
        />

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.base,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  greeting: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  tagline: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h3,
    color: Colors.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: Spacing.base,
    marginVertical: Spacing.sm,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: Spacing.base,
  },
  searchText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.bodyLarge,
    color: Colors.textHint,
    flex: 1,
    includeFontPadding: false,
  },

  // Brand banner
  brandBanner: {
    marginHorizontal: Spacing.base,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    minHeight: 110,
  },
  brandBannerLeft: {
    gap: 4,
  },
  brandBannerBadge: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.caption,
    color: Colors.primaryLight,
  },
  brandBannerTitle: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h3,
    color: Colors.white,
    lineHeight: 26,
  },
  brandBannerSub: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  bannerImage: {
    width: 66,
    height: 66,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.h4,
    color: Colors.textPrimary,
  },
  sectionLink: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.primary,
  },

  // Service grid (4 columns)
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  serviceItem: {
    width: (SCREEN_WIDTH - Spacing.base * 2) / 4,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: 6,
  },
  serviceIcon: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  serviceLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textPrimary,
    textAlign: 'center',
  },

  // Promo cards
  promoContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.base,
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  promoCard: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    minHeight: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  promoTitle: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.body,
    color: Colors.white,
    lineHeight: 22,
  },
  promoImage: {
    width: 42,
    height: 42,
  },

  // Recent orders
  recentList: {
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
  },
  recentIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentInfo: {
    flex: 1,
  },
  recentService: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  recentDest: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  // Restaurant cards
  restaurantList: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  restaurantCard: {
    width: CARD_WIDTH,
    padding: 0,
    overflow: 'hidden',
  },
  restaurantImgPlaceholder: {
    height: 120,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantImage: {
    width: 80,
    height: 80,
  },
  restaurantInfo: {
    padding: Spacing.md,
    gap: 6,
  },
  restaurantName: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  restaurantMetaText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
    includeFontPadding: false,
  },
  restaurantDot: {
    color: Colors.textHint,
    fontSize: FontSize.caption,
  },

  bottomPad: { height: 20 },
});
