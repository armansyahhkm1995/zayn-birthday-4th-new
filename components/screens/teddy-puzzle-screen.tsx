"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ScreenShell } from "@/components/layout/screen-shell";

const puzzlePieces = [
  {
    id: "sitting",
    label: "Teddy duduk",
    image: "/assets/puzzles/teddy/teddy-piece-sitting.png",
  },
  {
    id: "waving",
    label: "Teddy melambaikan tangan",
    image: "/assets/puzzles/teddy/teddy-piece-waving.png",
  },
  {
    id: "cheering",
    label: "Teddy bersorak",
    image: "/assets/puzzles/teddy/teddy-piece-cheering.png",
  },
] as const;

type PieceId = (typeof puzzlePieces)[number]["id"];

type PuzzleStatus = "idle" | "selected" | "wrong" | "correct";

type TeddyPuzzleScreenProps = {
  onSolved: () => void;
};

export function TeddyPuzzleScreen({ onSolved }: TeddyPuzzleScreenProps) {
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

    if (selectedPiece === "sitting") {
      setStatus("correct");
      return;
    }

    setSelectedPiece(null);
    setStatus("wrong");
  }

  const feedbackMessage = {
    idle: "Ketuk potongan untuk masuk ke papan",
    selected: selectedPieceData
      ? `${selectedPieceData.label} dipilih. Ketuk papan puzzle.`
      : "",
    wrong: "Belum cocok. Coba teddy yang lain ya!",
    correct: "Hebat! Potongannya cocok!",
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
            PUZZLE 03
          </p>

          <h1 className="mx-auto mt-4 max-w-[320px] text-[22px] leading-tight font-extrabold">
            Cocokkan potongannya
          </h1>
        </header>

        <div className="mx-auto mt-[78px] w-full max-w-[342px] rounded-[18px] bg-[#a76631] p-[10px] pb-2 shadow-piece">
          <button
            type="button"
            aria-label="Pasang teddy ke papan puzzle"
            disabled={!selectedPiece || status === "correct"}
            onClick={handleTargetSelect}
            className="block w-full rounded-[12px] bg-[#eac99b] p-1.5 transition enabled:ring-4 enabled:ring-blue-500/40 focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default"
          >
            <span className="relative block">
              <Image
                src="/assets/puzzles/teddy/teddy-board.png"
                alt=""
                width={314}
                height={280}
                sizes="314px"
                className="h-auto w-full rounded-lg object-cover"
              />

              {status === "correct" && (
                <Image
                  src="/assets/puzzles/teddy/teddy-piece-sitting.png"
                  alt=""
                  width={48}
                  height={54}
                  sizes="48px"
                  className="absolute left-[48%] top-[50%] h-[54px] w-[48px] object-contain"
                />
              )}
            </span>
          </button>

          <p className="pt-2 text-center text-[8px] font-bold tracking-wide text-[#f2d7b5]">
            CERITA SEBELUM TIDUR KELUARGA PAUS
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
            aria-label="Pilihan potongan teddy"
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
                    className={`flex h-[82px] w-full items-center justify-center rounded-2xl border-4 bg-white/90 shadow-card transition focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default ${
                      isSelected
                        ? "scale-105 border-blue-500 ring-4 ring-blue-500/30"
                        : "border-white/70 active:scale-95"
                    }`}
                  >
                    <Image
                      src={piece.image}
                      alt=""
                      width={72}
                      height={68}
                      sizes="72px"
                      className="h-[68px] w-[72px] object-contain"
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
