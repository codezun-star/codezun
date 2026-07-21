import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const alt = "Codezun Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "Codezun";

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
          justifyContent: "space-between",
          position: "relative",
          background: "#FFFFFF",
          padding: "64px 80px",
        }}
      >
        <img src={logoSrc} width={210} height={151} alt="" />

        <div
          style={{
            display: "flex",
            fontSize: 54,
            fontWeight: 700,
            color: "#004E9B",
            lineHeight: 1.25,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 600,
            color: "#0091B9",
          }}
        >
          codezun.com/blog
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
