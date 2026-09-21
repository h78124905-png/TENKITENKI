import './style.css';

// ---- 定数 ----
const CACHE_KEY = 'rain-now-cache-v1';
const LOCATIONS_URL = `${import.meta.env.BASE_URL}data/locations.json`;
const JSON_BASE = `${import.meta.env.BASE_URL}data/precip/`;

// ---- DOM ----
const listContainer = document.getElementById('list-container');
const summaryEl = document.getElementById('summary');
const refreshBtn = document.getElementById('refresh-btn');
const lastUpdatedEl = document.getElementById('last-updated');

// ---- キャッシュ ----
function saveCache(record) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(record));
  } catch (_) {
    /* ストレージ容量不足時は無視 */
  }
}

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// ---- 位置情報（省電力モード） ----
function getPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('この端末では位置情報を利用できません。'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false, // ★ GPSを使わない（省電力）
      timeout: 10000,
      maximumAge: 300000 // 5分間はキャッシュを使う
    });
  });
}

// ---- 最寄り地点の選択 ----
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function findNearestLocation(lat, lon) {
  const res = await fetch(LOCATIONS_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('地点リストの取得に失敗しました。');
  const locations = await res.json();

  let nearest = null;
  let minDist = Infinity;
  for (const loc of locations) {
    const d = haversine(lat, lon, loc.lat, loc.lon);
    if (d < minDist) {
      minDist = d;
      nearest = loc;
    }
  }
  if (!nearest) throw new Error('近くの登録地点が見つかりませんでした。');
  return nearest;
}

// ---- 描画 ----
function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function renderForecast(data) {
  const forecast = data.forecast || [];
  if (forecast.length === 0) {
    listContainer.innerHTML =
      '<p class="empty-message">予報データがありません。</p>';
    return;
  }

  // 降水の開始・終了を検出
  let rainStartIdx = -1;
  let rainEndIdx = -1;
  for (let i = 0; i < forecast.length; i++) {
    const p = forecast[i].precip_mm_h;
    if (p > 0 && rainStartIdx === -1) rainStartIdx = i;
    if (p > 0) rainEndIdx = i;
  }

  // サマリー
  if (rainStartIdx === -1) {
    summaryEl.innerHTML = 'この先1時間、<strong>雨は降りません</strong>。';
    summaryEl.classList.remove('hidden');
  } else {
    const startTime = formatTime(forecast[rainStartIdx].time);
    const endTime = formatTime(forecast[rainEndIdx].time);
    let text = `<strong>${startTime}</strong> に降り出します。`;
    if (rainEndIdx < forecast.length - 1) {
      text += ` <strong>${endTime}</strong> 頃に止む見込みです。`;
    } else {
      text += ' 1時間先まで雨が続く見込みです。';
    }
    summaryEl.innerHTML = text;
    summaryEl.classList.remove('hidden');
  }

  // 行を生成
  const maxPrecip = Math.max(...forecast.map((f) => f.precip_mm_h), 0.1);

  const rows = forecast.map((f, i) => {
    const p = f.precip_mm_h;
    const hasRain = p > 0;
    const isStart = i === rainStartIdx && hasRain;
    const isEnd = i === rainEndIdx && hasRain && rainEndIdx < forecast.length - 1;

    let rowClass = 'forecast-row';
    if (hasRain) rowClass += ' has-rain';
    if (isStart) rowClass += ' rain-start';
    if (isEnd) rowClass += ' rain-end';

    const barWidth = hasRain ? Math.max((p / maxPrecip) * 100, 8) : 0;
    const icon = hasRain ? (p >= 1 ? '🌧️' : '🌦️') : '☁️';

    return `
      <div class="${rowClass}">
        <span class="forecast-time">${formatTime(f.time)}</span>
        <span class="forecast-icon">${icon}</span>
        <div class="forecast-bar">
          <div class="forecast-bar-fill" style="width:${barWidth}%"></div>
        </div>
        <span class="forecast-value">${p.toFixed(1)} mm/h</span>
      </div>
    `;
  });

  listContainer.innerHTML = rows.join('');
}

function renderError(message) {
  listContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

function renderEmpty() {
  listContainer.innerHTML =
    '<p class="empty-message">更新ボタンを押すと、現在地の5分ごとの降水量を表示します。</p>';
}

// ---- 更新処理（手動トリガー） ----
async function handleRefresh() {
  refreshBtn.disabled = true;
  refreshBtn.textContent = '取得中…';

  try {
    // 1. 位置情報を取得
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;

    // 2. 最寄り地点を探す
    const nearest = await findNearestLocation(latitude, longitude);

    // 3. 降水量JSONを取得（キャッシュしない）
    const url = `${JSON_BASE}${nearest.id}.json`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('降水量データの取得に失敗しました。');

    const data = await res.json();

    // 4. 描画
    renderForecast(data);
    const now = new Date();
    lastUpdatedEl.textContent = `最終更新: ${now.toLocaleTimeString('ja-JP')}`;

    // 5. キャッシュに保存（次回オフライン表示用）
    saveCache({
      locationId: nearest.id,
      locationName: nearest.name,
      data,
      cachedAt: now.toLocaleTimeString('ja-JP')
    });
  } catch (err) {
    let message = '取得に失敗しました。';
    if (err && err.code === 1) {
      message = '位置情報の利用が許可されていません。ブラウザの設定をご確認ください。';
    } else if (err && err.code === 3) {
      message = '位置情報の取得がタイムアウトしました。もう一度お試しください。';
    } else if (err && err.message) {
      message = err.message;
    }
    renderError(message);
  } finally {
    refreshBtn.disabled = false;
    refreshBtn.textContent = '🔄 更新';
  }
}

refreshBtn.addEventListener('click', handleRefresh);

// ---- ページ読み込み時：キャッシュのみ表示（通信しない） ----
window.addEventListener('DOMContentLoaded', () => {
  const cached = loadCache();
  if (cached && cached.data) {
    renderForecast(cached.data);
    lastUpdatedEl.textContent = `最終更新: ${cached.cachedAt}（${cached.locationName}）`;
  } else {
    renderEmpty();
  }
  // ★ ここで fetch は一切しない
});

// ---- Service Worker 登録（手動更新用） ----
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        `${import.meta.env.BASE_URL}sw.js`,
        { scope: import.meta.env.BASE_URL }
      );

      // 更新ボタン押下時に SW も更新チェック
      refreshBtn.addEventListener('click', () => {
        registration.update().catch(() => {
          /* 更新チェック失敗は無視 */
        });
      });
    } catch (err) {
      console.warn('Service Worker 登録失敗:', err);
    }
  });
}
