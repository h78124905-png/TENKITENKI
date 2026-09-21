<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#0066cc" />
  <title>雨ナウ</title>

  <link rel="manifest" href='data:application/manifest+json,{"name":"雨ナウ","short_name":"雨ナウ","description":"10分ごとの降水量を表示する軽量天気アプリ","start_url":"./","scope":"./","display":"standalone","orientation":"portrait","background_color":"%23f5f7fa","theme_color":"%230066cc","lang":"ja","icons":[{"src":"data:image/svg%2Bxml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 192 192%27%3E%3Crect width=%27192%27 height=%27192%27 fill=%27%230066cc%27/%3E%3Ctext x=%2796%27 y=%27120%27 font-size=%27100%27 text-anchor=%27middle%27 fill=%27white%27%3E%E9%9B%A8%3C/text%3E%3C/svg%3E","sizes":"192x192","type":"image/svg+xml","purpose":"any maskable"}]}' />
  <link rel="apple-touch-icon" href='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" fill="%230066cc"/><text x="96" y="120" font-size="100" text-anchor="middle" fill="white">雨</text></svg>' />

  <style>
    :root {
      --bg: #f5f7fa;
      --card: #ffffff;
      --text: #1a1a2e;
      --text-sub: #6b7280;
      --accent: #0066cc;
      --rain: #3b82f6;
      --rain-strong: #1d4ed8;
      --none: #e5e7eb;
      --border: #e5e7eb;
      --radius: 12px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Sans',
        'Noto Sans JP', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100dvh;
      padding: env(safe-area-inset-top) env(safe-area-inset-right)
        env(safe-area-inset-bottom) env(safe-area-inset-left);
    }
    #app { max-width: 480px; margin: 0 auto; padding: 16px; }
    header { text-align: center; padding: 16px 0 8px; }
    header h1 { font-size: 1.5rem; font-weight: 700; color: var(--accent); }
    #last-updated { font-size: 0.8rem; color: var(--text-sub); margin-top: 4px; }
    #location-info {
      font-size: 0.75rem;
      color: var(--text-sub);
      margin-top: 2px;
      font-variant-numeric: tabular-nums;
    }
    #version-info { font-size: 0.65rem; color: #9ca3af; margin-top: 2px; }

    .summary {
      background: var(--card);
      border-radius: var(--radius);
      padding: 16px;
      margin-bottom: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      font-size: 1rem;
      line-height: 1.6;
    }
    .summary strong { color: var(--rain-strong); }

    .refresh-btn {
      display: block;
      width: 100%;
      padding: 14px;
      font-size: 1.1rem;
      font-weight: 600;
      color: #fff;
      background: var(--accent);
      border: none;
      border-radius: var(--radius);
      cursor: pointer;
      margin-bottom: 16px;
      transition: opacity 0.15s;
    }
    .refresh-btn:active { opacity: 0.8; }
    .refresh-btn:disabled { background: #9ca3af; cursor: not-allowed; }

    #list-container {
      background: var(--card);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      margin-bottom: 12px;
    }
    .empty-message {
      padding: 32px 16px;
      text-align: center;
      color: var(--text-sub);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    .section-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-sub);
      padding: 12px 16px 6px;
      border-bottom: 1px solid var(--border);
      background: #fafbfc;
    }
    .section-note {
      font-size: 0.7rem;
      color: #9ca3af;
      padding: 0 16px 8px;
      background: #fafbfc;
      border-bottom: 1px solid var(--border);
    }

    .forecast-row {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      gap: 12px;
    }
    .forecast-row:last-child { border-bottom: none; }
    .forecast-row.has-rain { background: #eff6ff; }
    .forecast-row.rain-start { border-left: 4px solid var(--rain-strong); }
    .forecast-row.rain-end { border-left: 4px solid var(--none); }

    .forecast-time {
      font-variant-numeric: tabular-nums;
      font-size: 0.95rem;
      font-weight: 600;
      min-width: 52px;
    }
    .forecast-bar {
      flex: 1;
      height: 8px;
      background: var(--none);
      border-radius: 4px;
      overflow: hidden;
    }
    .forecast-bar-fill {
      height: 100%;
      background: var(--rain);
      border-radius: 4px;
      transition: width 0.3s;
    }
    .forecast-value {
      font-variant-numeric: tabular-nums;
      font-size: 0.9rem;
      font-weight: 600;
      min-width: 72px;
      text-align: right;
      color: var(--text-sub);
    }
    .forecast-row.has-rain .forecast-value { color: var(--rain-strong); }
    .forecast-icon { font-size: 1.1rem; width: 24px; text-align: center; }

    .extend-btn {
      display: block;
      width: 100%;
      padding: 12px;
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--accent);
      background: var(--card);
      border: 1.5px solid var(--accent);
      border-radius: var(--radius);
      cursor: pointer;
      margin-bottom: 16px;
      transition: background 0.15s;
    }
    .extend-btn:active { background: #eff6ff; }
    .extend-btn:disabled { color: #9ca3af; border-color: #d1d5db; cursor: not-allowed; }

    .extended-card {
      background: var(--card);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      margin-bottom: 16px;
    }
    .extended-card.hidden { display: none; }

    footer { margin-top: 16px; text-align: center; }
    .attribution { font-size: 0.7rem; color: var(--text-sub); }
    .hidden { display: none; }
    .error-message {
      padding: 24px 16px;
      text-align: center;
      color: #dc2626;
      font-size: 0.9rem;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div id="app">
    <header>
      <h1>雨ナウ</h1>
      <p id="last-updated">最終更新: --:--</p>
      <p id="location-info"></p>
      <p id="version-info">v7</p>
    </header>

    <div id="summary" class="summary hidden"></div>

    <button id="refresh-btn" class="refresh-btn">🔄 更新</button>

    <div id="list-container">
      <p class="empty-message">更新ボタンを押すと、現在地の10分ごとの降水量を表示します。</p>
    </div>

    <button id="extend-btn" class="extend-btn">＋ 1〜6時間先を見る</button>

    <div id="extended-card" class="extended-card hidden"></div>

    <footer>
      <p class="attribution">気象データ © Japan Meteorological Agency</p>
    </footer>
  </div>

  <script>
    // ---- 定数 ----
    const CACHE_KEY = 'rain-now-cache-v7';
    const BASE_NOWC = 'https://www.jma.go.jp/bosai/jmatile/data';
    const TARGET_TIMES_N1 = `${BASE_NOWC}/nowc/targetTimes_N1.json`;
    const TARGET_TIMES_N2 = `${BASE_NOWC}/nowc/targetTimes_N2.json`;
    const ZOOM = 10;
    const STEP_MINUTES = 10;
    const MAX_STEPS = 7;

    // ---- DOM ----
    const listContainer = document.getElementById('list-container');
    const summaryEl = document.getElementById('summary');
    const refreshBtn = document.getElementById('refresh-btn');
    const extendBtn = document.getElementById('extend-btn');
    const extendedCard = document.getElementById('extended-card');
    const lastUpdatedEl = document.getElementById('last-updated');
    const locationInfoEl = document.getElementById('location-info');

    // ---- 状態 ----
    let currentLat = null;
    let currentLon = null;
    let extendedForecast = null;    // 1〜6時間先の降水短時間予報
    let extendedVisible = false;

    // ---- キャッシュ ----
    function saveCache(record) {
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(record)); } catch (_) {}
    }
    function loadCache() {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (_) { return null; }
    }

    // ---- 位置情報 ----
    function getPosition() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('この端末では位置情報を利用できません。'));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000
        });
      });
    }

    // ---- 緯度・経度 → タイル座標 ----
    function lonLatToTileExact(lon, lat, z) {
      const n = 2 ** z;
      const xExact = ((lon + 180) / 360) * n;
      const latRad = (lat * Math.PI) / 180;
      const yExact =
        ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
      return { xExact, yExact };
    }

    // ---- 色 → 降水量（パレットを引数で切替） ----
    const PALETTE_NOWCAST = [
      { r: 160, g: 210, b: 255, v: 0.5 },
      { r: 0, g: 100, b: 255, v: 3 },
      { r: 0, g: 200, b: 0, v: 7.5 },
      { r: 255, g: 255, b: 0, v: 15 },
      { r: 255, g: 150, b: 0, v: 25 },
      { r: 255, g: 0, b: 0, v: 40 },
      { r: 150, g: 0, b: 200, v: 60 }
    ];
    // 降水短時間予報用（1時間降水量 mm）
    const PALETTE_KAIKOTAN = [
      { r: 200, g: 230, b: 255, v: 1.5 },   // 1-2mm
      { r: 100, g: 180, b: 255, v: 3.5 },   // 2-5mm
      { r: 0, g: 200, b: 0, v: 7.5 },       // 5-10mm
      { r: 255, g: 255, b: 0, v: 15 },      // 10-20mm
      { r: 255, g: 150, b: 0, v: 25 },      // 20-30mm
      { r: 255, g: 0, b: 0, v: 40 },        // 30-50mm
      { r: 150, g: 0, b: 200, v: 65 }       // 50mm以上
    ];

    function colorToPrecip(r, g, b, palette) {
      let best = palette[0];
      let minDist = Infinity;
      for (const p of palette) {
        const d = (r - p.r) ** 2 + (g - p.g) ** 2 + (b - p.b) ** 2;
        if (d < minDist) { minDist = d; best = p; }
      }
      if (minDist > 4000) return 0;
      return best.v;
    }

    // ---- タイル画像読み込み ----
    function loadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('タイル取得失敗'));
        img.src = url;
      });
    }

    async function readTilePixel(url, px, py, palette) {
      const img = await loadImage(url);
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const x0 = Math.max(0, Math.min(255 - 2, px - 1));
      const y0 = Math.max(0, Math.min(255 - 2, py - 1));
      const data = ctx.getImageData(x0, y0, 3, 3).data;
      let bestValue = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
        if (a === 0) continue;
        const v = colorToPrecip(r, g, b, palette);
        if (v > bestValue) bestValue = v;
      }
      return bestValue;
    }

    // ---- 時刻フォーマット ----
    function formatValidTime(validtime) {
      const y = +validtime.slice(0, 4);
      const mo = +validtime.slice(4, 6) - 1;
      const da = +validtime.slice(6, 8);
      const hh = +validtime.slice(8, 10);
      const mi = +validtime.slice(10, 12);
      const utcMs = Date.UTC(y, mo, da, hh, mi);
      const jst = new Date(utcMs + 9 * 3600 * 1000);
      const jh = String(jst.getUTCHours()).padStart(2, '0');
      const jm = String(jst.getUTCMinutes()).padStart(2, '0');
      return `${jh}:${jm}`;
    }
    function formatUtcStamp(d) {
      return (
        String(d.getUTCFullYear()) +
        String(d.getUTCMonth() + 1).padStart(2, '0') +
        String(d.getUTCDate()).padStart(2, '0') +
        String(d.getUTCHours()).padStart(2, '0') +
        String(d.getUTCMinutes()).padStart(2, '0') +
        String(d.getUTCSeconds()).padStart(2, '0')
      );
    }
    function formatNow() {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      return `${hh}:${mm}:${ss}`;
    }

    // ---- ナウキャスト取得（0〜60分・5分刻み） ----
    async function fetchNowcastForecast(lat, lon) {
      const [n1, n2] = await Promise.all([
        fetch(TARGET_TIMES_N1, { cache: 'no-store' }).then((r) => {
          if (!r.ok) throw new Error('時刻リストN1の取得に失敗');
          return r.json();
        }),
        fetch(TARGET_TIMES_N2, { cache: 'no-store' })
          .then((r) => (r.ok ? r.json() : []))
          .catch(() => [])
      ]);
      const tagged = [
        ...n1.map((t) => ({ ...t, element: 'hrpns' })),
        ...n2.map((t) => ({ ...t, element: 'hrpns_nd' }))
      ];
      const now = new Date();
      const nowUtc = formatUtcStamp(now);
      const forecasts = tagged
        .filter((t) => t.validtime >= nowUtc && t.elements && t.elements.length > 0)
        .sort((a, b) => a.validtime.localeCompare(b.validtime));
      if (forecasts.length === 0) throw new Error('利用可能な予報がありません。');

      const seen = new Set();
      const deduped = [];
      for (const t of forecasts) {
        if (seen.has(t.validtime)) continue;
        seen.add(t.validtime);
        deduped.push(t);
      }
      const stepped = deduped.filter((t) => {
        const m = parseInt(t.validtime.slice(10, 12), 10);
        return m % STEP_MINUTES === 0;
      });
      const targets = stepped.slice(0, MAX_STEPS);
      if (targets.length === 0) throw new Error('間引き後の予報が0件です。');

      const { xExact, yExact } = lonLatToTileExact(lon, lat, ZOOM);
      const tileX = Math.floor(xExact);
      const tileY = Math.floor(yExact);
      const px = Math.floor((xExact - tileX) * 256);
      const py = Math.floor((yExact - tileY) * 256);

      return Promise.all(
        targets.map(async (t) => {
          const url = `${BASE_NOWC}/nowc/${t.basetime}/none/${t.validtime}/surf/${t.element}/${ZOOM}/${tileX}/${tileY}.png`;
          let value = 0;
          try {
            value = await readTilePixel(url, px, py, PALETTE_NOWCAST);
          } catch (e) { console.warn('nowcast タイル失敗:', url); }
          return { time: formatValidTime(t.validtime), precip_mm_h: value };
        })
      );
    }

    // ---- 降水短時間予報取得（1〜6時間先・1時間刻み） ----
    async function fetchExtendedForecast(lat, lon) {
      const now = new Date();
      const { xExact, yExact } = lonLatToTileExact(lon, lat, ZOOM);
      const tileX = Math.floor(xExact);
      const tileY = Math.floor(yExact);
      const px = Math.floor((xExact - tileX) * 256);
      const py = Math.floor((yExact - tileY) * 256);

      // basetime候補を試す（現在UTC時→1h前→2h前→3h前）
      for (let offset = 0; offset <= 3; offset++) {
        const base = new Date(Date.UTC(
          now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
          now.getUTCHours() - offset, 0, 0
        ));
        const bt = formatUtcStamp(base);

        // まず +1h のタイルが読めるかテスト
        const valid1 = new Date(base.getTime() + 1 * 3600 * 1000);
        const vt1 = formatUtcStamp(valid1);
        const url1 = `${BASE_NOWC}/rasrf/${bt}/none/${vt1}/surf/rasrf/${ZOOM}/${tileX}/${tileY}.png`;
        let firstValue;
        try {
          firstValue = await readTilePixel(url1, px, py, PALETTE_KAIKOTAN);
        } catch (_) {
          continue;   // このbasetimeは配信されていない
        }

        const results = [{ time: formatValidTime(vt1), precip_mm: firstValue }];
        for (let h = 2; h <= 6; h++) {
          const valid = new Date(base.getTime() + h * 3600 * 1000);
          const vt = formatUtcStamp(valid);
          const url = `${BASE_NOWC}/rasrf/${bt}/none/${vt}/surf/rasrf/${ZOOM}/${tileX}/${tileY}.png`;
          let value = 0;
          try {
            value = await readTilePixel(url, px, py, PALETTE_KAIKOTAN);
          } catch (e) { console.warn('rasrf タイル失敗:', url); }
          results.push({ time: formatValidTime(vt), precip_mm: value });
        }
        return results;
      }
      throw new Error('降水短時間予報のタイルが見つかりませんでした。');
    }

    // ---- 描画：ナウキャスト ----
    function renderNowcast(forecast) {
      if (!forecast || forecast.length === 0) {
        listContainer.innerHTML = '<p class="empty-message">予報データがありません。</p>';
        return;
      }
      let rainStartIdx = -1, rainEndIdx = -1;
      for (let i = 0; i < forecast.length; i++) {
        const p = forecast[i].precip_mm_h;
        if (p > 0 && rainStartIdx === -1) rainStartIdx = i;
        if (p > 0) rainEndIdx = i;
      }
      if (rainStartIdx === -1) {
        summaryEl.innerHTML = '1時間以内に<strong>雨は降りません</strong>。';
      } else {
        const s = forecast[rainStartIdx].time;
        const e = forecast[rainEndIdx].time;
        let text = `<strong>${s}</strong> に降り出します。`;
        if (rainEndIdx < forecast.length - 1) {
          text += ` <strong>${e}</strong> 頃に止む見込みです。`;
        } else {
          text += ' 1時間先まで雨が続く見込みです。';
        }
        summaryEl.innerHTML = text;
      }
      summaryEl.classList.remove('hidden');

      const maxP = Math.max(...forecast.map((f) => f.precip_mm_h), 0.1);
      const rows = forecast.map((f, i) => {
        const p = f.precip_mm_h;
        const hasRain = p > 0;
        const isStart = i === rainStartIdx && hasRain;
        const isEnd = i === rainEndIdx && hasRain && rainEndIdx < forecast.length - 1;
        let rc = 'forecast-row';
        if (hasRain) rc += ' has-rain';
        if (isStart) rc += ' rain-start';
        if (isEnd) rc += ' rain-end';
        const bw = hasRain ? Math.max((p / maxP) * 100, 8) : 0;
        const icon = hasRain ? (p >= 1 ? '🌧️' : '🌦️') : '☁️';
        return `
          <div class="${rc}">
            <span class="forecast-time">${f.time}</span>
            <span class="forecast-icon">${icon}</span>
            <div class="forecast-bar"><div class="forecast-bar-fill" style="width:${bw}%"></div></div>
            <span class="forecast-value">${p.toFixed(1)} mm/h</span>
          </div>`;
      });
      listContainer.innerHTML = rows.join('');
    }

    // ---- 描画：降水短時間予報 ----
    function renderExtended(forecast) {
      if (!forecast || forecast.length === 0) {
        extendedCard.innerHTML = '<p class="empty-message">データがありません。</p>';
        return;
      }
      const maxP = Math.max(...forecast.map((f) => f.precip_mm), 0.1);
      const rows = forecast.map((f) => {
        const p = f.precip_mm;
        const hasRain = p > 0;
        const bw = hasRain ? Math.max((p / maxP) * 100, 8) : 0;
        const icon = hasRain ? (p >= 5 ? '🌧️' : '🌦️') : '☁️';
        return `
          <div class="forecast-row ${hasRain ? 'has-rain' : ''}">
            <span class="forecast-time">${f.time}</span>
            <span class="forecast-icon">${icon}</span>
            <div class="forecast-bar"><div class="forecast-bar-fill" style="width:${bw}%"></div></div>
            <span class="forecast-value">${p.toFixed(1)} mm</span>
          </div>`;
      });
      extendedCard.innerHTML = `
        <div class="section-title">1〜6時間先の予報</div>
        <div class="section-note">1時間降水量（mm）。30分〜1時間ごとに更新。</div>
        ${rows.join('')}
      `;
    }

    function renderError(message) {
      listContainer.innerHTML = `<p class="error-message">${message}</p>`;
    }
    function renderEmpty() {
      listContainer.innerHTML =
        '<p class="empty-message">更新ボタンを押すと、現在地の10分ごとの降水量を表示します。</p>';
    }

    // ---- 更新ボタン ----
    async function handleRefresh() {
      refreshBtn.disabled = true;
      refreshBtn.textContent = '取得中…';
      try {
        const pos = await getPosition();
        const { latitude, longitude } = pos.coords;
        currentLat = latitude;
        currentLon = longitude;
        locationInfoEl.textContent =
          `📍 ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        const forecast = await fetchNowcastForecast(latitude, longitude);
        renderNowcast(forecast);

        // 拡張予報が既に取得済みなら、こちらも更新
        let newExtended = extendedForecast;
        if (extendedForecast) {
          try {
            newExtended = await fetchExtendedForecast(latitude, longitude);
            extendedForecast = newExtended;
            if (extendedVisible) renderExtended(newExtended);
          } catch (e) {
            console.warn('拡張予報の再取得失敗:', e);
          }
        }

        const nowStr = formatNow();
        lastUpdatedEl.textContent = `最終更新: ${nowStr}`;
        saveCache({
          forecast,
          extended: newExtended,
          cachedAt: nowStr,
          lat: latitude,
          lon: longitude
        });
      } catch (err) {
        let message = '取得に失敗しました。';
        if (err && err.code === 1) message = '位置情報の利用が許可されていません。';
        else if (err && err.code === 3) message = '位置情報の取得がタイムアウトしました。';
        else if (err && err.message) message = err.message;
        renderError(message);
      } finally {
        refreshBtn.disabled = false;
        refreshBtn.textContent = '🔄 更新';
      }
    }
    refreshBtn.addEventListener('click', handleRefresh);

    // ---- 拡張予報ボタン ----
    extendBtn.addEventListener('click', async () => {
      // 表示中なら隠すだけ
      if (extendedVisible) {
        extendedVisible = false;
        extendedCard.classList.add('hidden');
        extendBtn.textContent = '＋ 1〜6時間先を見る';
        return;
      }

      // 未取得なら取得
      if (!extendedForecast) {
        if (currentLat == null || currentLon == null) {
          try {
            const pos = await getPosition();
            currentLat = pos.coords.latitude;
            currentLon = pos.coords.longitude;
            locationInfoEl.textContent =
              `📍 ${currentLat.toFixed(4)}, ${currentLon.toFixed(4)}`;
          } catch (err) {
            alert('位置情報を取得できません。先に「更新」を押してください。');
            return;
          }
        }
        extendBtn.disabled = true;
        extendBtn.textContent = '取得中…';
        try {
          extendedForecast = await fetchExtendedForecast(currentLat, currentLon);
          // キャッシュを更新
          const cached = loadCache() || {};
          saveCache({
            ...cached,
            extended: extendedForecast,
            lat: currentLat,
            lon: currentLon
          });
        } catch (e) {
          extendBtn.disabled = false;
          extendBtn.textContent = '＋ 1〜6時間先を見る';
          alert('1〜6時間先の取得に失敗しました。');
          return;
        }
        extendBtn.disabled = false;
      }

      renderExtended(extendedForecast);
      extendedCard.classList.remove('hidden');
      extendedVisible = true;
      extendBtn.textContent = '− 1〜6時間先を隠す';
    });

    // ---- ページ読み込み時：キャッシュのみ表示 ----
    window.addEventListener('DOMContentLoaded', () => {
      const cached = loadCache();
      if (cached && cached.forecast) {
        currentLat = cached.lat ?? null;
        currentLon = cached.lon ?? null;
        renderNowcast(cached.forecast);
        lastUpdatedEl.textContent = `最終更新: ${cached.cachedAt}`;
        if (currentLat != null && currentLon != null) {
          locationInfoEl.textContent =
            `📍 ${currentLat.toFixed(4)}, ${currentLon.toFixed(4)}`;
        }
        // 拡張予報がキャッシュにあれば復元（表示はしない）
        if (cached.extended) extendedForecast = cached.extended;
      } else {
        renderEmpty();
      }
    });

    // ---- Service Worker 登録 ----
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch((err) => {
          console.warn('Service Worker 登録失敗:', err);
        });
      });
    }
  </script>
</body>
</html>
