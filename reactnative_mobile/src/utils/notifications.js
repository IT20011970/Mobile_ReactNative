import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// (1) Handler set ONCE at module level, outside any component.
// Without this, a notification fired while the app is open won't display.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // older SDKs
    shouldShowBanner: true, // SDK 53+
    shouldShowList: true, // SDK 53+
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// (2) permissions + (3) Android channel. Call once on app start.
export async function registerForNotificationsAsync() {
  // (3) Android 8+ needs a channel or notifications are silently dropped.
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  // (2) check first, then request only if not already granted.
  const { status: existing } = await Notifications.getPermissionsAsync();
  let status = existing;
  if (existing !== 'granted') {
    const req = await Notifications.requestPermissionsAsync();
    status = req.status;
  }
  return status === 'granted';
}

// (4) Fire an immediate local notification (trigger: null = now).
export async function sendLocalNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
}
