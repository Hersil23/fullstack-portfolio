/**
 * @fileoverview Layout principal de la aplicación
 * @description Configura metadatos, fuentes y estructura HTML base
 * @author Herasi Silva
 * @version 1.1.0
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";
import CursorGlow from "@/components/ui/CursorGlow";

// ============================================================================
// CONFIGURACIÓN DE FUENTES
// ============================================================================

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================================================
// METADATOS SEO
// ============================================================================

export const metadata: Metadata = {
  title: "Herasi Silva | Full Stack Developer",
  description:
    "Desarrollador Full Stack especializado en React, Next.js, Node.js y MongoDB. Creo aplicaciones web modernas, escalables y de alto rendimiento.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Desarrollador Web",
    "Venezuela",
  ],
  authors: [{ name: "Herasi Silva" }],
  creator: "Herasi Silva",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://herasi.dev",
    siteName: "Herasi Silva Portfolio",
    title: "Herasi Silva | Full Stack Developer",
    description:
      "Desarrollador Full Stack especializado en React, Next.js, Node.js y MongoDB.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Herasi Silva | Full Stack Developer",
    description:
      "Desarrollador Full Stack especializado en React, Next.js, Node.js y MongoDB.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ============================================================================
// LAYOUT PRINCIPAL
// ============================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-primary text-text-primary`}
          >
            <CursorGlow />
            <LanguageProvider>{children}</LanguageProvider>
          </body>
    </html>
  );
}