/**
 * Regenerates the raster icons from `public/favicon.svg`.
 *
 *   pnpm icons
 *
 * Run it whenever the mark changes. The SVG is the source; these two only exist
 * because some clients cannot use it, and nothing in the build notices when they
 * drift out of sync with it.
 *
 *   apple-touch-icon.png  iOS home screen. Flattened onto the brand colour on
 *                         purpose: iOS composites any transparency as **black**, so
 *                         the mark's open corner would arrive as a black wedge. The
 *                         same flattening is what makes it square and full-bleed,
 *                         which iOS also wants — it applies its own rounded mask,
 *                         and a pre-rounded PNG gets black in the corners too.
 *   favicon-32.png        Fallback for browsers that ignore SVG favicons. Keeps its
 *                         alpha, so the corner stays open as designed. Declared
 *                         after the SVG in BaseLayout, so modern browsers take the
 *                         vector and only the rest fall back to this.
 */
import { readFileSync } from "node:fs";
import sharp from "sharp";

const SRC = "public/favicon.svg";
const BRAND = "#a92a4e";

const svg = readFileSync(SRC);

const outputs = [
  { size: 180, file: "public/apple-touch-icon.png", flatten: true },
  { size: 32, file: "public/favicon-32.png", flatten: false },
];

for (const { size, file, flatten } of outputs) {
  // Rasterise the SVG large and scale down: sharp renders it at the density given,
  // so a low one would hand us a blurry source to resize from.
  let pipeline = sharp(svg, { density: 512 }).resize(size, size);
  if (flatten) pipeline = pipeline.flatten({ background: BRAND });

  const { size: bytes } = await pipeline.png({ compressionLevel: 9 }).toFile(file);
  console.log(`${file} — ${size}x${size}, ${(bytes / 1024).toFixed(1)} kB`);
}
