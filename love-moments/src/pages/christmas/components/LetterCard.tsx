// src/pages/christmas/components/LetterCard.tsx
import { motion } from "framer-motion";

const LETTER_IMAGE = "/images/giangsinh3.png"; // đặt file vào public/images/xmas-letter.png

export default function LetterCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, rotate: -0.2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.7 }}
      className="relative w-full max-w-6xl"
    >
      {/* paper */}
      <div className="relative rounded-[34px] bg-[#f7f1e3] border border-black/10 shadow-[0_30px_120px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* inner border */}
        <div className="absolute inset-4 rounded-[26px] border-2 border-emerald-900/55 pointer-events-none" />

        {/* subtle christmas doodles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-emerald-700/10 blur-2xl" />
        <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-rose-600/10 blur-3xl" />

        {/* top ornaments */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-50">
          <span className="w-7 h-7 rounded-full bg-white/60" />
          <span className="w-7 h-7 rounded-full bg-white/60" />
          <span className="w-7 h-7 rounded-full bg-white/60" />
        </div>

        {/* main content */}
        <div className="px-8 sm:px-12 pt-16 pb-12">
          <h3 className="text-center font-extrabold tracking-tight text-1xl sm:text-4xl text-emerald-900">
            Chúc mừng giáng sinh cục cưng của anhhh
          </h3>

          <p className="mt-5 text-center text-emerald-900/80 italic text-lg sm:text-xl leading-7">
          </p>

          {/* center illustration (your image) */}
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-[1024px] rounded-3xl overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.18)] bg-white">
              <img
                src={LETTER_IMAGE}
                alt="Christmas letter"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          </div>

          {/* bottom blocks like your current UI */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-32 h-16 rounded-2xl bg-[#f0cfc6] border border-black/10" />
            <div className="w-32 h-16 rounded-2xl bg-[#cfd7c9] border border-black/10" />
            <div className="w-32 h-16 rounded-2xl bg-[#f5e6bb] border border-black/10" />
          </div>
        </div>

        {/* trees sides */}
        <TreeLeft />
        <TreeRight />
      </div>
    </motion.div>
  );
}

function TreeLeft() {
  return (
    <div className="absolute bottom-6 left-6 sm:left-10 opacity-95">
      <svg width="90" height="140" viewBox="0 0 90 140" fill="none">
        <rect x="39" y="105" width="12" height="26" rx="4" fill="#6b4b2a" />
        <path
          d="M45 10 L70 55 H58 L80 90 H10 L32 55 H20 L45 10Z"
          fill="#0f4d35"
          stroke="rgba(0,0,0,0.15)"
        />
        <circle cx="30" cy="82" r="5" fill="#e11d48" />
        <circle cx="62" cy="70" r="5" fill="#3b82f6" />
        <circle cx="46" cy="52" r="5" fill="#f59e0b" />
      </svg>
    </div>
  );
}

function TreeRight() {
  return (
    <div className="absolute bottom-6 right-6 sm:right-10 opacity-95">
      <svg width="90" height="140" viewBox="0 0 90 140" fill="none">
        <rect x="39" y="105" width="12" height="26" rx="4" fill="#6b4b2a" />
        <path
          d="M45 10 L70 55 H58 L80 90 H10 L32 55 H20 L45 10Z"
          fill="#0f4d35"
          stroke="rgba(0,0,0,0.15)"
        />
        <circle cx="30" cy="82" r="5" fill="#22c55e" />
        <circle cx="62" cy="70" r="5" fill="#e11d48" />
        <circle cx="46" cy="52" r="5" fill="#f59e0b" />
      </svg>
    </div>
  );
}
