import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import type { ReactNode } from "react";
import Image from "next/image";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Zayn Birthday 4th",
  description: "Petualangan puzzle ulang tahun keempat Zayn.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" className={outfit.variable}>
      <body className={`${outfit.className} min-h-dvh antialiased`}>
        <div className="relative min-h-dvh">
          <Image
            src="/assets/backgrounds/underwater-splash.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-navy-900/65 backdrop-blur-[10px]" />

          <div className="relative z-10 flex min-h-dvh items-center justify-center p-0 sm:p-8">
            <div className="w-full max-w-[414px] sm:rounded-[2.75rem] sm:border sm:border-white/20 sm:bg-white/15 sm:p-3 sm:shadow-[0_30px_90px_rgb(0_0_0/45%)] sm:backdrop-blur-xl">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
