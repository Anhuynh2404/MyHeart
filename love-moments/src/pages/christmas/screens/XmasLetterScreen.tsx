// src/pages/christmas/screens/XmasLetterScreen.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import Snowfall from "../components/Snowfall";
import LetterCard from "../components/LetterCard";

const AUDIO_URL = "/public/audio/giangsihp.mp3"; 

function useAudio(url?: string) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!url) return;
    const el = new Audio(url);
    el.loop = true;
    el.volume = 0.6;
    audioRef.current = el;

    return () => {
      el.pause();
      audioRef.current = null;
    };
  }, [url]);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;

    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play(); // phải do user click mới play được
        setPlaying(true);
      }
    } catch {
      // ignore autoplay restriction errors
    }
  };

  return { playing, toggle };
}

export default function XmasLetterScreen() {
  const { playing, toggle } = useAudio(AUDIO_URL);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-[#03040a] via-[#070a12] to-black" />
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(900px 520px at 50% 12%, rgba(255,220,170,0.16), transparent), radial-gradient(700px 420px at 15% 40%, rgba(120,190,255,0.10), transparent)",
        }}
      />
      <Snowfall count={170} />

      {/* CONTENT CENTER */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl"
        >
          {/* MUSIC BUTTON */}
          <div className="flex justify-center mb-4">
            <button
              onClick={toggle}
              className="px-4 py-2 rounded-full bg-black/55 border border-white/15 backdrop-blur-md text-sm font-semibold hover:bg-black/65 transition"
            >
              {playing ? "🔇 Tắt nhạc" : "🔊 Bật nhạc"}
            </button>
          </div>

          {/* LETTER CARD CENTER */}
          <div className="flex justify-center">
            <LetterCard />
          </div>

          {/* small hint (optional) */}
          <div className="mt-4 text-center text-xs text-white/60">
          </div>
        </motion.div>
      </div>
    </div>
  );
}
