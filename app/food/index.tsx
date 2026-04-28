import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MapPin, Search, Star } from 'lucide-react-native';

import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { foodCategories, restaurants } from '@/constants/MockData';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';

export default function FoodHomeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');

  const filtered = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const byQuery =
        query.trim().length === 0 ||
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(query.toLowerCase());

      const byCategory =
        category === 'Semua' || category === 'Near' || restaurant.category.toLowerCase() === category.toLowerCase();

      return byQuery && byCategory;
    });
  }, [category, query]);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Food</Text>
      </View>

      <View style={styles.searchWrap}>
        <Search size={18} color={Colors.textHint} strokeWidth={2} />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari makanan / restoran"
          placeholderTextColor={Colors.textHint}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <FlatList
              data={foodCategories}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipList}
              renderItem={({ item }) => {
                const active = item === category;
                return (
                  <Pressable onPress={() => setCategory(item)} style={[styles.chip, active && styles.chipActive]}>
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
                  </Pressable>
                );
              }}
            />

            <Text style={styles.sectionTitle}>Rekomendasi untukmu</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card
            style={styles.restaurantCard}
            onPress={() => router.push({ pathname: '/food/[restaurantId]', params: { restaurantId: item.id } })}
            accessibilityLabel={`${item.name}, rating ${item.rating}`}
          >
            <View style={styles.restaurantImage}>
              <Text style={styles.restaurantEmoji}>🍜</Text>
            </View>

            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{item.name}</Text>

              <View style={styles.metaRow}>
                <Star size={13} color={Colors.ratingStar} fill={Colors.ratingStar} strokeWidth={0} />
                <Text style={styles.metaText}>{item.rating}</Text>
                <Text style={styles.metaDot}>•</Text>
                <MapPin size={12} color={Colors.textHint} strokeWidth={2} />
                <Text style={styles.metaText}>{item.distance}</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>{item.eta}</Text>
              </View>

              <Text style={styles.categoryBadge}>{item.category}</Text>
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h3,
    color: Colors.textPrimary,
  },
  searchWrap: {
    margin: Spacing.base,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    minHeight: 48,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  listHeader: {
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  chipList: {
    paddingHorizontal: Spacing.base,
    gap: 8,
  },
  chip: {
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  chipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary50,
  },
  chipText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.primary,
  },
  sectionTitle: {
    paddingHorizontal: Spacing.base,
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  listContent: {
    paddingBottom: Spacing['2xl'],
    gap: Spacing.sm,
  },
  restaurantCard: {
    marginHorizontal: Spacing.base,
    padding: 0,
    overflow: 'hidden',
  },
  restaurantImage: {
    height: 122,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantEmoji: {
    fontSize: 54,
  },
  restaurantInfo: {
    padding: Spacing.md,
    gap: 6,
  },
  restaurantName: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
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
  categoryBadge: {
    alignSelf: 'flex-start',
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: Colors.primary,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
  },
});
