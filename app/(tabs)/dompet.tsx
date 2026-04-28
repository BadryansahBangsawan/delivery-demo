import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Spacing, Radius } from '@/constants/Spacing';
import { Button } from '@/components/ui/Button';

export default function DompetScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>DELIVRY Pay</Text>
      </View>

      <View style={{ padding: Spacing.base }}>
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard}
        >
          <Text style={styles.balanceLabel}>Saldo kamu</Text>
          <Text style={styles.balanceAmount}>Rp 150.000</Text>
          <View style={styles.balanceActions}>
            <Button label="Top Up" variant="secondary" size="sm" fullWidth={false} />
            <Button label="Transfer" variant="secondary" size="sm" fullWidth={false} />
            <Button label="QR Pay" variant="secondary" size="sm" fullWidth={false} />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Belum ada transaksi</Text>
        <Text style={styles.emptySubtitle}>Riwayat transaksi kamu akan muncul di sini</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  header: { paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.h3, color: Colors.textPrimary },
  balanceCard: { borderRadius: Radius.lg, padding: Spacing.base, gap: 8, minHeight: 140 },
  balanceLabel: { fontFamily: FontFamily.medium, fontSize: FontSize.body, color: 'rgba(255,255,255,0.8)' },
  balanceAmount: { fontFamily: FontFamily.bold, fontSize: FontSize.h1, color: Colors.white },
  balanceActions: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.h4, color: Colors.textPrimary },
  emptySubtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.body, color: Colors.textSecondary },
});
