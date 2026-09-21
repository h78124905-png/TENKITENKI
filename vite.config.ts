import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const basePath = process.env.VITE_APP_BASE_PATH || '/rain-now/';

export default defineConfig({
  base: basePath,
  plugins: [
    VitePWA({
      registerType: 'prompt',           // 自動更新しない（手動更新のため）
      injectRegister: false,            // 自前で登録する
      manifest: false,                  // public/manifest.json を使う
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        navigateFallback: basePath + 'index.html',
        runtimeCaching: [
          {
            // アプリ本体は NetworkFirst（更新ボタンで最新を取得）
            urlPattern: ({ request }) =>
              request.destination === 'script' ||
              request.destination === 'style' ||
              request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'app-shell',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          {
            // JSONは一切キャッシュしない（常に最新を手動取得）
            urlPattern: /\/data\/.*\.json$/,
            handler: 'NetworkOnly'
          }
        ]
      }
    })
  ]
});
