import { Stack } from 'expo-router';

export default function TipsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2563EB' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Knowledge Base' }} />
      <Stack.Screen name="[id]" options={{ title: 'Entry', headerBackTitle: 'Back' }} />
    </Stack>
  );
}
