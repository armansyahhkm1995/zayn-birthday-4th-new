"use client";

import Image from "next/image";
import { useEffect } from "react";

import { ScreenShell } from "@/components/layout/screen-shell";
import { playSound, stopSound } from "@/lib/audio";

type SplashScreenProps = {
  onPlay: () => void;
};

export function SplashScreen({ onPlay }: SplashScreenProps) {
  useEffect(() => {
    playSound("splash");

    return () => {
      stopSound("splash");
    };
  }, []);

  function handlePlay() {
    stopSound("splash");
    playSound("interaction");
    onPlay();
  }

  return (
    <ScreenShell className="bg-ocean-500">
      <Image
        src="/assets/backgrounds/underwater-splash.png"
        alt=""
        fill
        priority
        sizes="390px"
        className="object-cover"
      />

      <section className="relative z-10 flex min-h-dvh flex-col justify-end px-4 pb-8 sm:min-h-[844px]">
        <div className="mb-5 text-center text-navy-900">
          <h1
            aria-label="Assalamualaikum Zayn"
            className="text-[30px] leading-[1.05] font-extrabold"
          >
            Assalamualaikum
            <br />
            Zayn
          </h1>

          <p className="mx-auto mt-3 max-w-[310px] text-[15px] leading-snug font-medium">
            Ini ada puzzle buatan Aba, dimainin ya sebentar
          </p>
        </div>

        <button
          type="button"
          data-interaction-sound="off"
          onClick={handlePlay}
          className="min-h-16 w-full rounded-full bg-yellow-500 px-6 text-base font-extrabold text-navy-900 shadow-piece transition-transform active:scale-[0.97]"
        >
          AYO MAIN!
        </button>
      </section>
    </ScreenShell>
  );
}
