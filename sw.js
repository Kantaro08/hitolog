const CACHE='hitolog-v26';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./privacy.html'];
self.addEventListener('install',event=>event.waitUntil(Promise.all([
  self.skipWaiting(),
  caches.open(CACHE).then(cache=>cache.addAll(ASSETS))
])));
self.addEventListener('activate',event=>event.waitUntil(Promise.all([
  self.clients.claim(),
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
])));
self.addEventListener('fetch',event=>event.respondWith(
  caches.match(event.request).then(cached=>cached||fetch(event.request))
));
