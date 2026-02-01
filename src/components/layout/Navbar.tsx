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

/**
 * Idiomas disponibles en la aplicación
 * @typedef {"es" | "en"} Language
 */
type Language = "es" | "en";

/**
 * Textos del navbar por idioma
 */
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

/**
 * Navbar principal de la aplicación
 * @description Navegación responsive
 * @returns {JSX.Element} Componente de navegación
 */
export default function Navbar() {
  // ============================================================================
  // ESTADO
  // ============================================================================

  /** Estado del menú móvil */
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  /** Idioma actual */
  const [language, setLanguage] = useState<Language>("es");

  /** Estado de scroll para efecto de fondo */
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // ============================================================================
  // EFECTOS
  // ============================================================================

  /**
   * Detecta el scroll para aplicar estilos al navbar
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Bloquea el scroll del body cuando el menú móvil está abierto
   */
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

  // ============================================================================
  // HANDLERS
  // ============================================================================

  /**
   * Alterna el estado del menú móvil
   */
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  /**
   * Cierra el menú móvil
   */
  const closeMenu = () => setIsMenuOpen(false);

  /**
   * Alterna el idioma entre español e inglés
   */
  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  /**
   * Obtiene el texto del navbar según el idioma actual
   * @param {keyof typeof navTexts.es} key - Clave del texto
   * @returns {string} Texto traducido
   */
  const getText = (key: keyof typeof navTexts.es): string => {
    return navTexts[language][key];
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      {/* ================================================================
          NAVBAR PRINCIPAL
          ================================================================ */}
      <nav
        className={`
          fixed z-50
          top-4 sm:top-5 lg:top-6
          left-4 sm:left-6 lg:left-12
          right-4 sm:right-6 lg:right-12
          transition-all duration-300 ease-in-out
          rounded-xl
          ${
            isScrolled
              ? "bg-bg-primary/95 backdrop-blur-md shadow-lg shadow-black/20"
              : "bg-transparent"
          }
        `}
      >
        <div className="flex items-center justify-between py-4 px-4 sm:px-6">
          {/* ==============================================================
              LOGO
              - Mobile: 40px
              - Tablet: 48px  
              - Desktop: 56px
              ============================================================== */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-3 group"
            onClick={closeMenu}
          >
            <div
              className="
                relative
                w-10 h-10
                sm:w-12 sm:h-12
                lg:w-14 lg:h-14
                transition-transform duration-300
                group-hover:scale-105
              "
            >
              <Image
                src="/images/logo-herasi.svg"
                alt="Herasi.dev Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className="
                text-text-primary font-bold
                text-base sm:text-lg lg:text-xl
                transition-colors duration-300
                group-hover:text-accent
              "
            >
              Herasi.dev
            </span>
          </Link>

          {/* ==============================================================
              NAVEGACIÓN DESKTOP (> 1024px)
              ============================================================== */}
          <div className="hidden lg:flex items-center gap-10">
            {/* Links de navegación */}
            <ul className="flex items-center gap-8">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="
                      text-text-secondary text-base font-medium
                      transition-colors duration-300
                      hover:text-accent
                      relative
                      after:content-['']
                      after:absolute after:left-0 after:-bottom-1
                      after:w-0 after:h-0.5
                      after:bg-accent
                      after:transition-all after:duration-300
                      hover:after:w-full
                    "
                  >
                    {getText(item.id as keyof typeof navTexts.es)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Selector de idioma */}
            <button
              onClick={toggleLanguage}
              className="
                px-4 py-2
                text-base font-medium
                text-text-secondary
                border border-border rounded-lg
                transition-all duration-300
                hover:border-accent hover:text-accent
              "
              aria-label="Cambiar idioma"
            >
              {language.toUpperCase()}
            </button>
          </div>

          {/* ==============================================================
              BOTÓN HAMBURGUESA (Mobile y Tablet < 1024px)
              ============================================================== */}
          <button
            onClick={toggleMenu}
            className="
              lg:hidden
              relative z-50
              w-12 h-12
              flex flex-col items-center justify-center gap-2
              transition-all duration-300
            "
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            <span
              className={`
                block w-7 h-0.5 bg-text-primary
                transition-all duration-300
                ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}
              `}
            />
            <span
              className={`
                block w-7 h-0.5 bg-text-primary
                transition-all duration-300
                ${isMenuOpen ? "opacity-0" : ""}
              `}
            />
            <span
              className={`
                block w-7 h-0.5 bg-text-primary
                transition-all duration-300
                ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}
              `}
            />
          </button>
        </div>
      </nav>

      {/* ================================================================
          MENÚ MÓVIL (< 1024px)
          Pantalla completa con animación de entrada
          ================================================================ */}
      <div
        className={`
          lg:hidden
          fixed inset-0 z-40
          bg-bg-primary
          transition-all duration-500 ease-in-out
          ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        <div
          className={`
            flex flex-col items-center justify-center
            min-h-screen
            px-6
            transition-all duration-500 delay-100
            ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}
          `}
        >
          {/* Links de navegación móvil */}
          <ul className="flex flex-col items-center gap-8 sm:gap-10 mb-12">
            {navigation.map((item, index) => (
              <li
                key={item.id}
                className="overflow-hidden"
                style={{
                  transitionDelay: `${(index + 1) * 75}ms`,
                }}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="
                    block
                    text-3xl sm:text-4xl font-semibold
                    text-text-primary
                    transition-colors duration-300
                    hover:text-accent
                  "
                >
                  {getText(item.id as keyof typeof navTexts.es)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Selector de idioma móvil */}
          <button
            onClick={toggleLanguage}
            className="
              px-8 py-3
              text-xl font-medium
              text-text-secondary
              border border-border rounded-lg
              transition-all duration-300
              hover:border-accent hover:text-accent
            "
            aria-label="Cambiar idioma"
          >
            {language === "es" ? "ES / EN" : "EN / ES"}
          </button>
        </div>
      </div>
    </>
  );
}