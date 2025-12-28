import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GiftBoxTile from "./GiftBoxTile";
import ConfettiBurst from "../components/ConfettiBurst";

type Reward = {
  id: string;
  title: string;
  desc: string;
  emoji: string;
};

type WeightedReward = { rewardId: Reward["id"]; w: number };

const STORAGE_KEY = "xmas_gift_pick_v1";

// Danh sách phần thưởng (bạn sửa nội dung tùy ý)
const REWARDS: Reward[] = [
  { id: "jackpot", title: "Món quà siêu to khủng lồ", desc: "“Anh là món quà to lớn nhất của em.” ", emoji: "🎁❤️" },
  { id: "date", title: "Hẹn hò ấm áp", desc: "Đi uống cacao nóng/ăn gì đó với anh nha ☕🍪", emoji: "☕" },
  { id: "gift", title: "Món quà nhỏ", desc: "Một món quà nho nhỏ (để anh chuẩn bị) 🎁", emoji: "🎁" },
  { id: "kiss", title: "Một cái hun", desc: "Hun cái nè 😘", emoji: "😘" },
  { id: "song", title: "Bài hát tặng em", desc: "Anh đàn/hát tặng em 1 bài em thích 🎸", emoji: "🎶" },
  { id: "tiny", title: "May mắn nhỏ", desc: "Một lời chúc ấm áp + yêu em thêm 10% ✨", emoji: "✨" },
];

const rewardById = (id: string) => REWARDS.find((r) => r.id === id)!;

// ✅ Mỗi hộp có 1 bảng weight riêng
// Gợi ý: Box 1 jackpot cao hơn, Box 6 jackpot thấp hơn
const BOX_WEIGHTS: Record<number, WeightedReward[]> = {
  1: [
    { rewardId: "jackpot", w: 100 },
    { rewardId: "date", w: 0 },
    { rewardId: "gift", w: 0 },
    { rewardId: "kiss", w: 0 },
    { rewardId: "song", w: 0 },
    { rewardId: "tiny", w: 0 },
  ],
  2: [
    { rewardId: "jackpot", w: 100 },
    { rewardId: "date", w: 0 },
    { rewardId: "gift", w: 0 },
    { rewardId: "kiss", w: 0 },
    { rewardId: "song", w: 0 },
    { rewardId: "tiny", w: 0 },
  ],
  3: [
    { rewardId: "jackpot", w: 100 },
    { rewardId: "date", w: 0 },
    { rewardId: "gift", w: 0 },
    { rewardId: "kiss", w: 0 },
    { rewardId: "song", w: 0 },
    { rewardId: "tiny", w: 0 },
  ],
  4: [
    { rewardId: "jackpot", w: 100 },
    { rewardId: "date", w: 0 },
    { rewardId: "gift", w: 0 },
    { rewardId: "kiss", w: 0 },
    { rewardId: "song", w: 0 },
    { rewardId: "tiny", w: 0 },
  ],
  5: [
    { rewardId: "jackpot", w: 100 },
    { rewardId: "date", w: 0 },
    { rewardId: "gift", w: 0 },
    { rewardId: "kiss", w: 0 },
    { rewardId: "song", w: 0 },
    { rewardId: "tiny", w: 0 },
  ],
  6: [
    { rewardId: "jackpot", w: 100 },
    { rewardId: "date", w: 0 },
    { rewardId: "gift", w: 0 },
    { rewardId: "kiss", w: 0 },
    { rewardId: "song", w: 0 },
    { rewardId: "tiny", w: 0 },
  ],
};

function pickWeighted(list: WeightedReward[]): Reward {
  const sum = list.reduce((a, b) => a + Math.max(0, b.w), 0);
  let r = Math.random() * sum;
  for (const it of list) {
    r -= Math.max(0, it.w);
    if (r <= 0) return rewardById(it.rewardId);
  }
  return rewardById(list[list.length - 1].rewardId);
}

type PickState =
  | { picked: false }
  | {
      picked: true;
      box: number;
      rewardId: Reward["id"];
      pickedAt: string;
    };

