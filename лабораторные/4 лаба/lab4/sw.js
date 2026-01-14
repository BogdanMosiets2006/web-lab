const CACHE_NAME = 'sushi-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/products.html',
  '/product-details.html',
  '/cart.html',
  '/checkout.html',
  '/coming-soon.html',
  '/contacts.html',
  '/team.html',
  '/css/bootstrap.min.css',
  '/css/style.css',
  '/js/bootstrap.bundle.min.js',
  '/js/jquery.min.js',
  '/js/default-active.js',
  '/js/pwa.js'
];

// Установка Service Worker и кеширование ресурсов
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Кешируем все изображения и CSS файлы
  if (
    request.destination === 'image' ||
    request.url.includes('.css') ||
    request.url.includes('.jpg') ||
    request.url.includes('.jpeg') ||
    request.url.includes('.png') ||
    request.url.includes('.gif') ||
    request.url.includes('.svg') ||
    request.url.includes('.webp')
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          // Клонируем ответ для кеширования
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      })
    );
    return;
  }

  // Стратегия Network First для HTML страниц
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            return response || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Cache First для остальных ресурсов
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request).then((response) => {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return response;
      });
    })
  );
});
