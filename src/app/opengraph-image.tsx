import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Codezun — SaaS, e-commerce y sitios web a medida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/logo/logo.png"),
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

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
          position: "relative",
          background: "#FFFFFF",
        }}
      >
        <img src={logoSrc} width={480} height={378} alt="" />
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            fontWeight: 600,
            color: "#004E9B",
            letterSpacing: 1,
          }}
        >
          SaaS · E-commerce · Landing Pages · Sitios web
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 16,
            display: "flex",
            background: "linear-gradient(90deg, #0091B9, #FF6500, #FFD500)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
