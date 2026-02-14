import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const scheduleNotification = async (title, body, time) => {
  try {
    const permission = await Notifications.requestPermissionsAsync();
    if (!permission.granted) return;

    const trigger = new Date(time);

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH
      },
      trigger,
    });
  } catch (e) {
    console.error('Failed to schedule notification:', e);
  }
};
