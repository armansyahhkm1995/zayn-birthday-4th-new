"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion, MotionConfig } from "motion/react";

import { ScreenShell } from "@/components/layout/screen-shell";
import { playLoopingSound, stopSound } from "@/lib/audio";

type DaddyLetterScreenProps = {
  onReplay: () => void;
};

type CannonSide = "left" | "right";

const confettiColors = [
  "#ff5964",
  "#ffc928",
  "#2e9cf4",
  "#2dbe7f",
  "#ffffff",
  "#9b5de5",
] as const;

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  color: confettiColors[index % confettiColors.length],
  distanceX: 55 + ((index * 31) % 120),
  height: 350 + ((index * 47) % 250),
  rotation: 220 + index * 43,
  delay: (index % 6) * 0.07,
  duration: 2.5 + (index % 4) * 0.2,
  isRound: index % 4 === 0,
}));

const ambientConfetti = [
  {
    left: "5%",
    top: "12%",
    color: "#ff5964",
  },
  {
    left: "92%",
    top: "15%",
    color: "#ffc928",
  },
  {
    left: "7%",
    top: "35%",
    color: "#2e9cf4",
  },
  {
    left: "90%",
    top: "38%",
    color: "#2dbe7f",
  },
  {
    left: "4%",
    top: "61%",
    color: "#ffc928",
  },
  {
    left: "93%",
    top: "64%",
    color: "#ff5964",
  },
] as const;

function LetterConfetti({ side }: { side: CannonSide }) {
  const direction = side === "left" ? 1 : -1;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 z-10 ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      <motion.span
        className="absolute bottom-4 block size-14 rounded-full bg-yellow-500/40 blur-xl"
        animate={{
          scale: [0.5, 1.4, 0.6],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          repeatDelay: 3.2,
        }}
      />

      {particles.map((particle) => (
        <motion.span
          key={`${side}-${particle.id}`}
          className={`absolute bottom-5 block ${
            particle.isRound ? "size-2 rounded-full" : "h-3 w-1.5 rounded-sm"
          }`}
          style={{
            backgroundColor: particle.color,
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            x: [
              0,
              direction * particle.distanceX * 0.3,
              direction * particle.distanceX * 0.6,
              direction * particle.distanceX,
            ],
            y: [
              0,
              -particle.height * 0.7,
              -particle.height,
              -particle.height * 0.2,
            ],
            opacity: [0, 1, 0.9, 0],
            rotate: [
              0,
              particle.rotation * 0.4,
              particle.rotation,
              particle.rotation * 1.5,
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeOut",
            times: [0, 0.35, 0.62, 1],
          }}
        />
      ))}
    </div>
  );
}

export function DaddyLetterScreen({ onReplay }: DaddyLetterScreenProps) {
  useEffect(() => {
    void playLoopingSound("birthday");
  }, []);

  function handleReplay() {
    stopSound("birthday");
    onReplay();
  }

  return (
    <MotionConfig reducedMotion="user">
      <ScreenShell className="bg-ocean-500">
        <Image
          src="/assets/backgrounds/underwater-content.webp"
          alt=""
          fill
          priority
          sizes="390px"
          className="object-cover"
        />

        <div aria-hidden="true">
          {ambientConfetti.map((item, index) => (
            <motion.span
              key={`${item.left}-${item.top}`}
              className="absolute z-10 h-3 w-1.5 rounded-full"
              style={{
                left: item.left,
                top: item.top,
                backgroundColor: item.color,
              }}
              animate={{
                y: [0, 7, 0],
                rotate: [index * 40, index * 40 + 180, index * 40 + 360],
              }}
              transition={{
                duration: 2.8 + index * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <LetterConfetti side="left" />
        <LetterConfetti side="right" />

        <section className="relative z-20 min-h-dvh px-4 pt-16 pb-8 sm:min-h-[844px]">
          <motion.h1
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="mx-auto w-[310px] text-[22px] font-extrabold text-navy-900"
          >
            For our little lego builder Aba & Umma
          </motion.h1>

          <motion.article
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="mx-auto mt-5 w-[310px] rounded-2xl bg-white p-6 shadow-card"
          >
            <div className="space-y-3 text-[13px] leading-[1.45] font-semibold text-navy-900">
              <p>Assalamualaikum Warahmatullahi Wabarakatuh Zayn</p>

              <p>Hari ini Zayn sudah 4 tahun nak</p>

              <p>
                Zayn, Aba sama Umma doakan supaya Zayn jadi anak yang cerdas
                secara akademik, agama, dan pertemanan. Aaminn
              </p>

              <p>
                Aba dan Umma selalu ada untuk Zayn. Berdoa ke Allah ya supaya
                kita bisa berkumpul lagi, Zayn juga bisa sekolah di sekolah yang
                bagus, kita juga bisa punya rumah nanti bertiga. Aaminn
              </p>

              <p className="font-extrabold text-coral-500">
                Selamat Ulang Tahun ke-4, my little lego builder ❤️
              </p>
            </div>

            <time
              dateTime="2026-09-22"
              className="mt-4 block text-[11px] font-bold text-navy-900"
            >
              September 22, 2026
            </time>

            <hr className="my-4 border-ocean-100" />

            <figure className="relative h-[150px] overflow-hidden rounded-xl">
              <Image
                src="/assets/reveal/our-family.webp"
                alt="Foto keluarga kita"
                fill
                sizes="262px"
                className="object-cover object-[center_35%]"
              />
            </figure>
          </motion.article>

          <motion.button
            type="button"
            onClick={handleReplay}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              duration: 0.4,
              delay: 0.45,
            }}
            className="mx-auto mt-5 flex min-h-14 w-[310px] items-center justify-center rounded-full bg-yellow-500 px-6 text-base font-extrabold text-navy-900 shadow-piece"
          >
            MAIN LAGI DARI AWAL
          </motion.button>
        </section>
      </ScreenShell>
    </MotionConfig>
  );
}
