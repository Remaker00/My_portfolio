import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const initials = profile.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#151514",
          color: "#f3f1ec",
          fontSize: 84,
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.04em",
        }}
      >
        {initials}
        <span style={{ color: "#e8501c" }}>.</span>
      </div>
    ),
    size,
  );
}
