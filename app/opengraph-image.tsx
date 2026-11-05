import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FAF8F4", color: "#1A1A1A", padding: 80 }}>
        <div style={{ fontSize: 28, color: "#0F5E5A", letterSpacing: 2, textTransform: "uppercase" }}>Portfolio</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, fontWeight: 600, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ fontSize: 38, color: "#555", maxWidth: 900, lineHeight: 1.3 }}>Data science student building NLP, analytics and AI systems.</div>
        </div>
        <div style={{ fontSize: 26, color: "#777" }}>UEH · Ho Chi Minh City</div>
      </div>
    ),
    size
  );
}
