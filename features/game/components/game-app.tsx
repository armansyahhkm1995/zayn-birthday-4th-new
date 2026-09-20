"use client";

import { useState } from "react";

import { BeachPuzzleScreen } from "@/components/screens/beach-puzzle-screen";
import { SplashScreen } from "@/components/screens/splash-screen";

type GameStage = "splash" | "beach-puzzle";

export function GameApp() {
  const [stage, setStage] = useState<GameStage>("splash");

  if (stage === "splash") {
    return <SplashScreen onPlay={() => setStage("beach-puzzle")} />;
  }

  return <BeachPuzzleScreen />;
}
