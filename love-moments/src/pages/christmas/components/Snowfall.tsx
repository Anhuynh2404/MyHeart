import { useMemo } from "react";

export default function Snowfall({ count = 120 }: { count?: number }) {
  const flakes = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        op: 0.12 + Math.random() * 0.55,
        dur: 7 + Math.random() * 10,
        delay: -Math.random() * 10,
        drift: -18 + Math.random() * 36,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((f, i) => (
        <div
          key={i}
          className="absolute -top-10 rounded-full bg-white"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.op,
            filter: "blur(0.2px)",
            animation: `snowFall ${f.dur}s linear ${f.delay}s infinite`,
            transform: `translateX(${f.drift}px)`,
          }}
        />
      ))}
      <style>{`
        @keyframes snowFall {
          0% { transform: translate3d(0,-20px,0); }
          100% { transform: translate3d(10vw,120vh,0); }
        }
      `}</style>
    </div>
  );
}
