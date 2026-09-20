"use client";

import Image from "next/image";
import { useState } from "react";

import { ScreenShell } from "@/components/layout/screen-shell";

const puzzlePieces = [
  {
    id: "piece-01",
    label: "Keping 1",
    image: "/assets/puzzles/final/final-piece-01.png",
    placement: {
      left: "5%",
      top: "3.6%",
      width: "50.9%",
      height: "35.2%",
    },
  },
  {
    id: "piece-02",
    label: "Keping 2",
    image: "/assets/puzzles/final/final-piece-02.png",
    placement: {
      left: "50%",
      top: "3.6%",
      width: "45%",
      height: "30.9%",
    },
  },
  {
    id: "piece-03",
    label: "Keping 3",
    image: "/assets/puzzles/final/final-piece-03.png",
    placement: {
      left: "5%",
      top: "34.5%",
      width: "45%",
      height: "30.9%",
    },
  },
  {
    id: "piece-04",
    label: "Keping 4",
    image: "/assets/puzzles/final/final-piece-04.png",
    placement: {
      left: "44%",
      top: "30.2%",
      width: "50.9%",
      height: "39.5%",
    },
  },
  {
    id: "piece-05",
    label: "Keping 5",
    image: "/assets/puzzles/final/final-piece-05.png",
    placement: {
      left: "5%",
      top: "61.1%",
      width: "50.9%",
      height: "35.2%",
    },
  },
  {
    id: "piece-06",
    label: "Keping 6",
    image: "/assets/puzzles/final/final-piece-06.png",
    placement: {
      left: "50%",
      top: "65.4%",
      width: "45%",
      height: "30.9%",
    },
  },
] as const;

type PieceId = (typeof puzzlePieces)[number]["id"];

type FinalPuzzleScreenProps = {
  onReveal: () => void;
};

export function FinalPuzzleScreen({ onReveal }: FinalPuzzleScreenProps) {
  const [selectedPiece, setSelectedPiece] = useState<PieceId | null>(null);

  const [placedPieces, setPlacedPieces] = useState<PieceId[]>([]);

  const isCompleted = placedPieces.length === puzzlePieces.length;

  const selectedPieceData = puzzlePieces.find(
    (piece) => piece.id === selectedPiece,
  );

  function handlePieceSelect(pieceId: PieceId) {
    if (placedPieces.includes(pieceId)) {
      return;
    }

    setSelectedPiece((currentPiece) =>
      currentPiece === pieceId ? null : pieceId,
    );
  }

  function handleTargetSelect() {
    if (!selectedPiece || isCompleted) {
      return;
    }

    setPlacedPieces([...placedPieces, selectedPiece]);

    setSelectedPiece(null);
  }

  const feedbackMessage = isCompleted
    ? "Semua keping sudah terpasang!"
    : selectedPieceData
      ? `${selectedPieceData.label} dipilih. Ketuk papan puzzle.`
      : "Yuk kita susun puzzlenya satu satu";

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
            {isCompleted ? "SELESAI!" : "PUZZLE TERAKHIR"}
          </p>

          <h1 className="mx-auto mt-3 text-[22px] leading-tight font-extrabold">
            {isCompleted ? "Puzzle lengkap!" : "Ayo satu puzzle lagi!"}
          </h1>
        </header>

        <div className="mx-auto mt-5">
          <button
            type="button"
            aria-label={
              isCompleted
                ? "Puzzle foto lengkap"
                : "Pasang keping ke papan puzzle terakhir"
            }
            disabled={!selectedPiece || isCompleted}
            onClick={handleTargetSelect}
            className="relative block h-[310px] w-[224px] transition enabled:ring-4 enabled:ring-blue-500/40 focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default"
          >
            <Image
              src={
                isCompleted
                  ? "/assets/puzzles/final/final-board-complete.png"
                  : "/assets/puzzles/final/final-board.png"
              }
              alt=""
              width={224}
              height={310}
              sizes="224px"
              className="h-full w-full object-contain"
            />

            {!isCompleted &&
              puzzlePieces.map((piece) => {
                if (!placedPieces.includes(piece.id)) {
                  return null;
                }

                return (
                  <span
                    key={piece.id}
                    className="absolute"
                    style={piece.placement}
                  >
                    <Image
                      src={piece.image}
                      alt=""
                      fill
                      sizes="114px"
                      className="object-contain"
                    />
                  </span>
                );
              })}
          </button>
        </div>

        <footer className="mt-auto">
          <p
            role="status"
            className={`mb-3 min-h-4 text-center text-[11px] font-extrabold ${
              isCompleted
                ? "text-green-500"
                : selectedPiece
                  ? "text-blue-500"
                  : "text-navy-900"
            }`}
          >
            {feedbackMessage}
          </p>

          {isCompleted ? (
            <button
              type="button"
              onClick={onReveal}
              className="min-h-16 w-full rounded-full bg-yellow-500 px-6 text-base font-extrabold text-navy-900 shadow-piece transition-transform active:scale-[0.97]"
            >
              LIHAT KEJUTANNYA
            </button>
          ) : (
            <ul
              aria-label="Keping puzzle terakhir"
              className="grid grid-cols-3 gap-2"
            >
              {puzzlePieces.map((piece) => {
                const isSelected = selectedPiece === piece.id;

                const isPlaced = placedPieces.includes(piece.id);

                return (
                  <li key={piece.id}>
                    <button
                      type="button"
                      aria-label={
                        isPlaced
                          ? `${piece.label} sudah terpasang`
                          : `Pilih ${piece.label}`
                      }
                      aria-pressed={isSelected}
                      disabled={isPlaced}
                      onClick={() => handlePieceSelect(piece.id)}
                      className={`flex h-[88px] w-full items-center justify-center rounded-2xl border-4 bg-white/90 shadow-card transition focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default ${
                        isPlaced
                          ? "border-green-500 opacity-50"
                          : isSelected
                            ? "scale-105 border-blue-500 ring-4 ring-blue-500/30"
                            : "border-white/70 active:scale-95"
                      }`}
                    >
                      <Image
                        src={piece.image}
                        alt=""
                        width={72}
                        height={72}
                        sizes="72px"
                        className="size-[72px] object-contain"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </footer>
      </section>
    </ScreenShell>
  );
}
