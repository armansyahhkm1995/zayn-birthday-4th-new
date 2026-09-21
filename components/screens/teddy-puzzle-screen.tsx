"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, type PanInfo } from "motion/react";

import { ScreenShell } from "@/components/layout/screen-shell";
import { isPointInsideRect } from "@/features/puzzle/is-point-inside-rect";

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

  const [wrongPiece, setWrongPiece] = useState<PieceId | null>(null);

  const [status, setStatus] = useState<PuzzleStatus>("idle");

  const targetRef = useRef<HTMLSpanElement>(null);

  const selectedPieceData = puzzlePieces.find(
    (piece) => piece.id === selectedPiece,
  );

  useEffect(() => {
    if (status !== "correct") return;

    const timeoutId = window.setTimeout(() => {
      onSolved();
    }, 700);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [status, onSolved]);

  function handlePieceSelect(pieceId: PieceId) {
    if (status === "correct") return;

    setWrongPiece(null);

    if (selectedPiece === pieceId) {
      setSelectedPiece(null);
      setStatus("idle");
      return;
    }

    setSelectedPiece(pieceId);
    setStatus("selected");
  }

  function validatePiece(pieceId: PieceId) {
    if (pieceId === "sitting") {
      setWrongPiece(null);
      setSelectedPiece(pieceId);
      setStatus("correct");
      return;
    }

    setWrongPiece(pieceId);
    setSelectedPiece(null);
    setStatus("wrong");
  }

  function handleTargetSelect() {
    if (!selectedPiece || status === "correct") {
      return;
    }

    validatePiece(selectedPiece);
  }

  function handleDragStart(pieceId: PieceId) {
    if (status === "correct") return;

    setWrongPiece(null);
    setSelectedPiece(pieceId);
    setStatus("selected");
  }

  function handleDragEnd(pieceId: PieceId, info: PanInfo) {
    const target = targetRef.current;

    if (!target) {
      setSelectedPiece(null);
      setStatus("idle");
      return;
    }

    const droppedOnTarget = isPointInsideRect(
      info.point,
      target.getBoundingClientRect(),
      24,
    );

    if (!droppedOnTarget) {
      setWrongPiece(pieceId);
      setSelectedPiece(null);
      setStatus("wrong");
      return;
    }

    validatePiece(pieceId);
  }

  const feedbackMessage = {
    idle: "Ketuk atau tarik potongan ke papan",
    selected: selectedPieceData
      ? `${selectedPieceData.label} dipilih. Ketuk atau lepaskan di lubangnya.`
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
            aria-label={
              status === "correct"
                ? "Papan puzzle teddy lengkap"
                : "Pasang teddy ke papan puzzle"
            }
            disabled={!selectedPiece || status === "correct"}
            onClick={handleTargetSelect}
            className="block w-full rounded-[12px] bg-[#eac99b] p-1.5 transition enabled:ring-4 enabled:ring-blue-500/40 focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default"
          >
            <span className="relative block aspect-[314/280] w-full overflow-hidden rounded-lg">
              <Image
                src="/assets/puzzles/teddy/teddy-board.png"
                alt=""
                fill
                priority
                sizes="314px"
                className={`object-cover ${
                  status === "correct" ? "opacity-0" : "opacity-100"
                }`}
              />

              <Image
                data-testid="teddy-board-completed"
                src="/assets/puzzles/teddy/teddy-board-completed.png"
                alt=""
                fill
                priority
                sizes="314px"
                className={`object-cover ${
                  status === "correct" ? "opacity-100" : "opacity-0"
                }`}
              />

              <span
                ref={targetRef}
                aria-hidden="true"
                className={`pointer-events-none absolute top-[48%] left-[48%] h-[34%] w-[24%] rounded-full ${
                  selectedPiece ? "ring-4 ring-blue-500/50" : ""
                }`}
              />
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

              const isWrong = wrongPiece === piece.id;

              const isCorrectPiece = piece.id === "sitting";

              return (
                <li key={piece.id}>
                  <motion.button
                    type="button"
                    drag={status !== "correct"}
                    dragSnapToOrigin
                    dragMomentum={false}
                    dragElastic={0.08}
                    whileDrag={{
                      scale: 1.08,
                      zIndex: 50,
                    }}
                    dragTransition={{
                      bounceStiffness: 600,
                      bounceDamping: 25,
                    }}
                    animate={
                      isWrong
                        ? {
                            x: [0, -8, 8, -6, 6, 0],
                          }
                        : { x: 0 }
                    }
                    transition={{
                      duration: isWrong ? 0.24 : 0.18,
                    }}
                    aria-label={`Pilih ${piece.label}`}
                    aria-pressed={isSelected}
                    disabled={status === "correct"}
                    onClick={() => handlePieceSelect(piece.id)}
                    onDragStart={() => handleDragStart(piece.id)}
                    onDragEnd={(_, info) => handleDragEnd(piece.id, info)}
                    className={`relative flex h-[82px] w-full touch-none select-none items-center justify-center rounded-2xl border-4 bg-white/90 shadow-card focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default ${
                      status === "correct" && isCorrectPiece
                        ? "pointer-events-none opacity-0"
                        : isSelected
                          ? "scale-105 border-blue-500 ring-4 ring-blue-500/30"
                          : "border-white/70"
                    }`}
                  >
                    <Image
                      src={piece.image}
                      alt=""
                      width={72}
                      height={68}
                      sizes="72px"
                      draggable={false}
                      className="pointer-events-none h-[68px] w-[72px] object-contain"
                    />
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </footer>
      </section>
    </ScreenShell>
  );
}
