import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import XmasLetterScreen from "./screens/XmasLetterScreen";
import XmasBackground from "./components/XmasBackground";
import GiftPickGame from "./components/GiftPickGame"; // ✅ new

type XmasScreen = "letter" | "gift";

export default function ChristmasPage() {
  const screens: XmasScreen[] = useMemo(() => ["letter", "gift"], []);
  const [index, setIndex] = useState(0);

  const screen = screens[index];

  const goPrev = () =>
    setIndex((i) => (i - 1 + screens.length) % screens.length);
  const goNext = () => setIndex((i) => (i + 1) % screens.length);
  const goTo = (i: number) =>
    setIndex(Math.max(0, Math.min(screens.length - 1, i)));

  // keyboard support: ← →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <XmasBackground />

      {/* Bottom Controls: arrows + dots */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[999]">
        <div className="flex flex-col items-center gap-2">
          <div
            className="
              flex items-center gap-3
              rounded-full bg-black/55 backdrop-blur-md
              border border-white/15 px-3 py-2 shadow-lg
            "
            style={{
              paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))",
            }}
          >
            {/* Left Arrow */}
            <button
              onClick={goPrev}
              aria-label="Trang trước"
              className="w-10 h-10 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition flex items-center justify-center"
            >
              ←
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2 px-1">
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Đi tới trang ${i + 1}`}
                  className={[
                    "w-2.5 h-2.5 rounded-full transition",
                    i === index ? "bg-white" : "bg-white/25 hover:bg-white/45",
                  ].join(" ")}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={goNext}
              aria-label="Trang sau"
              className="w-10 h-10 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-6 pb-28">
        <AnimatePresence mode="wait">
          {screen === "letter" ? (
            <motion.div
              key="letter"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.28 }}
              className="relative z-10"
            >
              <XmasLetterScreen />
            </motion.div>
          ) : (
            <motion.div
              key="gift"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.28 }}
              className="relative z-10"
            >
              {/* ✅ Bốc thăm 6 hộp quà – chỉ mở 1 lần */}
              <GiftPickGame />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="relative z-10 py-10 text-center text-white/70 text-sm" />
    </div>
  );
}
