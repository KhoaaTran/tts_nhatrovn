import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'
import DeviceInfo from 'react-native-device-info'
import {GuestService} from '../services'

import PushNotification from 'react-native-push-notification'
import {Platform} from 'react-native'

export async function checkNotificationPermission() {
  const enabled = await messaging().hasPermission()
  return enabled
}

export async function getFcmTokenRealtime() {
  // let enabled = await messaging().hasPermission();
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  let fcmToken = ''
  // if (!enabled) {
  //     enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  // }
  if (enabled) {
    fcmToken = await messaging().getToken()
  }
  return fcmToken
}

export async function requestUserPermission() {
  //await messaging().registerDeviceForRemoteMessages();
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    // console.log('Authorization status:', authStatus);
    getFcmToken()
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken')

  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken()
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    } catch (err) {
      // console.log(err)
    }
  }
}

const updateFcmTokenToDB = async (fcmTokenNEW) => {
  let fcmTokenOLD = await AsyncStorage.getItem('fcmToken')
  if (fcmTokenOLD == null) fcmTokenOLD = ''
  if (fcmTokenNEW == null) fcmTokenNEW = ''
  // if (fcmTokenOLD != fcmTokenNEW) {
  const deviceInfo = {
    deviceId: DeviceInfo.getDeviceId(),
    os: Platform.OS,
    manufacturer: DeviceInfo.getManufacturer(),
    model: DeviceInfo.getModel(),
    isTablet: DeviceInfo.isTablet(),
  }
  let data = {
    fcmToken: fcmTokenNEW,
    fcmTokenOLD: fcmTokenOLD,
    deviceInfo: deviceInfo,
  }
  const response = await GuestService.postData(`guest/save-device-info`, data)
    .then(function (response) {
      AsyncStorage.setItem('fcmToken', fcmTokenNEW)
    })
    .catch(function (error) {})

  // }
}

export const NotificationServices = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    // console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    // );
    // navigation.navigate(remoteMessage.data.type);
  })

  //Foreground Message Handling
  messaging().onMessage(async (remoteMessage) => {
    // console.log('Notification in Foreground:', remoteMessage)
    PushNotification.localNotification({
      channelId: 'channel-nhatrovn-anhome', // Sử dụng ID của kênh thông báo đã tạo
      showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      largeIconUrl: 'ic_launcher', // (optional) default: undefined
      smallIcon: 'ic_notification',
      title: undefined,
      message: remoteMessage.notification?.body || 'Bạn có thông báo mới',
      userInfo: {
        key1: 'value1',
        key2: 'value2',
      },
    })
  })

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        )
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      //setLoading(false);
    })

  messaging()
    .getToken()
    .then((token) => {
      if (token) {
        updateFcmTokenToDB(token)

        // Alert.alert('Token', token)
        // console.log(token)
        // Save the token to your database or server
        // setTimeout(() => {
        //     console.log('Delete Token')
        //     messaging().deleteToken();
        //     messaging().getToken();
        // }, 5000)
      }
    })

  messaging().onTokenRefresh((newToken) => {
    updateFcmTokenToDB(newToken)
    // Handle token refresh event
    // Alert.alert('Token refreshed', newToken)
    // console.log('Token refreshed:', newToken)
    // Update the token in your database or perform any other necessary actions
  })

  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage)
  //   })
}
