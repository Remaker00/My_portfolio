// Writes real, build-time facts the UI displays (commit, build date, test
// count, toolchain versions) so nothing in the status bar is hand-typed.
import { execSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

function git(args) {
  try {
    return execSync(`git ${args}`, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

function countE2eTests() {
  try {
    return readdirSync("e2e")
      .filter((file) => file.endsWith(".spec.ts"))
      .map((file) => readFileSync(`e2e/${file}`, "utf8"))
      .reduce((sum, src) => sum + (src.match(/^\s*test\(/gm) ?? []).length, 0);
  } catch {
    return 0;
  }
}

const version = (pkg) => require(`${pkg}/package.json`).version;

const info = {
  commit: (process.env.VERCEL_GIT_COMMIT_SHA ?? git("rev-parse HEAD") ?? "local").slice(0, 7),
  builtAt: new Date().toISOString(),
  e2eTests: countE2eTests(),
  toolchain: {
    next: version("next"),
    react: version("react"),
    typescript: version("typescript"),
    tailwindcss: version("tailwindcss"),
  },
};

mkdirSync("src/generated", { recursive: true });
writeFileSync("src/generated/build-info.json", JSON.stringify(info, null, 2) + "\n");
