/**
 * @fileoverview Hooks personalizados para animaciones con GSAP
 * @description Proporciona hooks reutilizables para integrar GSAP con React
 * @author Herasi Silva
 * @version 1.0.0
 */

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ============================================================================
// REGISTRO DE PLUGINS
// ============================================================================

/**
 * Registra los plugins de GSAP
 * @description Se ejecuta solo en el cliente
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// TIPOS
// ============================================================================

/**
 * Opciones para animación de fade in
 * @typedef {Object} FadeInOptions
 */
interface FadeInOptions {
  /** Dirección del fade: "up", "down", "left", "right" */
  direction?: "up" | "down" | "left" | "right";
  /** Duración en segundos */
  duration?: number;
  /** Delay en segundos */
  delay?: number;
  /** Distancia del movimiento en píxeles */
  distance?: number;
  /** Si usar ScrollTrigger */
  scrollTrigger?: boolean;
  /** Posición de inicio del ScrollTrigger */
  start?: string;
}

/**
 * Opciones para animación stagger
 * @typedef {Object} StaggerOptions
 */
interface StaggerOptions {
  /** Dirección del fade */
  direction?: "up" | "down" | "left" | "right";
  /** Duración de cada elemento */
  duration?: number;
  /** Tiempo entre cada elemento */
  stagger?: number;
  /** Delay inicial */
  delay?: number;
  /** Distancia del movimiento */
  distance?: number;
  /** Si usar ScrollTrigger */
  scrollTrigger?: boolean;
  /** Posición de inicio del ScrollTrigger */
  start?: string;
}

/**
 * Opciones para animación de texto
 * @typedef {Object} TextRevealOptions
 */
interface TextRevealOptions {
  /** Duración en segundos */
  duration?: number;
  /** Delay en segundos */
  delay?: number;
  /** Si usar ScrollTrigger */
  scrollTrigger?: boolean;
}

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook para animación de fade in con dirección
 * @description Anima un elemento con fade y movimiento opcional
 * @param {FadeInOptions} options - Opciones de configuración
 * @returns {RefObject<HTMLDivElement>} Ref para asignar al elemento
 * @example
 * const ref = useFadeIn({ direction: "up", duration: 0.8 })
 * return <div ref={ref}>Contenido</div>
 */
export function useFadeIn(options: FadeInOptions = {}): RefObject<HTMLDivElement | null> {
  const {
    direction = "up",
    duration = 0.6,
    delay = 0,
    distance = 40,
    scrollTrigger = true,
    start = "top 85%",
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Configurar valores iniciales según dirección
    const initialProps: gsap.TweenVars = {
      opacity: 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    };

    // Configurar animación
    const animationProps: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: "power2.out",
    };

    // Agregar ScrollTrigger si está habilitado
    if (scrollTrigger) {
      animationProps.scrollTrigger = {
        trigger: element,
        start,
        toggleActions: "play none none none",
      };
    }

    // Establecer estado inicial
    gsap.set(element, initialProps);

    // Ejecutar animación
    const animation = gsap.to(element, animationProps);

    // Cleanup
    return () => {
      animation.kill();
    };
  }, [direction, duration, delay, distance, scrollTrigger, start]);

  return elementRef;
}

/**
 * Hook para animación stagger en múltiples elementos
 * @description Anima elementos hijos con efecto escalonado
 * @param {string} childSelector - Selector CSS de los elementos hijos
 * @param {StaggerOptions} options - Opciones de configuración
 * @returns {RefObject<HTMLDivElement>} Ref para asignar al contenedor
 * @example
 * const ref = useStagger(".card", { stagger: 0.1 })
 * return <div ref={ref}><div className="card">1</div><div className="card">2</div></div>
 */
export function useStagger(
  childSelector: string,
  options: StaggerOptions = {}
): RefObject<HTMLDivElement | null> {
  const {
    direction = "up",
    duration = 0.5,
    stagger = 0.1,
    delay = 0,
    distance = 30,
    scrollTrigger = true,
    start = "top 85%",
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (children.length === 0) return;

    // Configurar valores iniciales según dirección
    const initialProps: gsap.TweenVars = {
      opacity: 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    };

    // Configurar animación
    const animationProps: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger,
      ease: "power2.out",
    };

    // Agregar ScrollTrigger si está habilitado
    if (scrollTrigger) {
      animationProps.scrollTrigger = {
        trigger: container,
        start,
        toggleActions: "play none none none",
      };
    }

    // Establecer estado inicial
    gsap.set(children, initialProps);

    // Ejecutar animación
    const animation = gsap.to(children, animationProps);

    // Cleanup
    return () => {
      animation.kill();
    };
  }, [childSelector, direction, duration, stagger, delay, distance, scrollTrigger, start]);

  return containerRef;
}

/**
 * Hook para animación de revelado de texto
 * @description Anima texto carácter por carácter o palabra por palabra
 * @param {TextRevealOptions} options - Opciones de configuración
 * @returns {RefObject<HTMLElement>} Ref para asignar al elemento de texto
 * @example
 * const ref = useTextReveal({ duration: 1 })
 * return <h1 ref={ref}>Hola Mundo</h1>
 */
export function useTextReveal(
  options: TextRevealOptions = {}
): RefObject<HTMLElement | null> {
  const { duration = 0.8, delay = 0, scrollTrigger = false } = options;

  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Configurar animación
    const animationProps: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
    };

    // Agregar ScrollTrigger si está habilitado
    if (scrollTrigger) {
      animationProps.scrollTrigger = {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      };
    }

    // Establecer estado inicial
    gsap.set(element, { opacity: 0, y: 20 });

    // Ejecutar animación
    const animation = gsap.to(element, animationProps);

    // Cleanup
    return () => {
      animation.kill();
    };
  }, [duration, delay, scrollTrigger]);

  return textRef;
}

/**
 * Hook para parallax en scroll
 * @description Crea efecto parallax en un elemento durante el scroll
 * @param {number} speed - Velocidad del parallax (negativo = más lento, positivo = más rápido)
 * @returns {RefObject<HTMLDivElement>} Ref para asignar al elemento
 * @example
 * const ref = useParallax(-0.3)
 * return <div ref={ref}>Fondo con parallax</div>
 */
export function useParallax(speed: number = -0.2): RefObject<HTMLDivElement | null> {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animation = gsap.to(element, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Cleanup
    return () => {
      animation.kill();
    };
  }, [speed]);

  return elementRef;
}

/**
 * Hook para animación en hover
 * @description Configura animaciones de entrada y salida en hover
 * @param {gsap.TweenVars} hoverProps - Propiedades de animación en hover
 * @param {number} duration - Duración de la animación
 * @returns {RefObject<HTMLDivElement>} Ref para asignar al elemento
 * @example
 * const ref = useHoverAnimation({ scale: 1.05, y: -5 })
 * return <div ref={ref}>Hover me</div>
 */
export function useHoverAnimation(
  hoverProps: gsap.TweenVars = { scale: 1.05 },
  duration: number = 0.3
): RefObject<HTMLDivElement | null> {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    /** Maneja el evento mouseenter */
    const handleMouseEnter = () => {
      gsap.to(element, {
        ...hoverProps,
        duration,
        ease: "power2.out",
      });
    };

    /** Maneja el evento mouseleave */
    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        y: 0,
        x: 0,
        rotation: 0,
        duration,
        ease: "power2.out",
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hoverProps, duration]);

  return elementRef;
}