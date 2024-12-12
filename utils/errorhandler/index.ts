import { NativeModules } from 'react-native';
import * as Updates from 'expo-updates';

export default function setupGlobalErrorHandler() {
  ErrorUtils.setGlobalHandler(async (error, isFatal) => {
    console.error('Global Error Handler:', error);

    // Log to Sentry or send to Slack for notifications
    if (isFatal) {
      alert('A critical error occurred. The app will restart.');
      
      // Check if expo-updates is available
      if (Updates.reloadAsync) {
        try {
          await Updates.reloadAsync();
        } catch (e) {
          console.warn('Error reloading app with Updates:', e);
          // fallback: Restart the app manually
          restartApp();
        }
      } else {
        // fallback: Restart the app manually
        console.warn('Updates not available. Restarting manually.');
        restartApp();
      }
    }
  });


}


function restartApp() {

  if (NativeModules.DevSettings) {
    NativeModules.DevSettings.reload();
  } else {
    // If DevSettings is not available, fallback to reloading the entire app (manual restart)
    console.warn('DevSettings not available, forcing app restart.');
    const { AppRegistry } = require('react-native');
    AppRegistry.registerRunnable('main', () => require('expo-router/entry'));
    AppRegistry.runApplication('main', { rootTag: document.getElementById('app') });
  }
}
