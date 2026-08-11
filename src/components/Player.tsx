"use client";

import { Play, Pause, SkipForward, Headphones, Instagram, Twitter, Music2, Volume2, VolumeX, Radio } from "lucide-react";
import { useRadio } from "@/context/RadioContext";

interface PlayerProps {
  isRaining: boolean;
  toggleRain: () => void;
}

export default function Player({ isRaining, toggleRain }: PlayerProps) {
  const { 
    isPlaying, 
    volume, 
    isMuted, 
    stationName, 
    togglePlay, 
    setVolume, 
    toggleMute, 
    nextStation 
  } = useRadio();

  return (
    <div className="w-full mt-auto relative z-20">
      
      {/* Player Controls & Info Row */}
      <section 
        className="w-full px-6 md:px-10 lg:px-24 flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-10 md:gap-0"
        aria-label="Audio player controls"
      >
        
        {/* Left Side: Controls & Atmosphere */}
        <div className="flex flex-col gap-6 z-10">
          
          <div className="flex items-center gap-4">
            {/* Big Play/Pause Button */}
            <button 
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              aria-pressed={isPlaying}
              className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-primary hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary transition-all group backdrop-blur-sm bg-black/10"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white group-hover:text-primary transition-colors" fill="currentColor" aria-hidden="true" />
              ) : (
                <Play className="w-6 h-6 text-white group-hover:text-primary transition-colors ml-1" fill="currentColor" aria-hidden="true" />
              )}
            </button>

            {/* Next Station Button */}
            <button 
              onClick={() => {
                nextStation();
                if (!isPlaying) togglePlay();
              }}
              aria-label="Next station"
              title="Next Station"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/50 hover:bg-white/5 focus:outline-none transition-all group backdrop-blur-sm bg-black/5"
            >
              <SkipForward className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-10">
            {/* Atmosphere Toggle */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-gray-400 tracking-[0.2em] font-bold">ATMOSPHERE</span>
              <button 
                onClick={toggleRain}
                className="flex items-center gap-3 text-xs tracking-widest font-semibold text-gray-300 hover:text-white transition-colors focus:outline-none"
              >
                RAIN <span className={`text-lg leading-none ${isRaining ? 'text-primary' : 'text-gray-500'}`}>{isRaining ? '●' : '○'}</span>
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-gray-400 tracking-[0.2em] font-bold">VOLUME</span>
              <div className="flex items-center gap-2 group">
                <button onClick={toggleMute} className="text-gray-300 hover:text-white focus:outline-none">
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05" 
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                  }}
                  className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary opacity-50 group-hover:opacity-100 transition-opacity"
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Now Playing Info */}
        <div 
          className="flex flex-col items-start md:items-end z-10"
          role="region"
          aria-live="polite"
        >
          {/* Signal Indicator */}
          <div className="flex items-center gap-3 mb-2 md:mb-4" title="Stream Signal">
            <span className="text-gray-300 text-[10px] tracking-[0.3em] font-bold">SIGNAL</span>
            <div className="text-primary flex items-end h-4 gap-[2px]">
              {isPlaying ? (
                <>
                  <div className="w-[3px] bg-primary rounded-t-sm h-2 animate-[equalizer_1s_ease-in-out_infinite]" />
                  <div className="w-[3px] bg-primary rounded-t-sm h-4 animate-[equalizer_1.2s_ease-in-out_infinite_0.1s]" />
                  <div className="w-[3px] bg-primary rounded-t-sm h-3 animate-[equalizer_0.9s_ease-in-out_infinite_0.2s]" />
                  <div className="w-[3px] bg-primary rounded-t-sm h-5 animate-[equalizer_1.1s_ease-in-out_infinite_0.3s]" />
                  <div className="w-[3px] bg-primary rounded-t-sm h-2 animate-[equalizer_1.3s_ease-in-out_infinite_0.4s]" />
                </>
              ) : (
                <span className="text-gray-600 text-xs mb-1 h-3 flex items-center">────●────</span>
              )}
            </div>
          </div>


          <div className="flex flex-col text-left md:text-right border-t border-white/10 pt-2 md:pt-4 mt-2 min-w-[200px]">
            <div className="flex items-center justify-start md:justify-end gap-2 mb-1 md:mb-2">
              <span className="text-gray-400 text-[10px] tracking-[0.2em] font-bold">NOW PLAYING</span>
              {isPlaying && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />}
            </div>
            <span className="text-white font-display text-xl md:text-2xl tracking-wider mb-1 truncate max-w-[250px] md:max-w-[350px]">
              {stationName.length > 25 ? stationName.substring(0, 25) + "..." : stationName}
            </span>
            <span className="text-gray-400 text-xs sm:text-sm tracking-widest font-medium">Late Night Radio</span>
          </div>
        </div>

      </section>

      {/* Bottom Footer */}
      <footer className="w-full px-6 py-4 md:px-10 lg:px-24 md:py-6 flex flex-col sm:flex-row justify-between items-center border-t border-white/5 bg-gradient-to-t from-black/50 to-transparent gap-4 sm:gap-0 z-10 relative">
        <div className="flex items-center gap-3 text-gray-500">
          <span className="text-[10px] tracking-widest font-medium">© 2026 DriveSlow — made for fun.</span>
        </div>
        
        <nav className="flex items-center gap-6 sm:gap-8 text-gray-400" aria-label="Social media links">
          <a href="#" aria-label="Follow us on Instagram" className="hover:text-white focus:outline-none focus:text-white transition-colors">
            <Instagram className="w-4 h-4" aria-hidden="true" />
          </a>
          <a href="#" aria-label="Follow us on Twitter" className="hover:text-white focus:outline-none focus:text-white transition-colors">
            <Twitter className="w-4 h-4" aria-hidden="true" />
          </a>
          <a href="#" aria-label="Listen on Spotify" className="hover:text-white focus:outline-none focus:text-white transition-colors">
            <Music2 className="w-4 h-4" aria-hidden="true" />
          </a>
        </nav>
      </footer>
    </div>
  );
}
