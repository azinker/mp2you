import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-lockup-1200.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #ffffff 0%, #f5f8fd 60%, #e6ecfb 100%)",
          color: "#0e1b4d",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -120, right: -120, width: 420, height: 420, borderRadius: 999, background: "rgba(0,168,180,0.18)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -160, left: -100, width: 380, height: 380, borderRadius: 999, background: "rgba(252,108,96,0.16)", display: "flex" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={560} height={110} style={{ objectFit: "contain" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, lineHeight: 1.02, maxWidth: 940 }}>Custom corporate gifting handled from idea to doorstep.</div>
          <div style={{ display: "flex", gap: 14, marginTop: 34, fontSize: 24, fontFamily: "sans-serif", fontWeight: 700 }}>
            {[
              ["Gifting", "#0b3da7"],
              ["Concierge", "#00a8b4"],
              ["Fulfillment", "#fc6c60"],
            ].map(([label, color]) => (
              <div key={label} style={{ display: "flex", padding: "10px 22px", borderRadius: 999, background: color, color: "#ffffff" }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
