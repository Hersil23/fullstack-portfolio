/**
 * @fileoverview Sección de Proyectos
 * @description Muestra proyectos educativos y reales con filtros
 * @author Herasi Silva
 * @version 1.0.0
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { FiGithub, FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// TIPOS
// ============================================================================

interface Project {
  id: string;
  name: string;
  nameES: string;
  description: string;
  descriptionES: string;
  image: string;
  tech: string[];
  category: "educational" | "real";
  github?: string;
  demo?: string;
}

// ============================================================================
// DATOS DE PROYECTOS
// ============================================================================

const projects: Project[] = [
  // ==================== PROYECTOS EDUCATIVOS ====================
  {
    id: "clone-youtube",
    name: "YouTube Clone",
    nameES: "Clone de YouTube",
    description: "Educational clone of YouTube to practice HTML and CSS fundamentals",
    descriptionES: "Clone educativo de YouTube para practicar fundamentos de HTML y CSS",
    image: "/images/projects/clone-youtube.png",
    tech: ["HTML", "CSS"],
    category: "educational",
    github: "https://github.com/Hersil23/cloneducativoyoutube",
    demo: "https://hersil23.github.io/cloneducativoyoutube/",
  },
  {
    id: "clone-netflix",
    name: "Netflix Clone",
    nameES: "Clone de Netflix",
    description: "Educational Netflix clone to practice web styling with Sass",
    descriptionES: "Clone educativo de Netflix para practicar estilos web con Sass",
    image: "/images/projects/clone-netflix.png",
    tech: ["HTML", "CSS", "Sass"],
    category: "educational",
    github: "https://github.com/Hersil23/cloneducativoSASS",
    demo: "https://hersil23.github.io/cloneducativoSASS/",
  },
  {
    id: "clone-spotify",
    name: "Spotify Clone",
    nameES: "Clone de Spotify",
    description: "Educational Spotify clone built with Tailwind CSS",
    descriptionES: "Clone educativo de Spotify construido con Tailwind CSS",
    image: "/images/projects/clone-spotify.png",
    tech: ["HTML", "CSS", "Tailwind"],
    category: "educational",
    github: "https://github.com/Hersil23/ProyectoEducativoTailwind",
    demo: "https://hersil23.github.io/ProyectoEducativoTailwind/",
  },
  {
    id: "login-api",
    name: "Login & Favorites App",
    nameES: "App Login y Favoritos",
    description: "Web app with login, register and favorites using LocalStorage and API consumption",
    descriptionES: "Aplicación web con login, registro y favoritos usando LocalStorage y consumo de API",
    image: "/images/projects/login-api.png",
    tech: ["HTML", "Tailwind", "JavaScript"],
    category: "educational",
    github: "https://github.com/Hersil23/Proyecto-final-JS",
    demo: "https://hersil23.github.io/Proyecto-final-JS/",
  },
  {
    id: "clima-app",
    name: "World Weather App",
    nameES: "App Clima Mundial",
    description: "React weather application with real-time geolocation and API consumption",
    descriptionES: "Aplicación del clima en React con geolocalización en tiempo real y consumo de API",
    image: "/images/projects/clima-app.png",
    tech: ["React", "API"],
    category: "educational",
    github: "https://github.com/Hersil23/ClimaMundial",
    demo: "https://clima-app-three-phi.vercel.app/",
  },
  {
    id: "portfolio-locutor",
    name: "Voice Actor Portfolio",
    nameES: "Portfolio de Locutor",
    description: "Landing page designed for a professional voice actor with GSAP animations",
    descriptionES: "Landing page diseñada para un locutor profesional con animaciones GSAP",
    image: "/images/projects/portfolio-locutor.png",
    tech: ["HTML", "Tailwind", "JavaScript", "GSAP"],
    category: "educational",
    github: "https://github.com/Hersil23/Portfolio_locutor",
    demo: "https://locutor.herasi.dev",
  },

  // ==================== PROYECTOS REALES ====================
  {
    id: "pacigest",
    name: "PaciGest Plus",
    nameES: "PaciGest Plus",
    description: "Complete SaaS for medical practice management with appointments, patients, and billing",
    descriptionES: "SaaS completo para gestión de consultorios médicos con citas, pacientes y facturación",
    image: "/images/projects/pacigest.png",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Email Automation"],
    category: "real",
    demo: "https://pacigestplus.com",
  },
  {
  id: "portfolio-frontend",
  name: "Frontend Portfolio",
  nameES: "Portfolio Frontend",
  description: "My first portfolio showcasing frontend projects before transitioning to full-stack development",
  descriptionES: "Mi primer portfolio mostrando proyectos frontend antes de mi transición a desarrollo full-stack",
  image: "/images/projects/portfolio-frontend.png",
  tech: ["React", "Next.js", "Tailwind", "GSAP"],
  category: "real",
  github: "https://github.com/Hersil23/Portfolio-dev-frontend",
  demo: "https://front.herasi.dev",
},
  {
    id: "hersilshop",
    name: "HersilShop",
    nameES: "HersilShop",
    description: "E-commerce platform with inventory management",
    descriptionES: "Plataforma e-commerce con gestión de inventario",
    image: "/images/projects/hersilshop.png",
    tech: ["PHP", "MySQL", "JavaScript"],
    category: "real",
    demo: "https://twistpro.net",
  },
  {
    id: "sistema-ventas",
    name: "Sales System",
    nameES: "Sistema de Ventas",
    description: "Complete sales management system with reports and inventory control",
    descriptionES: "Sistema completo de gestión de ventas con reportes y control de inventario",
    image: "/images/projects/sistema-ventas.png",
    tech: ["PHP", "MySQL", "JavaScript"],
    category: "real",
    demo: "https://ventas.twistpro.net",
  },
  {
    id: "sankalpa",
    name: "Sankalpa Ilumina",
    nameES: "Sankalpa Ilumina",
    description: "E-commerce website for artisanal candles and wellness products",
    descriptionES: "Sitio web e-commerce para velas artesanales y productos de bienestar",
    image: "/images/projects/sankalpa.png",
    tech: ["PHP", "MySQL", "JavaScript"],
    category: "real",
    demo: "https://sankalpailumina.com",
  },
  {
    id: "maxpro",
    name: "MaxPro Services",
    nameES: "MaxPro Services",
    description: "Corporate website for a services LLC based in USA",
    descriptionES: "Sitio web corporativo para una LLC de servicios en USA",
    image: "/images/projects/maxpro.png",
    tech: ["WordPress"],
    category: "real",
    demo: "https://maxproservices.us",
  },
  {
    id: "fabricacero",
    name: "Fabrica Cero",
    nameES: "Fabrica Cero",
    description: "Professional website for a welding specialist LLC in USA",
    descriptionES: "Sitio web profesional para una LLC especialista en soldadura en USA",
    image: "/images/projects/fabricacero.png",
    tech: ["WordPress"],
    category: "real",
    demo: "https://fabriacero.net",
  },
  {
    id: "servilab",
    name: "Servilab CA",
    nameES: "Servilab CA",
    description: "Website for a clinical laboratory with services and appointments",
    descriptionES: "Sitio web para laboratorio clínico con servicios y citas",
    image: "/images/projects/servilab.png",
    tech: ["WordPress"],
    category: "real",
    demo: "https://servilabca.com",
  },
  {
    id: "nsmultiservices",
    name: "NS Multiservices",
    nameES: "NS Multiservices",
    description: "Corporate website for a cleaning and multiservices LLC",
    descriptionES: "Sitio web corporativo para LLC de limpieza y multiservicio",
    image: "/images/projects/nsmultiservices.png",
    tech: ["WordPress"],
    category: "real",
    demo: "https://nsmultiservices.net",
  },
];

// ============================================================================
// TEXTOS
// ============================================================================

const texts = {
  es: {
    title: "Mis Proyectos",
    subtitle: "Una selección de mi trabajo educativo y profesional",
    all: "Todos",
    educational: "Educativos",
    real: "Reales",
    viewProject: "Ver Proyecto",
  },
  en: {
    title: "My Projects",
    subtitle: "A selection of my educational and professional work",
    all: "All",
    educational: "Educational",
    real: "Real",
    viewProject: "View Project",
  },
};

// ============================================================================
// COMPONENTE PROJECT CARD
// ============================================================================

interface ProjectCardProps {
  project: Project;
  language: "es" | "en";
  texts: typeof texts.es;
}

function ProjectCard({ project, language, texts }: ProjectCardProps) {
  const mainLink = project.demo || project.github;

  return (
    <div className="project-card group relative bg-[#141414] rounded-2xl overflow-hidden border border-border/50 transition-all duration-500 hover:border-accent/50">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent" />
      </div>

      {/* Image container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={language === "es" ? project.nameES : project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay on hover - solo muestra GitHub si existe */}
        {project.github && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-accent hover:text-black transition-all duration-300"
              aria-label="View GitHub"
            >
              <FiGithub size={22} />
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
          {language === "es" ? project.nameES : project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {language === "es" ? project.descriptionES : project.description}
        </p>

        {/* Tech - texto simple con puntos */}
        <p className="text-xs text-text-secondary/70 mb-5">
          {project.tech.join(" · ")}
        </p>

        {/* Botón único centrado */}
        {mainLink && (
          <a
            href={mainLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#1f1f1f] text-text-primary text-sm font-medium hover:bg-accent hover:text-black transition-all duration-300"
          >
            {texts.viewProject}
            <FiExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const [filter, setFilter] = useState<"all" | "educational" | "real">("all");

  const t = texts[language];

  // Filtrar proyectos
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  // Animaciones GSAP
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Título
      gsap.fromTo(
        ".projects-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-title",
            start: "top 85%",
          },
        }
      );

      // Subtítulo
      gsap.fromTo(
        ".projects-subtitle",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-subtitle",
            start: "top 85%",
          },
        }
      );

      // Filtros
      gsap.fromTo(
        ".filter-btn",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".filters-container",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animación de cards cuando cambia el filtro
  useEffect(() => {
    gsap.fromTo(
      ".project-card",
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [filter]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-20 sm:py-24 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#0f0f0f" }}
    >
      {/* Decoración de fondo */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(255,140,50,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,140,50,0.05) 0%, transparent 40%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Título */}
        <h2
          className="projects-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent"
          style={{ marginBottom: "16px" }}
        >
          {t.title}
        </h2>

        {/* Subtítulo */}
        <p
          className="projects-subtitle text-text-secondary text-base sm:text-lg text-center w-full"
          style={{ marginBottom: "40px" }}
        >
          {t.subtitle}
        </p>

        {/* Filtros */}
        <div
          className="filters-container flex justify-center gap-8 flex-wrap"
          style={{ marginBottom: "50px" }}
        >
          {(["all", "real", "educational"] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`filter-btn relative px-2 py-2 text-base font-medium transition-all duration-300 ${
                filter === filterType
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {t[filterType]}
              {/* Línea inferior animada */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  filter === filterType ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              language={language}
              texts={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}