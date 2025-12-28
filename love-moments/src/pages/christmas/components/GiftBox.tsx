import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Conf = { id: number; x: number; r: number; s: number; d: number };

export default function GiftBox() {
  const [open, setOpen] = useState(false);

  const confetti = useMemo<Conf[]>(
    () =>
      Array.from({ length: 34 }).map((_, i) => ({
        id: i,
        x: -140 + Math.random() * 280,
        r: -180 + Math.random() * 360,
        s: 0.7 + Math.random() * 1.2,
        d: 0.6 + Math.random() * 0.9,
      })),
    []
  );

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative select-none"
        aria-label="Open gift"
      >
        {/* confetti */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute left-1/2 top-2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {confetti.map((c) => (
                <motion.div
                  key={c.id}
                  className="absolute text-xl"
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
                  animate={{ x: c.x, y: -180 - Math.random() * 120, rotate: c.r, opacity: 1, scale: c.s }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: c.d, ease: "easeOut" }}
                >
                  ⭐
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* lid */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -top-8 w-[280px] h-[110px] rounded-3xl bg-[#d6453a] border border-white/20 shadow-[0_30px_120px_rgba(0,0,0,0.35)]"
          animate={
            open
              ? { y: -40, rotate: -12, x: "-60%", scale: 1.02 }
              : { y: 0, rotate: 0, x: "-50%", scale: 1 }
          }
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
        >
          {/* ribbon on lid */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-16 bg-[#f1c14b]" />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-14 bg-[#f1c14b]" />
          </div>

          {/* bow */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 flex gap-2">
            <div className="w-10 h-7 rounded-[18px] bg-[#f1c14b] rotate-[-18deg]" />
            <div className="w-10 h-7 rounded-[18px] bg-[#f1c14b] rotate-[18deg]" />
          </div>
        </motion.div>

        {/* box body */}
        <div className="relative w-[280px] h-[210px] rounded-3xl bg-[#c83a30] border border-white/20 shadow-[0_30px_120px_rgba(0,0,0,0.35)] overflow-hidden">
          {/* ribbon */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-16 bg-[#f1c14b]" />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-14 bg-[#f1c14b]" />

          {/* inner glow when open */}
          <motion.div
            className="absolute inset-0"
            animate={open ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0.0) 60%)",
            }}
          />
        </div>
      </button>

      <div className="mt-4 text-white/80 text-sm">
        {open ? "Bất ngờ nèee ✨" : "Nhấn để mở 🎁"}
      </div>

      <button
        onClick={() => setOpen(false)}
        className="mt-3 px-5 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 text-sm"
      >
        Reset hộp quà
      </button>
    </div>
  );
}
