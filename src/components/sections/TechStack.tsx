/**
 * @fileoverview Sección Tech Stack con marquee infinito
 * @description Muestra las tecnologías con scroll horizontal automático
 * @author Herasi Silva
 * @version 2.0.0
 */

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { IconType } from "react-icons";
import { 
  SiReact, 
  SiNextdotjs, 
  SiJavascript, 
  SiTypescript,
  SiNodedotjs, 
  SiPhp, 
  SiPython,
  SiMongodb, 
  SiMysql,
  SiTailwindcss, 
  SiSass, 
  SiGreensock,
  SiWordpress, 
  SiGit, 
  SiFigma,
  SiHtml5, 
  SiCss3 
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// TEXTOS
// ============================================================================

const techTexts = {
  es: {
    title: "Tecnologías y Herramientas",
    subtitle: "Lo que uso para crear soluciones digitales",
    frontend: "Frontend",
    backend: "Backend / Base de Datos / Herramientas",
  },
  en: {
    title: "Technologies & Tools",
    subtitle: "What I use to create digital solutions",
    frontend: "Frontend",
    backend: "Backend / Database / Tools",
  },
};

// ============================================================================
// TECNOLOGÍAS POR CATEGORÍAS
// ============================================================================

interface Technology {
  name: string;
  Icon: IconType;
  color: string;
}

// Frontend (9)
const frontendTech: Technology[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss3, color: "#1572B6" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Sass", Icon: SiSass, color: "#CC6699" },
  { name: "GSAP", Icon: SiGreensock, color: "#88CE02" },
];

// Backend + Database + Tools (8)
const backendTech: Technology[] = [
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "WordPress", Icon: SiWordpress, color: "#21759B" },
];

// ============================================================================
// COMPONENTE TECH CARD
// ============================================================================

interface TechCardProps {
  name: string;
  Icon: IconType;
  color: string;
}

function TechCard({ name, Icon, color }: TechCardProps) {
  return (
    <div 
      className="tech-card flex-shrink-0 flex flex-col items-center justify-center rounded-2xl bg-[#141414]/80 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-[var(--tech-color)]/60 group relative cursor-pointer"
      style={{ 
        "--tech-color": color,
        width: "150px",
        height: "150px",
        marginRight: "40px",
      } as React.CSSProperties}
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ 
          background: `radial-gradient(circle at center, ${color}40 0%, transparent 70%)`,
        }}
      />
      
      {/* Inner glow */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          background: `linear-gradient(135deg, ${color}15 0%, transparent 50%, ${color}10 100%)`,
        }}
      />
      
      {/* Icon */}
      <Icon 
        className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_var(--tech-color)]"
        style={{ color }}
      />
      
      {/* Name */}
      <span className="relative z-10 text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}

// ============================================================================
// COMPONENTE MARQUEE
// ============================================================================

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
}

function Marquee({ children, direction = "left", speed = 40 }: MarqueeProps) {
  const animationStyle: React.CSSProperties = {
    animationDuration: `${speed}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationName: direction === "left" ? "scroll-left" : "scroll-right",
  };

  return (
    <div className="overflow-hidden group/marquee">
      <div 
        className="flex w-max group-hover/marquee:[animation-play-state:paused]" 
        style={animationStyle}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  const texts = techTexts[language];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación del título
      gsap.fromTo(
        ".tech-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".tech-title",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación del subtítulo
      gsap.fromTo(
        ".tech-subtitle",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".tech-subtitle",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animación de las etiquetas
      gsap.fromTo(
        ".category-label",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".marquee-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0a", paddingTop: "80px", paddingBottom: "80px" }}
    >
      {/* Decoración: Grid de puntos */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Estilos CSS para marquee */}
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      <div className="container mx-auto px-6 relative z-10">
        {/* Título */}
        <h2
          className="tech-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent"
          style={{ marginBottom: "24px" }}
        >
          {texts.title}
        </h2>

        {/* Subtítulo */}
        <p 
          className="tech-subtitle text-text-secondary text-base sm:text-lg w-full text-center"
          style={{ marginBottom: "60px" }}
        >
          {texts.subtitle}
        </p>
      </div>

      {/* Marquee por categorías - Full width */}
      <div className="marquee-section flex flex-col relative z-10" style={{ gap: "40px" }}>
        {/* Frontend */}
        <div>
          <span className="category-label text-accent text-base sm:text-lg font-semibold block text-center" style={{ marginBottom: "20px" }}>
            {texts.frontend}
          </span>
          <Marquee direction="left" speed={40}>
            {frontendTech.map((tech) => (
              <TechCard key={tech.name} {...tech} />
            ))}
          </Marquee>
        </div>

        {/* Backend + Database + Tools */}
        <div>
          <span className="category-label text-accent text-base sm:text-lg font-semibold block text-center" style={{ marginBottom: "20px" }}>
            {texts.backend}
          </span>
          <Marquee direction="right" speed={40}>
            {backendTech.map((tech) => (
              <TechCard key={tech.name} {...tech} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}