import fs from "node:fs/promises";
import path from "node:path";
import { PresentationFile, drawSlideToCtx } from "@oai/artifact-tool";
import { Canvas } from "../node_modules/@oai/artifact-tool/node_modules/skia-canvas/lib/index.js";

const W = 1920;
const H = 1080;
const OUT = path.resolve("output");
const SCRATCH = path.resolve("scratch");

async function main() {
  const pptxPath = path.join(OUT, "output.pptx");
  const savedBytes = await fs.readFile(pptxPath);
  const savedDeck = await PresentationFile.importPptx(savedBytes);
  const previewDir = path.join(SCRATCH, "previews");
  await fs.mkdir(previewDir, { recursive: true });

  for (let i = 0; i < savedDeck.slides.items.length; i += 1) {
    const slide = savedDeck.slides.items[i];
    const canvas = new Canvas(W, H);
    const ctx = canvas.getContext("2d");
    await drawSlideToCtx(slide, savedDeck, ctx, null, null, null, null, null, null, null, {});
    await canvas.toFile(path.join(previewDir, `slide-${String(i + 1).padStart(2, "0")}.png`));
  }

  console.log(previewDir);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
