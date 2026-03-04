/**
 * @fileoverview Generación dinámica del sitemap.xml
 * @description Define las URLs del sitio para indexación en motores de búsqueda
 * @author Herasi Silva
 * @version 1.0.0
 */

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://herasi.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
