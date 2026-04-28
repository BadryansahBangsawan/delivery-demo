import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Clock3, MapPin } from '@/components/ui/TailwindIcon';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Map, MapTileLayer } from '@/components/ui/map';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Radius, Spacing } from '@/constants/Spacing';
import { savedPlaces } from '@/constants/MockData';

const JAKARTA_COORDINATES = [-6.2088, 106.8456] as const;

export default function PickLocationScreen() {
  const [pickup, setPickup] = useState('Jl. Sudirman No. 10');
  const [destination, setDestination] = useState('Mall Kota Kasablanka');

  const canContinue = destination.trim().length >= 3;

  function goToChooseRide() {
    if (!canContinue) return;

    router.push({
      pathname: '/ride/choose',
      params: {
        pickup,
        destination,
      },
    });
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Kembali"
          style={styles.backBtn}
        >
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.title}>Pilih Lokasi</Text>
        <View style={styles.headerGap} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.mapPlaceholder}>
          <Map center={JAKARTA_COORDINATES} style={styles.mapCanvas}>
            <MapTileLayer />
          </Map>
          <View pointerEvents="none" style={styles.mapOverlayContent}>
            <MapPin size={30} color={Colors.primary} strokeWidth={2.2} />
            <Text style={styles.mapTitle}>Map Preview</Text>
            <Text style={styles.mapCaption}>Tentukan titik jemput & tujuanmu</Text>
          </View>
        </View>

        <View style={styles.formSection}>
          <Input
            label="Lokasi penjemputan"
            value={pickup}
            onChangeText={setPickup}
            leftIcon={<MapPin size={16} color={Colors.primary} strokeWidth={2} />}
            placeholder="Masukkan lokasi jemput"
            returnKeyType="next"
          />

          <Input
            label="Tujuan"
            value={destination}
            onChangeText={setDestination}
            leftIcon={<MapPin size={16} color={Colors.primaryDark} strokeWidth={2} />}
            placeholder="Mau ke mana?"
            returnKeyType="done"
          />
        </View>

        <View style={styles.savedHeader}>
          <Text style={styles.savedTitle}>Saran & Lokasi Tersimpan</Text>
        </View>

        <View style={styles.savedList}>
          {savedPlaces.map((place) => (
            <Card
              key={place.id}
              onPress={() => setDestination(place.address)}
              style={styles.savedCard}
              accessibilityLabel={`${place.label}, ${place.address}`}
            >
              <View style={styles.savedIconWrap}>
                <MapPin size={16} color={Colors.primary} strokeWidth={2} />
              </View>
              <View style={styles.savedInfo}>
                <Text style={styles.savedLabel}>{place.label}</Text>
                <Text style={styles.savedAddress}>{place.address}</Text>
              </View>
              <View style={styles.savedEta}>
                <Clock3 size={14} color={Colors.textHint} strokeWidth={2} />
                <Text style={styles.savedEtaText}>Cepat</Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Lanjut Pilih Ride" onPress={goToChooseRide} disabled={!canContinue} />
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
  mapPlaceholder: {
    position: 'relative',
    borderRadius: Radius.lg,
    minHeight: 170,
    overflow: 'hidden',
  },
  mapCanvas: {
    ...StyleSheet.absoluteFillObject,
  },
  mapOverlayContent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: Spacing.base,
  },
  mapTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.h4,
    color: Colors.primaryDark,
  },
  mapCaption: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  formSection: {
    gap: Spacing.md,
  },
  savedHeader: {
    marginTop: Spacing.sm,
  },
  savedTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  savedList: {
    gap: Spacing.sm,
  },
  savedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  savedIconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedInfo: {
    flex: 1,
    gap: 2,
  },
  savedLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  savedAddress: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  savedEta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  savedEtaText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textHint,
  },
  footer: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.white,
  },
});
