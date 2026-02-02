/**
 * @fileoverview Sección de Contacto con animación de red
 * @description Footer grande con redes sociales y animación de puntos conectados
 * @author Herasi Silva
 * @version 1.0.0
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FiGithub, FiInstagram, FiMail, FiCopy, FiCheck } from "react-icons/fi";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";

// ============================================================================
// TIPOS
// ============================================================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

// ============================================================================
// DATOS DE CONTACTO
// ============================================================================

const EMAIL = "herasidesweb@gmail.com";
const WHATSAPP_NUMBER = "584145116337";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const socialLinks = [
  {
    id: "github",
    name: "GitHub",
    icon: <FiGithub size={20} />,
    url: "https://github.com/Hersil23",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <FiInstagram size={20} />,
    url: "https://www.instagram.com/herasi.dev",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: <FaTiktok size={20} />,
    url: "https://www.tiktok.com/@herasi.dev",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <FaWhatsapp size={20} />,
    url: WHATSAPP_LINK,
  },
];

// ============================================================================
// TEXTOS
// ============================================================================

const texts = {
  es: {
    title: "Conectemos",
    subtitle: "Estoy disponible para nuevos proyectos. ¡Contáctame!",
    copied: "¡Copiado!",
    copyright: "Herasi Silva • Full Stack Developer",
  },
  en: {
    title: "Let's Connect",
    subtitle: "I'm available for new projects. Get in touch!",
    copied: "Copied!",
    copyright: "Herasi Silva • Full Stack Developer",
  },
};

// ============================================================================
// COMPONENTE NETWORK ANIMATION
// ============================================================================

function NetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000);

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar conexiones - COLOR NARANJA MÁS ACENTUADO
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 140, 50, ${0.4 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Dibujar partículas - COLOR NARANJA
      for (const particle of particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 140, 50, 0.8)";
        ctx.fill();
      }
    };

    const updateParticles = () => {
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebote en los bordes
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      }
    };

    const animate = () => {
      drawParticles();
      updateParticles();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9 }}
    />
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function Contact() {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const t = texts[language];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Network Animation Background */}
      <NetworkAnimation />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
        {/* Title */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent"
          style={{ marginBottom: "16px", fontStyle: "italic" }}
        >
          {t.title}
        </h2>

        {/* Subtitle */}
        <p 
          className="text-text-secondary text-base sm:text-lg text-center"
          style={{ marginBottom: "50px" }}
        >
          {t.subtitle}
        </p>

        {/* Email Box */}
        <div className="flex justify-center" style={{ marginBottom: "40px" }}>
          <div className="flex items-center gap-3 px-6 py-4 bg-[#141414] border border-border/50 rounded-xl hover:border-accent/50 transition-all duration-300">
            <FiMail size={20} className="text-accent" />
            <span className="text-text-primary text-sm sm:text-base">{EMAIL}</span>
            <button
              onClick={handleCopyEmail}
              className="p-2 hover:bg-[#1f1f1f] rounded-lg transition-colors duration-300"
              aria-label="Copy email"
            >
              {copied ? (
                <FiCheck size={18} className="text-green-400" />
              ) : (
                <FiCopy size={18} className="text-text-secondary hover:text-accent" />
              )}
            </button>
          </div>
        </div>

        {/* Social Links Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#141414] border border-border/50 rounded-xl hover:border-accent/50 transition-all duration-300 group"
              >
                <span className="text-text-secondary group-hover:text-accent transition-colors duration-300">
                  {social.icon}
                </span>
                <span className="text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}