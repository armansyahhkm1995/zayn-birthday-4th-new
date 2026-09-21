"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import { useEffect } from "react";
import { ScreenShell } from "@/components/layout/screen-shell";
import { playLoopingSound } from "@/lib/audio";

type BirthdayRevealScreenProps = {
  onReadLetter: () => void;
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

const cannonParticles = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  color: confettiColors[index % confettiColors.length],
  distanceX: 60 + ((index * 37) % 140),
  height: 360 + ((index * 53) % 280),
  rotation: 240 + index * 47,
  delay: (index % 7) * 0.06,
  duration: 2.3 + (index % 4) * 0.18,
  isRound: index % 4 === 0,
}));

const ambientConfetti = [
  {
    left: "7%",
    top: "9%",
    color: "#ff5964",
    rotation: 20,
  },
  {
    left: "16%",
    top: "15%",
    color: "#ffc928",
    rotation: 70,
  },
  {
    left: "84%",
    top: "10%",
    color: "#2e9cf4",
    rotation: 110,
  },
  {
    left: "92%",
    top: "18%",
    color: "#ff5964",
    rotation: 150,
  },
  {
    left: "6%",
    top: "38%",
    color: "#2dbe7f",
    rotation: 190,
  },
  {
    left: "91%",
    top: "42%",
    color: "#ffc928",
    rotation: 230,
  },
  {
    left: "12%",
    top: "61%",
    color: "#2e9cf4",
    rotation: 270,
  },
  {
    left: "88%",
    top: "63%",
    color: "#ff5964",
    rotation: 310,
  },
] as const;

function ConfettiCannon({ side }: { side: CannonSide }) {
  const direction = side === "left" ? 1 : -1;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 z-30 ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      <motion.span
        className="absolute bottom-4 block size-16 rounded-full bg-yellow-500/40 blur-xl"
        animate={{
          scale: [0.4, 1.4, 0.6],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 0.65,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />

      {cannonParticles.map((particle) => (
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
            scale: 0.4,
            rotate: 0,
          }}
          animate={{
            x: [
              0,
              direction * particle.distanceX * 0.25,
              direction * particle.distanceX * 0.55,
              direction * particle.distanceX * 0.8,
              direction * particle.distanceX,
            ],
            y: [
              0,
              -particle.height * 0.65,
              -particle.height,
              -particle.height * 0.55,
              -particle.height * 0.12,
            ],
            opacity: [0, 1, 1, 0.9, 0],
            scale: [0.4, 1, 1, 0.9, 0.7],
            rotate: [
              0,
              particle.rotation * 0.3,
              particle.rotation * 0.65,
              particle.rotation,
              particle.rotation * 1.4,
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeOut",
            times: [0, 0.25, 0.48, 0.75, 1],
          }}
        />
      ))}
    </div>
  );
}

export function BirthdayRevealScreen({
  onReadLetter,
}: BirthdayRevealScreenProps) {
  useEffect(() => {
    void playLoopingSound("birthday");
  }, []);

  return (
    <MotionConfig reducedMotion="user">
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
                y: [0, 8, 0],
                rotate: [
                  item.rotation,
                  item.rotation + 120,
                  item.rotation + 240,
                ],
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 2.4 + index * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <ConfettiCannon side="left" />
        <ConfettiCannon side="right" />

        <section className="relative z-20 min-h-[844px] text-center text-navy-900">
          <motion.p
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 18,
              delay: 0.1,
            }}
            className="absolute top-[140px] left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 px-4 py-2 text-xs font-extrabold whitespace-nowrap"
          >
            BERHASIL! 🎉
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 20,
              delay: 0.25,
            }}
            className="absolute top-[190px] left-1/2 h-[402px] w-[310px] -translate-x-1/2"
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/assets/reveal/birthday-hero.png"
                alt="Zayn tersenyum di depan kue ulang tahun"
                fill
                priority
                sizes="310px"
                className="rounded-[28px] border-4 border-yellow-500 object-cover shadow-card"
              />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
                rotate: -12,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: -4,
              }}
              transition={{
                type: "spring",
                delay: 0.65,
              }}
              className="absolute top-[155px] -left-7 size-[92px] overflow-hidden rounded-2xl border-4 border-white shadow-piece"
            >
              <Image
                src="/assets/reveal/zayn-umma.jpg"
                alt="Kenangan ulang tahun Zayn"
                fill
                sizes="92px"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
                rotate: 12,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 4,
              }}
              transition={{
                type: "spring",
                delay: 0.75,
              }}
              className="absolute top-[155px] -right-7 size-[92px] overflow-hidden rounded-2xl border-4 border-white shadow-piece"
            >
              <Image
                src="/assets/reveal/zayn-aba.jpg"
                alt="Kenangan Zayn bersama keluarga"
                fill
                sizes="92px"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.h1
            aria-label="Selamat ulang tahun ke-4 Zayn!"
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: [0.85, 1.08, 1],
            }}
            transition={{
              duration: 0.7,
              delay: 0.85,
              ease: "easeOut",
            }}
            className="absolute top-[630px] left-1/2 w-[358px] -translate-x-1/2 text-[30px] leading-[1.15] font-extrabold uppercase"
          >
            Selamat ulang
            <br />
            tahun ke-4 Zayn!
          </motion.h1>

          <motion.button
            type="button"
            onClick={onReadLetter}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              delay: 1.15,
              duration: 0.4,
            }}
            className="absolute bottom-8 left-4 min-h-14 w-[358px] rounded-full bg-yellow-500 px-6 text-base font-extrabold text-navy-900 shadow-piece"
          >
            BACA PESAN ABA &amp; UMMA
          </motion.button>
        </section>
      </ScreenShell>
    </MotionConfig>
  );
}
