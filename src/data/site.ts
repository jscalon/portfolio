import type { Lang } from "../i18n/ui";

/** Personal / contact info shared across the site. EDIT ME with real data. */
export const profile = {
  name: "Juan Giménez",
  email: "jgimenezeee@gmail.com",
  location: "Venezuela",
  /** Display form; `whatsapp` is the same number normalized for wa.me links. */
  phone: "+58 414 4272854",
  whatsapp: "https://wa.me/584144272854",
  social: {
    github: "https://github.com/jscalon",
    linkedin: "https://www.linkedin.com/in/jscalon",
  },
} as const;

type LocalizedText = Record<Lang, string>;

export interface ExperienceItem {
  role: LocalizedText;
  company: string;
  period: LocalizedText;
  description: LocalizedText;
}

export interface EducationItem {
  title: LocalizedText;
  institution: string;
  period: LocalizedText;
}

/** Short bio shown in the About section. EDIT ME. */
export const bio: LocalizedText = {
  es: "Desarrollador de software apasionado por crear aplicaciones web funcionales, atractivas e intuitivas. Me gusta hacer las cosas con excelencia, resolver problemas reales y cuidar los detalles. Integro la IA de forma activa en mi flujo de trabajo como una herramienta más para desarrollar con mayor calidad y velocidad, además de automatizar tareas y procesos.",
  en: "Software developer passionate about building functional, attractive and intuitive web applications. I like doing things with excellence, solving real problems and caring about the details. I actively integrate AI into my workflow as one more tool to build with greater quality and speed, as well as to automate tasks and processes.",
};

/** EDIT ME with your real experience. */
export const experience: ExperienceItem[] = [
  {
    role: {
      es: "Analista de Datos — Administración de Ventas",
      en: "Data Analyst — Sales Administration",
    },
    company: "Febeca",
    period: {
      es: "Abril 2026 — Actualidad",
      en: "April 2026 — Present",
    },
    description: {
      es: "Desarrollo de aplicaciones para el análisis estadístico de los datos de ventas de la empresa, cálculo de presupuestos, cotizaciones y automatización de tareas.",
      en: "Development of applications for the statistical analysis of the company's sales data, budget and quote calculation, and task automation.",
    },
  },
  {
    role: { es: "Desarrollador de software", en: "Software Developer" },
    company: "Botinfy",
    period: {
      es: "Febrero 2026 — Abril 2026",
      en: "February 2026 — April 2026",
    },
    description: {
      es: "Desarrollo de chatbots de IA, gestión automatizada de tickets, web scraping, diseño y creación de páginas web modernas, generación y edición de imágenes y videos con IA.",
      en: "Development of AI chatbots, automated ticket management, web scraping, design and creation of modern websites, and AI-powered image and video generation and editing.",
    },
  },
  {
    role: { es: "Pasante", en: "Intern" },
    company: "Protinal Proagro",
    period: {
      es: "Junio 2025 — Febrero 2026",
      en: "June 2025 — February 2026",
    },
    description: {
      es: "Proyecto de pasantía y trabajo de grado en el departamento de Tecnología: desarrollo de una aplicación web para la gestión remota de productos y precios de las tiendas minoristas de la empresa.",
      en: "Internship and thesis project in the Technology department: development of a web application for the remote management of products and prices across the company's retail stores.",
    },
  },
];

/** EDIT ME with your real education. */
export const education: EducationItem[] = [
  {
    title: {
      es: "Ingeniería de Computación",
      en: "Computer Engineering",
    },
    institution: "Universidad José Antonio Páez",
    period: { es: "2022 — 2026", en: "2022 — 2026" },
  },
];

/** Spoken languages — shown on the CV. */
export const spokenLanguages: { name: LocalizedText; level: LocalizedText }[] = [
  {
    name: { es: "Español", en: "Spanish" },
    level: { es: "Nativo", en: "Native" },
  },
  {
    name: { es: "Inglés", en: "English" },
    level: { es: "Básico / Intermedio", en: "Basic / Intermediate" },
  },
];

/** Skills shown as chips. EDIT ME. */
export const skills: string[] = [
  // Frontend
  "TypeScript",
  "Next.js + React",
  "Astro",
  "Tailwind CSS",
  // Backend
  "Node.js",
  "Express",
  "Python",
  "Django",
  // Datos
  "SQL",
  "Supabase",
  "Excel",
  // IA / Automatización
  "LLM Integration",
  "Generative AI",
  "n8n",
  // Tooling
  "Docker",
  "Figma",
];
