import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("shows role, stack and a way to make contact without scrolling", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toContainText("production");
  await expect(page.getByText("Frontend Engineer").first()).toBeInViewport();
  await expect(page.getByRole("link", { name: /Email me/ })).toBeInViewport();
  await expect(page.getByRole("link", { name: "CV ↓" })).toHaveAttribute("href", /\.pdf$/);
});

test("first release is open and the others toggle on click", async ({ page }) => {
  const first = page.getByRole("button", { name: /PoweredByAI/ });
  const second = page.getByRole("button", { name: /Zaprep/ });

  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("region", { name: "PoweredByAI release notes" })).toContainText("10,000+");

  await second.click();
  await expect(second).toHaveAttribute("aria-expanded", "true");
  await expect(first).toHaveAttribute("aria-expanded", "false");
});

test("releases are keyboard navigable with j/k", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard shortcuts are a desktop affordance");
  await page.getByRole("button", { name: /PoweredByAI/ }).focus();
  await page.keyboard.press("j");
  await expect(page.getByRole("button", { name: /Zaprep/ })).toBeFocused();
  await page.keyboard.press("k");
  await page.keyboard.press("k");
  await expect(page.getByRole("button", { name: /EnviroByte/ })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: /EnviroByte/ })).toHaveAttribute("aria-expanded", "true");
});

test("live audit runs every check and reports no failures", async ({ page }) => {
  await page.getByRole("button", { name: "Run audit" }).click();
  await expect(page.getByTestId("audit-summary")).toBeVisible();
  const log = page.getByRole("log", { name: "Audit results" });
  await expect(log.locator('[data-status="fail"]')).toHaveCount(0);
  await expect(log.locator("li")).toHaveCount(17);
});

test("contact form requires every field", async ({ page }) => {
  await page.getByRole("button", { name: "Send message" }).click();
  const invalid = await page.locator("#contact form :invalid").count();
  expect(invalid).toBe(3);
});

test("renders without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
  await page.reload();
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});

test("has no horizontal overflow", async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("skill balls fall into the pit and can be grabbed and thrown", async ({ page, isMobile }) => {
  test.skip(isMobile, "drag is covered by the desktop pointer");
  const pit = page.locator("#skills [data-live]");
  await page.locator("#skills").scrollIntoViewIfNeeded();
  await expect(pit).toBeVisible();

  const ball = page.getByRole("list", { name: "Skills" }).getByRole("listitem").filter({ hasText: /^React$/ });
  await page.waitForTimeout(2500);
  const before = (await ball.boundingBox())!;
  const box = (await pit.boundingBox())!;

  await page.mouse.move(before.x + before.width / 2, before.y + before.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + 120, box.y + 100, { steps: 10 });
  await page.mouse.up();

  const after = (await ball.boundingBox())!;
  expect(Math.hypot(after.x - before.x, after.y - before.y)).toBeGreaterThan(100);
});

test("skills render as a static list when reduced motion is preferred", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await page.locator("#skills").scrollIntoViewIfNeeded();
  await expect(page.locator("#skills [data-live]")).toHaveCount(0);
  await expect(page.getByRole("list", { name: "Skills" }).getByRole("listitem")).toHaveCount(21);
  await context.close();
});
