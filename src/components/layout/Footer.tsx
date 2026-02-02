/**
 * @fileoverview Footer del sitio
 * @description Muestra copyright y derechos reservados
 * @author Herasi Silva
 * @version 1.0.0
 */

"use client";

import { useLanguage } from "@/context/LanguageContext";

const texts = {
  es: {
    copyright: "Herasi Silva • Full Stack Developer",
    rights: "Todos los derechos reservados",
  },
  en: {
    copyright: "Herasi Silva • Full Stack Developer",
    rights: "All rights reserved",
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const t = texts[language];

  return (
    <footer 
      className="relative z-10"
      style={{ backgroundColor: "#0a0a0a", paddingTop: "24px", paddingBottom: "40px" }}
    >
      <div className="text-center">
        <p className="text-text-secondary text-sm">
          © {new Date().getFullYear()} {t.copyright}
        </p>
        <p className="text-text-secondary/60 text-xs mt-1">
          {t.rights}
        </p>
      </div>
    </footer>
  );
}