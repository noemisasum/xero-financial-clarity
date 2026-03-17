import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type InsightFrontmatter = {
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  tags?: string[];
};

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
