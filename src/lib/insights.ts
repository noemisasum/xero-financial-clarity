import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type InsightFrontmatter = {
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  tags?: string[];
};

export type InsightCtaVariant = {
  headline: string;
  sentence: string;
};

export function getInsightCtaVariant(
  tags: string[] | undefined,
): InsightCtaVariant {
  const t = new Set((tags ?? []).map((s) => s.toLowerCase()));

  // Cash flow / runway / forecasting
  if (
    t.has("cashflow") ||
    t.has("cash-flow") ||
    t.has("cash") ||
    t.has("runway") ||
    t.has("forecast") ||
    t.has("forecasting")
  ) {
    return {
      headline: "Get cash visibility you can actually use",
      sentence:
        "Run the diagnostic for a read-only clarity score and the fastest fixes to improve cash visibility.",
    };
  }

  // Month-end close / reconciliation / bookkeeping hygiene
  if (t.has("close") || t.has("month-end") || t.has("reconciliation") || t.has("bookkeeping")) {
    return {
      headline: "Close faster, trust your numbers sooner",
      sentence:
        "Get a read-only clarity score and a focused set of next steps to make reporting decision-ready.",
    };
  }

  // Tracking categories / segmentation / reporting structure
  if (
    t.has("tracking") ||
    t.has("tracking-categories") ||
    t.has("segmentation") ||
    t.has("categories")
  ) {
    return {
      headline: "See what’s missing in your reporting setup",
      sentence:
        "Run the diagnostic to identify gaps in structure, coding consistency, and reporting clarity.",
    };
  }

  // Default: COA / reporting clarity
  return {
    headline: "Make your reports decision-ready",
    sentence:
      "Get a read-only clarity score and see what to fix first in your Xero setup.",
  };
}

export type InsightPost = {
  slug: string;
  frontmatter: InsightFrontmatter;
  content: string;
};

const INSIGHTS_DIR = path.join(process.cwd(), "src", "content", "insights");

export function listInsightSlugs(): string[] {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];
  return fs
    .readdirSync(INSIGHTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getInsightPost(slug: string): InsightPost {
  const filePath = path.join(INSIGHTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);

  const fm = parsed.data as Partial<InsightFrontmatter>;
  if (!fm.title || !fm.date) {
    throw new Error(`Insight ${slug} missing required frontmatter (title, date)`);
  }

  return {
    slug,
    frontmatter: {
      title: fm.title,
      description: fm.description,
      date: fm.date,
      tags: fm.tags ?? [],
    },
    content: parsed.content,
  };
}

export function listInsightPosts(): InsightPost[] {
  return listInsightSlugs()
    .map((slug) => getInsightPost(slug))
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}
