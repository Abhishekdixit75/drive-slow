import { Station } from "@/types/radio";
import { API_CONFIG, FALLBACK_STATIONS } from "@/config/constants";

export async function fetchRadioStations(tag: string = API_CONFIG.DEFAULT_TAG): Promise<Station[]> {
  try {
    const response = await fetch(
      `${API_CONFIG.RADIO_BROWSER_URL}?tag=${encodeURIComponent(tag)}&limit=${API_CONFIG.LIMIT}&order=clickcount&reverse=true`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Filter out valid streams (https preferred, or standard http)
    const validStations = data.filter(
      (s: any) => s.url_resolved && s.url_resolved.startsWith("http")
    );

    if (validStations.length > 0) {
      return validStations;
    }

    return [...FALLBACK_STATIONS];
  } catch (err) {
    console.error("Error fetching station:", err);
    return [...FALLBACK_STATIONS];
  }
}
