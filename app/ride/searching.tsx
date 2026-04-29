import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { router, useLocalSearchParams } from "expo-router";
import {
  CheckCircle,
  Clock3,
  MapPin,
} from "@/components/ui/TailwindIcon";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Colors } from "@/constants/Colors";
import { FontFamily, FontSize } from "@/constants/Typography";
import { Radius, Spacing } from "@/constants/Spacing";
import { formatIDR } from "@/utils/currency";

const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);
const SEARCH_STEPS = [
  { label: "Cari driver terdekat", meta: "Sekitar titik jemput" },
  { label: "Cek kendaraan", meta: "Motor aktif dan responsif" },
  { label: "Driver menerima", meta: "Ahmad menuju lokasi jemput" },
];

export default function SearchingDriverScreen() {
  const params = useLocalSearchParams<{ ride?: string; price?: string }>();
  const [phase, setPhase] = useState(0);
  const pulse = useSharedValue(0.95);
  const opacity = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.08, { duration: 900, easing: EASE_OUT }),
      -1,
      true,
    );
    opacity.value = withRepeat(
      withTiming(0.5, { duration: 900, easing: EASE_OUT }),
      -1,
      true,
    );

    const phaseTimers = [
      setTimeout(() => setPhase(1), 850),
      setTimeout(() => setPhase(2), 1700),
      setTimeout(() => setPhase(3), 2450),
    ];
    const navigateTimer = setTimeout(() => {
      router.replace("/ride/tracking");
    }, 3400);

    return () => {
      phaseTimers.forEach(clearTimeout);
      clearTimeout(navigateTimer);
    };
  }, [opacity, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.content}>
        <Text style={styles.title}>Mencari driver</Text>
        <Text style={styles.subtitle}>
          Kami pilih driver {params.ride ?? "Ride"} terdekat untukmu.
        </Text>

        <View style={styles.radarWrap}>
          <Animated.View style={[styles.radarOuter, pulseStyle]} />
          <View style={styles.radarInner}>
            <ServiceIcon name="ride" size={66} />
          </View>
        </View>

        <Card style={styles.driverPreview}>
          <View style={styles.driverIcon}>
            <ServiceIcon name="ride" size={32} />
          </View>
          <View style={styles.driverInfo}>
            <Text style={styles.driverTitle}>Kandidat driver</Text>
            <Text style={styles.driverMeta}>Ahmad</Text>
            <Text style={styles.driverSub}>Honda Vario • 2 menit</Text>
          </View>
          <Badge
            label={phase >= 3 ? "Diterima" : "Mencari"}
            variant={phase >= 3 ? "success" : "brand"}
          />
        </Card>

        <View style={styles.stepList}>
          {SEARCH_STEPS.map((step, index) => {
            const done = phase > index;
            const active = phase === index;

            return (
              <View key={step.label} style={styles.stepRow}>
                <View
                  style={[
                    styles.stepIcon,
                    done && styles.stepIconDone,
                    active && styles.stepIconActive,
                  ]}
                >
                  {done ? (
                    <CheckCircle
                      size={16}
                      color={Colors.white}
                      strokeWidth={2.4}
                    />
                  ) : index === 0 ? (
                    <MapPin
                      size={16}
                      color={active ? Colors.primary : Colors.textHint}
                      strokeWidth={2.2}
                    />
                  ) : (
                    <Clock3
                      size={16}
                      color={active ? Colors.primary : Colors.textHint}
                      strokeWidth={2.2}
                    />
                  )}
                </View>
                <View style={styles.stepTextWrap}>
                  <Text
                    style={[styles.stepTitle, done && styles.stepTitleDone]}
                  >
                    {step.label}
                  </Text>
                  <Text style={styles.stepMeta}>{step.meta}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.fareCard}>
          <Text style={styles.fareLabel}>Estimasi biaya</Text>
          <Text style={styles.fareValue}>
            {formatIDR(Number(params.price ?? 15000))}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="Batalkan"
          variant="ghost"
          onPress={() => router.back()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.base,
    gap: Spacing.lg,
  },
  badgeRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h1,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: Spacing.sm,
  },
  radarWrap: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  radarOuter: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.primaryLight,
  },
  radarInner: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  driverPreview: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    padding: Spacing.base,
    borderWidth: 1.5,
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.primary50,
  },
  driverIcon: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  driverInfo: {
    flex: 1,
    gap: 3,
  },
  driverTitle: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  driverMeta: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  driverSub: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  stepList: {
    width: "100%",
    gap: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    padding: Spacing.base,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  stepIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  stepIconActive: {
    backgroundColor: Colors.primary50,
  },
  stepIconDone: {
    backgroundColor: Colors.success,
  },
  stepTextWrap: {
    flex: 1,
    gap: 1,
  },
  stepTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  stepTitleDone: {
    color: Colors.success,
  },
  stepMeta: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  fareCard: {
    width: "100%",
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.primary50,
    padding: Spacing.base,
    alignItems: "center",
    gap: 2,
  },
  fareLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  fareValue: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h2,
    color: Colors.primary,
  },
  fareSub: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing["2xl"],
    gap: Spacing.sm,
  },
  skipBtn: {
    alignSelf: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
  },
  skipBtnPressed: {
    transform: [{ scale: 0.97 }],
  },
  skipText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.primary,
  },
});
