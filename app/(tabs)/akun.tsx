import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronRight, MapPin, CreditCard, Bell, HelpCircle, LogOut, User, Settings } from '@/components/ui/TailwindIcon';

import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Spacing, Radius } from '@/constants/Spacing';
import { Avatar } from '@/components/ui/Avatar';

const MENU_ITEMS = [
  { id: 'address', icon: MapPin, label: 'Alamat tersimpan', sub: 'Rumah, kantor, favorit', to: '/profile/addresses' as const },
  { id: 'payment', icon: CreditCard, label: 'Metode pembayaran', sub: 'Kartu, e-wallet', to: '/wallet/methods' as const },
  { id: 'notif', icon: Bell, label: 'Notifikasi', sub: 'Promo & update pesanan', to: '/profile/settings' as const },
  { id: 'settings', icon: Settings, label: 'Pengaturan', sub: 'Bahasa & preferensi', to: '/profile/settings' as const },
  { id: 'help', icon: HelpCircle, label: 'Bantuan & FAQ', sub: 'Pusat bantuan', to: '/profile/help' as const },
];

export default function AkunScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Avatar name="Andi Rahman" size="lg" />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Andi Rahman</Text>
            <Text style={styles.profilePhone}>+62 812 3456 7890</Text>
          </View>
          <Pressable
            style={styles.editBtn}
            accessibilityRole="button"
            accessibilityLabel="Edit profil"
            onPress={() => router.push('/profile/edit')}
          >
            <User size={18} color={Colors.primary} strokeWidth={2} />
          </Pressable>
        </View>

        <View style={styles.divider} />

        <View style={styles.menuList}>
          {MENU_ITEMS.map((item) => (
            <Pressable
              key={item.id}
              style={styles.menuItem}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              onPress={() => router.push(item.to)}
            >
              <View style={styles.menuIcon}>
                <item.icon size={20} color={Colors.primary} strokeWidth={2} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
              <ChevronRight size={18} color={Colors.textHint} strokeWidth={2} />
            </Pressable>
          ))}
        </View>

        <View style={styles.divider} />

        <Pressable style={styles.logoutBtn} accessibilityRole="button" accessibilityLabel="Keluar">
          <LogOut size={20} color={Colors.error} strokeWidth={2} />
          <Text style={styles.logoutText}>Keluar</Text>
        </Pressable>

        <Text style={styles.version}>DELIVRY v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    gap: Spacing.md,
  },
  profileInfo: { flex: 1 },
  profileName: { fontFamily: FontFamily.bold, fontSize: FontSize.h4, color: Colors.textPrimary },
  profilePhone: { fontFamily: FontFamily.regular, fontSize: FontSize.body, color: Colors.textSecondary, marginTop: 2 },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: { height: 8, backgroundColor: Colors.surfaceAlt },
  menuList: { paddingVertical: Spacing.sm },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    minHeight: 64,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: { flex: 1 },
  menuLabel: { fontFamily: FontFamily.medium, fontSize: FontSize.body, color: Colors.textPrimary },
  menuSub: { fontFamily: FontFamily.regular, fontSize: FontSize.caption, color: Colors.textSecondary, marginTop: 2 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    minHeight: 56,
  },
  logoutText: { fontFamily: FontFamily.medium, fontSize: FontSize.body, color: Colors.error },
  version: {
    textAlign: 'center',
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textHint,
    paddingBottom: Spacing['2xl'],
    marginTop: Spacing.sm,
  },
});