function loadState(): PickState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { picked: false };
    const parsed = JSON.parse(raw);
    if (!parsed?.picked) return { picked: false };
    return parsed as PickState;
  } catch {
    return { picked: false };
  }
}

function saveState(s: PickState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
}

export default function GiftPickGame() {
  const [state, setState] = useState<PickState>({ picked: false });

  // confetti trigger
  const [burst, setBurst] = useState<{ key: number; x: number; y: number } | null>(null);
  const [openingBox, setOpeningBox] = useState<number | null>(null);

  useEffect(() => {
    setState(loadState());
  }, []);

  const locked = state.picked;

  const pickedReward = useMemo(() => {
    if (!state.picked) return null;
    return rewardById(state.rewardId);
  }, [state]);

  const onPick = (box: number, rect: DOMRect) => {
    if (locked) return;

    setOpeningBox(box);

    // confetti position theo box
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height * 0.35;
    setBurst({ key: Date.now(), x, y });

    // pick reward theo weight của box
    const reward = pickWeighted(BOX_WEIGHTS[box]);

    const next: PickState = {
      picked: true,
      box,
      rewardId: reward.id,
      pickedAt: new Date().toISOString(),
    };

    // delay nhẹ cho cảm giác bật nắp rồi mới hiện popup
    setTimeout(() => {
      setState(next);
      saveState(next);
      setOpeningBox(null);
    }, 550);
  };

  const reset = () => {
    const next: PickState = { picked: false };
    setState(next);
    saveState(next);
  };

  return (
    <div className="relative min-h-[calc(100vh-7rem)] px-4 py-10">
      {/* Header */}
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold"
        >
          🎁 BỐC THĂM NOEL
        </motion.h2>
        <p className="mt-3 text-white/70 text-sm sm:text-base">
          Chọn <span className="font-semibold text-white">1</span> hộp bất kỳ. Mở xong là{" "}
          <span className="font-semibold text-white">không mở lại</span> được nữa nha 😝
        </p>

        {state.picked && (
          <div className="mt-4 text-white/75 text-sm">
            Em đã mở <span className="font-semibold text-white">Hộp #{state.box}</span> rồi.
          </div>
        )}
      </div>

      {/* Grid 6 boxes */}
      <div className="mx-auto max-w-6xl mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-7 place-items-center">
        {Array.from({ length: 6 }).map((_, i) => {
          const boxNo = i + 1;
          const isPicked = state.picked && state.box === boxNo;
          const isOpening = openingBox === boxNo;

          return (
            <GiftBoxTile
              key={boxNo}
              boxNo={boxNo}
              disabled={locked && !isPicked}
              picked={isPicked}
              opening={isOpening}
              onPick={onPick}
            />
          );
        })}
      </div>

      {/* hint + reset */}
      <div className="mx-auto max-w-3xl mt-10 text-center">
        {!state.picked ? (
          <div className="text-white/60 text-sm">
            *Box #1 “ngon” hơn Box #6 đó nha 😏
          </div>
        ) : (
          <button
            onClick={reset}
            className="mt-2 px-5 py-3 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 transition"
          >
            Reset (chỉ dùng khi test)
          </button>
        )}
      </div>

      {/* Confetti burst */}
      {burst && <ConfettiBurst key={burst.key} x={burst.x} y={burst.y} />}

      {/* Result Modal */}
      <AnimatePresence>
        {state.picked && pickedReward && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-[92%] max-w-lg rounded-3xl bg-black/45 border border-white/15 backdrop-blur-md p-6 text-center shadow-[0_30px_140px_rgba(0,0,0,0.55)]"
            >
              <div className="text-5xl">{pickedReward.emoji}</div>
              <div className="mt-3 text-2xl font-extrabold">{pickedReward.title}</div>
              <p className="mt-2 text-white/80 leading-6">{pickedReward.desc}</p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => {}}
                  className="px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:opacity-90"
                >
                  Hí hí biết rồi 💖
                </button>
              </div>

              <p className="mt-3 text-xs text-white/55">
                *Em đã bốc rồi nên các hộp khác bị khóa nha 😝
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
