import { siteConfig } from "@/constants/site";
import { ImageResponse } from "next/og";

export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(145deg, #09090b 0%, #18181b 45%, #0f0f14 100%)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "22px",
            color: "#818cf8",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "999px",
              background: "#818cf8",
              boxShadow: "0 0 24px #818cf8",
            }}
          />
          Portfolio
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              color: "#a1a1aa",
              lineHeight: 1.3,
              maxWidth: "820px",
            }}
          >
            {siteConfig.title} · {siteConfig.location}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "8px",
              fontSize: "26px",
              color: "#d4d4d8",
              lineHeight: 1.45,
              maxWidth: "860px",
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#71717a",
          }}
        >
          <span>React · Next.js · TypeScript · Playwright</span>
          <span>{siteConfig.email}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
