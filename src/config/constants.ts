export const LOCAL_STORAGE_KEYS = {
  VOLUME: "driveslow_volume",
  MUTED: "driveslow_muted",
  STATION_INDEX: "driveslow_station_index",
} as const;

export const API_CONFIG = {
  RADIO_BROWSER_URL: "https://de1.api.radio-browser.info/json/stations/search",
  DEFAULT_TAG: "lofi",
  LIMIT: 50,
} as const;

export const FALLBACK_STATIONS = [
  { name: "Lofi Radio Stream", url_resolved: "https://play.streamafrica.net/lofi" },
  { name: "Chillhop Music", url_resolved: "https://stream.zeno.fm/f3wvbbqmdg8uv" },
];
