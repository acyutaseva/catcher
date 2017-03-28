// minimal service worker to display persistent notification
// actions, ..  are not supported on normal notification via webpage

function sendEvent(notification, name) {
  const events = notification.data.events;
  if (events[name]) return fetch(events[name]);
}

function onNotificationClose(event) {
  event.notification.close();

  event.waitUntil(sendEvent(event.notification, 'close'));
}

function onNotificationClick(event) {
  event.notification.close();
  const action = event.action ? event.action : 'default';
  const {data} = event.notification;

  let opener = Promise.resolve(null);
  if (data.payload.redirects) {
    const url = data.payload.redirects[action];
    if (url) {
      opener = self.clients.openWindow(url).catch((e) => console.log(`fail to open ${url}`, e));
    }
  }

  event.waitUntil(
    opener
      .then(() => sendEvent(event.notification, `click-${action}`))
  );
}

// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope
self.addEventListener('install', () => {
  self.skipWaiting();
  console.log('sw installed')
});
self.addEventListener('notificationclose', onNotificationClose);
self.addEventListener('notificationclick', onNotificationClick);
