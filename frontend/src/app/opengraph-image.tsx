import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { releases } from "@/content/releases";

export const alt = `${profile.name} — ${profile.role}. ${profile.headline}`;
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
          padding: "64px 72px",
          background: "#f3f1ec",
          color: "#151514",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 22, color: "#66645f" }}>
          <span>{profile.handle}</span>
          <span style={{ color: "#18794e" }}>● {profile.availability.toLowerCase()}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, lineHeight: 1, letterSpacing: "-0.03em", display: "flex", flexWrap: "wrap" }}>
            I ship frontends that hold up in&nbsp;<span style={{ color: "#e8501c", fontStyle: "italic" }}>production.</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, fontFamily: "monospace", fontSize: 22, borderTop: "2px solid #d8d4cb", paddingTop: 24 }}>
          <span>{profile.name}</span>
          {releases.map((r) => (
            <span key={r.id} style={{ color: "#66645f" }}>
              {r.product}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
