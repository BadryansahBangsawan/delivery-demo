import { Stack } from 'expo-router';

export default function RideLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="choose" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="searching" options={{ animation: 'fade' }} />
      <Stack.Screen name="tracking" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="complete" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
