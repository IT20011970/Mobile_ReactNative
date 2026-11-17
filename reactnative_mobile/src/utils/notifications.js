import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

if (!isWeb) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true, // older SDKs
      shouldShowBanner: true, // SDK 53+
      shouldShowList: true, // SDK 53+
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}


export async function registerForNotificationsAsync() {
  if (isWeb) return false;

 
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

 
  const { status: existing } = await Notifications.getPermissionsAsync();
  let status = existing;
  if (existing !== 'granted') {
    const req = await Notifications.requestPermissionsAsync();
    status = req.status;
  }
  return status === 'granted';
}


export async function sendLocalNotification(title, body) {
  if (isWeb) return;
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
}
