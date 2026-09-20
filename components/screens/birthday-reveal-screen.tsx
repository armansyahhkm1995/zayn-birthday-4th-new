import Image from "next/image";

import { ScreenShell } from "@/components/layout/screen-shell";

type BirthdayRevealScreenProps = {
  onReadLetter: () => void;
};

const confetti = [
  { left: "8%", top: "7%", color: "#ff5964" },
  { left: "18%", top: "12%", color: "#ffc928" },
  { left: "82%", top: "8%", color: "#2e9cf4" },
  { left: "91%", top: "14%", color: "#ff5964" },
  { left: "5%", top: "34%", color: "#2dbe7f" },
  { left: "93%", top: "39%", color: "#ffc928" },
  { left: "14%", top: "58%", color: "#2e9cf4" },
  { left: "87%", top: "61%", color: "#ff5964" },
] as const;

export function BirthdayRevealScreen({
  onReadLetter,
}: BirthdayRevealScreenProps) {
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

      <div aria-hidden="true">
        {confetti.map((item, index) => (
          <span
            key={`${item.left}-${item.top}`}
            className="absolute z-10 h-3 w-1.5 rounded-full"
            style={{
              left: item.left,
              top: item.top,
              backgroundColor: item.color,
              rotate: `${index * 24}deg`,
            }}
          />
        ))}
      </div>

      <section className="relative z-20 min-h-[844px] text-center text-navy-900">
        <p className="absolute top-[140px] left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 px-4 py-2 text-xs font-extrabold whitespace-nowrap">
          BERHASIL! 🎉
        </p>

        <div className="absolute top-[190px] left-1/2 h-[402px] w-[310px] -translate-x-1/2">
          <Image
            src="/assets/reveal/birthday-hero.png"
            alt="Zayn tersenyum di depan kue ulang tahun"
            fill
            priority
            sizes="310px"
            className="rounded-[28px] border-4 border-yellow-500 object-cover shadow-card"
          />

          <div className="absolute top-[155px] -left-7 size-[92px] overflow-hidden rounded-2xl border-4 border-white shadow-piece">
            <Image
              src="/assets/reveal/birthday-memory-left.jpg"
              alt="Kenangan ulang tahun Zayn"
              fill
              sizes="92px"
              className="object-cover"
            />
          </div>

          <div className="absolute top-[155px] -right-7 size-[92px] overflow-hidden rounded-2xl border-4 border-white shadow-piece">
            <Image
              src="/assets/reveal/birthday-memory-right.jpg"
              alt="Kenangan Zayn bersama keluarga"
              fill
              sizes="92px"
              className="object-cover"
            />
          </div>
        </div>

        <h1
          aria-label="Selamat ulang tahun ke-4 Zayn!"
          className="absolute top-[630px] left-1/2 w-[358px] -translate-x-1/2 text-[30px] leading-[1.15] font-extrabold uppercase"
        >
          Selamat ulang
          <br />
          tahun ke-4 Zayn!
        </h1>

        <button
          type="button"
          onClick={onReadLetter}
          className="absolute bottom-8 left-4 min-h-14 w-[358px] rounded-full bg-yellow-500 px-6 text-base font-extrabold text-navy-900 shadow-piece transition-transform active:scale-[0.97]"
        >
          BACA PESAN ABA & UMMA
        </button>
      </section>
    </ScreenShell>
  );
}
