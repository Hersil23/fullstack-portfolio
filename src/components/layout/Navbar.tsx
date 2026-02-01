/**
 * @fileoverview Componente de navegación principal
 * @description Navbar responsive con logo, links, selector de idioma y menú móvil
 * @author Herasi Silva
 * @version 1.0.0
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/content";

// ============================================================================
// TIPOS
// ============================================================================

type Language = "es" | "en";

const navTexts = {
  es: {
    about: "Sobre Mí",
    techStack: "Tecnologías",
    projects: "Proyectos",
    services: "Servicios",
    contact: "Contacto",
  },
  en: {
    about: "About",
    techStack: "Tech Stack",
    projects: "Projects",
    services: "Services",
    contact: "Contact",
  },
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>("es");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const getText = (key: keyof typeof navTexts.es): string => {
    return navTexts[language][key];
  };

  return (
    <>
      <nav
        className={`
          fixed z-50
          top-4 sm:top-5 lg:top-6
          left-4 sm:left-6 lg:left-12
          right-4 sm:right-6 lg:right-12
          transition-all duration-300 ease-in-out
          rounded-xl
          ${isScrolled ? "bg-bg-primary/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"}
        `}
      >
        <div className="flex items-center justify-between py-4 px-4 sm:px-6">
          {/* LOGO */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-3 group"
            onClick={closeMenu}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo-herasi.svg"
                alt="Herasi.dev Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-text-primary font-bold text-base sm:text-lg lg:text-xl transition-colors duration-300 group-hover:text-accent">
              Herasi.dev
            </span>
          </Link>

          {/* NAVEGACIÓN DESKTOP */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-text-secondary text-base font-medium transition-colors duration-300 hover:text-accent relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {getText(item.id as keyof typeof navTexts.es)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Selector de idioma Desktop */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage("es")}
                className={`px-2 py-1 text-base font-medium transition-all duration-300 ${language === "es" ? "text-accent" : "text-text-muted hover:text-text-secondary"}`}
                aria-label="Español"
              >
                ES
              </button>
              <span className="text-text-muted">/</span>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 text-base font-medium transition-all duration-300 ${language === "en" ? "text-accent" : "text-text-muted hover:text-text-secondary"}`}
                aria-label="English"
              >
                EN
              </button>
            </div>
          </div>

          {/* BOTÓN HAMBURGUESA */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-2 transition-all duration-300"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            <span className={`block w-7 h-0.5 bg-text-primary transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block w-7 h-0.5 bg-text-primary transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-7 h-0.5 bg-text-primary transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>
        </div>
      </nav>

      {/* MENÚ MÓVIL */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-bg-primary transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div
          className={`flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-500 delay-100 ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}
        >
          <ul className="flex flex-col items-center gap-8 sm:gap-10 mb-12">
            {navigation.map((item, index) => (
              <li
                key={item.id}
                className="overflow-hidden"
                style={{ transitionDelay: `${(index + 1) * 75}ms` }}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block text-3xl sm:text-4xl font-semibold text-text-primary transition-colors duration-300 hover:text-accent"
                >
                  {getText(item.id as keyof typeof navTexts.es)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Selector de idioma Móvil */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage("es")}
              className={`px-3 py-2 text-xl font-medium transition-all duration-300 ${language === "es" ? "text-accent" : "text-text-muted hover:text-text-secondary"}`}
              aria-label="Español"
            >
              ES
            </button>
            <span className="text-text-muted text-xl">/</span>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-2 text-xl font-medium transition-all duration-300 ${language === "en" ? "text-accent" : "text-text-muted hover:text-text-secondary"}`}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}