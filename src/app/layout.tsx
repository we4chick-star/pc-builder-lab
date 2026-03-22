import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BuildProvider } from "@/context/BuildContext";
import { HtmlLang } from "@/components/HtmlLang";
import { StickyCart } from "@/components/StickyCart";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lab Configurator · Premium PC Builder",
  description: "High-end PC builder with compatibility checks, regional pricing, and Walter's advice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-display relative z-[1] pb-44 sm:pb-48">
        <BuildProvider>
          <HtmlLang />
          {children}
          <StickyCart />
        </BuildProvider>
      </body>
    </html>
  );
}
