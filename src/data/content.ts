/**
 * @fileoverview Configuración de contenido estático del portfolio
 * @description Contiene toda la información personal, redes sociales, tecnologías,
 * proyectos y servicios que se muestran en el portfolio
 * @author Herasi Silva
 * @version 1.0.0
 */

// ============================================================================
// TIPOS
// ============================================================================

/**
 * Información de una tecnología del stack
 * @typedef {Object} TechItem
 * @property {string} name - Nombre de la tecnología
 * @property {string} icon - Identificador del icono
 */
interface TechItem {
  name: string;
  icon: string;
}

/**
 * Información de un proyecto
 * @typedef {Object} Project
 * @property {string} id - Identificador único (debe coincidir con las keys en messages)
 * @property {string} image - Ruta de la imagen del proyecto
 * @property {string | null} url - URL del proyecto en producción
 * @property {string | null} github - URL del repositorio
 * @property {boolean} featured - Si es un proyecto destacado
 */
interface Project {
  id: string;
  image: string;
  url: string | null;
  github: string | null;
  featured: boolean;
}

/**
 * Información de un servicio
 * @typedef {Object} Service
 * @property {string} id - Identificador único (debe coincidir con las keys en messages)
 * @property {string} icon - Identificador del icono
 * @property {number} price - Precio base del servicio en USD
 * @property {string} [priceType] - Tipo de precio (opcional: "monthly", "hourly")
 */
interface Service {
  id: string;
  icon: string;
  price: number;
  priceType?: string;
}

/**
 * Item de navegación
 * @typedef {Object} NavItem
 * @property {string} id - Identificador (debe coincidir con las keys en messages)
 * @property {string} href - Enlace de la sección
 */
interface NavItem {
  id: string;
  href: string;
}

// ============================================================================
// INFORMACIÓN PERSONAL
// ============================================================================

/**
 * Información personal del desarrollador
 * @constant
 * @description Datos de contacto y ubicación
 */
export const personalInfo = {
  /** Nombre completo */
  name: "Herasi Silva",
  /** Título profesional */
  title: "Full Stack Developer",
  /** Correo electrónico de contacto */
  email: "herasidesweb@gmail.com",
  /** Número de teléfono con código de país */
  phone: "+584145116337",
  /** País de residencia */
  location: "Venezuela",
  /** Dominio del sitio web */
  website: "herasi.dev",
} as const;

// ============================================================================
// REDES SOCIALES
// ============================================================================

/**
 * Enlaces a redes sociales y plataformas
 * @constant
 * @description URLs completas de los perfiles profesionales
 */
export const socialLinks = {
  /** Perfil de GitHub */
  github: "https://github.com/Hersil23",
  /** Perfil de Instagram */
  instagram: "https://www.instagram.com/herasi.dev",
  /** Perfil de TikTok */
  tiktok: "https://www.tiktok.com/@herasi.dev",
  /** Enlace directo de WhatsApp */
  whatsapp: "https://wa.me/584145116337",
} as const;

// ============================================================================
// TECH STACK
// ============================================================================

/**
 * Stack tecnológico organizado por categorías
 * @constant
 * @description Tecnologías dominadas por el desarrollador
 */
export const techStack: {
  frontend: TechItem[];
  backend: TechItem[];
  tools: TechItem[];
} = {
  /** Tecnologías de Frontend */
  frontend: [
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "TypeScript", icon: "typescript" },
    { name: "JavaScript", icon: "javascript" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "HTML5", icon: "html" },
    { name: "CSS3", icon: "css" },
  ],
  /** Tecnologías de Backend */
  backend: [
    { name: "Node.js", icon: "nodejs" },
    { name: "Express", icon: "express" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "MySQL", icon: "mysql" },
    { name: "PHP", icon: "php" },
    { name: "REST API", icon: "api" },
  ],
  /** Herramientas de desarrollo */
  tools: [
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "VS Code", icon: "vscode" },
    { name: "Vercel", icon: "vercel" },
    { name: "Postman", icon: "postman" },
    { name: "Figma", icon: "figma" },
  ],
};

// ============================================================================
// PROYECTOS
// ============================================================================

/**
 * Lista de proyectos del portfolio
 * @constant
 * @description Los textos (título, descripción, tags) están en los archivos de mensajes
 */
export const projects: Project[] = [
  {
    id: "pacigest",
    image: "/images/projects/pacigest.png",
    url: "https://pacigestplus.com",
    github: null,
    featured: true,
  },
  {
    id: "sistemaVentas",
    image: "/images/projects/sistema-ventas.png",
    url: null,
    github: null,
    featured: true,
  },
  {
    id: "sankalpa",
    image: "/images/projects/sankalpa.png",
    url: null,
    github: null,
    featured: false,
  },
];

// ============================================================================
// SERVICIOS
// ============================================================================

/**
 * Servicios ofrecidos con precios en USD
 * @constant
 * @description Los textos (título, descripción) están en los archivos de mensajes
 */
export const services: Service[] = [
  {
    id: "web",
    icon: "globe",
    price: 150,
  },
  {
    id: "webapp",
    icon: "code",
    price: 500,
  },
  {
    id: "ecommerce",
    icon: "cart",
    price: 400,
  },
  {
    id: "maintenance",
    icon: "tool",
    price: 50,
    priceType: "monthly",
  },
];

// ============================================================================
// NAVEGACIÓN
// ============================================================================

/**
 * Items del menú de navegación
 * @constant
 * @description Define las secciones y sus anclas
 */
export const navigation: NavItem[] = [
  { id: "about", href: "#about" },
  { id: "techStack", href: "#tech-stack" },
  { id: "projects", href: "#projects" },
  { id: "services", href: "#services" },
  { id: "contact", href: "#contact" },
];