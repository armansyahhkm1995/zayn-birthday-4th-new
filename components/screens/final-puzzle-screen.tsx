"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, type PanInfo } from "motion/react";

import { ScreenShell } from "@/components/layout/screen-shell";
import { isPointInsideRect } from "@/features/puzzle/is-point-inside-rect";

const puzzlePieces = [
  {
    id: "p01",
    label: "Keping 1",
    image: "/assets/puzzles/final/final-piece-01.png",
  },
  {
    id: "p02",
    label: "Keping 2",
    image: "/assets/puzzles/final/final-piece-02.png",
  },
  {
    id: "p03",
    label: "Keping 3",
    image: "/assets/puzzles/final/final-piece-03.png",
  },
  {
    id: "p04",
    label: "Keping 4",
    image: "/assets/puzzles/final/final-piece-04.png",
  },
  {
    id: "p05",
    label: "Keping 5",
    image: "/assets/puzzles/final/final-piece-05.png",
  },
  {
    id: "p06",
    label: "Keping 6",
    image: "/assets/puzzles/final/final-piece-06.png",
  },
] as const;

type PieceId = (typeof puzzlePieces)[number]["id"];

type FinalPuzzleScreenProps = {
  onReveal: () => void;
};

function getBoardState(pieceIds: PieceId[]) {
  const sortedPieces = [...pieceIds].sort();

  if (sortedPieces.length === 0) {
    return {
      id: "empty",
      image: "/assets/puzzles/final/final-board-empty.png",
    };
  }

  if (sortedPieces.length === puzzlePieces.length) {
    return {
      id: "complete",
      image: "/assets/puzzles/final/final-board-complete.png",
    };
  }

  const suffix = sortedPieces.join("-");

  return {
    id: suffix,
    image: `/assets/puzzles/final/final-board-${suffix}.png`,
  };
}

