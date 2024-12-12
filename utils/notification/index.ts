import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {

  await Notifications.requestPermissionsAsync()
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
      

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

}


export const scheduleNotification = async () => {


      // Schedule a notification for 5 seconds from now
       Notifications.scheduleNotificationAsync({
        content: {
          title: 'Loyalty Point Earned 🎉',
          body: 'You earned some loyalty points!',
        },
        trigger: {seconds: 5}
      });


    
  };

