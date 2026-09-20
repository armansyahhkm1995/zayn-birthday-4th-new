"use client";

import { useState } from "react";

import { ScreenShell } from "@/components/layout/screen-shell";
import { SplashScreen } from "@/components/screens/splash-screen";

type GameStage = "splash" | "beach-puzzle";

export function GameApp() {
  const [stage, setStage] = useState<GameStage>("splash");

  if (stage === "splash") {
    return <SplashScreen onPlay={() => setStage("beach-puzzle")} />;
  }

  return (
    <ScreenShell className="bg-ocean-100">
      <section className="flex min-h-dvh flex-col items-center justify-center px-6 text-center sm:min-h-[844px]">
        <p className="mb-3 rounded-full bg-yellow-500 px-4 py-2 text-xs font-extrabold text-navy-900">
          PUZZLE 01
        </p>

        <h1 className="text-2xl font-extrabold text-navy-900">
          Bisa cari mana anak pausnya Zayn?
        </h1>

        <p className="mt-4 text-sm font-medium text-ocean-700">
          Area puzzle akan kita buat berikutnya.
        </p>
      </section>
    </ScreenShell>
  );
}
