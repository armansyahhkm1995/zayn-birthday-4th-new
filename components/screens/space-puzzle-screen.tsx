"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ScreenShell } from "@/components/layout/screen-shell";

const puzzlePieces = [
  {
    id: "star-whale",
    label: "Paus bintang",
    image: "/assets/puzzles/space/space-piece-dad-whale.png",
    placement: "left-[4%] top-[2%] h-[82px] w-[130px]",
  },
  {
    id: "planet-whale",
    label: "Paus planet",
    image: "/assets/puzzles/space/space-piece-mom-whale.png",
    placement: "left-[14%] top-[43%] h-[82px] w-[110px]",
  },
  {
    id: "wing-whale",
    label: "Paus bersayap",
    image: "/assets/puzzles/space/space-piece-son-whale.png",
    placement: "right-[8%] top-[48%] h-[78px] w-[100px]",
  },
] as const;

type PieceId = (typeof puzzlePieces)[number]["id"];

type SpacePuzzleScreenProps = {
  onSolved: () => void;
};

export function SpacePuzzleScreen({ onSolved }: SpacePuzzleScreenProps) {
  const [selectedPiece, setSelectedPiece] = useState<PieceId | null>(null);

  const [placedPieces, setPlacedPieces] = useState<PieceId[]>([]);

  const isCompleted = placedPieces.length === puzzlePieces.length;

  const selectedPieceData = puzzlePieces.find(
    (piece) => piece.id === selectedPiece,
  );

  useEffect(() => {
    if (!isCompleted) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onSolved();
    }, 700);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isCompleted, onSolved]);

  function handlePieceSelect(pieceId: PieceId) {
    if (isCompleted || placedPieces.includes(pieceId)) {
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
    ? "Semua keluarga paus sudah terpasang!"
    : selectedPieceData
      ? `${selectedPieceData.label} dipilih. Ketuk papan puzzle.`
      : "Masukin satu satu sesuai tempatnya ya";

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
            <span className="relative block">
              <Image
                src="/assets/puzzles/space/space-board.png"
                alt=""
                width={295}
                height={207}
                sizes="295px"
                className="h-auto w-full rounded-lg object-cover"
              />

              {puzzlePieces.map((piece) => {
                const isPlaced = placedPieces.includes(piece.id);

                if (!isPlaced) {
                  return null;
                }

                return (
                  <Image
                    key={piece.id}
                    src={piece.image}
                    alt=""
                    width={130}
                    height={82}
                    sizes="130px"
                    className={`absolute object-contain ${piece.placement}`}
                  />
                );
              })}
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
                : selectedPiece
                  ? "text-blue-500"
                  : "text-navy-900"
            }`}
          >
            {feedbackMessage}
          </p>

          <ul
            aria-label="Potongan puzzle luar angkasa"
            className="grid grid-cols-3 gap-3"
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
                    disabled={isPlaced || isCompleted}
                    onClick={() => handlePieceSelect(piece.id)}
                    className={`flex h-[82px] w-full items-center justify-center rounded-2xl border-4 bg-white/90 shadow-card transition focus-visible:outline-4 focus-visible:outline-blue-500 disabled:cursor-default ${
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
