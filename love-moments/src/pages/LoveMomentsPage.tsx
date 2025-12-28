import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import MidAutumnPage from "./midautumn/MidAutumnPage";
import ChristmasPage from "./christmas/ChristmasPage";

type Tab = "midautumn" | "christmas";

export default function LoveMomentsPage() {
  const [tab, setTab] = useState<Tab>("midautumn");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* TAB BAR */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999]">
        <div className="flex gap-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 p-1 shadow-lg">
          <TabButton active={tab === "midautumn"} onClick={() => setTab("midautumn")}>
            🌕 Trung Thu
          </TabButton>
          <TabButton active={tab === "christmas"} onClick={() => setTab("christmas")}>
            🎄 Giáng Sinh
          </TabButton>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <AnimatePresence mode="wait">
        {tab === "midautumn" ? (
          <motion.div
            key="midautumn"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
          >
            <MidAutumnPage />
          </motion.div>
        ) : (
          <motion.div
            key="christmas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
          >
            <ChristmasPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-full text-sm font-semibold transition-all",
        active ? "bg-white text-black shadow" : "text-white/80 hover:text-white hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
