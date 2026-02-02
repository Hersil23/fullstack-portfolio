/**
 * @fileoverview Sección de Servicios
 * @description Muestra los servicios ofrecidos con precios y CTA a WhatsApp
 * @author Herasi Silva
 * @version 1.0.0
 */

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import {
  FiGlobe,
  FiCode,
  FiShoppingCart,
  FiLayout,
  FiZap,
  FiTool,
  FiServer,
  FiLayers,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// TIPOS
// ============================================================================

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  titleES: string;
  description: string;
  descriptionES: string;
  price: string;
  priceES: string;
}

// ============================================================================
// DATOS DE SERVICIOS
// ============================================================================

const services: Service[] = [
  {
    id: "landing",
    icon: <FiGlobe size={32} />,
    title: "Landing Page",
    titleES: "Landing Page",
    description: "Single page websites optimized for conversions and marketing",
    descriptionES: "Páginas web únicas optimizadas para conversiones y marketing",
    price: "From $150",
    priceES: "Desde $150",
  },
  {
    id: "web",
    icon: <FiCode size={32} />,
    title: "Web Development",
    titleES: "Desarrollo Web",
    description: "Corporate websites with multiple pages and custom functionalities",
    descriptionES: "Sitios web corporativos con múltiples páginas y funcionalidades a medida",
    price: "From $200",
    priceES: "Desde $200",
  },
  {
    id: "ecommerce",
    icon: <FiShoppingCart size={32} />,
    title: "E-commerce",
    titleES: "E-commerce",
    description: "Online stores with shopping cart and payment integration",
    descriptionES: "Tiendas online con carrito de compras e integración de pagos",
    price: "From $300",
    priceES: "Desde $300",
  },
  {
    id: "wordpress",
    icon: <FiLayout size={32} />,
    title: "WordPress",
    titleES: "WordPress",
    description: "Custom WordPress sites with themes and plugins",
    descriptionES: "Sitios WordPress personalizados con temas y plugins",
    price: "From $200",
    priceES: "Desde $200",
  },
  {
    id: "saas",
    icon: <FiLayers size={32} />,
    title: "SaaS Applications",
    titleES: "Aplicaciones SaaS",
    description: "Complete systems with backend, database, and user management",
    descriptionES: "Sistemas completos con backend, base de datos y gestión de usuarios",
    price: "From $500",
    priceES: "Desde $500",
  },
  {
    id: "automation",
    icon: <FiZap size={32} />,
    title: "Automations",
    titleES: "Automatizaciones",
    description: "WhatsApp, Email, notifications, and workflow automation",
    descriptionES: "WhatsApp, Email, notificaciones y automatización de procesos",
    price: "From $200",
    priceES: "Desde $200",
  },
  {
    id: "maintenance",
    icon: <FiTool size={32} />,
    title: "Maintenance",
    titleES: "Mantenimiento",
    description: "Monthly support, updates, and technical assistance",
    descriptionES: "Soporte mensual, actualizaciones y asistencia técnica",
    price: "$50/month",
    priceES: "$50/mes",
  },
  {
    id: "hosting",
    icon: <FiServer size={32} />,
    title: "Domain + Hosting",
    titleES: "Dominio + Hosting",
    description: "Annual cPanel hosting, domain registration, and corporate emails",
    descriptionES: "Hosting cPanel anual, registro de dominio y correos corporativos",
    price: "From $40/year",
    priceES: "Desde $40/año",
  },
];

// ============================================================================
// TEXTOS
// ============================================================================

const texts = {
  es: {
    title: "Mis Servicios",
    subtitle: "Soluciones digitales para tu negocio",
    quote: "Cotizar",
  },
  en: {
    title: "My Services",
    subtitle: "Digital solutions for your business",
    quote: "Get Quote",
  },
};

// ============================================================================
// WHATSAPP CONFIG
// ============================================================================

const WHATSAPP_NUMBER = "584145116337";

function getWhatsAppLink(service: string, language: "es" | "en") {
  const message =
    language === "es"
      ? `Hola, estoy interesado en el servicio de ${service}. ¿Podrías darme más información?`
      : `Hi, I'm interested in the ${service} service. Could you give me more information?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ============================================================================
// COMPONENTE SERVICE CARD
// ============================================================================

interface ServiceCardProps {
  service: Service;
  language: "es" | "en";
  quoteText: string;
}

function ServiceCard({ service, language, quoteText }: ServiceCardProps) {
  const title = language === "es" ? service.titleES : service.title;
  const description = language === "es" ? service.descriptionES : service.description;
  const price = language === "es" ? service.priceES : service.price;

  return (
    <div className="service-card group relative bg-[#141414] rounded-2xl p-5 border border-border/50 transition-all duration-500 hover:border-accent/50 flex flex-col h-full min-h-[260px]">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent rounded-2xl" />
      </div>

      {/* Icon */}
      <div className="relative z-10 text-accent mb-3 transition-transform duration-300 group-hover:scale-110">
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-sm text-text-secondary mb-3 flex-grow">
        {description}
      </p>

      {/* Price */}
      <p className="relative z-10 text-xl font-bold text-accent mb-3">
        {price}
      </p>

      {/* CTA Button */}
      <a
        href={getWhatsAppLink(title, language)}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#1f1f1f] text-text-primary text-sm font-medium hover:bg-accent hover:text-black transition-all duration-300"
      >
        <FaWhatsapp size={18} />
        {quoteText}
      </a>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  const t = texts[language];

  // Animaciones GSAP
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Título
      gsap.fromTo(
        ".services-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-title",
            start: "top 85%",
          },
        }
      );

      // Subtítulo
      gsap.fromTo(
        ".services-subtitle",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-subtitle",
            start: "top 85%",
          },
        }
      );

      // Cards
      gsap.fromTo(
        ".service-card",
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen py-20 sm:py-24 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Decoración de fondo */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(255,140,50,0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,140,50,0.05) 0%, transparent 40%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Título */}
        <h2
          className="services-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent"
          style={{ marginBottom: "16px" }}
        >
          {t.title}
        </h2>

        {/* Subtítulo */}
        <p
          className="services-subtitle text-text-secondary text-base sm:text-lg text-center w-full"
          style={{ marginBottom: "50px" }}
        >
          {t.subtitle}
        </p>

        {/* Grid de servicios */}
        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              language={language}
              quoteText={t.quote}
            />
          ))}
        </div>
      </div>
    </section>
  );
}