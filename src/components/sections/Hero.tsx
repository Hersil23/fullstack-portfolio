/**
 * @fileoverview Sección Hero con escena 3D interactiva
 * @description Hero section con figuras 3D, gradiente animado y efecto typewriter
 * @author Herasi Silva
 * @version 2.0.0
 */

"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

const Scene3D = dynamic(() => import("@/components/ui/Scene3D"), {
  ssr: false,
});

// ============================================================================
// TEXTOS
// ============================================================================

const heroTexts = {
  es: {
    title: "Desarrollador Full Stack",
    phrases: [
      "Creo aplicaciones web modernas",
      "Desarrollo sistemas SaaS escalables",
      "Construyo APIs robustas y seguras",
      "Diseño experiencias de usuario únicas",
    ],
    cta: "Ver Proyectos",
    secondary: "Contáctame",
  },
  en: {
    title: "Full Stack Developer",
    phrases: [
      "I build modern web applications",
      "I develop scalable SaaS systems",
      "I create robust and secure APIs",
      "I design unique user experiences",
    ],
    cta: "View Projects",
    secondary: "Contact Me",
  },
};

// ============================================================================
// HOOK TYPEWRITER
// ============================================================================

function useTypewriter(phrases: string[], typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Escribiendo
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          // Pausa antes de borrar
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Borrando
        if (displayText.length > 0) {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const texts = heroTexts[language];
  const typewriterText = useTypewriter(texts.phrases);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(".hero-title", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(
        ".hero-typewriter",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      tl.from(
        ".hero-button",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.3"
      );

      tl.from(
        ".scroll-indicator",
        {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-bg-primary"
    >
      {/* Escena 3D de fondo */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Contenido del Hero */}
      <div
        ref={containerRef}
        className="absolute inset-x-0 top-[55%] z-20 flex justify-center"
      >
        <div className="w-full max-w-2xl mx-auto px-6 text-center">
          {/* Título con gradiente animado */}
          <h1
            className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent"
            style={{ 
              textShadow: "0 4px 30px rgba(234, 88, 12, 0.3)",
            }}
          >
            {texts.title}
          </h1>

          {/* Typewriter */}
          <div 
            className="hero-typewriter h-16 sm:h-20 flex items-center justify-center mb-10"
          >
            <p
              className="text-text-secondary text-lg sm:text-xl md:text-2xl"
              style={{ textShadow: "0 2px 15px rgba(0,0,0,0.9)" }}
            >
              {typewriterText}
              <span className="animate-pulse text-accent">|</span>
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Link
              href="#projects"
              className="hero-button w-full sm:w-auto px-10 py-4 bg-accent text-bg-primary text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:bg-accent-light hover:shadow-xl hover:shadow-accent/30 hover:scale-105"
            >
              {texts.cta}
            </Link>
            <Link
              href="#contact"
              className="hero-button w-full sm:w-auto px-10 py-4 bg-transparent text-text-primary text-base sm:text-lg font-semibold rounded-xl border-2 border-border transition-all duration-300 hover:border-accent hover:text-accent hover:scale-105"
            >
              {texts.secondary}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span
            className="text-text-muted text-sm"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
          >
            Scroll
          </span>
          <svg
            className="w-6 h-6 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}