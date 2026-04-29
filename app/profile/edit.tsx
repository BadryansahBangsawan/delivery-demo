import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft } from '@/components/ui/TailwindIcon';

import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';
import { updateProfile, useStore } from '@/store';

export default function EditProfileScreen() {
  const { userName, userEmail } = useStore();
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Profil</Text>
        <View style={styles.headerGap} />
      </View>

      <View style={styles.content}>
        <View style={styles.photoWrap}>
          <View style={styles.photoCircle}>
            <Text style={styles.photoText}>AR</Text>
          </View>
          <Pressable onPress={() => Alert.alert('Ubah Foto', 'Fitur ubah foto profil akan segera hadir.')}>
            <Text style={styles.photoAction}>Ubah foto</Text>
          </Pressable>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nama</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
        </View>
      </View>

      <View style={styles.footer}>
        <Button label="Simpan" onPress={() => { updateProfile(name.trim() || userName, email.trim() || userEmail); router.back(); }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
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
    fontFamily: FontFamily.bold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  headerGap: { width: 40 },
  content: {
    flex: 1,
    padding: Spacing.base,
    gap: Spacing.base,
  },
  photoWrap: {
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.sm,
  },
  photoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h2,
    color: Colors.primary,
  },
  photoAction: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.primary,
  },
  formGroup: {
    gap: 6,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
  input: {
    minHeight: 48,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: 14,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  footer: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
});
