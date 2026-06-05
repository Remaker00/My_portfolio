import { siteConfig } from "@/constants/site";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const initials = siteConfig.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          background:
            "linear-gradient(145deg, #09090b 0%, #18181b 55%, #0f0f14 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "96px",
            height: "96px",
            borderRadius: "999px",
            border: "3px solid rgba(129, 140, 248, 0.45)",
            background: "#18181b",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "40px",
              fontWeight: 700,
              color: "#818cf8",
              letterSpacing: "-0.04em",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {initials}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
