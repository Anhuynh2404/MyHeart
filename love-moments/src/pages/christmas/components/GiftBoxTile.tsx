import { useRef } from "react";
import { motion } from "framer-motion";

export default function GiftBoxTile({
  boxNo,
  disabled,
  picked,
  opening,
  onPick,
}: {
  boxNo: number;
  disabled: boolean;
  picked: boolean;
  opening: boolean;
  onPick: (box: number, rect: DOMRect) => void;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    onPick(boxNo, el.getBoundingClientRect());
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={handleClick}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={[
        "relative w-full max-w-[280px] aspect-square",
        "rounded-3xl border backdrop-blur-md shadow-[0_20px_90px_rgba(0,0,0,0.45)]",
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
        picked ? "border-emerald-300/50 bg-emerald-300/10" : "border-white/15 bg-black/35",
      ].join(" ")}
    >
      {/* label */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-white/80">
        Hộp #{boxNo}
      </div>

      {/* gift */}
      <div className="absolute inset-0 flex items-center justify-center">
        <GiftSVG opening={opening} picked={picked} />
      </div>

      {/* footer text */}
      <div className="absolute bottom-3 inset-x-0 text-center text-sm text-white/75">
        {picked ? "Đã mở 🎉" : disabled ? "Đã khóa 🔒" : "Nhấn để mở 🎁"}
      </div>
    </motion.button>
  );
}

function GiftSVG({ opening, picked }: { opening: boolean; picked: boolean }) {
  // Box “to đùng”, nắp bật lên khi opening
  return (
    <div className="relative w-[68%] max-w-[220px]">
      {/* lid */}
      <motion.div
        animate={
          opening
            ? { y: -26, rotate: -14, scale: 1.02 }
            : picked
            ? { y: -18, rotate: -10 }
            : { y: 0, rotate: 0 }
        }
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="absolute -top-[18%] left-1/2 -translate-x-1/2 w-full"
        style={{ transformOrigin: "70% 80%" }}
      >
        <svg viewBox="0 0 260 90" className="w-full h-auto">
          <rect x="12" y="18" width="236" height="60" rx="22" fill="#c0392b" />
          <rect x="115" y="18" width="30" height="60" rx="12" fill="#f4c542" />
          <rect x="12" y="42" width="236" height="18" rx="9" fill="#f4c542" opacity="0.95" />
          {/* bow */}
          <path
            d="M130 16c-10 0-18 7-18 16 0 7 5 13 12 15l6-6 6 6c7-2 12-8 12-15 0-9-8-16-18-16z"
            fill="#f4c542"
          />
        </svg>
      </motion.div>

      {/* base */}
      <svg viewBox="0 0 260 220" className="w-full h-auto">
        <rect x="18" y="60" width="224" height="150" rx="28" fill="#c0392b" />
        <rect x="114" y="60" width="32" height="150" rx="14" fill="#f4c542" />
        <rect x="18" y="118" width="224" height="22" rx="11" fill="#f4c542" opacity="0.95" />
        {/* soft highlights */}
        <path
          d="M40 78c28-20 70-26 100-20"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
