import { mkdir, readFile } from "node:fs/promises";
import { chromium } from "playwright";
import sharp from "sharp";

// Render the branded HTML layout; the photograph comes from the generated set.
const [photo, displayFont, bodyFont, businessSource] = await Promise.all([
  readFile("public/images/generated/convoy-v2.webp"),
  readFile("public/fonts/unbounded-variable.woff2"),
  readFile("public/fonts/bricolage-grotesque-variable.woff2"),
  readFile("data/business.ts", "utf8"),
]);
const phone = businessSource.match(/phoneDisplay: "([^"]+)"/)?.[1];
if (!phone) throw new Error("Business phone missing from data/business.ts");
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(`<!doctype html><html lang="en"><head><style>
    @font-face{font-family:Unbounded;src:url(data:font/woff2;base64,${displayFont.toString("base64")});font-weight:100 900}
    @font-face{font-family:Bricolage;src:url(data:font/woff2;base64,${bodyFont.toString("base64")});font-weight:100 900}
    *{box-sizing:border-box}body{margin:0;background:#f6f4ee;color:#102b4e;font-family:Bricolage,sans-serif;padding:30px 36px}
    .wordmark{margin:0;font-family:Unbounded,sans-serif;font-size:105px;font-weight:800;letter-spacing:-6px;line-height:1.08}
    .meta{display:flex;justify-content:space-between;padding:15px 0 19px;border-bottom:2px solid #102b4e;font-size:16px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase}
    .spread{display:grid;grid-template-columns:380px 1fr;gap:24px;padding-top:24px;height:360px}
    h1{font-size:73px;letter-spacing:-3px;line-height:.94;margin:15px 0;font-weight:800}h1 span{display:block}
    .red{color:#c52c34}.photo{width:100%;height:336px;object-fit:cover;object-position:64% 44%}
    .footer{display:flex;justify-content:space-between;align-items:center;padding-top:20px;font-weight:700;font-size:18px}
    .call{background:#c52c34;color:white;padding:10px 18px;font-size:17px;letter-spacing:.3px}
  </style></head><body>
    <p class="wordmark">SEVEN SEA</p>
    <div class="meta"><span>Truck &amp; trailer repair</span><span>Prince George · British Columbia</span></div>
    <div class="spread"><h1><span>Keep the</span><span>north</span><span class="red">moving.</span></h1><img class="photo" alt="Illustrative highway freight scene" src="data:image/webp;base64,${photo.toString("base64")}"></div>
    <div class="footer"><span>Heavy-duty work. Local know-how.</span><span class="call">Call ${phone} ↗</span></div>
  </body></html>`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const screenshot = await page.screenshot({ type: "png" });
  const jpg = await sharp(screenshot).jpeg({ quality: 92, mozjpeg: true }).toBuffer();
  await mkdir("public/images/metadata", { recursive: true });
  await Promise.all([
    sharp(jpg).toFile("app/opengraph-image.jpg"),
    sharp(jpg).toFile("app/twitter-image.jpg"),
    sharp(screenshot).webp({ quality: 90, effort: 3 }).toFile("public/images/metadata/opengraph-image.webp"),
    sharp(screenshot).webp({ quality: 90, effort: 3 }).toFile("public/images/metadata/twitter-image.webp"),
  ]);
  console.log("Updated both 1200 × 630 share images from the new highway visual.");
} finally {
  await browser.close();
}
