/**
 * Regenerates `public/og-image.png`, the social card shared for the home, the CV,
 * the projects list and the 404.
 *
 *   pnpm og
 *
 * Run it whenever `src/assets/profile.webp` changes: the card embeds the portrait,
 * so it goes stale silently otherwise — nothing in the build checks it.
 *
 * The card is deliberately centered so it still reads if a client falls back to a
 * square crop, and its text stays in English for both locales ("AI", not "IA"),
 * since one card serves /es/ and /en/ alike.
 *
 * Note on the typeface: Inter only exists here as a .woff2 inside node_modules and
 * the SVG renderer cannot see it, so the card uses the closest system font. Install
 * Inter system-wide if you want an exact match with the site.
 */
import sharp from "sharp";

const SRC = "src/assets/profile.webp";
const OUT = "public/og-image.png";

const W = 1200;
const H = 630;
/** Rendered at 2x and scaled down: finer text antialiasing than drawing at 1x. */
const SCALE = 2;

const PORTRAIT = 170; // diameter, final px
const CX = 600; // portrait centre
const CY = 158;

const FONT = "Segoe UI, Inter, Arial, sans-serif";
const NAME = "Juan Giménez";
const ROLE = "Software Developer";
const STACK = "TypeScript · Node · Python · SQL · AI";
const DOMAIN = "jscalon.dev";

const s = (n) => n * SCALE;

const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${s(W)}" height="${s(H)}">
  <defs>
    <radialGradient id="g" cx="50%" cy="12%" r="95%">
      <stop offset="0%" stop-color="#7a1636"/>
      <stop offset="55%" stop-color="#3d0f1e"/>
      <stop offset="100%" stop-color="#1a0810"/>
    </radialGradient>
  </defs>
  <rect width="${s(W)}" height="${s(H)}" fill="url(#g)"/>
  <circle cx="${s(CX)}" cy="${s(CY)}" r="${s(PORTRAIT / 2 + 3)}"
          fill="none" stroke="#ffffff" stroke-opacity="0.92" stroke-width="${s(5)}"/>
  <text x="${s(600)}" y="${s(340)}" text-anchor="middle" font-family="${FONT}"
        font-weight="800" font-size="${s(88)}" fill="#ffffff">${NAME}</text>
  <text x="${s(600)}" y="${s(400)}" text-anchor="middle" font-family="${FONT}"
        font-weight="700" font-size="${s(40)}" fill="#eb9db6">${ROLE}</text>
  <text x="${s(600)}" y="${s(470)}" text-anchor="middle" font-family="${FONT}"
        font-size="${s(27)}" fill="#b09aa2">${STACK}</text>
  <text x="${s(600)}" y="${s(556)}" text-anchor="middle" font-family="${FONT}"
        font-weight="700" font-size="${s(29)}" fill="#ffffff">${DOMAIN}</text>
</svg>`);

const circleMask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${PORTRAIT}" height="${PORTRAIT}">` +
    `<circle cx="${PORTRAIT / 2}" cy="${PORTRAIT / 2}" r="${PORTRAIT / 2}" fill="#fff"/></svg>`,
);

// Two passes on purpose. sharp reorders its pipeline and applies `resize` before
// `composite`, so compositing and scaling in one call would paste the portrait onto
// an already-scaled canvas and land it off-centre.
const base = await sharp(background)
  .resize(W, H, { kernel: "lanczos3" })
  .png()
  .toBuffer();

const portrait = await sharp(SRC)
  .resize(PORTRAIT, PORTRAIT)
  .composite([{ input: circleMask, blend: "dest-in" }])
  .png()
  .toBuffer();

const { size } = await sharp(base)
  .composite([{ input: portrait, left: CX - PORTRAIT / 2, top: CY - PORTRAIT / 2 }])
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`${OUT} — ${W}x${H}, ${(size / 1024).toFixed(1)} kB`);
console.log("Remember: og:image:width/height in BaseLayout must match these dimensions.");
