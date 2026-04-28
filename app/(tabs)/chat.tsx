import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Colors } from '@/constants/Colors';
import { chatThreads } from '@/constants/MockData';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Radius, Spacing } from '@/constants/Spacing';

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {chatThreads.map((thread) => (
          <Card
            key={thread.id}
            style={styles.chatCard}
            onPress={() => router.push({ pathname: '/chat/[chatId]', params: { chatId: thread.id } })}
            accessibilityLabel={`Chat ${thread.name}`}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{thread.name.slice(0, 1).toUpperCase()}</Text>
            </View>

            <View style={styles.info}>
              <View style={styles.topRow}>
                <Text style={styles.name}>{thread.name}</Text>
                <Text style={styles.time}>{thread.time}</Text>
              </View>
              <Text style={styles.preview} numberOfLines={1}>{thread.preview}</Text>
            </View>

            <View style={styles.rightCol}>
              {thread.unread > 0 ? <Badge variant="brand" label={String(thread.unread)} /> : null}
              <ChevronRight size={16} color={Colors.textHint} strokeWidth={2} />
            </View>
          </Card>
        ))}

        <Pressable style={styles.helpLink} onPress={() => router.push({ pathname: '/chat/[chatId]', params: { chatId: 'support' } })}>
          <Text style={styles.helpLinkText}>Butuh bantuan? Chat DELIVRY Support</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  header: { paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.h3, color: Colors.textPrimary },
  content: {
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.body,
    color: Colors.primary,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  name: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  time: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textHint,
  },
  preview: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  helpLink: {
    marginTop: Spacing.sm,
    minHeight: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.base,
  },
  helpLinkText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body,
    color: Colors.primary,
  },
});
