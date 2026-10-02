import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const origin = process.env.TEST_ORIGIN || "http://localhost:3000";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
await mkdir("test-results", { recursive: true });
const results = [];

async function loadImages(page) {
  for (
    let y = 0;
    y < (await page.evaluate(() => document.body.scrollHeight));
    y += 650
  ) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(90);
  }
  await page.waitForTimeout(1000);
}

try {
  for (const test of [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "desktop-900", width: 1440, height: 900 },
    { name: "short-desktop", width: 1280, height: 720 },
    { name: "tablet-landscape", width: 1024, height: 768 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "mobile", width: 390, height: 844 },
    { name: "small-mobile", width: 360, height: 800 },
    { name: "narrow-mobile", width: 320, height: 640 },
    {
      name: "reduced-motion",
      width: 1440,
      height: 1000,
      reducedMotion: "reduce",
    },
    {
      name: "no-javascript",
      width: 390,
      height: 844,
      javaScriptEnabled: false,
    },
  ]) {
    const context = await browser.newContext({
      viewport: { width: test.width, height: test.height },
      reducedMotion: test.reducedMotion || "no-preference",
      javaScriptEnabled: test.javaScriptEnabled ?? true,
    });
    // The once-per-session intro has its own check below.
    await context.addInitScript(() => {
      try {
        sessionStorage.setItem("ss-intro", "1");
      } catch {}
    });
    // Headless browser inputs must never request system pointer ownership.
    await context.addInitScript(() => {
      Element.prototype.requestPointerLock = () => {};
      Element.prototype.setPointerCapture = () => {};
      Element.prototype.releasePointerCapture = () => {};
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const response = await page.goto(origin, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200, `${test.name}: response`);
    await page.evaluate(() => document.fonts.ready);
    await loadImages(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    assert.equal(overflow, false, `${test.name}: horizontal overflow`);
    const missingImages = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter(
            (image) =>
              getComputedStyle(image).display !== "none" &&
              image.getBoundingClientRect().width > 10 &&
              !image.naturalWidth,
          )
          .map((image) => image.src),
      );
    assert.deepEqual(missingImages, [], `${test.name}: images must load`);
    assert.equal(await page.locator("h1").count(), 1, "One primary heading");
    const missingAnchors = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .filter((link) => !document.getElementById(link.hash.slice(1)))
          .map((link) => link.hash),
      );
    assert.deepEqual(missingAnchors, [], `${test.name}: anchor targets`);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(850);
    await page.screenshot({
      path: `test-results/${test.name}-full.png`,
      fullPage: true,
    });
    await page.screenshot({ path: `test-results/${test.name}-hero.png` });
    const pins = await page.locator(".pin-spacer").count();
    // The services split and the road sequence pin only on wide, tall
    // screens with motion.
    const pinnable =
      test.width >= 1024 &&
      test.height >= 680 &&
      !test.reducedMotion &&
      test.javaScriptEnabled !== false;
    assert.equal(pins, pinnable ? 2 : 0, `${test.name}: pin state`);
    if (test.javaScriptEnabled !== false) {
      const hidden = await page
        .locator("h1, h2, .service-card, .step-card, .bento-card, .faq-item")
        .evaluateAll(
          (elements) =>
            elements.filter((el) => {
              el.scrollIntoView();
              const style = getComputedStyle(el);
              return style.visibility === "hidden" || style.opacity === "0";
            }).length,
        );
      await page.evaluate(() => window.scrollTo(0, 0));
      assert.equal(hidden, 0, `${test.name}: content left hidden`);
    }
    let violations = [];
    if (test.javaScriptEnabled !== false) {
      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      violations = scan.violations.map((issue) => ({
        id: issue.id,
        impact: issue.impact,
        nodes: issue.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      }));
      if (test.width <= 760) {
        const menu = page.locator(".menu-toggle");
        await menu.focus();
        await page.keyboard.press("Enter");
        assert.equal(await menu.getAttribute("aria-expanded"), "true");
        await page.keyboard.press("Escape");
        assert.equal(await menu.getAttribute("aria-expanded"), "false");
        assert.equal(
          await menu.evaluate((element) => element === document.activeElement),
          true,
          "Menu returns keyboard focus",
        );
        assert.equal(
          await page.evaluate(() => document.body.style.overflow),
          "",
          "Menu releases scrolling",
        );
        await menu.click();
        await page
          .getByRole("navigation", { name: "Mobile navigation" })
          .getByRole("link", { name: "Services" })
          .click();
        await page.waitForTimeout(800);
        assert.equal(await menu.getAttribute("aria-expanded"), "false");
        await page.screenshot({
          path: `test-results/${test.name}-services.png`,
        });
      }
    }
    results.push({
      name: test.name,
      width: test.width,
      height: test.height,
      overflow,
      pins,
      violations,
      errors,
    });
    console.log(JSON.stringify(results.at(-1)));
    await context.close();
  }

  // The intro plays once per session, then hands over to the hero.
  const introContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const introPage = await introContext.newPage();
  await introPage.goto(origin, { waitUntil: "domcontentloaded" });
  await introPage.waitForTimeout(300);
  assert.equal(
    await introPage
      .locator(".preloader")
      .evaluate((el) => getComputedStyle(el).display),
    "grid",
    "Intro shows on a first visit",
  );
  await introPage.waitForTimeout(4500);
  assert.equal(
    await introPage
      .locator(".preloader")
      .evaluate((el) => getComputedStyle(el).display),
    "none",
    "Intro hands over to the page",
  );
  assert.equal(
    await introPage.evaluate(() =>
      document.documentElement.classList.contains("scroll-locked"),
    ),
    false,
    "Intro releases scrolling",
  );
  await introPage.reload({ waitUntil: "domcontentloaded" });
  assert.equal(
    await introPage
      .locator(".preloader")
      .evaluate((el) => getComputedStyle(el).display),
    "none",
    "Intro is skipped on a repeat visit",
  );
  await introContext.close();

  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  await context.addInitScript(() => {
    try {
      sessionStorage.setItem("ss-intro", "1");
    } catch {}
  });
  const page = await context.newPage();
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.locator(".process").scrollIntoViewIfNeeded();
  await page.setViewportSize({ width: 1440, height: 640 });
  await page.waitForTimeout(400);
  assert.equal(
    await page.locator(".pin-spacer").count(),
    0,
    "Pins are removed on a short viewport",
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.waitForTimeout(400);
  assert.equal(
    await page.locator(".pin-spacer").count(),
    2,
    "Pins are restored once on a tall viewport",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  assert.equal(
    await page.locator(".pin-spacer").count(),
    0,
    "Pins are removed when resizing to mobile",
  );
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
    "Resize stays within viewport",
  );
  for (const path of ["/privacy", "/terms", "/photo-credits"]) {
    const response = await page.goto(`${origin}${path}`, {
      waitUntil: "networkidle",
    });
    assert.equal(response.status(), 200);
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    results.push({
      path,
      violations: scan.violations.map((issue) => ({
        id: issue.id,
        impact: issue.impact,
        nodes: issue.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
    });
  }
  await context.close();

  // Inner pages, at desktop, phone and reduced-motion sizes.
  const servicePaths = [
    "/services",
    "/services/truck-repair",
    "/services/trailer-repair",
    "/services/fleets",
    "/about",
    "/how-it-works",
    "/contact",
  ];
  for (const view of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
    { name: "narrow", width: 320, height: 640 },
    { name: "reduced", width: 1440, height: 900, reducedMotion: "reduce" },
  ]) {
    const serviceContext = await browser.newContext({
      viewport: { width: view.width, height: view.height },
      reducedMotion: view.reducedMotion || "no-preference",
    });
    await serviceContext.addInitScript(() => {
      try {
        sessionStorage.setItem("ss-intro", "1");
      } catch {}
    });
    const servicePage = await serviceContext.newPage();
    for (const path of servicePaths) {
      const errors = [];
      servicePage.on("pageerror", (error) => errors.push(error.message));
      const onConsole = (message) => {
        if (message.type() === "error") errors.push(message.text());
      };
      servicePage.on("console", onConsole);
      // The first request for each photograph runs the image optimizer,
      // which can take a while on a cold server.
      const response = await servicePage.goto(`${origin}${path}`, {
        waitUntil: "networkidle",
        timeout: 90000,
      });
      assert.equal(response.status(), 200, `${path}: response`);
      await loadImages(servicePage);
      const overflow = await servicePage.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      assert.equal(overflow, false, `${view.name} ${path}: overflow`);
      assert.equal(
        await servicePage.locator("h1").count(),
        1,
        `${path}: one primary heading`,
      );
      const hidden = await servicePage
        .locator(
          "h2, .ch-copy, .pc-card, .mo-frame, .cx-card, .hw-step, .faq-item",
        )
        .evaluateAll(
          (elements) =>
            elements.filter((el) => {
              const style = getComputedStyle(el);
              return style.visibility === "hidden" || style.opacity === "0";
            }).length,
        );
      assert.equal(hidden, 0, `${view.name} ${path}: content left hidden`);
      if (view.name === "desktop" || view.name === "mobile")
        await servicePage.screenshot({
          path: `test-results/service-${view.name}-${path.split("/").pop()}.png`,
          fullPage: true,
        });
      const scan = await new AxeBuilder({ page: servicePage })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      servicePage.off("console", onConsole);
      results.push({
        path: `${view.name} ${path}`,
        errors,
        violations: scan.violations.map((issue) => ({
          id: issue.id,
          impact: issue.impact,
          nodes: issue.nodes.map((node) => ({
            target: node.target,
            summary: node.failureSummary,
          })),
        })),
      });
      console.log(JSON.stringify(results.at(-1)).slice(0, 400));
    }
    await serviceContext.close();
  }

  // Unknown services are a 404.
  const missingContext = await browser.newContext();
  const missing = await (
    await missingContext.newPage()
  ).goto(`${origin}/services/not-a-service`);
  assert.equal(missing.status(), 404, "Unknown service returns 404");
  await missingContext.close();

  await writeFile(
    "test-results/browser-report.json",
    JSON.stringify(results, null, 2),
  );
  assert.deepEqual(
    results.filter((result) => result.violations.length),
    [],
    "Accessibility violations",
  );
  assert.deepEqual(
    results.filter((result) => result.errors?.length),
    [],
    "Browser errors",
  );
  console.log("Browser checks passed.");
} finally {
  await browser.close();
}
