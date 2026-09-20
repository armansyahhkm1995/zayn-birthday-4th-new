import Image from "next/image";

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

export function BeachPuzzleScreen() {
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
          <div className="rounded-[12px] bg-[#eac99b] p-2">
            <Image
              src="/assets/puzzles/beach/beach-board.png"
              alt="Papan puzzle keluarga paus"
              width={295}
              height={207}
              sizes="295px"
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>

          <p className="pt-2 text-center text-[9px] font-bold tracking-wide text-[#f2d7b5]">
            KELUARGA PAUS
          </p>
        </div>

        <footer className="mt-auto">
          <p className="mb-3 text-center text-[11px] font-extrabold text-navy-900">
            YANG MANA PUZZLE ANAK PAUSNYA?
          </p>

          <ul
            aria-label="Pilihan potongan puzzle"
            className="grid grid-cols-3 gap-3"
          >
            {puzzlePieces.map((piece) => (
              <li
                key={piece.id}
                className="flex h-[81px] items-center justify-center rounded-2xl border-4 border-white/70 bg-white/90 shadow-card"
              >
                <Image
                  src={piece.image}
                  alt={piece.label}
                  width={90}
                  height={72}
                  sizes="90px"
                  className="h-[72px] w-[90px] object-contain"
                />
              </li>
            ))}
          </ul>
        </footer>
      </section>
    </ScreenShell>
  );
}
