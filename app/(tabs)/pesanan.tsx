import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShoppingBag } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';

export default function PesananScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Pesanan</Text>
      </View>
      <View style={styles.empty}>
        <ShoppingBag size={48} color={Colors.textHint} strokeWidth={1.5} />
        <Text style={styles.emptyTitle}>Belum ada pesanan</Text>
        <Text style={styles.emptySubtitle}>Pesanan kamu akan muncul di sini</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  header: { paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.h3, color: Colors.textPrimary },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.h4, color: Colors.textPrimary },
  emptySubtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.body, color: Colors.textSecondary },
});
