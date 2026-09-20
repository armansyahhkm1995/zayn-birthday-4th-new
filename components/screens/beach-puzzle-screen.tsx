"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { ScreenShell } from "@/components/layout/screen-shell";

const puzzlePieces = [
  {
    id: "octopus",
    label: "Gurita",
    image: "/assets/puzzles/beach/beach-piece-octopus.png",
  },
  {
    id: "whale",
    label: "Anak paus",
    image: "/assets/puzzles/beach/beach-piece-whale.png",
  },
  {
    id: "seaweed",
    label: "Rumput laut",
    image: "/assets/puzzles/beach/beach-piece-seaweed.png",
  },
] as const;

type PieceId = (typeof puzzlePieces)[number]["id"];

type PuzzleStatus = "idle" | "selected" | "wrong" | "correct";

type BeachPuzzleScreenProps = {
  onSolved: () => void;
};

export function BeachPuzzleScreen({ onSolved }: BeachPuzzleScreenProps) {
  const [selectedPiece, setSelectedPiece] = useState<PieceId | null>(null);

  const [status, setStatus] = useState<PuzzleStatus>("idle");

  const selectedPieceData = puzzlePieces.find(
    (piece) => piece.id === selectedPiece,
  );

  useEffect(() => {
    if (status !== "correct") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onSolved();
    }, 700);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [status, onSolved]);

  function handlePieceSelect(pieceId: PieceId) {
    if (status === "correct") {
      return;
    }

    if (selectedPiece === pieceId) {
      setSelectedPiece(null);
      setStatus("idle");
      return;
    }

    setSelectedPiece(pieceId);
    setStatus("selected");
  }

  function handleTargetSelect() {
    if (!selectedPiece || status === "correct") {
      return;
    }

    if (selectedPiece === "whale") {
      setStatus("correct");
      return;
    }

    setSelectedPiece(null);
    setStatus("wrong");
  }

  const feedbackMessage = {
    idle: "Yang mana puzzle anak pausnya?",
    selected: selectedPieceData
      ? `${selectedPieceData.label} dipilih. Ketuk papan puzzle.`
      : "",
    wrong: "Belum tepat. Coba pilih lagi ya!",
    correct: "Hebat! Anak pausnya ketemu!",
  }[status];

  const feedbackColor = {
    idle: "text-navy-900",
    selected: "text-blue-500",
    wrong: "text-coral-500",
    correct: "text-green-500",
  }[status];

  return (
    <ScreenShell className="bg-ocean-500">
      <Image
        src="/assets/backgrounds/underwater-content.png"
        alt=""
        fill
        priority
        sizes="390px"
        className="object-cover"
      />

      <section className="relative z-10 flex min-h-dvh flex-col px-4 pt-16 pb-16 sm:min-h-[844px]">
        <header className="text-center text-navy-900">
          <p className="inline-flex min-h-8 items-center rounded-full bg-yellow-500 px-4 text-xs font-extrabold">
            PUZZLE 01
          </p>

          <h1 className="mx-auto mt-3 max-w-[300px] text-[22px] leading-tight font-extrabold">
            Bisa cari mana anak pausnya Zayn?
          </h1>
        </header>

        <div className="mx-auto mt-[105px] w-full max-w-[323px] rounded-[18px] bg-[#a76631] p-[10px] pb-2 shadow-piece">
          <button
            type="button"
            aria-label="Pasang potongan ke papan puzzle"
            disabled={!selectedPiece || status === "correct"}
            onClick={handleTargetSelect}
            className="block w-full rounded-[12px] bg-[#eac99b] p-2 transition enabled:ring-4 enabled:ring-blue-500/40 enabled:hover:scale-[1.01] focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default"
          >
            <Image
              src="/assets/puzzles/beach/beach-board.png"
              alt=""
              width={295}
              height={207}
              sizes="295px"
              className="h-auto w-full rounded-lg object-cover"
            />
          </button>

          <p className="pt-2 text-center text-[9px] font-bold tracking-wide text-[#f2d7b5]">
            KELUARGA PAUS
          </p>
        </div>

        <footer className="mt-auto">
          <p
            role="status"
            className={`mb-3 min-h-4 text-center text-[11px] font-extrabold ${feedbackColor}`}
          >
            {feedbackMessage}
          </p>

          <ul
            aria-label="Pilihan potongan puzzle"
            className="grid grid-cols-3 gap-3"
          >
            {puzzlePieces.map((piece) => {
              const isSelected = selectedPiece === piece.id;

              return (
                <li key={piece.id}>
                  <button
                    type="button"
                    aria-label={`Pilih ${piece.label}`}
                    aria-pressed={isSelected}
                    disabled={status === "correct"}
                    onClick={() => handlePieceSelect(piece.id)}
                    className={`flex h-[81px] w-full items-center justify-center rounded-2xl border-4 bg-white/90 shadow-card transition focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default ${
                      isSelected
                        ? "scale-105 border-blue-500 ring-4 ring-blue-500/30"
                        : "border-white/70 active:scale-95"
                    }`}
                  >
                    <Image
                      src={piece.image}
                      alt=""
                      width={90}
                      height={72}
                      sizes="90px"
                      className="h-[72px] w-[90px] object-contain"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </footer>
      </section>
    </ScreenShell>
  );
}
