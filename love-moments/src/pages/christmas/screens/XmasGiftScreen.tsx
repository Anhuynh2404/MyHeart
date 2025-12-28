import GiftBox from "../components/GiftBox";

export default function XmasGiftScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-6 items-start">
        <div className="rounded-3xl bg-black/40 border border-white/15 backdrop-blur-md p-6">
          <h2 className="text-2xl font-extrabold">🎁 Hộp quà Noel</h2>
          <p className="mt-2 text-white/75 text-sm leading-6">
            Nhấn vào hộp quà để mở. Nắp bật lên + pháo giấy/nhũ sao bay ra (giống ảnh 2).
          </p>

          <button
            onClick={onBack}
            className="mt-6 w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15"
          >
            ← Quay lại Lá thư
          </button>
        </div>

        <div className="rounded-3xl bg-black/40 border border-white/15 backdrop-blur-md p-6 flex items-center justify-center">
          <GiftBox />
        </div>
      </div>
    </div>
  );
}
