/**
 * @fileoverview Cursor personalizado con efecto glow
 * @description Luz que sigue el mouse e ilumina el área
 * @author Herasi Silva
 * @version 1.0.0
 */

"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detectar dispositivo táctil
    if ("ontouchstart" in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detectar hover en elementos interactivos
    const addHoverListeners = () => {
      const elements = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, .tech-card"
      );

      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Agregar listeners iniciales y cuando cambie el DOM
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, []);

  // No renderizar en dispositivos táctiles
  if (isTouchDevice) return null;

  return (
    <>
      {/* Ocultar cursor nativo */}
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Glow grande - luz difusa */}
      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: isHovering ? "350px" : "250px",
          height: isHovering ? "350px" : "250px",
          background: isHovering
            ? "radial-gradient(circle, rgba(255,140,50,0.2) 0%, rgba(255,140,50,0.05) 40%, transparent 70%)"
            : "radial-gradient(circle, rgba(255,140,50,0.1) 0%, rgba(255,140,50,0.03) 40%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease, background 0.3s ease",
        }}
      />

      {/* Punto central */}
      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: isHovering ? "14px" : "8px",
          height: isHovering ? "14px" : "8px",
          backgroundColor: "#ff8c32",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovering
            ? "0 0 20px #ff8c32, 0 0 40px #ff8c32, 0 0 60px rgba(255,140,50,0.5)"
            : "0 0 15px #ff8c32, 0 0 30px rgba(255,140,50,0.4)",
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.3s ease, box-shadow 0.3s ease",
        }}
      />
    </>
  );
}