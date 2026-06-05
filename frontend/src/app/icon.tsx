import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#18181b",
          borderRadius: "8px",
          border: "1px solid #3f3f46",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "14px",
            height: "14px",
            borderRadius: "999px",
            background: "#818cf8",
            boxShadow: "0 0 10px rgba(129, 140, 248, 0.65)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
