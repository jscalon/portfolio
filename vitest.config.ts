/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// Astro's own Vite config, so tests can import modules that pull in `astro:*`.
export default getViteConfig({
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
