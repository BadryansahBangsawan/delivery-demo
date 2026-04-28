import { Stack } from 'expo-router';

export default function FoodLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="[restaurantId]" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="cart" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="confirm" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="tracking" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
