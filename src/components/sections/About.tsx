/**
 * @fileoverview Sección About con métricas animadas
 * @description About section con contadores, descripción bilingüe y animaciones GSAP
 * @author Herasi Silva
 * @version 2.0.0
 */

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// TEXTOS
// ============================================================================

const aboutTexts = {
  es: {
    title: "Sobre Mí",
    description:
      "Creo aplicaciones web completas, desde la idea hasta el despliegue. Código limpio, interfaces intuitivas y sistemas que escalan. Si puedes imaginarlo, puedo crearlo.",
    metrics: {
      saas: { value: "SaaS", label: "en Producción" },
      projects: { value: "15+", label: "Proyectos Completos" },
      commits: { value: "785+", label: "Commits GitHub" },
      technologies: { value: "10+", label: "Tecnologías" },
    },
    favorites: "Tecnologías favoritas",
    location: "Venezuela",
    availability: "Disponible para proyectos remotos",
  },
  en: {
    title: "About Me",
    description:
      "I create complete web applications, from idea to deployment. Clean code, intuitive interfaces, and systems that scale. If you can imagine it, I can create it.",
    metrics: {
      saas: { value: "SaaS", label: "in Production" },
      projects: { value: "15+", label: "Completed Projects" },
      commits: { value: "785+", label: "GitHub Commits" },
      technologies: { value: "10+", label: "Technologies" },
    },
    favorites: "Favorite technologies",
    location: "Venezuela",
    availability: "Available for remote projects",
  },
};

// ============================================================================
// HOOK CONTADOR ANIMADO
// ============================================================================

function useCounterAnimation(
  targetValue: number,
  duration: number = 2,
  startAnimation: boolean
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * targetValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [targetValue, duration, startAnimation]);

  return count;
}

// ============================================================================
// COMPONENTE MÉTRICA
// ============================================================================

interface MetricCardProps {
  value: string;
  label: string;
  isNumeric?: boolean;
  numericValue?: number;
  startAnimation: boolean;
}

function MetricCard({
  value,
  label,
  isNumeric = false,
  numericValue = 0,
  startAnimation,
}: MetricCardProps) {
  const animatedCount = useCounterAnimation(numericValue, 2, startAnimation);

  return (
    <div
      className="metric-card group relative p-6 sm:p-8 rounded-2xl bg-[#141414]/80 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-[#1a1a1a]/80"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 text-center">
        <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2">
          {isNumeric ? `${animatedCount}+` : value}
        </span>
        <span className="block text-sm sm:text-base text-text-secondary">
          {label}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [startCounters, setStartCounters] = useState(false);
  const { language } = useLanguage();

  const texts = aboutTexts[language];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación del título
      gsap.fromTo(
        ".about-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación de la descripción
      gsap.fromTo(
        ".about-description",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-description",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación de las métricas con stagger (un solo trigger)
      gsap.fromTo(
        ".metric-card",
        { y: 40, opacity: 0, scale: 0.95, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".metrics-container",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación del footer
      gsap.fromTo(
        ".about-footer",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-footer",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación de ubicación y disponibilidad
      gsap.fromTo(
        ".about-location",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-location",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Trigger para iniciar contadores
      ScrollTrigger.create({
        trigger: ".metrics-container",
        start: "top 80%",
        onEnter: () => setStartCounters(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-28 flex justify-center overflow-hidden"
      style={{ backgroundColor: "#0f0f0f" }}
    >
      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculo difuminado superior izquierdo */}
        <div 
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-30"
          style={{ 
            background: "radial-gradient(circle, rgba(234,88,12,0.15) 0%, transparent 70%)" 
          }}
        />
        {/* Círculo difuminado inferior derecho */}
        <div 
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{ 
            background: "radial-gradient(circle, rgba(234,88,12,0.1) 0%, transparent 70%)" 
          }}
        />
        {/* Círculo pequeño central */}
        <div 
          className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ 
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)" 
          }}
        />
      </div>

      <div className="container flex flex-col items-center relative z-10">
        {/* Título con gradiente animado */}
        <h2
          className="about-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent"
          style={{ marginBottom: "50px" }}
        >
          {texts.title}
        </h2>

        {/* Descripción */}
        <p 
          className="about-description text-text-secondary text-lg sm:text-xl lg:text-2xl text-center max-w-4xl leading-relaxed"
          style={{ marginBottom: "60px" }}
        >
          {texts.description}
        </p>

        {/* Métricas */}
        <div 
          className="metrics-container w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          style={{ marginBottom: "60px" }}
        >
          <MetricCard
            value={texts.metrics.saas.value}
            label={texts.metrics.saas.label}
            startAnimation={startCounters}
          />
          <MetricCard
            value={texts.metrics.projects.value}
            label={texts.metrics.projects.label}
            isNumeric={true}
            numericValue={15}
            startAnimation={startCounters}
          />
          <MetricCard
            value={texts.metrics.commits.value}
            label={texts.metrics.commits.label}
            isNumeric={true}
            numericValue={785}
            startAnimation={startCounters}
          />
          <MetricCard
            value={texts.metrics.technologies.value}
            label={texts.metrics.technologies.label}
            isNumeric={true}
            numericValue={10}
            startAnimation={startCounters}
          />
        </div>

        {/* Tecnologías favoritas */}
        <div 
          className="about-footer flex items-center justify-center gap-3 flex-wrap"
          style={{ marginBottom: "40px" }}
        >
          <span className="text-text-muted text-sm sm:text-base">{texts.favorites}:</span>
          <div className="flex items-center gap-2">
            <span className="px-4 py-2 rounded-full bg-[#1a1a1a] border border-border text-text-primary text-sm sm:text-base font-medium">
              React
            </span>
            <span className="text-text-muted">&</span>
            <span className="px-4 py-2 rounded-full bg-[#1a1a1a] border border-border text-text-primary text-sm sm:text-base font-medium">
              Node.js
            </span>
          </div>
        </div>

        {/* Ubicación y disponibilidad */}
        <div className="about-location flex items-center justify-center gap-2 text-text-secondary">
          {/* Icono de ubicación */}
          <svg 
            className="w-5 h-5 text-accent" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          <span>{texts.location}</span>
          <span className="text-text-muted mx-2">•</span>
          {/* Icono de disponibilidad */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="ml-1">{texts.availability}</span>
        </div>
      </div>
    </section>
  );
}