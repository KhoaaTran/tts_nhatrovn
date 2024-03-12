/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// import messaging from '@react-native-firebase/messaging';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('setBackgroundMessageHandler Message handled in the background!', remoteMessage);
// });

// messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//         'onNotificationOpenedApp Notification caused app to open from background state:',
//         remoteMessage.notification,
//     );

// });
// messaging().onMessage(async remoteMessage => {
//     console.log('onMessage Notification in Foreground:', remoteMessage)
// });

AppRegistry.registerComponent(appName, () => App);
