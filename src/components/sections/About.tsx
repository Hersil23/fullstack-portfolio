/**
 * @fileoverview Sección About con métricas animadas
 * @description About section con contadores, descripción bilingüe y animaciones GSAP
 * @author Herasi Silva
 * @version 1.0.0
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
  delay: number;
}

function MetricCard({
  value,
  label,
  isNumeric = false,
  numericValue = 0,
  startAnimation,
  delay,
}: MetricCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const animatedCount = useCounterAnimation(numericValue, 2, startAnimation);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="group relative p-6 rounded-2xl bg-bg-secondary/50 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-bg-secondary/80"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 text-center">
        <span className="block text-3xl sm:text-4xl font-bold text-accent mb-2">
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

      // Animación de favoritos y certificación
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
      className="relative py-24 sm:py-32 bg-bg-primary flex justify-center"
    >
      <div className="container flex flex-col items-center">
        {/* Título con gradiente animado */}
        <h2
          className="about-title text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent"
        >
          {texts.title}
        </h2>

        {/* Descripción */}
        <p className="about-description text-text-secondary text-lg sm:text-xl text-center max-w-3xl mb-20 leading-relaxed">
          {texts.description}
        </p>

        {/* Métricas */}
        <div className="metrics-container w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          <MetricCard
            value={texts.metrics.saas.value}
            label={texts.metrics.saas.label}
            startAnimation={startCounters}
            delay={0}
          />
          <MetricCard
            value={texts.metrics.projects.value}
            label={texts.metrics.projects.label}
            isNumeric={true}
            numericValue={15}
            startAnimation={startCounters}
            delay={0.1}
          />
          <MetricCard
            value={texts.metrics.commits.value}
            label={texts.metrics.commits.label}
            isNumeric={true}
            numericValue={785}
            startAnimation={startCounters}
            delay={0.2}
          />
          <MetricCard
            value={texts.metrics.technologies.value}
            label={texts.metrics.technologies.label}
            isNumeric={true}
            numericValue={10}
            startAnimation={startCounters}
            delay={0.3}
          />
        </div>

        {/* Footer: Tecnologías favoritas */}
        <div className="about-footer flex items-center justify-center gap-3 flex-wrap">
          <span className="text-text-muted text-sm">{texts.favorites}:</span>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-bg-secondary border border-border text-text-primary text-sm font-medium">
              React
            </span>
            <span className="text-text-muted">&</span>
            <span className="px-3 py-1 rounded-full bg-bg-secondary border border-border text-text-primary text-sm font-medium">
              Node.js
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}