"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, type PanInfo } from "motion/react";
import { playSound } from "@/lib/audio";
import { ScreenShell } from "@/components/layout/screen-shell";
import { isPointInsideRect } from "@/features/puzzle/is-point-inside-rect";

const puzzlePieces = [
  {
    id: "dad",
    label: "Paus Aba",
    image: "/assets/puzzles/space/space-piece-dad-whale.png",
  },
  {
    id: "mom",
    label: "Paus Umma",
    image: "/assets/puzzles/space/space-piece-mom-whale.png",
  },
  {
    id: "son",
    label: "Paus Zayn",
    image: "/assets/puzzles/space/space-piece-son-whale.png",
  },
] as const;

const boardImages = [
  {
    id: "empty",
    image: "/assets/puzzles/space/space-board.png",
  },
  {
    id: "aba",
    image: "/assets/puzzles/space/space-board-completed-aba.png",
  },
  {
    id: "umma",
    image: "/assets/puzzles/space/space-board-completed-umma.png",
  },
  {
    id: "zayn",
    image: "/assets/puzzles/space/space-board-completed-zayn.png",
  },
  {
    id: "aba-umma",
    image: "/assets/puzzles/space/space-board-completed-aba-umma.png",
  },
  {
    id: "aba-zayn",
    image: "/assets/puzzles/space/space-board-completed-aba-zayn.png",
  },
  {
    id: "umma-zayn",
    image: "/assets/puzzles/space/space-board-completed-umma-zayn.png",
  },
  {
    id: "all",
    image: "/assets/puzzles/space/space-board-completed-all.png",
  },
] as const;

type PieceId = (typeof puzzlePieces)[number]["id"];
type BoardId = (typeof boardImages)[number]["id"];

type SpacePuzzleScreenProps = {
  onSolved: () => void;
};

function getBoardId(placedPieces: PieceId[]): BoardId {
  const hasDad = placedPieces.includes("dad");
  const hasMom = placedPieces.includes("mom");
  const hasSon = placedPieces.includes("son");

  if (hasDad && hasMom && hasSon) return "all";
  if (hasDad && hasMom) return "aba-umma";
  if (hasDad && hasSon) return "aba-zayn";
  if (hasMom && hasSon) return "umma-zayn";
  if (hasDad) return "aba";
  if (hasMom) return "umma";
  if (hasSon) return "zayn";

  return "empty";
}

export function SpacePuzzleScreen({ onSolved }: SpacePuzzleScreenProps) {
  const [selectedPiece, setSelectedPiece] = useState<PieceId | null>(null);

  const [wrongPiece, setWrongPiece] = useState<PieceId | null>(null);

  const [lastPlaced, setLastPlaced] = useState<PieceId | null>(null);

  const [placedPieces, setPlacedPieces] = useState<PieceId[]>([]);

  const dadTargetRef = useRef<HTMLSpanElement>(null);
  const momTargetRef = useRef<HTMLSpanElement>(null);
  const sonTargetRef = useRef<HTMLSpanElement>(null);

  const isCompleted = placedPieces.length === puzzlePieces.length;

  const activeBoardId = getBoardId(placedPieces);

  useEffect(() => {
    if (!isCompleted) return;

    const timeoutId = window.setTimeout(() => {
      onSolved();
    }, 700);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isCompleted, onSolved]);

  function getTargetElement(pieceId: PieceId) {
    if (pieceId === "dad") {
      return dadTargetRef.current;
    }

    if (pieceId === "mom") {
      return momTargetRef.current;
    }

    return sonTargetRef.current;
  }

  function getPieceLabel(pieceId: PieceId | null) {
    return puzzlePieces.find((piece) => piece.id === pieceId)?.label;
  }

  function placePiece(pieceId: PieceId) {
    if (placedPieces.includes(pieceId)) return;

    playSound("correct");

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

    if (!droppedOnTarget) {
      playSound("wrong");

      setWrongPiece(pieceId);
      setSelectedPiece(null);
      setLastPlaced(null);
      return;
    }

    setWrongPiece(pieceId);
    setSelectedPiece(null);
    setLastPlaced(null);

    if (droppedOnTarget) {
      placePiece(pieceId);
      return;
    }

    playSound("wrong");

    setWrongPiece(pieceId);
    setSelectedPiece(null);
    setLastPlaced(null);
  }

  function getFeedbackMessage() {
    if (isCompleted) {
      return "Semua keluarga paus sudah terpasang!";
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

    return "Masukin satu satu sesuai tempatnya ya";
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
            PUZZLE 02
          </p>

          <h1 className="mx-auto mt-3 max-w-[310px] text-[20px] leading-tight font-extrabold">
            Keluarga pausnya lagi jalan-jalan di luar angkasa nih, bantu cari
            Aba, Umma sama anak pausnya yuk
          </h1>
        </header>

        <div className="mx-auto mt-[72px] w-full max-w-[323px] rounded-[18px] bg-[#a76631] p-[10px] pb-2 shadow-piece">
          <button
            type="button"
            aria-label="Pasang potongan ke papan luar angkasa"
            disabled={!selectedPiece || isCompleted}
            onClick={handleTargetSelect}
            className="block w-full rounded-[12px] bg-[#eac99b] p-2 transition enabled:ring-4 enabled:ring-blue-500/40 focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default"
          >
            <span className="relative block aspect-[295/207] w-full overflow-hidden rounded-lg">
              {boardImages.map((board) => (
                <Image
                  key={board.id}
                  data-testid={`space-board-${board.id}`}
                  src={board.image}
                  alt=""
                  fill
                  priority
                  sizes="295px"
                  className={`object-cover ${
                    activeBoardId === board.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              <span
                ref={dadTargetRef}
                aria-hidden="true"
                className={`pointer-events-none absolute top-[6%] left-[34%] h-[46%] w-[52%] rounded-full ${
                  selectedPiece === "dad" ? "ring-4 ring-blue-500/50" : ""
                }`}
              />

              <span
                ref={momTargetRef}
                aria-hidden="true"
                className={`pointer-events-none absolute top-[43%] left-[8%] h-[50%] w-[48%] rounded-full ${
                  selectedPiece === "mom" ? "ring-4 ring-blue-500/50" : ""
                }`}
              />

              <span
                ref={sonTargetRef}
                aria-hidden="true"
                className={`pointer-events-none absolute top-[58%] left-[58%] h-[35%] w-[35%] rounded-full ${
                  selectedPiece === "son" ? "ring-4 ring-blue-500/50" : ""
                }`}
              />
            </span>
          </button>

          <p className="pt-2 text-center text-[8px] font-bold tracking-wide text-[#f2d7b5]">
            KELUARGA PAUS LAGI LIBURAN DI LUAR ANGKASA
          </p>
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

          <ul
            aria-label="Potongan puzzle luar angkasa"
            className="grid grid-cols-3 gap-3"
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
                    disabled={isPlaced || isCompleted}
                    onClick={() => handlePieceSelect(piece.id)}
                    onDragStart={() => handleDragStart(piece.id)}
                    onDragEnd={(_, info) => handleDragEnd(piece.id, info)}
                    className={`relative flex h-[82px] w-full touch-none select-none items-center justify-center rounded-2xl border-4 bg-white/90 shadow-card focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default ${
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
