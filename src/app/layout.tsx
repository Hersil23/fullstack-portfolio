/**
 * @fileoverview Layout principal de la aplicación
 * @description Configura metadatos SEO, fuentes, JSON-LD y estructura HTML base
 * @author Herasi Silva
 * @version 2.0.0
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
  metadataBase: new URL("https://herasi.dev"),
  title: "Herasi Silva | Desarrollador Full Stack - React, Next.js, Node.js",
  description:
    "Desarrollador Full Stack especializado en React, Next.js, Node.js y MongoDB. Creo aplicaciones web modernas, SaaS escalables y e-commerce de alto rendimiento. Disponible para proyectos remotos.",
  keywords: [
    "Full Stack Developer",
    "Desarrollador Full Stack",
    "Desarrollador Web",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Freelance",
    "Portfolio",
    "Web Developer",
    "SaaS",
    "E-commerce",
    "Venezuela",
  ],
  authors: [{ name: "Herasi Silva", url: "https://herasi.dev" }],
  creator: "Herasi Silva",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "https://herasi.dev",
    languages: {
      "es": "https://herasi.dev",
      "en": "https://herasi.dev",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    url: "https://herasi.dev",
    siteName: "Herasi Silva | Full Stack Developer",
    title: "Herasi Silva | Desarrollador Full Stack - React, Next.js, Node.js",
    description:
      "Desarrollador Full Stack especializado en React, Next.js, Node.js y MongoDB. Creo aplicaciones web modernas, SaaS escalables y e-commerce de alto rendimiento.",
    images: [
      {
        url: "https://herasi.dev/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Herasi Silva - Desarrollador Full Stack | React, Next.js, Node.js",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Herasi Silva | Desarrollador Full Stack",
    description:
      "Creo aplicaciones web modernas, SaaS escalables y e-commerce de alto rendimiento con React, Next.js y Node.js.",
    images: ["https://herasi.dev/images/og-image.png"],
    creator: "@herasi.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ============================================================================
// JSON-LD STRUCTURED DATA
// ============================================================================

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Herasi Silva",
  url: "https://herasi.dev",
  image: "https://herasi.dev/images/logo-herasi.png",
  jobTitle: "Full Stack Developer",
  description:
    "Desarrollador Full Stack especializado en React, Next.js, Node.js y MongoDB.",
  email: "herasidesweb@gmail.com",
  telephone: "+584145116337",
  address: {
    "@type": "PostalAddress",
    addressCountry: "VE",
  },
  sameAs: [
    "https://github.com/Hersil23",
    "https://www.instagram.com/herasi.dev",
    "https://www.tiktok.com/@herasi.dev",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "MySQL",
    "PHP",
    "Tailwind CSS",
    "Full Stack Development",
    "SaaS Development",
    "E-commerce Development",
  ],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Herasi Silva | Full Stack Developer",
  url: "https://herasi.dev",
  description:
    "Portfolio profesional de Herasi Silva, Desarrollador Full Stack especializado en React, Next.js y Node.js.",
  author: {
    "@type": "Person",
    name: "Herasi Silva",
  },
  inLanguage: ["es", "en"],
};

const jsonLdServices = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Development",
  provider: {
    "@type": "Person",
    name: "Herasi Silva",
    url: "https://herasi.dev",
  },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Desarrollo Web",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Landing Page",
          description: "Páginas web optimizadas para conversiones y marketing",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "150",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Desarrollo Web Corporativo",
          description: "Sitios web corporativos con múltiples páginas y funcionalidades a medida",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "200",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-commerce",
          description: "Tiendas online con carrito de compras e integración de pagos",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "300",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Aplicaciones SaaS",
          description: "Sistemas completos con backend, base de datos y gestión de usuarios",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "500",
          priceCurrency: "USD",
        },
      },
    ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdPerson),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebSite),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdServices),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-primary text-text-primary`}
      >
        <CursorGlow />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}