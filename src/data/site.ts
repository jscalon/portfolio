import type { Lang } from "../i18n/ui";

/** Personal / contact info shared across the site. EDIT ME with real data. */
export const profile = {
  name: "Juan Giménez",
  email: "jgimenezeee@gmail.com",
  /** Split so structured data can use locality and country separately. */
  location: { city: "Valencia", country: "Venezuela" },
  /** Display form; `whatsapp` is the same number normalized for wa.me links. */
  phone: "+58 414 4272854",
  whatsapp: "https://wa.me/584144272854",
  social: {
    github: "https://github.com/jscalon",
    linkedin: "https://www.linkedin.com/in/jscalon",
  },
  /** Drives the hero availability badge. Flip to false when not looking. */
  openToWork: true,
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
  /**
   * Optional status, e.g. "Graduado". A closed date range only implies the
   * degree was finished; this says it. Omit it for a programme still running.
   */
  note?: LocalizedText;
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
      es: "Desarrollo de chatbots de IA, diseño y creación de páginas web modernas, generación y edición de imágenes y videos con IA.",
      en: "Development of AI chatbots, design and creation of modern websites, and AI-powered image and video generation and editing.",
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
    note: { es: "Graduado", en: "Graduated" },
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

export interface SkillGroup {
  label: LocalizedText;
  items: string[];
}

/**
 * Skills shown as chips, grouped. Order matters: the core stack leads and AI
 * comes after it, so the profile does not read as "AI person who also codes".
 */
export const skills: SkillGroup[] = [
  {
    label: { es: "Frontend", en: "Frontend" },
    items: ["TypeScript", "React", "Next.js", "Astro", "Tailwind CSS"],
  },
  {
    label: { es: "Backend", en: "Backend" },
    items: ["Node.js", "Express", "Python", "Django"],
  },
  {
    label: { es: "Datos", en: "Data" },
    items: ["SQL", "Supabase", "Excel"],
  },
  {
    label: { es: "IA / Automatización", en: "AI / Automation" },
    items: ["LLM Integration", "n8n"],
  },
  {
    label: { es: "Herramientas", en: "Tooling" },
    items: ["Docker", "Figma"],
  },
];
