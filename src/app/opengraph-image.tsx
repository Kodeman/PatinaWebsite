import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Patina. Where Time Adds Value. Join the Founding Circle.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [caslon, manrope] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/libre-caslon-display.ttf")),
    readFile(join(process.cwd(), "public/fonts/manrope.ttf")),
  ]);

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#EDE9E4", padding: 24 }}>
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#4F5948", color: "#FAF7F2", position: "relative", padding: "45px 55px", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "Caslon", fontSize: 40, letterSpacing: 5, display: "flex" }}>PATINA</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, alignItems: "center" }}>
            <div style={{ width: 80, height: 4, borderRadius: 4, background: "#FAF7F2" }} />
            <div style={{ width: 64, height: 3.4, borderRadius: 4, background: "#FAF7F2", opacity: .7 }} />
            <div style={{ width: 48, height: 2.8, borderRadius: 4, background: "#FAF7F2", opacity: .4 }} />
          </div>
        </div>
        <div style={{ display: "flex", fontFamily: "Caslon", fontSize: 110, lineHeight: .96, letterSpacing: -3, marginTop: 62, flexDirection: "column" }}>
          <span>Where Time</span><span>Adds Value.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 25, borderTop: "1px solid rgba(250,247,242,.3)", fontFamily: "Manrope", fontSize: 19 }}>
          <span>Join the Founding Circle</span>
          <span style={{ opacity: .8 }}>A designer’s eye, within reach.</span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Caslon", data: new Uint8Array(caslon).buffer, weight: 400, style: "normal" },
        { name: "Manrope", data: new Uint8Array(manrope).buffer, weight: 400, style: "normal" },
      ],
    },
  );
}
