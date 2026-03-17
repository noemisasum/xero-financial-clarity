import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://clarity.aqount.tech";

  // Keep this intentionally small and stable.
  // Dynamic /results/[runId] should not be indexed by default.
  const routes = ["/", "/run", "/privacy", "/org"];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
