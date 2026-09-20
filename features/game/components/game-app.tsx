"use client";

import { useState } from "react";

import { ScreenShell } from "@/components/layout/screen-shell";
import { BeachPuzzleScreen } from "@/components/screens/beach-puzzle-screen";
import { MemoryAgeOneScreen } from "@/components/screens/memory-age-one-screen";
import { SpacePuzzleScreen } from "@/components/screens/space-puzzle-screen";

import { SplashScreen } from "@/components/screens/splash-screen";

type GameStage =
  | "splash"
  | "beach-puzzle"
  | "memory-1"
  | "space-puzzle"
  | "memory-2";

export function GameApp() {
  const [stage, setStage] = useState<GameStage>("splash");

  if (stage === "splash") {
    return <SplashScreen onPlay={() => setStage("beach-puzzle")} />;
  }

  if (stage === "beach-puzzle") {
    return <BeachPuzzleScreen onSolved={() => setStage("memory-1")} />;
  }

  if (stage === "memory-1") {
    return <MemoryAgeOneScreen onContinue={() => setStage("space-puzzle")} />;
  }

  if (stage === "space-puzzle") {
    return <SpacePuzzleScreen onSolved={() => setStage("memory-2")} />;
  }

  return (
    <ScreenShell className="bg-ocean-100">
      <section className="flex min-h-dvh items-center justify-center px-6 text-center sm:min-h-[844px]">
        <h1 className="text-2xl font-extrabold text-navy-900">
          Memory Umur 2 segera dibuka
        </h1>
      </section>
    </ScreenShell>
  );
}
