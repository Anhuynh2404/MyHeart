import Snowfall from "./Snowfall";

export default function XmasBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061018] via-[#07070c] to-black" />

      {/* soft glow */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl bg-white/10" />
        <div className="absolute bottom-[-140px] left-[-120px] w-[520px] h-[520px] rounded-full blur-3xl bg-emerald-500/10" />
        <div className="absolute bottom-[-140px] right-[-120px] w-[520px] h-[520px] rounded-full blur-3xl bg-rose-500/10" />
      </div>

      {/* Snow */}
      <Snowfall count={160} />

      {/* Tree silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-[42vh] pointer-events-none">
        <svg viewBox="0 0 1200 400" className="w-full h-full opacity-80">
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="1" stopColor="rgba(0,0,0,0.0)" />
            </linearGradient>
          </defs>

          {/* snow ground */}
          <path d="M0,320 C240,260 420,360 650,310 C880,260 980,360 1200,300 L1200,400 L0,400 Z" fill="rgba(255,255,255,0.06)" />
          <path d="M0,320 C240,260 420,360 650,310 C880,260 980,360 1200,300" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />

          {/* tree */}
          <g transform="translate(980,80)">
            <polygon points="70,0 10,80 40,80 0,140 35,140 5,190 135,190 105,140 140,140 100,80 130,80" fill="rgba(16,185,129,0.25)" />
            <rect x="55" y="190" width="30" height="60" rx="6" fill="rgba(120,90,60,0.35)" />
          </g>

          {/* santa-ish circle glow */}
          <circle cx="150" cy="140" r="60" fill="url(#g)" />
        </svg>
      </div>
    </div>
  );
}
