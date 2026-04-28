import { Stack } from 'expo-router';

export default function ChatLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[chatId]" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
