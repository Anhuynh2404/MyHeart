import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * LOVE MOMENTS – TRUNG THU EDITION
 * --------------------------------------------------
 * A single‑file React one‑pager with smooth scenes, parallax, subtle particles,
 * photo moments, love notes, and a grand fireworks finale + external link.
 *
 * How to customize quickly:
 * 1) Change SITE copy in the "CONFIG" block.
 * 2) Drop your images into /public/images and replace the IMAGES array paths.
 * 3) Put your external link in EXTERNAL_LINK.
 * 4) (Optional) Replace AUDIO_URL with your song (MP3/OGG in /public/audio).
 * 5) Deploy to Vercel/Netlify or export as static.
 */

/******************** CONFIG ********************/
const NAMES = { you: "Anh", her: "Em" };
const TITLE = "Gửi em - Cô gái anh yêu siêuuuuuu nhiều💕";
const TAGLINE =
  "“Nếu trăng rằm sáng cho nhân gian, thì em chính là vầng sáng cho cuộc đời anh.”🌙💖";
const START_DATE = "2025-09-18"; // YYYY-MM-DD (ví dụ ngày bắt đầu bên nhau)
const EXTERNAL_LINK = "https://maps.app.goo.gl/bzATZ6QaaDaUEkk46"; // <-- Thay bằng link của bạn
const AUDIO_URL = "/audio/nhacf.mp3"; // đặt file ở public/audio (tuỳ chọn)

// Thay các ảnh này bằng ảnh của bạn (để trong public/images)
const IMAGES: { src: string; caption?: string }[] = [
  { src: "/images/02.jpg", caption: "Nụ cười em – điều bình yên nhất." },
  { src: "/images/05.jpg", caption: "Đêm rằm, đèn lồng, và lời hứa nhỏ." },
  { src: "/images/06.jpg", caption: "Khoảnh khắc muốn giữ mãi." },
  { src: "/images/07.jpg", caption: "Mình gặp nhau dưới ánh đèn phố." },
  { src: "/images/11.jpg", caption: "Đêm rằm, đèn lồng, và lời hứa nhỏ." },
  { src: "/images/16.jpg", caption: "Gió dịu và tay nắm thật lâu." },
  { src: "/images/20.jpg", caption: "Nụ cười em – điều bình yên nhất." },
  { src: "/images/23.jpg", caption: "Đêm rằm, đèn lồng, và lời hứa nhỏ." },
  { src: "/images/24.jpg", caption: "Khoảnh khắc muốn giữ mãi." },
  { src: "/images/25.jpg", caption: "Nụ cười em – điều bình yên nhất." },
  { src: "/images/26.jpg", caption: "Một chiếc kẹo kéo, hai trái tim." },
  { src: "/images/27.jpg", caption: "Gió dịu và tay nắm thật lâu." },
  { src: "/images/28.jpg", caption: "Đêm rằm, đèn lồng, và lời hứa nhỏ." },
  { src: "/images/29.jpg", caption: "Khoảnh khắc muốn giữ mãi." },
  { src: "/images/31.jpg", caption: "Một chiếc kẹo kéo, hai trái tim." },
  { src: "/images/32.jpg", caption: "Gió dịu và tay nắm thật lâu." },
  { src: "/images/33.jpg", caption: "Đêm rằm, đèn lồng, và lời hứa nhỏ." },
  { src: "/images/34.jpg", caption: "Khoảnh khắc muốn giữ mãi." },
  { src: "/images/35.jpg", caption: "Nụ cười em – điều bình yên nhất." },
  { src: "/images/36.jpg", caption: "Một chiếc kẹo kéo, hai trái tim." },
];

/******************** UTILITIES ********************/

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
      // release
      // @ts-ignore
      audioRef.current = null;
    };
  }, [url]);
  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };
  return { playing, toggle };
}

/******************** UTILITIES ********************/
function useLoveTimer(startStr: string) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const start = new Date(startStr).getTime();
  let diff = Math.max(0, now - start);
  const days = Math.floor(diff / 86400000);
  diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000);
  diff -= hours * 3600000;
  const minutes = Math.floor(diff / 60000);
  diff -= minutes * 60000;
  const seconds = Math.floor(diff / 1000);
  return { days, hours, minutes, seconds };
}

const TimeBox: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
    <div className="text-2xl sm:text-3xl font-extrabold tabular-nums leading-none">
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-[10px] uppercase tracking-wider opacity-75 mt-1">
      {label}
    </div>
  </div>
);

