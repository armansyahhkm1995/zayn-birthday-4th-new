import Image from "next/image";

import { ScreenShell } from "@/components/layout/screen-shell";

type DaddyLetterScreenProps = {
  onReplay: () => void;
};

export function DaddyLetterScreen({ onReplay }: DaddyLetterScreenProps) {
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

      <section className="relative z-10 min-h-dvh px-4 pt-16 pb-8 sm:min-h-[844px]">
        <h1 className="mx-auto w-[310px] text-[22px] font-extrabold text-navy-900">
          Untuk Jagoan Kecil Daddy
        </h1>

        <article className="mx-auto mt-5 w-[310px] rounded-2xl bg-white p-6 shadow-card">
          <div className="space-y-3 text-[13px] leading-[1.45] font-semibold text-navy-900">
            <p>Assalamualaikum Warahmatullahi Wabarakatuh Zayn</p>

            <p>Hari ini Zayn sudah 4 tahun nak</p>

            <p>
              Zayn, Aba sama Umma doakan supaya Zayn jadi anak yang cerdas
              secara akademik, agama, dan pertemanan. Aaminn
            </p>

            <p>
              Aba dan Umma selalu ada untuk Zayn. Berdoa ke Allah ya supaya kita
              bisa berkumpul lagi, Zayn juga bisa sekolah di sekolah yang bagus,
              kita juga bisa punya rumah nanti bertiga. Aaminn
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
              src="/assets/reveal/daddy-family-photo.webp"
              alt="Foto keluarga Zayn bersama Daddy"
              fill
              sizes="262px"
              className="object-cover"
            />

            <figcaption className="absolute top-0 left-0 rounded-br-xl bg-white/90 px-2 py-1.5 text-[10px] font-bold text-navy-900">
              Foto Keluarga Kita
            </figcaption>
          </figure>
        </article>

        <button
          type="button"
          onClick={onReplay}
          className="mx-auto mt-5 flex min-h-14 w-[310px] items-center justify-center rounded-full bg-yellow-500 px-6 text-base font-extrabold text-navy-900 shadow-piece transition-transform active:scale-[0.97]"
        >
          MAIN LAGI DARI AWAL
        </button>
      </section>
    </ScreenShell>
  );
}
