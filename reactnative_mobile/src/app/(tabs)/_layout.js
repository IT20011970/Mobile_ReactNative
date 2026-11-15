import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: { borderTopColor: '#E2E8F0', height: 60, paddingBottom: 8, paddingTop: 6 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        headerStyle: { backgroundColor: '#2563EB' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="tips"
        options={{ title: 'Knowledge Base', tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📚</Text> }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ title: 'Favorites', headerShown: true, tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>★</Text> }}
      />
      <Tabs.Screen
        name="add"
        options={{ title: 'Add Entry', headerShown: true, tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>＋</Text> }}
      />
    </Tabs>
  );
}
