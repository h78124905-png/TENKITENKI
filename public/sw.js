const CACHE_NAME = 'rain-now-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json'
];

// インストール：アプリ本体をキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  // skipWaiting は呼ばない（手動更新のため）
});

// アクティベート：古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  // clients.claim は呼ばない（既存タブに影響を与えない）
});

// フェッチ：NetworkFirst（アプリ本体）、JSONはNetworkOnly
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 降水量JSONはネットワークのみ（キャッシュしない）
  if (url.pathname.includes('/data/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // アプリ本体は NetworkFirst
  if (event.request.destination === 'document' ||
      event.request.destination === 'script' ||
      event.request.destination === 'style') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // その他は CacheFirst
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// 手動更新：message を受け取ったら skipWaiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
