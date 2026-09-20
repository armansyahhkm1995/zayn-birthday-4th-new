"use client";

import { useState } from "react";

import { BeachPuzzleScreen } from "@/components/screens/beach-puzzle-screen";
import { MemoryAgeOneScreen } from "@/components/screens/memory-age-one-screen";
import { SpacePuzzleScreen } from "@/components/screens/space-puzzle-screen";
import { MemoryAgeTwoScreen } from "@/components/screens/memory-age-two-screen";
import { TeddyPuzzleScreen } from "@/components/screens/teddy-puzzle-screen";
import { MemoryAgeThreeScreen } from "@/components/screens/memory-age-three-screen";
import { FinalPuzzleScreen } from "@/components/screens/final-puzzle-screen";
import { BirthdayRevealScreen } from "@/components/screens/birthday-reveal-screen";

import { SplashScreen } from "@/components/screens/splash-screen";
import { DaddyLetterScreen } from "@/components/screens/daddy-letter-screen";

type GameStage =
  | "splash"
  | "beach-puzzle"
  | "memory-1"
  | "space-puzzle"
  | "memory-2"
  | "teddy-puzzle"
  | "memory-3"
  | "final-puzzle"
  | "reveal"
  | "letter";

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

  if (stage === "memory-2") {
    return <MemoryAgeTwoScreen onContinue={() => setStage("teddy-puzzle")} />;
  }

  if (stage === "teddy-puzzle") {
    return <TeddyPuzzleScreen onSolved={() => setStage("memory-3")} />;
  }

  if (stage === "memory-3") {
    return <MemoryAgeThreeScreen onContinue={() => setStage("final-puzzle")} />;
  }

  if (stage === "final-puzzle") {
    return <FinalPuzzleScreen onReveal={() => setStage("reveal")} />;
  }

  if (stage === "reveal") {
    return <BirthdayRevealScreen onReadLetter={() => setStage("letter")} />;
  }

  return <DaddyLetterScreen onReplay={() => setStage("splash")} />;
}
