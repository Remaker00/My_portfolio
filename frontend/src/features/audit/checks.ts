// Real checks run against the live document in the visitor's browser.
// Nothing here is pre-recorded: every value is measured when the audit runs.

export type CheckStatus = "pass" | "warn" | "fail" | "info";
export type CheckGroup = "performance" | "accessibility" | "seo";

export type CheckResult = {
  id: string;
  group: CheckGroup;
  label: string;
  status: CheckStatus;
  value: string;
  hint?: string;
};

export type VitalsSnapshot = {
  lcp: number | null;
  cls: number;
};

type Check = (doc: Document, vitals: VitalsSnapshot) => CheckResult;

const ms = (value: number) => (value >= 1000 ? `${(value / 1000).toFixed(2)}s` : `${Math.round(value)}ms`);
const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`;

function rate(value: number, good: number, poor: number): CheckStatus {
  if (value <= good) return "pass";
  return value <= poor ? "warn" : "fail";
}

function accessibleName(el: Element): string {
  const labelledBy = el.getAttribute("aria-labelledby");
  const fromLabelledBy = labelledBy
    ?.split(/\s+/)
    .map((id) => el.ownerDocument.getElementById(id)?.textContent ?? "")
    .join(" ");
  const imgAlt = Array.from(el.querySelectorAll("img[alt]"))
    .map((img) => img.getAttribute("alt"))
    .join(" ");
  return (
    el.getAttribute("aria-label") ||
    fromLabelledBy ||
    el.textContent ||
    imgAlt ||
    el.getAttribute("title") ||
    ""
  ).trim();
}

const performanceChecks: Check[] = [
  (_doc, { lcp }) => ({
    id: "lcp",
    group: "performance",
    label: "Largest Contentful Paint",
    ...(lcp === null
      ? { status: "info", value: "n/a", hint: "This browser does not report LCP." }
      : { status: rate(lcp, 2500, 4000), value: ms(lcp), hint: "good ≤ 2.5s" }),
  }),
  (_doc, { cls }) => ({
    id: "cls",
    group: "performance",
    label: "Cumulative Layout Shift",
    status: rate(cls, 0.1, 0.25),
    value: cls.toFixed(3),
    hint: "good ≤ 0.1",
  }),
  () => {
    const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    const ttfb = nav ? nav.responseStart - nav.startTime : 0;
    return {
      id: "ttfb",
      group: "performance",
      label: "Time to First Byte",
      status: nav ? rate(ttfb, 800, 1800) : "info",
      value: nav ? ms(ttfb) : "n/a",
      hint: "good ≤ 800ms",
    };
  },
  () => {
    const scripts = (performance.getEntriesByType("resource") as PerformanceResourceTiming[]).filter(
      (entry) => entry.initiatorType === "script" || entry.name.endsWith(".js"),
    );
    const bytes = scripts.reduce((sum, entry) => sum + (entry.encodedBodySize || 0), 0);
    return {
      id: "js-weight",
      group: "performance",
      label: "JavaScript shipped (compressed)",
      status: rate(bytes, 250 * 1024, 500 * 1024),
      value: `${kb(bytes)} in ${scripts.length} files`,
      hint: "budget ≤ 250 KB",
    };
  },
  (doc) => {
    const nodes = doc.getElementsByTagName("*").length;
    return {
      id: "dom-size",
      group: "performance",
      label: "DOM size",
      status: rate(nodes, 1400, 3000),
      value: `${nodes} elements`,
      hint: "good ≤ 1,400",
    };
  },
];

const accessibilityChecks: Check[] = [
  (doc) => {
    const lang = doc.documentElement.lang;
    return {
      id: "lang",
      group: "accessibility",
      label: "Document language set",
      status: lang ? "pass" : "fail",
      value: lang || "missing",
    };
  },
  (doc) => {
    const count = doc.querySelectorAll("h1").length;
    return {
      id: "single-h1",
      group: "accessibility",
      label: "Exactly one <h1>",
      status: count === 1 ? "pass" : "fail",
      value: `${count} found`,
    };
  },
  (doc) => {
    const levels = Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((h) => Number(h.tagName[1]));
    const skips = levels.filter((level, i) => i > 0 && level - levels[i - 1] > 1).length;
    return {
      id: "heading-order",
      group: "accessibility",
      label: "Heading levels never skip",
      status: skips === 0 ? "pass" : "warn",
      value: skips === 0 ? `${levels.length} headings in order` : `${skips} skipped level(s)`,
    };
  },
  (doc) => {
    const images = Array.from(doc.querySelectorAll("img"));
    const missing = images.filter((img) => !img.hasAttribute("alt")).length;
    return {
      id: "img-alt",
      group: "accessibility",
      label: "Images have alt text",
      status: missing === 0 ? "pass" : "fail",
      value: `${images.length - missing}/${images.length}`,
    };
  },
  (doc) => {
    const controls = Array.from(doc.querySelectorAll("a[href], button"));
    const unnamed = controls.filter((el) => !accessibleName(el)).length;
    return {
      id: "control-names",
      group: "accessibility",
      label: "Links & buttons have accessible names",
      status: unnamed === 0 ? "pass" : "fail",
      value: `${controls.length - unnamed}/${controls.length}`,
    };
  },
  (doc) => {
    const fields = Array.from(doc.querySelectorAll("input:not([type=hidden]), textarea, select"));
    const unlabeled = fields.filter(
      (field) =>
        !(field.id && doc.querySelector(`label[for="${field.id}"]`)) &&
        !field.closest("label") &&
        !field.getAttribute("aria-label"),
    ).length;
    return {
      id: "form-labels",
      group: "accessibility",
      label: "Form fields are labelled",
      status: unlabeled === 0 ? "pass" : "fail",
      value: `${fields.length - unlabeled}/${fields.length}`,
    };
  },
  (doc) => {
    const landmarks = ["header", "nav", "main", "footer"].filter((tag) => doc.querySelector(tag));
    return {
      id: "landmarks",
      group: "accessibility",
      label: "Landmark regions present",
      status: landmarks.length === 4 ? "pass" : "warn",
      value: landmarks.join(", "),
    };
  },
  () => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    return {
      id: "reduced-motion",
      group: "accessibility",
      label: "Honours your motion preference",
      status: "info",
      value: reduced ? "reduced — animations off" : "full motion",
    };
  },
];

const seoChecks: Check[] = [
  (doc) => {
    const length = doc.title.length;
    return {
      id: "title",
      group: "seo",
      label: "Title length",
      status: length >= 10 && length <= 70 ? "pass" : "warn",
      value: `${length} chars`,
      hint: "10–70",
    };
  },
  (doc) => {
    const length = doc.querySelector('meta[name="description"]')?.getAttribute("content")?.length ?? 0;
    return {
      id: "description",
      group: "seo",
      label: "Meta description length",
      status: length >= 50 && length <= 170 ? "pass" : length ? "warn" : "fail",
      value: length ? `${length} chars` : "missing",
      hint: "50–170",
    };
  },
  (doc) => {
    const present = ["og:title", "og:description", "og:image"].filter((p) =>
      doc.querySelector(`meta[property="${p}"]`),
    ).length;
    return {
      id: "open-graph",
      group: "seo",
      label: "Open Graph tags",
      status: present === 3 ? "pass" : "warn",
      value: `${present}/3`,
    };
  },
  (doc) => {
    const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href");
    return {
      id: "canonical",
      group: "seo",
      label: "Canonical URL",
      status: canonical ? "pass" : "warn",
      value: canonical ? new URL(canonical).host : "missing",
    };
  },
];

export const checks: Check[] = [...performanceChecks, ...accessibilityChecks, ...seoChecks];

/** Subscribes to LCP and CLS from page load (buffered) and returns a live reader. */
export function observeVitals(): { read: () => VitalsSnapshot; disconnect: () => void } {
  const snapshot: VitalsSnapshot = { lcp: null, cls: 0 };
  const observers: PerformanceObserver[] = [];
  const supported = PerformanceObserver.supportedEntryTypes ?? [];

  if (supported.includes("largest-contentful-paint")) {
    const lcp = new PerformanceObserver((list) => {
      const last = list.getEntries().at(-1);
      if (last) snapshot.lcp = last.startTime;
    });
    lcp.observe({ type: "largest-contentful-paint", buffered: true });
    observers.push(lcp);
  }

  if (supported.includes("layout-shift")) {
    const cls = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
        if (!entry.hadRecentInput) snapshot.cls += entry.value;
      }
    });
    cls.observe({ type: "layout-shift", buffered: true });
    observers.push(cls);
  }

  return {
    read: () => ({ ...snapshot }),
    disconnect: () => observers.forEach((observer) => observer.disconnect()),
  };
}
