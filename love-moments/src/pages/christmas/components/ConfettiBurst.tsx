import { useEffect, useMemo, useState } from "react";

type Particle = {
  id: number;
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  rot: number;
  dur: number;
  size: number;
  kind: "rect" | "star";
};

export default function ConfettiBurst({ x, y }: { x: number; y: number }) {
  const [show, setShow] = useState(true);

  const parts = useMemo<Particle[]>(() => {
    const n = 44;
    const arr: Particle[] = [];
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.35;
      const speed = 120 + Math.random() * 240;
      arr.push({
        id: i,
        x0: x,
        y0: y,
        dx: Math.cos(a) * speed,
        dy: Math.sin(a) * speed - (80 + Math.random() * 120),
        rot: (Math.random() * 180 - 90) * (Math.PI / 180),
        dur: 900 + Math.random() * 650,
        size: 8 + Math.random() * 10,
        kind: Math.random() < 0.28 ? "star" : "rect",
      });
    }
    return arr;
  }, [x, y]);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1700);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[998]">
      {parts.map((p) => (
        <ParticleView key={p.id} p={p} />
      ))}
    </div>
  );
}

function ParticleView({ p }: { p: Particle }) {
  return (
    <div
      className="absolute"
      style={{
        left: p.x0,
        top: p.y0,
        width: p.size,
        height: p.size,
        animation: `burst_${p.id} ${p.dur}ms ease-out forwards`,
        transform: `rotate(${p.rot}rad)`,
        filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))",
      }}
    >
      {p.kind === "star" ? <Star /> : <Rect />}
      <style>{`
        @keyframes burst_${p.id} {
          0%   { transform: translate(0px, 0px) rotate(0deg); opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translate(${p.dx}px, ${p.dy}px) rotate(260deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function Rect() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 3,
        background:
          "linear-gradient(135deg, rgba(255,215,0,0.95), rgba(255,80,120,0.85), rgba(80,200,255,0.85))",
      }}
    />
  );
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path
        d="M12 2l2.8 6.7 7.2.6-5.5 4.7 1.7 7-6.2-3.8-6.2 3.8 1.7-7-5.5-4.7 7.2-.6L12 2z"
        fill="rgba(255,215,0,0.95)"
      />
    </svg>
  );
}
