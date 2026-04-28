import { Stack } from 'expo-router';

export default function WalletLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="topup" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="methods" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
