/**
 * @fileoverview Layout principal de la aplicación
 * @description Configura metadatos, fuentes y estructura HTML base
 * @author Herasi Silva
 * @version 1.0.0
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ============================================================================
// CONFIGURACIÓN DE FUENTES
// ============================================================================

/**
 * Fuente principal sans-serif
 * @description Geist Sans para textos generales
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Fuente monoespaciada
 * @description Geist Mono para código y elementos técnicos
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================================================
// METADATOS SEO
// ============================================================================

/**
 * Metadatos de la página para SEO
 * @description Configuración de título, descripción y Open Graph
 */
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

/**
 * Layout raíz de la aplicación
 * @description Envuelve todas las páginas con la estructura HTML base
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido de la página
 * @returns {JSX.Element} Estructura HTML con fuentes y estilos aplicados
 */
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
        {children}
      </body>
    </html>
  );
}