import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";

const sourceRoot = "C:\\Users\\AdamZinker\\OneDrive - THEPERFECTPART\\Desktop\\ABBA USB PHOTOS";
const destRoot = path.join(process.cwd(), "public", "gallery-projects");
const ffmpeg =
  "C:\\Users\\AdamZinker\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.1-full_build\\bin\\ffmpeg.exe";

const sets = [
  { dest: "best-fiends", source: "Best Fiends", prefer: ["AGXL0667"] },
  { dest: "bingo-blitz", source: "Bingo blits/Waffe maker gifts", prefer: ["IMG_9971"] },
  { dest: "hof/fridge", source: "HOF/Fridge gift", prefer: ["QTAF6591"] },
  { dest: "hof/icecream", source: "HOF/Ice cream maker gifts", prefer: ["IMG_0852"] },
  { dest: "hof/massage", source: "HOF/Massage gun gifts", prefer: ["IMG_0833"] },
  { dest: "hof/phonograph", source: "HOF/Phonograph gift", prefer: ["IMG_5206"] },
  { dest: "jackpota", source: "JACKPOTA", prefer: ["IMG_7526"] },
  { dest: "papaya/christmas", source: "Papaya/Christmas gift", prefer: ["IMG_6908"] },
  { dest: "papaya/thanksgiving", source: "Papaya/Thanksging Day", prefer: ["IMG_6883"] },
  { dest: "slotomania/blender", source: "Slotomania/Blender gift", prefer: ["IMG_0965"] },
  { dest: "slotomania/cooler", source: "Slotomania/Cooler gift", prefer: ["IMG_2193"] },
  { dest: "slotomania/diffuser", source: "Slotomania/Diffuser+air purifier gift", prefer: ["IMG_4649"] },
  { dest: "slotomania/headphones", source: "Slotomania/Headphone+ coffee warmer", prefer: ["IMG_0803"] },
  { dest: "slotomania/kettle", source: "Slotomania/Kettle gift", prefer: ["IMG_4619"] },
  { dest: "slotomania/lcd", source: "Slotomania/lcd gift box", prefer: ["IMG_0290"] },
  { dest: "slotomania/birthday-fridge", source: "Slotomania/Slotomaina birthday mini fridges", prefer: ["IMG_5715"] },
  { dest: "slotomania/basket", source: "Slotomania/Slotomania basket gift", prefer: ["IMG_2543"] },
  { dest: "solitaire/lamp", source: "Solitaire gifts/Christmas Lamp gift", prefer: ["YLBQ2018"] },
  { dest: "solitaire/compost", source: "Solitaire gifts/Compost bin gift", prefer: ["CQGI3739"] },
  { dest: "solitaire/july4", source: "Solitaire gifts/Stanley cup gift", prefer: ["IMG_2929"] },
  { dest: "vip-premium/picnic", source: "Vip Premuim/Basket bbq gift", prefer: ["GKWH4103"] },
  { dest: "vip-premium/fridge", source: "Vip Premuim/Fridges gift", prefer: ["IMG_0013"] },
  { dest: "vip-premium/july4", source: "Vip Premuim/Hof July, 4th gift", prefer: ["IMG_7144"] },
  { dest: "vip-premium/phonograph", source: "Vip Premuim/Phonograph", prefer: ["IMG_0946"] },
  { dest: "wooga/blanket", source: "Wooga/Blanket+Christmas ball gifts", prefer: ["IMG_6004"] },
  { dest: "wooga/chocolate", source: "Wooga/Chocolates box", prefer: ["IMG_7969"] },
  { dest: "wooga/picnic", source: "Wooga/Picnic gifts", prefer: ["IMG_0842"] },
];

function rank(fileName, prefer) {
  const stem = fileName.replace(/^regenerated_/i, "").replace(/\.[^.]+$/, "");
  const index = prefer.findIndex((token) => stem.toLowerCase() === token.toLowerCase());
  return index === -1 ? 100 + stem.toLowerCase() : String(index).padStart(2, "0");
}

rmSync(destRoot, { recursive: true, force: true });
mkdirSync(destRoot, { recursive: true });

let failed = 0;
let converted = 0;

for (const set of sets) {
  const sourceDir = path.join(sourceRoot, set.source);
  const files = readdirSync(sourceDir)
    .filter((name) => /^regenerated_/i.test(name) && /\.(jpe?g|png|webp)$/i.test(name))
    .sort((a, b) => String(rank(a, set.prefer)).localeCompare(String(rank(b, set.prefer))) || a.localeCompare(b));

  if (!files.length) {
    console.error("NO REGENERATED FILES", set.source);
    failed += 1;
    continue;
  }

  const destDir = path.join(destRoot, set.dest);
  mkdirSync(destDir, { recursive: true });
  files.forEach((fileName, index) => {
    const destRel = `${set.dest}/${String(index + 1).padStart(2, "0")}.jpg`;
    const dest = path.join(destRoot, destRel);
    const source = path.join(sourceDir, fileName);
    const result = spawnSync(
      ffmpeg,
      ["-y", "-i", source, "-frames:v", "1", "-update", "1", "-vf", "scale='min(1800,iw)':-1", "-q:v", "3", dest],
      { stdio: "pipe" },
    );
    if (result.status !== 0) {
      failed += 1;
      console.error("FAIL", fileName, result.stderr?.toString().split("\n").slice(-4).join(" | "));
      return;
    }
    converted += 1;
    console.log("OK", destRel, "←", fileName);
  });
}

console.log(`Converted ${converted} regenerated photos.`);
if (failed) {
  console.error(`Finished with ${failed} failures.`);
  process.exit(1);
}
