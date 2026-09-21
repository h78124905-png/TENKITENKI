const CACHE_NAME = 'rain-now-v1';
const APP_SHELL = ['./', './index.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 気象庁のタイル・JSONはキャッシュしない（常にネットワークから取得）
  if (url.hostname === 'www.jma.go.jp') {
    event.respondWith(fetch(event.request));
    return;
  }

  // アプリ本体（index.html）は NetworkFirst
  if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return res;
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
