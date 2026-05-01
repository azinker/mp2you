import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#fbfaf7",
          color: "#191714",
          padding: 72,
          border: "18px solid #dccaa7",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ fontSize: 32, color: "#a97f2d" }}>MorePower2You</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 78, lineHeight: 0.98, maxWidth: 880 }}>Custom corporate gifting handled from idea to doorstep.</div>
            <div style={{ marginTop: 32, fontSize: 28, color: "#676057" }}>Gifting / Concierge / Fulfillment</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
