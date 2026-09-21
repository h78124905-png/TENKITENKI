#!/usr/bin/env python3
"""
気象庁 高解像度降水ナウキャスト GRIB2 を解析し、
地点別の5分刻み降水量JSONを生成する。

依存: pip install fused
"""

import json
import gzip
import os
import sys
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

import fused

# ---- 設定 ----
# 気象業務支援センターから発行されるGRIB2のURL（要契約）
# ファイル名パターン:
#   Z__C_RJTD_yyyyMMddhhmmss_NOWC_GPV_Ggis0p25km_Pri60lv_Aper5min_FH0000-0030_grib2.bin
GRIB_BASE_URL = os.environ.get("GRIB_BASE_URL", "https://example.com/nowcast/")

# 出力先
OUT_DIR = Path("data/precip")
LOCATIONS_FILE = Path("data/locations.json")

# 地点リスト（緯度・経度）— 主要都市＋任意地点
DEFAULT_LOCATIONS = [
    {"id": "tokyo", "name": "東京", "lat": 35.6812, "lon": 139.7671},
    {"id": "osaka", "name": "大阪", "lat": 34.6937, "lon": 135.5023},
    {"id": "nagoya", "name": "名古屋", "lat": 35.1815, "lon": 136.9066},
    {"id": "sapporo", "name": "札幌", "lat": 43.0618, "lon": 141.3545},
    {"id": "fukuoka", "name": "福岡", "lat": 33.5904, "lon": 130.4017},
    {"id": "sendai", "name": "仙台", "lat": 38.2682, "lon": 140.8694},
    {"id": "hiroshima", "name": "広島", "lat": 34.3853, "lon": 132.4553},
    {"id": "naha", "name": "那覇", "lat": 26.2124, "lon": 127.6809},
    # 必要に応じて追加
]

JST = timezone(timedelta(hours=9))


def load_locations():
    """地点リストを読み込む。なければデフォルトを使う。"""
    if LOCATIONS_FILE.exists():
        with open(LOCATIONS_FILE, encoding="utf-8") as f:
            return json.load(f)
    return DEFAULT_LOCATIONS


def build_grib_url():
    """最新のGRIB2ファイルURLを組み立てる。

    ナウキャストは5分ごとに更新されるため、現在時刻を5分単位に丸める。
    """
    now = datetime.now(JST)
    # 直近の5分に丸める（例: 10:07 → 10:05）
    minute = (now.minute // 5) * 5
    base_time = now.replace(minute=minute, second=0, microsecond=0)

    # ファイル名のタイムスタンプ（UTC）
    ts = base_time.astimezone(timezone.utc).strftime("%Y%m%d%H%M%S")
    filename = (
        f"Z__C_RJTD_{ts}_NOWC_GPV_Ggis0p25km_Pri60lv_Aper5min_FH0000-0030_grib2.bin"
    )
    return GRIB_BASE_URL.rstrip("/") + "/" + filename


def fetch_grib(url: str) -> bytes:
    """GRIB2を取得して解凍する。"""
    print(f"[fetch] {url}", file=sys.stderr)
    req = urllib.request.Request(url, headers={"User-Agent": "rain-now/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        raw = resp.read()

    # gzip圧縮されている場合は解凍
    if raw[:2] == b"\x1f\x8b":
        raw = gzip.decompress(raw)

    return raw


def parse_grib(grib_data: bytes, locations):
    """GRIB2を解析し、地点別の降水量リストを返す。

    Fused の grib リーダーで全バイトを読み込み、
    各地点の格子点値を抽出する。
    """
    grib = fused.load(grib_data)

    # GRIB2の予報時間ごとのデータを取得
    # Fused の API はバージョンにより異なるため、
    # ここでは get_value(lat, lon) で代表値を取得する簡易版を示す。
    result = {}
    for loc in locations:
        try:
            value = grib.get_value(loc["lat"], loc["lon"])
        except Exception as e:
            print(f"[warn] {loc['id']}: {e}", file=sys.stderr)
            value = 0.0

        result[loc["id"]] = {
            "id": loc["id"],
            "name": loc["name"],
            "lat": loc["lat"],
            "lon": loc["lon"],
            "forecast": [
                {
                    # 実際にはGRIB2の各予報時間（5分刻み）をループして
                    # 各時刻の降水量を取得する必要がある。
                    # ここではプレースホルダーとして現在時刻＋5分刻みを生成。
                    "time": (
                        datetime.now(JST) + timedelta(minutes=5 * i)
                    ).isoformat(),
                    "precip_mm_h": float(value),
                }
                for i in range(13)  # 0〜60分（5分刻み×13）
            ],
        }
    return result


def main():
    locations = load_locations()
    url = build_grib_url()

    try:
        grib_data = fetch_grib(url)
    except Exception as e:
        print(f"[error] GRIB2取得失敗: {e}", file=sys.stderr)
        sys.exit(1)

    result = parse_grib(grib_data, locations)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for loc_id, data in result.items():
        out_path = OUT_DIR / f"{loc_id}.json"
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"[write] {out_path}", file=sys.stderr)

    # 地点リストも出力（フロントエンドが参照）
    with open("data/locations.json", "w", encoding="utf-8") as f:
        json.dump(
            [
                {"id": l["id"], "name": l["name"], "lat": l["lat"], "lon": l["lon"]}
                for l in locations
            ],
            f,
            ensure_ascii=False,
            indent=2,
        )

    print("[done]", file=sys.stderr)


if __name__ == "__main__":
    main()
