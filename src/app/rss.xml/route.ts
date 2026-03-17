import { NextResponse } from "next/server";

import { listInsightPosts } from "@/lib/insights";

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const baseUrl = "https://clarity.aqount.tech";
  const posts = listInsightPosts().slice(0, 50);

  const items = posts
    .map((p) => {
      const url = `${baseUrl}/insights/${p.slug}`;
      const title = escapeXml(p.frontmatter.title);
      const desc = escapeXml(p.frontmatter.description ?? "");
      const pubDate = new Date(`${p.frontmatter.date}T00:00:00.000Z`).toUTCString();

      return [
        "<item>",
        `<title>${title}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        desc ? `<description>${desc}</description>` : "",
        `<pubDate>${pubDate}</pubDate>`,
        "</item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    "<title>Aqount Insights</title>",
    `<link>${baseUrl}/insights</link>`,
    "<description>Articles on financial clarity and Xero reporting structure.</description>",
    "<language>en</language>",
    items,
    "</channel>",
    "</rss>",
  ].join("\n");

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
