import type { MetadataRoute } from "next";

import { listInsightPosts } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://clarity.aqount.tech";

  // Keep this intentionally small and stable.
  // Dynamic /results/[runId] should not be indexed by default.
  const routes = ["/", "/run", "/privacy", "/org", "/insights"];

  const baseEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.6,
  }));

  const insightEntries: MetadataRoute.Sitemap = listInsightPosts().map((p) => ({
    url: `${baseUrl}/insights/${p.slug}`,
    lastModified: new Date(`${p.frontmatter.date}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...baseEntries, ...insightEntries];
}
