import type { Lang } from "../i18n/ui";

/** Personal / contact info shared across the site. EDIT ME with real data. */
export const profile = {
  name: "Juan Giménez",
  email: "jgimenezeee@gmail.com",
  location: "España",
  social: {
    github: "https://github.com/JuanGimenez7",
    linkedin: "https://www.linkedin.com/",
  },
  /** PDF CVs served from /public. Drop the files there with these names. */
  cv: {
    es: "/cv-es.pdf",
    en: "/cv-en.pdf",
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
  es: "Desarrollador de software apasionado por crear productos web cuidados, accesibles y con buen rendimiento. Me gusta aprender, resolver problemas reales y cuidar los detalles.",
  en: "Software developer passionate about building polished, accessible and performant web products. I enjoy learning, solving real problems and caring about the details.",
};

/** EDIT ME with your real experience. */
export const experience: ExperienceItem[] = [
  {
    role: { es: "Desarrollador Web", en: "Web Developer" },
    company: "Empresa / Freelance",
    period: { es: "2024 — Actualidad", en: "2024 — Present" },
    description: {
      es: "Desarrollo de aplicaciones web modernas con foco en rendimiento y experiencia de usuario.",
      en: "Development of modern web applications with a focus on performance and user experience.",
    },
  },
];

/** EDIT ME with your real education. */
export const education: EducationItem[] = [
  {
    title: {
      es: "Desarrollo de Aplicaciones Web",
      en: "Web Application Development",
    },
    institution: "Centro de formación",
    period: { es: "2022 — 2024", en: "2022 — 2024" },
  },
];

/** Skills shown as chips. EDIT ME. */
export const skills: string[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "Astro",
  "Node.js",
  "HTML & CSS",
  "Tailwind CSS",
  "Git",
  "PostgreSQL",
];
