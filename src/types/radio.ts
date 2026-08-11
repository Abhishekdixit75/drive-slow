export interface Station {
  name: string;
  url_resolved: string;
}

export interface RadioContextType {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  stationName: string;
  streamUrl: string;
  togglePlay: () => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  nextStation: () => void;
  error: string | null;
}
