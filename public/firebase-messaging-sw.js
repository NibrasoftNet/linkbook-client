// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

// Replace these with your own Firebase config keys...
const firebaseConfig = {
  apiKey: 'AIzaSyA9EkhFBv1xJhx8KmoweGSLU9USKkVGgJI',
  authDomain: 'linkbook-fcm.firebaseapp.com',
  projectId: 'linkbook-fcm',
  storageBucket: 'linkbook-fcm.appspot.com',
  messagingSenderId: '166528894877',
  appId: '1:166528894877:web:9e5887189f1f9142755174',
  measurementId: 'G-KCC1KTM9TJ',
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );

  // payload.fcmOptions?.link comes from our backend API route handle
  // payload.data.link comes from the Firebase Console where link is the 'key'
  const link = payload.fcmOptions?.link || payload.data?.link;

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/images/logo-LinkBook.png',
    data: { url: link },
  };
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click received.');

  event.notification.close();

  // This checks if the client is already open and if it is, it focuses on the tab. If it is not open, it opens a new tab with the URL passed in the notification payload
  event.waitUntil(
    // eslint-disable-next-line no-undef
    clients
      // https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        const { url } = event.notification.data;

        if (!url) return;

        // If relative URL is passed in firebase console or API route handler, it may open a new window as the client.url is the full URL i.e. https://example.com/ and the url is /about whereas if we passed in the full URL, it will focus on the existing tab i.e. https://example.com/about
        // eslint-disable-next-line no-restricted-syntax
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            // eslint-disable-next-line consistent-return
            return client.focus();
          }
        }

        // eslint-disable-next-line no-undef
        if (clients.openWindow) {
          console.log('OPENWINDOW ON CLIENT');
          // eslint-disable-next-line consistent-return,no-undef
          return clients.openWindow(url);
        }
      }),
  );
});
