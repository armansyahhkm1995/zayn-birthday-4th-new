import Image from "next/image";

import { ScreenShell } from "@/components/layout/screen-shell";

type MemoryAgeTwoScreenProps = {
  onContinue: () => void;
};

const timelineSteps = [1, 2, 3, 4] as const;

export function MemoryAgeTwoScreen({ onContinue }: MemoryAgeTwoScreenProps) {
  return (
    <ScreenShell className="bg-ocean-500">
      <Image
        src="/assets/backgrounds/underwater-content.webp"
        alt=""
        fill
        priority
        sizes="390px"
        className="object-cover"
      />

      <section className="relative z-10 flex min-h-dvh flex-col px-4 pt-16 pb-16 sm:min-h-[844px]">
        <header className="text-center text-navy-900">
          <p className="text-xs font-extrabold">
            ✨ YEAY KETEMU FOTO ZAYN LAGI! ✨
          </p>

          <h1 className="mt-3 text-[22px] leading-tight font-extrabold">
            ZAYN LAGI BOBO
          </h1>
        </header>

        <figure className="mx-auto mt-[84px] w-[280px] rounded-2xl bg-white p-4 pb-3 shadow-card">
          <Image
            src="/assets/memories/zayn-lagi-bobo.webp"
            alt="Zayn lagi bobo"
            width={248}
            height={200}
            sizes="248px"
            className="h-[200px] w-full rounded-xl object-cover"
          />

          <figcaption className="pt-3 text-center text-sm font-bold text-navy-900">
            Di sini Zayn ketiduran pas kita mau jalan2 abis jumatan 😄
          </figcaption>
        </figure>

        <div className="mt-[84px] text-center">
          <ol
            aria-label="Progress foto Zayn"
            className="flex items-center justify-center"
          >
            {timelineSteps.map((step) => (
              <li key={step} className="flex items-center">
                <span
                  aria-current={step === 2 ? "step" : undefined}
                  className={`flex size-10 items-center justify-center rounded-full border-2 text-sm font-extrabold ${
                    step === 2
                      ? "border-navy-900 bg-navy-900 text-white"
                      : "border-navy-900 bg-white text-navy-900"
                  }`}
                >
                  {step}
                </span>

                {step < 4 && (
                  <span
                    aria-hidden="true"
                    className="mx-3 h-1 w-6 rounded-full bg-navy-900"
                  />
                )}
              </li>
            ))}
          </ol>

          <p className="mt-3 text-[10px] font-bold text-navy-900">
            FOTO TERBUKA: 2 DARI 4
          </p>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="mt-auto min-h-16 w-full rounded-full bg-yellow-500 px-6 text-base font-extrabold text-navy-900 shadow-piece transition-transform active:scale-[0.97]"
        >
          PUZZLE BERIKUTNYA
        </button>
      </section>
    </ScreenShell>
  );
}
