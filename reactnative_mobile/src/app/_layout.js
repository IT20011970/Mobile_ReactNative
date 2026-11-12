import { useEffect, useRef, useState } from 'react';
import { AppState, Text } from 'react-native';
import { Stack } from 'expo-router';

import { FavoritesProvider } from '../context/FavoritesContext';
import { TipsProvider } from '../context/TipsContext';

export default function RootLayout() {
  
  const appState = useRef(AppState.currentState);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (nextState) => {
      
      if (appState.current === 'background' && nextState === 'active') {
        setShowBanner(true);
        setTimeout(() => setShowBanner(false), 3000);
      }
      appState.current = nextState;
    };

    const sub = AppState.addEventListener('change', handler);
    return () => sub.remove();
  }, []);

  return (
    <FavoritesProvider>
      <TipsProvider>
        {showBanner && <Text> New Knowledge Tip Added</Text>}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </TipsProvider>
    </FavoritesProvider>
  );
}
