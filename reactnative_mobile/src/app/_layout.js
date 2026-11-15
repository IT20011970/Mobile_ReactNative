import { useEffect, useRef, useState } from 'react';
import { AppState, Text, View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

import { FavoritesProvider } from '../context/FavoritesContext';
import { TipsProvider, useTips } from '../context/TipsContext';
import { registerForNotificationsAsync } from '../utils/notifications';


function NewTipBanner() {
  const { notice } = useTips();
  if (!notice) return null;
  return (
    <View style={styles.noticeBanner}>
      <Text style={styles.bannerText}>{notice}</Text>
    </View>
  );
}

export default function RootLayout() {
  const appState = useRef(AppState.currentState);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    registerForNotificationsAsync();
  }, []);

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
        <View style={styles.root}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>

          {/* welcome-back banner */}
          {showBanner && (
            <View style={styles.banner}>
              <Text style={styles.bannerText}>👋 Welcome back</Text>
            </View>
          )}

          {/* new tip banner */}
          <NewTipBanner />
        </View>
      </TipsProvider>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#059669',
    paddingTop: 50,
    paddingBottom: 14,
    alignItems: 'center',
  },
  noticeBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2563EB',
    paddingTop: 50,
    paddingBottom: 14,
    alignItems: 'center',
  },
  bannerText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
