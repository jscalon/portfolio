// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://jscalon.dev",
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  // Prefetch every internal link on hover so navigation feels instant.
  // `true` alone only enables the feature; links must opt in without this.
  prefetch: { prefetchAll: true },
  integrations: [
    sitemap({
      // Emit <xhtml:link> alternates so crawlers pair the ES/EN URLs.
      i18n: { defaultLocale: "es", locales: { es: "es-ES", en: "en-US" } },
      // Keep unlisted company-specific CV variants (`/es/cv/<slug>`) out of the sitemap.
      filter: (page) => !/\/(es|en)\/cv\/.+/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
