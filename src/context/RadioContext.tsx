"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { Station, RadioContextType } from "@/types/radio";
import { LOCAL_STORAGE_KEYS } from "@/config/constants";
import { fetchRadioStations } from "@/services/radioApi";

const RadioContext = createContext<RadioContextType | undefined>(undefined);

export function RadioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [isMuted, setIsMutedState] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [stations, setStations] = useState<Station[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem(LOCAL_STORAGE_KEYS.VOLUME);
    if (savedVolume !== null) {
      setVolumeState(parseFloat(savedVolume));
    }
    
    const savedMuted = localStorage.getItem(LOCAL_STORAGE_KEYS.MUTED);
    if (savedMuted === "true") {
      setIsMutedState(true);
    }
    
    const savedIndex = localStorage.getItem(LOCAL_STORAGE_KEYS.STATION_INDEX);
    if (savedIndex !== null) {
      setCurrentIndex(parseInt(savedIndex, 10));
    }
  }, []);

  // Fetch Stations
  useEffect(() => {
    let isMounted = true;

    const loadStations = async () => {
      try {
        const data = await fetchRadioStations();
        if (!isMounted) return;
        setStations(data);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    loadStations();
    return () => { isMounted = false; };
  }, []);

  // Sync Volume to Audio Element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, currentIndex]); // depend on currentIndex to reset volume when src changes

  // Playback Control
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    setIsMutedState(false);
    localStorage.setItem(LOCAL_STORAGE_KEYS.VOLUME, vol.toString());
    localStorage.setItem(LOCAL_STORAGE_KEYS.MUTED, "false");
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMutedState(newMutedState);
    localStorage.setItem(LOCAL_STORAGE_KEYS.MUTED, newMutedState.toString());
  };

  const nextStation = () => {
    if (stations.length > 0) {
      const newIndex = (currentIndex + 1) % stations.length;
      setCurrentIndex(newIndex);
      localStorage.setItem(LOCAL_STORAGE_KEYS.STATION_INDEX, newIndex.toString());
      
      // Auto-play next station if currently playing
      if (isPlaying && audioRef.current) {
        setTimeout(() => {
          audioRef.current?.play().catch(() => setIsPlaying(false));
        }, 100);
      }
    }
  };

  const currentStation = stations[currentIndex] || { 
    name: "Loading Station...", 
    url_resolved: "" 
  };

  // Keyboard and Media Session Integration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input (not applicable here, but good practice)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch(e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "KeyM":
          toggleMute();
          break;
        case "KeyN":
          nextStation();
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, volume, isMuted, stations, currentIndex]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentStation.name,
        artist: "DriveSlow Radio",
        album: "Late Night Lofi",
        artwork: [
          { src: "/bg.png", sizes: "512x512", type: "image/png" }
        ]
      });

      navigator.mediaSession.setActionHandler("play", () => {
        audioRef.current?.play();
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current?.pause();
        setIsPlaying(false);
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        nextStation();
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStation.name, stations, currentIndex]);

  return (
    <RadioContext.Provider
      value={{
        isPlaying,
        volume,
        isMuted,
        stationName: currentStation.name,
        streamUrl: currentStation.url_resolved,
        togglePlay,
        setVolume,
        toggleMute,
        nextStation,
        error
      }}
    >
      <audio 
        ref={audioRef} 
        src={currentStation.url_resolved} 
        preload="none" 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {children}
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const context = useContext(RadioContext);
  if (context === undefined) {
    throw new Error("useRadio must be used within a RadioProvider");
  }
  return context;
}
