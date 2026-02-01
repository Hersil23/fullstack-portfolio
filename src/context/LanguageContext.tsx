/**
 * @fileoverview Contexto global para el manejo de idiomas
 * @description Provee estado de idioma compartido entre componentes
 * @author Herasi Silva
 * @version 1.0.0
 */

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ============================================================================
// TIPOS
// ============================================================================

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

// ============================================================================
// CONTEXTO
// ============================================================================

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

/**
 * Proveedor del contexto de idioma
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element} Provider con el estado de idioma
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * Hook para acceder al contexto de idioma
 * @returns {LanguageContextType} Estado y funciones de idioma
 * @throws {Error} Si se usa fuera del LanguageProvider
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}