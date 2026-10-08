import info from "@/generated/build-info.json";

export type BuildInfo = typeof info;

export const buildInfo: BuildInfo = info;

export function formatBuildDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