export function FinalPuzzleScreen({ onReveal }: FinalPuzzleScreenProps) {
  const [selectedPiece, setSelectedPiece] = useState<PieceId | null>(null);

  const [wrongPiece, setWrongPiece] = useState<PieceId | null>(null);

  const [lastPlaced, setLastPlaced] = useState<PieceId | null>(null);

  const [placedPieces, setPlacedPieces] = useState<PieceId[]>([]);

  const target01Ref = useRef<HTMLSpanElement>(null);
  const target02Ref = useRef<HTMLSpanElement>(null);
  const target03Ref = useRef<HTMLSpanElement>(null);
  const target04Ref = useRef<HTMLSpanElement>(null);
  const target05Ref = useRef<HTMLSpanElement>(null);
  const target06Ref = useRef<HTMLSpanElement>(null);

  const isCompleted = placedPieces.length === puzzlePieces.length;

  const activeBoard = getBoardState(placedPieces);

  const remainingPieces = puzzlePieces.filter(
    (piece) => !placedPieces.includes(piece.id),
  );

  const boardsToPreload = [
    activeBoard,
    ...remainingPieces.map((piece) =>
      getBoardState([...placedPieces, piece.id]),
    ),
  ].filter(
    (board, index, boards) =>
      boards.findIndex((candidate) => candidate.id === board.id) === index,
  );

  const targets = [
    {
      id: "p01",
      ref: target01Ref,
      position: "top-[3.6%] left-[5%] h-[35.2%] w-[50.9%]",
    },
    {
      id: "p02",
      ref: target02Ref,
      position: "top-[3.6%] left-[50%] h-[30.9%] w-[45%]",
    },
    {
      id: "p03",
      ref: target03Ref,
      position: "top-[34.5%] left-[5%] h-[30.9%] w-[45%]",
    },
    {
      id: "p04",
      ref: target04Ref,
      position: "top-[30.2%] left-[44%] h-[39.5%] w-[50.9%]",
    },
    {
      id: "p05",
      ref: target05Ref,
      position: "top-[61.1%] left-[5%] h-[35.2%] w-[50.9%]",
    },
    {
      id: "p06",
      ref: target06Ref,
      position: "top-[65.4%] left-[50%] h-[30.9%] w-[45%]",
    },
  ] as const;

  function getTargetElement(pieceId: PieceId) {
    return targets.find((target) => target.id === pieceId)?.ref.current;
  }

  function getPieceLabel(pieceId: PieceId | null) {
    return puzzlePieces.find((piece) => piece.id === pieceId)?.label;
  }

  function placePiece(pieceId: PieceId) {
    if (placedPieces.includes(pieceId)) return;

    setPlacedPieces((currentPieces) => [...currentPieces, pieceId]);

    setSelectedPiece(null);
    setWrongPiece(null);
    setLastPlaced(pieceId);
  }

  function handlePieceSelect(pieceId: PieceId) {
    if (isCompleted || placedPieces.includes(pieceId)) {
      return;
    }

    setWrongPiece(null);
    setLastPlaced(null);

    setSelectedPiece((currentPiece) =>
      currentPiece === pieceId ? null : pieceId,
    );
  }

  function handleTargetSelect() {
    if (!selectedPiece || isCompleted) return;

    placePiece(selectedPiece);
  }

  function handleDragStart(pieceId: PieceId) {
    if (isCompleted || placedPieces.includes(pieceId)) {
      return;
    }

    setWrongPiece(null);
    setLastPlaced(null);
    setSelectedPiece(pieceId);
  }

  function handleDragEnd(pieceId: PieceId, info: PanInfo) {
    const target = getTargetElement(pieceId);

    if (!target) {
      setSelectedPiece(null);
      return;
    }

    const droppedOnTarget = isPointInsideRect(
      info.point,
      target.getBoundingClientRect(),
      24,
    );

    if (droppedOnTarget) {
      placePiece(pieceId);
      return;
    }

    setWrongPiece(pieceId);
    setSelectedPiece(null);
    setLastPlaced(null);
  }

  function getFeedbackMessage() {
    if (isCompleted) {
      return "Semua keping sudah terpasang!";
    }

    if (wrongPiece) {
      return `${getPieceLabel(wrongPiece)} belum pas. Coba lagi ya!`;
    }

    if (selectedPiece) {
      return `${getPieceLabel(selectedPiece)} dipilih. Ketuk atau lepaskan di lubangnya.`;
    }

    if (lastPlaced) {
      return `${getPieceLabel(lastPlaced)} sudah terpasang!`;
    }

    return "Yuk kita susun puzzlenya satu satu";
  }

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
            <span className="relative block size-full overflow-hidden">
              {boardsToPreload.map((board) => (
                <Image
                  key={board.id}
                  data-testid={`final-board-${board.id}`}
                  src={board.image}
                  alt=""
                  fill
                  priority
                  sizes="224px"
                  className={`object-contain ${
                    activeBoard.id === board.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {targets.map((target) => (
                <span
                  key={target.id}
                  ref={target.ref}
                  aria-hidden="true"
                  className={`pointer-events-none absolute rounded-2xl ${target.position} ${
                    selectedPiece === target.id ? "ring-4 ring-blue-500/60" : ""
                  }`}
                />
              ))}
            </span>
          </button>
        </div>

        <footer className="mt-auto">
          <p
            role="status"
            className={`mb-3 min-h-4 text-center text-[11px] font-extrabold ${
              isCompleted
                ? "text-green-500"
                : wrongPiece
                  ? "text-coral-500"
                  : selectedPiece
                    ? "text-blue-500"
                    : "text-navy-900"
            }`}
          >
            {getFeedbackMessage()}
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

                const isWrong = wrongPiece === piece.id;

                return (
                  <li key={piece.id}>
                    <motion.button
                      type="button"
                      drag={!isPlaced && !isCompleted}
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
                      aria-label={
                        isPlaced
                          ? `${piece.label} sudah terpasang`
                          : `Pilih ${piece.label}`
                      }
                      aria-pressed={isSelected}
                      disabled={isPlaced}
                      onClick={() => handlePieceSelect(piece.id)}
                      onDragStart={() => handleDragStart(piece.id)}
                      onDragEnd={(_, info) => handleDragEnd(piece.id, info)}
                      className={`relative flex h-[88px] w-full touch-none select-none items-center justify-center rounded-2xl border-4 bg-white/90 shadow-card focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default ${
                        isPlaced
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
                        height={72}
                        sizes="72px"
                        draggable={false}
                        className="pointer-events-none size-[72px] object-contain"
                      />
                    </motion.button>
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
