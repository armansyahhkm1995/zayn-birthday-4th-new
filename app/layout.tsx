import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import type { ReactNode } from "react";

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
        {children}
      </body>
    </html>
  );
}
