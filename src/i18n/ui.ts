export const languages = {
  es: "Español",
  en: "English",
} as const;

export const defaultLang = "es";

export type Lang = keyof typeof languages;

/**
 * UI strings (short labels, section titles, navigation). Long-form content
 * (the projects themselves) lives in the Markdown content collection instead.
 */
export const ui = {
  es: {
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.about": "Sobre mí",
    "nav.contact": "Contacto",

    "hero.role": "Desarrollador de Software",
    "hero.tagline":
      "Construyo aplicaciones web rápidas, accesibles y bien diseñadas.",
    "hero.cta.projects": "Ver proyectos",
    "hero.cta.cv": "Descargar CV",
    "hero.cta.contact": "Contacto",

    "about.title": "Sobre mí",
    "about.experience": "Experiencia",
    "about.education": "Formación",
    "about.skills": "Tecnologías",
    "about.downloadCv": "Descargar CV (PDF)",

    "projects.title": "Proyectos",
    "projects.featured": "Proyectos destacados",
    "projects.all": "Ver todos los proyectos",
    "projects.viewRepo": "Código",
    "projects.viewLive": "Ver demo",
    "projects.back": "Volver a proyectos",
    "projects.stack": "Stack",
    "projects.empty": "Pronto habrá proyectos aquí.",

    "contact.title": "¿Hablamos?",
    "contact.subtitle":
      "Disponible para nuevas oportunidades y colaboraciones.",
    "contact.email": "Enviar email",

    "footer.builtWith": "Hecho con Astro y Tailwind CSS",
    "lang.switch": "English",
    "theme.toggle": "Cambiar tema",
  },
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact",

    "hero.role": "Software Developer",
    "hero.tagline":
      "I build fast, accessible and well-designed web applications.",
    "hero.cta.projects": "View projects",
    "hero.cta.cv": "Download CV",
    "hero.cta.contact": "Contact",

    "about.title": "About me",
    "about.experience": "Experience",
    "about.education": "Education",
    "about.skills": "Technologies",
    "about.downloadCv": "Download CV (PDF)",

    "projects.title": "Projects",
    "projects.featured": "Featured projects",
    "projects.all": "View all projects",
    "projects.viewRepo": "Code",
    "projects.viewLive": "Live demo",
    "projects.back": "Back to projects",
    "projects.stack": "Stack",
    "projects.empty": "Projects coming soon.",

    "contact.title": "Let's talk",
    "contact.subtitle": "Available for new opportunities and collaborations.",
    "contact.email": "Send email",

    "footer.builtWith": "Built with Astro and Tailwind CSS",
    "lang.switch": "Español",
    "theme.toggle": "Toggle theme",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