/******************** VISUAL BITS ********************/
// Floating lanterns (CSS‑only via inline styles)
const Lanterns: React.FC<{ count?: number }> = ({ count = 12 }) => {
  const arr = useMemo(() => Array.from({ length: count }), [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {arr.map((_, i) => {
        const left = Math.random() * 100;
        const duration = 12 + Math.random() * 10;
        const delay = -Math.random() * 12;
        const scale = 0.6 + Math.random() * 0.8;
        return (
          <div
            key={i}
            className="absolute bottom-[-10%] w-5 h-7 rounded-sm shadow-lg"
            style={{
              left: `${left}%`,
              animation: `rise ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              transform: `scale(${scale})`,
              background:
                "radial-gradient(ellipse at center, rgba(255,220,140,0.95) 0%, rgba(255,180,60,0.7) 48%, rgba(255,140,40,0.35) 65%, rgba(255,120,20,0.1) 100%)",
              boxShadow: "0 0 12px 4px rgba(255,170,70,0.65)",
              border: "1px solid rgba(255,200,120,0.6)",
            }}
          />
        );
      })}
      <style>{`
        @keyframes rise {
          0% { transform: translateY(0) scale(var(--s,1)); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-120vh) scale(var(--s,1)); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Ken Burns background
const KenBurns: React.FC<{ image: string }> = ({ image }) => (
  <div
    className="absolute inset-0 -z-10"
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "brightness(0.55)",
      animation: "kenburns 24s ease-in-out infinite alternate",
    }}
  >
    <style>{`
      @keyframes kenburns {
        0% { transform: scale(1) translate(0,0); }
        100% { transform: scale(1.15) translate(0, -2%); }
      }
    `}</style>
  </div>
);

// Fireworks canvas in finale
const Fireworks: React.FC<{ active: boolean }> = ({ active }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const rnd = (min: number, max: number) => Math.random() * (max - min) + min;

    const spawnBurst = () => {
      const cx = rnd(0.18 * w, 0.82 * w);
      const cy = rnd(0.18 * h, 0.55 * h);
      const hue = rnd(0, 360);
      const count = 70 + Math.floor(Math.random() * 50);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + rnd(-0.1, 0.1);
        const speed = rnd(2.2, 5.5);
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: rnd(50, 90),
          age: 0,
          size: rnd(1, 3) * devicePixelRatio,
          hue: hue + rnd(-18, 18),
          fade: rnd(0.96, 0.985),
          gravity: 0.02 * devicePixelRatio,
        });
      }
    };

    const loop = (t: number) => {
      if (!active) {
        ctx.clearRect(0, 0, w, h);
        animRef.current && cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(loop);
        return;
      }

      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, w, h);

      if (t - lastSpawnRef.current > 600) {
        spawnBurst();
        lastSpawnRef.current = t;
      }
      particlesRef.current = particlesRef.current.filter((p) => p.age < p.life);
      for (const p of particlesRef.current) {
        p.vx *= p.fade;
        p.vy = p.vy * p.fade + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.age++;
        const alpha = 1 - p.age / p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${alpha})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [active]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
};

const Hero: React.FC = () => {
  const t = useLoveTimer(START_DATE);
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const moonY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
    >
      <KenBurns
        image={
          IMAGES[0]?.src ||
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920"
        }
      />
      <Lanterns />
      <motion.div
        style={{ y: moonY }}
        className="absolute -z-10 top-10 left-1/2 -translate-x-1/2"
      >
        <div
          className="w-[52vmin] h-[52vmin] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #fff7cc 0%, #ffe583 28%, #f6bf5a 55%, rgba(0,0,0,0) 60%)",
            boxShadow: "0 0 120px 40px rgba(246, 191, 90, .35)",
            filter: "blur(0.2px)",
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="mx-auto px-6"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight">
          {TITLE}
        </h1>
        <p className="mt-4 text-base sm:text-lg opacity-90">{TAGLINE}</p>
        <p className="mt-2 text-sm opacity-80">
          Như vậy chúng mình đã bên nhau được
        </p>
        <div className="mt-3 flex items-stretch justify-center gap-2 sm:gap-3">
          <TimeBox label="ngày" value={t.days} />
          <TimeBox label="giờ" value={t.hours} />
          <TimeBox label="phút" value={t.minutes} />
          <TimeBox label="giây" value={t.seconds} />
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <ScrollHint />
          <AudioToggle />
        </div>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
    </section>
  );
};

const ScrollHint: React.FC = () => (
  <div className="flex items-center gap-2 text-white/90 text-sm">
    <div className="w-5 h-8 rounded-full border border-white/60 flex items-start justify-center p-1">
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [1, 0.4, 1] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="w-1 h-1 rounded-full bg-white"
      />
    </div>
    <span>Cuộn xuống nhé</span>
  </div>
);

const AudioToggle: React.FC = () => {
  const { playing, toggle } = useAudio(AUDIO_URL);
  return (
    <button
      onClick={toggle}
      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/25 backdrop-blur-md text-sm"
    >
      {playing ? "Tắt nhạc" : "Bật nhạc"}
    </button>
  );
};

/******************** LỜI MUỐN NÓI (FULL SCREEN) ********************/
const TypewriterText: React.FC<{ text: string; speed?: number }> = ({
  text,
  speed = 26,
}) => {
  const [displayed, setDisplayed] = useState("");
  const [i, setI] = useState(0);
  useEffect(() => {
    setDisplayed("");
    setI(0);
  }, [text]);
  useEffect(() => {
    if (i > text.length) return;
    const id = setTimeout(() => {
      setDisplayed(text.slice(0, i));
      setI(i + 1);
    }, speed);
    return () => clearTimeout(id);
  }, [i, text, speed]);
  return (
    <span>
      {displayed}
      <span className="inline-block w-[10px] h-[1.2em] align-[-0.2em] ml-0.5 bg-white/80 animate-pulse" />
    </span>
  );
};
const LoveNotes: React.FC = () => {
  const text = `/**
* THE CODE OF LOVE
*/
Em à,
Yêu không có công thức sẵn, cũng chẳng có hướng dẫn cụ thể;
Nhưng từ khi gặp em, anh đã biết yêu là thế nào;
Là nhớ em mỗi sáng khi vừa thức dậy.
Là mong em bình yên sau một ngày dài.
Là chỉ muốn nắm tay em đi qua thật nhiều năm tháng.
Yêu là kiên nhẫn, là bao dung, là cùng nhau trưởng thành;
Yêu là nhìn về phía trước và thấy em trong mọi ước mơ;


Và với anh…
Yêu chính là em`;
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Lung linh: nền gradient + bokeh */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 120%, rgba(255,255,255,0.06), transparent)",
        }}
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#09090f] via-[#0b0b12] to-black" />
      <div className="absolute inset-0 -z-10 opacity-60">
        {/* Bokeh particles */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${30 + Math.random() * 90}px`,
              height: `${30 + Math.random() * 90}px`,
              background: `radial-gradient(circle, rgba(255,200,140,0.25), rgba(255,120,80,0.05))`,
              animation: `floatY ${8 + Math.random() * 8}s ease-in-out ${
                -Math.random() * 8
              }s infinite alternate`,
            }}
          />
        ))}
        <style>{`
@keyframes floatY { from { transform: translateY(-10px) } to { transform: translateY(10px) } }
`}</style>
      </div>
      {/* Lớp tim bay lãng mạn */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${16 + Math.random() * 38}px`,
              opacity: 0.12 + Math.random() * 0.18,
              animation: `heartFloat ${8 + Math.random() * 10}s ease-in-out ${
                -Math.random() * 8
              }s infinite`,
              filter: "drop-shadow(0 0 6px rgba(255,120,160,0.35))",
            }}
          >
            ❤
          </div>
        ))}
        <style>{`
@keyframes heartFloat {
0% { transform: translateY(10px) rotate(-6deg); }
50% { transform: translateY(-8px) rotate(6deg); }
100% { transform: translateY(10px) rotate(-6deg); }
}
`}</style>
      </div>
      {/* Nội dung gõ từng chữ */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="whitespace-pre-wrap font-mono text-[15px] sm:text-lg md:text-xl leading-8 sm:leading-9 md:leading-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-7 shadow-[0_0_60px_rgba(255,180,100,0.15)]"
        >
          <TypewriterText text={text} speed={100} />
        </motion.div>
      </div>
    </section>
  );
};
/* ====== LanternWish: thả đèn lồng với lời chúc cá nhân hoá ====== */
/* ===== LanternWish: nền trăng + sao lấp lánh + sao băng; nhập ước → đèn lồng bay ===== */
/* ===== LanternWish: nền trăng + sao lấp lánh + sao băng; nhập ước → đèn lồng bay ===== */
const LanternWish: React.FC = () => {
  const [wish, setWish] = useState("");
  const [lanterns, setLanterns] = useState<
    Array<{
      id: number;
      left: number;
      dur: number;
      delay: number;
      wish: string;
    }>
  >([]);
  const idRef = useRef(0);
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjkarnrq";

  async function sendWishSilently(name: string, wish: string) {
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name || "Ẩn danh",
          wish,
          timestamp: new Date().toISOString(),
          site: window.location.href,
        }),
        mode: "cors",
        credentials: "omit",
      });
      // không alert -> im lặng
      return res.ok;
    } catch {
      return false;
    }
  }

  const launch = () => {
    if (!wish.trim()) return;
    const left = 10 + Math.random() * 80; // tránh sát mép
    const dur = 18 + Math.random() * 12; // 18–30s
    const delay = 0; // bay ngay
    setLanterns((prev) => [
      ...prev,
      { id: ++idRef.current, left, dur, delay, wish: wish.trim() },
    ]);
    sendWishSilently("Co ay", wish.trim());
    setWish("");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-[#090912]">
      {/* lớp nền chuyển màu */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-[#0a0a12] via-[#0a0a14] to-black" />

      {/* mặt trăng to */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div
          className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[46vmin] h-[46vmin] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #fff8d6 0%, #ffe4a3 30%, #f7c76a 55%, rgba(0,0,0,0) 60%)",
            boxShadow:
              "0 0 120px 40px rgba(247,199,106,0.25), 0 0 240px 80px rgba(247,199,106,0.15)",
            filter: "blur(0.2px)",
          }}
        />
      </div>

      {/* bầu trời sao (đặt z-0 để KHÔNG bị chìm dưới nền) + sao băng */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* lớp xa */}
        {Array.from({ length: 140 }).map((_, i) => (
          <div
            key={`far-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              background: "white",
              opacity: 0.25 + Math.random() * 0.6,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${
                -Math.random() * 3
              }s infinite`,
            }}
          />
        ))}
        {/* lớp trung */}
        {Array.from({ length: 90 }).map((_, i) => (
          <div
            key={`mid-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1.5 + Math.random() * 2.5}px`,
              height: `${1.5 + Math.random() * 2.5}px`,
              background: "white",
              opacity: 0.25 + Math.random() * 0.6,
              animation: `twinkleSlow ${3 + Math.random() * 5}s ease-in-out ${
                -Math.random() * 4
              }s infinite`,
            }}
          />
        ))}
        {/* lớp gần */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`near-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: "white",
              opacity: 0.35 + Math.random() * 0.5,
              animation: `twinkleFast ${1 + Math.random() * 1.6}s ease-in-out ${
                -Math.random() * 1.6
              }s infinite`,
            }}
          />
        ))}
        {/* sao băng */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={`shoot-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              width: "2px",
              height: "2px",
              background: "transparent",
              boxShadow: "0 0 8px 2px rgba(255,255,255,0.9)",
              animation: `shoot ${2.6 + Math.random() * 2.2}s linear ${
                -Math.random() * 3
              }s infinite`,
            }}
          />
        ))}
        <style>{`
          @keyframes twinkle{0%,100%{opacity:.2}50%{opacity:1}}
          @keyframes twinkleSlow{0%,100%{opacity:.25}50%{opacity:.9}}
          @keyframes twinkleFast{0%,100%{opacity:.35}50%{opacity:1}}
          @keyframes shoot{0%{transform:translate3d(0,0,0);opacity:0}10%{opacity:1}100%{transform:translate3d(60vw,20vh,0);opacity:0}}
        `}</style>
      </div>

      {/* form: Enter hoạt động chắc chắn */}
      <div className="relative z-20 w-full max-w-3xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl font-bold text-center"
        >
          THẢ ĐÈN LỒNG ƯỚC NGUYỆN
        </motion.h2>

        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            launch();
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 grid sm:grid-cols-3 gap-3 items-stretch"
        >
          <input
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="Điều ước của nàng..."
            aria-label="Nhập điều ước"
            className="sm:col-span-2 px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
          />
          <button
            type="submit"
            className="sm:col-span-1 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-400 font-semibold shadow-[0_10px_30px_rgba(255,100,120,0.35)] border border-white/10"
          >
            Thả đèn lồng
          </button>
          <p className="sm:col-span-3 text-center text-sm opacity-70">
            Chỉ cần một điều ước nhỏ, đèn lồng sẽ mang nó bay lên trời trăng sao
            ✨
          </p>
        </motion.form>
      </div>

      {/* đèn lồng bay (z-10 để ở trên sao) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {lanterns.map((l) => (
          <div
            key={l.id}
            className="absolute"
            style={{
              left: `${l.left}%`,
              bottom: "-16%",
              animation: `lantern-rise ${l.dur}s linear ${l.delay}s forwards`,
            }}
          >
            <svg
              width="140"
              height="200"
              viewBox="0 0 70 96"
              className="mx-auto drop-shadow-[0_0_24px_rgba(255,170,80,0.45)]"
            >
              <defs>
                <radialGradient id={`g${l.id}`} cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#ffe5a8" />
                  <stop offset="55%" stopColor="#ffc06b" />
                  <stop offset="100%" stopColor="#ff8c28" />
                </radialGradient>
                <filter
                  id={`blur${l.id}`}
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
                </filter>
              </defs>
              <rect
                x="8"
                y="10"
                width="54"
                height="70"
                rx="16"
                fill={`url(#g${l.id})`}
                filter={`url(#blur${l.id})`}
                stroke="rgba(255,200,120,0.65)"
              />
              <rect x="22" y="4" width="26" height="6" rx="2" fill="#c46a1e" />
              <rect x="22" y="82" width="26" height="6" rx="2" fill="#c46a1e" />
              <line
                x1="35"
                y1="88"
                x2="35"
                y2="96"
                stroke="#ffb25a"
                strokeWidth="2"
              />
            </svg>
            <div className="mt-2 text-center text-sm w-[240px] -ml-[85px] bg-black/35 border border-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
              <div className="opacity-90">{l.wish}</div>
            </div>
          </div>
        ))}
        <style>{`
          @keyframes lantern-rise {
            0%   { transform: translateY(0) translateX(0) rotate(-1.5deg); opacity: 0; }
            8%   { opacity: 1; }
            50%  { transform: translateY(-60vh) translateX(6px) rotate(1.5deg); }
            100% { transform: translateY(-120vh) translateX(-6px) rotate(-1.5deg); opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  );
};

/* ====== ConstellationHeart: vũ trụ + chòm sao trái tim + ảnh bay lên ====== */
const ConstellationHeart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // cấu hình bay cho ảnh đôi (ổn định giữa các re-render)
  const floats = useMemo(() => {
    return IMAGES.map((img) => ({
      src: img.src,
      left: Math.random() * 100, // %
      delay: -Math.random() * 10, // s
      dur: 18 + Math.random() * 14, // 18–32s
      size: 120 + Math.random() * 120, // px (rộng)
      rot: Math.random() * 12 - 6, // độ
    }));
  }, []);

  // Vẽ chòm sao trái tim (parametric heart) trên canvas
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let w = (c.width = c.offsetWidth * devicePixelRatio);
    let h = (c.height = c.offsetHeight * devicePixelRatio);

    const resize = () => {
      w = c.width = c.offsetWidth * devicePixelRatio;
      h = c.height = c.offsetHeight * devicePixelRatio;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const pts: { x: number; y: number }[] = [];
    for (let t = 0; t < Math.PI * 2; t += 0.08) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      pts.push({ x, y });
    }
    const norm = (val: number, min: number, max: number) =>
      (val - min) / (max - min);
    const xs = pts.map((p) => p.x),
      ys = pts.map((p) => p.y);
    const minX = Math.min(...xs),
      maxX = Math.max(...xs),
      minY = Math.min(...ys),
      maxY = Math.max(...ys);

    const loop = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      // sương vũ trụ mờ
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const px = norm(p.x, minX, maxX) * w * 0.6 + w * 0.2;
        const py = norm(p.y, minY, maxY) * h * 0.6 + h * 0.2;
        const tw = (Math.sin(t / 400 + i) * 0.5 + 0.5) * 0.8 + 0.2;

        ctx.beginPath();
        ctx.arc(px, py, tw * 1.6 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${330 + (i % 40)}, 100%, 70%, 0.8)`;
        ctx.fill();

        if (i % 3 === 0) {
          const j = (i + 3) % pts.length;
          const p2 = pts[j];
          const px2 = norm(p2.x, minX, maxX) * w * 0.6 + w * 0.2;
          const py2 = norm(p2.y, minY, maxY) * h * 0.6 + h * 0.2;
          ctx.strokeStyle = "rgba(255,160,200,0.22)";
          ctx.lineWidth = 1 * devicePixelRatio;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px2, py2);
          ctx.stroke();
        }
      }
      requestAnimationFrame(loop);
    };

    const id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Space gradient (vũ trụ) */}
      <div
        className="absolute inset-0 -z-30"
        style={{
          background:
            "radial-gradient(1200px 800px at 50% 120%, rgba(255,255,255,0.04), transparent),\
             radial-gradient(1000px 600px at 20% 10%, rgba(255,120,200,0.06), transparent),\
             radial-gradient(900px 600px at 80% 15%, rgba(120,180,255,0.05), transparent)",
        }}
      />

      {/* Starfield chớp tắt */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        {Array.from({ length: 140 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              background: "white",
              opacity: 0.5 + Math.random() * 0.5,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${
                -Math.random() * 3
              }s infinite`,
            }}
          />
        ))}
        <style>{`@keyframes twinkle { 0%,100%{opacity:.3} 50%{opacity:1} }`}</style>
      </div>

      {/* Chòm sao trái tim */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
      />

      {/* Ảnh đôi bay lên như đèn lồng */}
      <div className="absolute inset-0 -z-5 pointer-events-none">
        {floats.map((f, i) => (
          <img
            key={i}
            src={f.src}
            alt={`moment-${i}`}
            className="absolute rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(255,140,180,0.25)] object-cover"
            style={{
              left: `${f.left}%`,
              bottom: "-15%",
              width: `${f.size}px`,
              height: `${f.size * 0.66}px`,
              transform: `rotate(${f.rot}deg)`,
              animation: `photo-rise ${f.dur}s linear infinite`,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}
        <style>{`@keyframes photo-rise { 0%{ transform: translateY(0) rotate(var(--r,0deg)); opacity:0 } 10%{opacity:1} 100%{ transform: translateY(-120vh) rotate(var(--r,0deg)); opacity:0 } }`}</style>
      </div>

      {/* Lời hứa nhỏ */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl font-bold"
        >
          TÍN HIỆU VŨ TRỤ GỬI ĐẾN ĐÔI TA
        </motion.h2>

        {/* <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {vows.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              {v}
            </motion.div>
          ))}
        </div> */}

        <p className="mt-6 text-sm opacity-70">
          Giữa hàng tỷ vì sao, ánh sáng của em là điều anh luôn hướng đến.
        </p>
      </div>
    </section>
  );
};

const GrandFinale: React.FC = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [nearby, setNearby] = useState<null | boolean>(null);
  const [btnA, setBtnA] = useState({ x: 0, y: 0 }); // Hongg
  const [btnB, setBtnB] = useState({ x: 0, y: 0 }); // …(Điền giúp tôi)
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Điểm hẹn (chỉnh lại toạ độ hoặc dùng EXTERNAL_LINK sẵn có)
  const MEETING_POINT = {
    lat: 10.776889,
    lng: 106.700806,
    label: "Trọ của em",
  };
  const MAPS_URL =
    EXTERNAL_LINK ||
    `https://www.google.com/maps?q=${MEETING_POINT.lat},${MEETING_POINT.lng}`;

  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  const runAway = (
    setFn: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    // Nhảy 2 lần cực nhanh + biên độ lớn hơn
    const hop = () => setFn({ x: rand(-240, 240), y: rand(-160, 160) });
    hop();
    setTimeout(hop, 60); // double-hop sau 60ms
    if (navigator.vibrate) navigator.vibrate(20);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setActive(e.isIntersecting)),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const metersBetween = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const surprise = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setOpen(true);

    try {
      if (navigator.vibrate) navigator.vibrate([60, 30, 60]);
      const chime = new Audio("/audio/door-chime.mp3");
      chime.volume = 0.8;
      chime.play().catch(() => {});
    } catch {}

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const d = metersBetween(
            latitude,
            longitude,
            MEETING_POINT.lat,
            MEETING_POINT.lng
          );
          setNearby(d < 300);
        },
        () => setNearby(null),
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
      );
    } else {
      setNearby(null);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] bg-black text-white flex items-center justify-center overflow-hidden"
    >
      <KenBurns
        image={
          IMAGES[IMAGES.length - 1]?.src ||
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1920"
        }
      />
      <Fireworks active={active} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-xl">
          ❤️MÃI MÃI YÊU EMMMMM❤️
        </h2>
        <p className="mt-4 text-base sm:text-lg opacity-90">
          Cảm ơn em đã đến bên anh, và anh mong rằng chúng mình cùng bước tiếp
          những mùa trăng sau nữa nhé!
        </p>

        {/* Fallback: vẫn có href, nhưng onClick sẽ mở overlay và chặn điều hướng */}
        <motion.a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          onClick={surprise}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.04 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 16,
            delay: 0.2,
          }}
          className="inline-flex items-center justify-center mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-semibold shadow-[0_10px_40px_rgba(255,70,110,0.35)] border border-white/10"
        >
          MỞ MÓN QUÀ CUỐI CÙNG →
        </motion.a>
        <p className="mt-3 text-xs opacity-70">(Em nhấn vào iiiiiiii)</p>
      </motion.div>

      {/* Overlay bất ngờ */}
      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <Fireworks active={true} />
          <div className="relative z-10 max-w-lg mx-auto text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-white/15 bg-white/10 px-6 py-7 shadow-[0_20px_120px_rgba(255,120,160,0.25)]"
            >
              <div className="text-2xl sm:text-3xl font-extrabold">
                Người yêu gặp anh một tý nhaaa ✨
              </div>
              <p className="mt-3 opacity-90">
                {nearby === true && (
                  <>
                    Em nhìn ra cửa nhé…{" "}
                    <span className="font-semibold">
                      anh đang đứng ngay trước trọ của em
                    </span>{" "}
                    đây.
                  </>
                )}
                {nearby === false && <>Anh đứng đây từ chiềuuuu.</>}
                {nearby === null && <>Có một bất ngờ nhỏ dành cho em.</>}
              </p>

              {/* Ba lựa chọn: chỉ “Ok anh yêu” mở Maps, hai nút còn lại chạy trốn */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 relative overflow-visible">
                {/* Nút OK → mở Google Maps */}
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-400 text-white font-semibold shadow-[0_10px_30px_rgba(255,100,120,0.35)] border border-white/10"
                >
                  Ok anh yêu 💖
                </a>

                {/* Hongg – chạy trốn */}
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => runAway(setBtnA)}
                  onMouseMove={() => runAway(setBtnA)} // né liên tục khi rê chuột
                  onTouchStart={() => runAway(setBtnA)} // mobile
                  className="px-5 py-3 rounded-xl bg-white/15 border border-white/20 text-white/90 hover:bg-white/20"
                  style={{
                    position: "relative",
                    transition: "transform .06s ease-out", // nhanh hơn
                    transform: `translate(${btnA.x}px, ${btnA.y}px) scale(${
                      1 - Math.min(Math.hypot(btnA.x, btnA.y) / 500, 0.15)
                    })`,
                  }}
                >
                  Hongg 🙈
                </button>

                {/* …(Điền giúp tôi) – chạy trốn */}
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => runAway(setBtnB)}
                  onMouseMove={() => runAway(setBtnB)} // né liên tục
                  onTouchStart={() => runAway(setBtnB)} // mobile
                  className="px-5 py-3 rounded-xl bg-white/15 border border-white/20 text-white/90 hover:bg-white/20"
                  style={{
                    position: "relative",
                    transition: "transform .06s ease-out", // nhanh hơn
                    transform: `translate(${btnB.x}px, ${btnB.y}px) rotate(${
                      btnB.x * 0.06
                    }deg)`,
                  }}
                >
                  Tất nhiên là khongg😝
                </button>
              </div>

              <p className="mt-3 text-xs opacity-70">
                *Tính từ chối anh sao hehe
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};

/******************** PAGE SHELL ********************/
const Footer: React.FC = () => (
  <footer className="py-10 text-center text-white bg-black/90">
    <div className="opacity-80 text-sm">
      Made with ♥ for {NAMES.her}. Chúc em một mùa Trung Thu thật ấm áp.
    </div>
  </footer>
);

export default function LoveMomentsTrungThu() {
  useEffect(() => {
    document.title = TITLE;
  }, []);

  return (
    <main className="font-sans bg-black text-white">
      <Hero />
      <LoveNotes />
      <LanternWish />
      <ConstellationHeart />
      <GrandFinale />
      <Footer />
    </main>
  );
}
