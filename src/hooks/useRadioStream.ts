import { useState, useEffect } from "react";

export function useRadioStream(tag: string = "lofi") {
  const [stations, setStations] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchStation = async () => {
      try {
        const response = await fetch(
          `https://de1.api.radio-browser.info/json/stations/search?tag=${encodeURIComponent(
            tag
          )}&limit=50&order=clickcount&reverse=true`
        );
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (!isMounted) return;

        // Filter out valid streams (https preferred for no mixed-content issues)
        const validStations = data.filter(
          (s: any) => s.url_resolved && s.url_resolved.startsWith("http")
        );

        if (validStations.length > 0) {
          setStations(validStations);
        } else {
          // Fallback if API fails to find anything
          setStations([
            { name: "Lofi Radio Stream", url_resolved: "https://play.streamafrica.net/lofi" },
            { name: "Chillhop Music", url_resolved: "https://stream.zeno.fm/f3wvbbqmdg8uv" }
          ]);
        }
      } catch (err) {
        if (!isMounted) return;
        
        console.error("Error fetching station:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setStations([
          { name: "Lofi Radio Stream", url_resolved: "https://play.streamafrica.net/lofi" },
          { name: "Chillhop Radio", url_resolved: "https://stream.zeno.fm/f3wvbbqmdg8uv" }
        ]);
      }
    };

    fetchStation();

    return () => {
      isMounted = false;
    };
  }, [tag]);

  const nextStation = () => {
    if (stations.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % stations.length);
    }
  };

  const currentStation = stations[currentIndex] || { 
    name: "Loading Station...", 
    url_resolved: "" 
  };

  return { 
    stationName: currentStation.name, 
    streamUrl: currentStation.url_resolved, 
    nextStation,
    error 
  };
}
