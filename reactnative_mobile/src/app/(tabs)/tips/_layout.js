import { Stack } from 'expo-router';

export default function TipsStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Knowledge Base' }} />
      <Stack.Screen name="[id]" options={{ title: 'Entry' }} />
    </Stack>
  );
}
