import { Stack } from 'expo-router';

import { FavoritesProvider } from '../context/FavoritesContext';
import { TipsProvider } from '../context/TipsContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <TipsProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </TipsProvider>
    </FavoritesProvider>
  );
}
