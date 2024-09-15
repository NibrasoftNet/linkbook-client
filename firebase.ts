import { getApp, getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA9EkhFBv1xJhx8KmoweGSLU9USKkVGgJI',
  authDomain: 'linkbook-fcm.firebaseapp.com',
  projectId: 'linkbook-fcm',
  storageBucket: 'linkbook-fcm.appspot.com',
  messagingSenderId: '166528894877',
  appId: '1:166528894877:web:9e5887189f1f9142755174',
  measurementId: 'G-KCC1KTM9TJ',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error('An error occurred while fetching the token:', err);
    return null;
  }
};

export { app, messaging };
