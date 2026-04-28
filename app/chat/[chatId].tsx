import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { chatMessages, chatThreads } from '@/constants/MockData';
import { Radius, Spacing } from '@/constants/Spacing';
import { FontFamily, FontSize } from '@/constants/Typography';

const quickReplies = ['Saya di depan', 'Mohon tunggu 2 menit', 'Terima kasih'];

export default function ChatRoomScreen() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const [message, setMessage] = useState('');

  const thread = useMemo(
    () => chatThreads.find((item) => item.id === chatId) ?? chatThreads[0],
    [chatId]
  );

  const messages = useMemo(() => chatMessages[thread.id] ?? [], [thread.id]);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{thread.name}</Text>
          <Text style={styles.headerSub}>{thread.role}</Text>
        </View>
        <View style={styles.headerGap} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => {
          const fromMe = item.from === 'me';
          return (
            <View style={[styles.bubbleWrap, fromMe ? styles.bubbleWrapMe : styles.bubbleWrapOther]}>
              <View style={[styles.bubble, fromMe ? styles.bubbleMe : styles.bubbleOther]}>
                <Text style={[styles.bubbleText, fromMe && styles.bubbleTextMe]}>{item.text}</Text>
                <Text style={[styles.bubbleTime, fromMe && styles.bubbleTimeMe]}>{item.time}</Text>
              </View>
            </View>
          );
        }}
        ListFooterComponent={
          <View style={styles.quickRow}>
            {quickReplies.map((reply) => (
              <Pressable key={reply} style={styles.quickChip} onPress={() => setMessage(reply)}>
                <Text style={styles.quickChipText}>{reply}</Text>
              </Pressable>
            ))}
          </View>
        }
      />

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Tulis pesan..."
          placeholderTextColor={Colors.textHint}
        />
        <Pressable style={styles.sendBtn}>
          <Send size={18} color={Colors.white} strokeWidth={2.2} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    gap: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.bodyLarge,
    color: Colors.textPrimary,
  },
  headerSub: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  headerGap: {
    width: 8,
  },
  messageList: {
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  bubbleWrap: {
    width: '100%',
  },
  bubbleWrapMe: {
    alignItems: 'flex-end',
  },
  bubbleWrapOther: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: Radius.lg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  bubbleMe: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 6,
  },
  bubbleOther: {
    backgroundColor: Colors.surfaceAlt,
    borderBottomLeftRadius: 6,
  },
  bubbleText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  bubbleTextMe: {
    color: Colors.white,
  },
  bubbleTime: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.small,
    color: Colors.textHint,
    textAlign: 'right',
  },
  bubbleTimeMe: {
    color: 'rgba(255,255,255,0.7)',
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: Spacing.sm,
  },
  quickChip: {
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickChipText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    minHeight: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: 12,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
