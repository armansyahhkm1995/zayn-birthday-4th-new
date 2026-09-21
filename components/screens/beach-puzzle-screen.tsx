"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, type PanInfo } from "motion/react";
import { isPointInsideRect } from "@/features/puzzle/is-point-inside-rect";
import { playSound } from "@/lib/audio";

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

  const targetRef = useRef<HTMLSpanElement>(null);

  const [wrongPiece, setWrongPiece] = useState<PieceId | null>(null);

  function handleTargetSelect() {
    if (!selectedPiece || status === "correct") {
      return;
    }

    if (selectedPiece === "whale") {
      setWrongPiece(null);
      playSound("correct");
      setStatus("correct");
      return;
    }
    setWrongPiece(selectedPiece);
    setSelectedPiece(null);
    playSound("wrong");
    setStatus("wrong");
  }

  function handleDragStart(pieceId: PieceId) {
    if (status === "correct") {
      return;
    }

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

    if (pieceId === "whale") {
      setWrongPiece(null);
      setSelectedPiece(pieceId);
      setStatus("correct");
      return;
    }

    setWrongPiece(pieceId);
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
            aria-label={
              status === "correct"
                ? "Papan puzzle keluarga paus lengkap"
                : "Pasang potongan ke papan puzzle"
            }
            disabled={!selectedPiece || status === "correct"}
            onClick={handleTargetSelect}
            className="block w-full rounded-[12px] bg-[#eac99b] p-2 transition enabled:ring-4 enabled:ring-blue-500/40 enabled:hover:scale-[1.01] focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default"
          >
            <span className="relative block aspect-[295/207] w-full overflow-hidden rounded-lg">
              <Image
                src="/assets/puzzles/beach/beach-board.png"
                alt=""
                fill
                priority
                sizes="295px"
                className={`object-cover ${
                  status === "correct" ? "opacity-0" : "opacity-100"
                }`}
              />

              <Image
                data-testid="beach-board-completed"
                src="/assets/puzzles/beach/beach-board-completed.png"
                alt=""
                fill
                priority
                sizes="295px"
                className={`object-cover ${
                  status === "correct" ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
            <span
              ref={targetRef}
              data-testid="beach-drop-target"
              aria-hidden="true"
              className={`pointer-events-none absolute left-[40%] top-[28%] h-[32%] w-[28%] rounded-full ${
                selectedPiece ? "ring-4 ring-blue-500/40" : ""
              }`}
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
                      status === "wrong" && wrongPiece === piece.id
                        ? {
                            x: [0, -8, 8, -6, 6, 0],
                          }
                        : {
                            x: 0,
                          }
                    }
                    transition={{
                      duration:
                        status === "wrong" && wrongPiece === piece.id
                          ? 0.24
                          : 0.18,
                    }}
                    aria-label={`Pilih ${piece.label}`}
                    aria-pressed={isSelected}
                    disabled={status === "correct"}
                    onClick={() => handlePieceSelect(piece.id)}
                    onDragStart={() => handleDragStart(piece.id)}
                    onDragEnd={(_, info) => handleDragEnd(piece.id, info)}
                    className={`relative flex h-[81px] w-full touch-none select-none items-center justify-center rounded-2xl border-4 bg-white/90 shadow-card focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default ${
                      status === "correct" && piece.id === "whale"
                        ? "opacity-0"
                        : isSelected
                          ? "scale-105 border-blue-500 ring-4 ring-blue-500/30"
                          : "border-white/70"
                    }`}
                  >
                    <Image
                      src={piece.image}
                      alt=""
                      width={90}
                      height={72}
                      sizes="90px"
                      draggable={false}
                      className="pointer-events-none h-[72px] w-[90px] object-contain"
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
