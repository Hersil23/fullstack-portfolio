/**
 * @fileoverview Configuración de robots.txt para SEO
 * @description Define reglas de rastreo para motores de búsqueda
 * @author Herasi Silva
 * @version 1.0.0
 */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://herasi.dev/sitemap.xml",
  };
}
