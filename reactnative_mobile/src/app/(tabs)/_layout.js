import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="tips"
        options={{
          title: 'Knowledge Base',
          tabBarIcon: () => <Text>*</Text>,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          headerShown: true,
          tabBarIcon: () => <Text>*</Text>,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          headerShown: true,
          tabBarIcon: () => <Text>+</Text>,
        }}
      />
    </Tabs>
  );
}
