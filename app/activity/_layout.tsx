import { Stack } from 'expo-router';

export default function ActivityLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[orderId]" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
