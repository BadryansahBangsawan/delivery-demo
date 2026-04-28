import { useMemo } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Plus, Star } from '@/components/ui/TailwindIcon';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { restaurants, restaurantMenus } from '@/constants/MockData';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';
import { formatIDR } from '@/utils/currency';

export default function RestaurantDetailScreen() {
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();

  const restaurant = useMemo(
    () => restaurants.find((item) => item.id === restaurantId) ?? restaurants[0],
    [restaurantId]
  );

  const menus = restaurantMenus[restaurant.id] ?? [];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>{restaurant.name}</Text>
        <View style={styles.headerGap} />
      </View>

      <FlatList
        data={menus}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.hero}>
              <Image
                source={require('../../assets/images/icon.png')}
                style={styles.heroImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.restaurantInfo}>
              <Text style={styles.name}>{restaurant.name}</Text>
              <View style={styles.metaRow}>
                <Star size={13} color={Colors.ratingStar} fill={Colors.ratingStar} strokeWidth={0} />
                <Text style={styles.metaText}>{restaurant.rating}</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>{restaurant.distance}</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>{restaurant.eta}</Text>
              </View>
              <Badge label={restaurant.category} variant="brand" />
            </View>

            <Text style={styles.sectionTitle}>Menu Populer</Text>
          </>
        }
        renderItem={({ item }) => (
          <Card style={styles.menuCard} onPress={() => {}}>
            <View style={styles.menuInfo}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuPrice}>{formatIDR(item.price)}</Text>
            </View>

            <Pressable style={styles.addBtn} onPress={() => router.push('/food/cart')}>
              <Plus size={16} color={Colors.primary} strokeWidth={2.5} />
            </Pressable>
          </Card>
        )}
      />

      <View style={styles.floatingCart}>
        <Pressable onPress={() => router.push('/food/cart')} style={styles.cartBtn}>
          <Text style={styles.cartText}>Keranjang: 2 item • {formatIDR(43000)}</Text>
        </Pressable>
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
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: Spacing.sm,
    fontFamily: FontFamily.bold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  headerGap: {
    width: 40,
  },
  listContent: {
    paddingBottom: 120,
  },
  hero: {
    height: 170,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: 108,
    height: 108,
  },
  restaurantInfo: {
    padding: Spacing.base,
    gap: 8,
  },
  name: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h3,
    color: Colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  metaDot: {
    color: Colors.textHint,
    fontSize: FontSize.caption,
  },
  sectionTitle: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  menuCard: {
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuInfo: {
    flex: 1,
    gap: 4,
  },
  menuName: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  menuPrice: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.body,
    color: Colors.primary,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary50,
  },
  floatingCart: {
    position: 'absolute',
    left: Spacing.base,
    right: Spacing.base,
    bottom: Spacing.base,
  },
  cartBtn: {
    minHeight: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.base,
  },
  cartText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.white,
  },
});
