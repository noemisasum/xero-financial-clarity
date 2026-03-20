import Link from "next/link";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { listInsightPosts } from "@/lib/insights";

export const metadata = {
  title: "All Insights — Aqount Financial Clarity",
  description:
    "Browse all Financial Clarity Insights on reporting, cash flow visibility, and finance operations.",
};

export default function InsightsAllPage() {
  const posts = listInsightPosts();

  return (
    <>
      <TopNav />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-[color:var(--heading)]">
            All Insights
          </h1>
          <Link href="/insights" className="text-sm text-[color:var(--link)] hover:opacity-90">
            ← Back to latest
          </Link>
        </div>

        <p className="mt-4 text-slate-600">
          A growing library of practical guides on reporting clarity, cash visibility, and
          decision-ready finance.
        </p>

        <div className="mt-10 space-y-6">
          {posts.map((p) => (
            <article key={p.slug} className="rounded-xl border border-slate-200 p-5">
              <div className="text-sm text-slate-500">{p.frontmatter.date}</div>
              <h2 className="mt-1 text-xl font-semibold">
                <Link href={`/insights/${p.slug}`} className="hover:underline">
                  {p.frontmatter.title}
                </Link>
              </h2>
              {p.frontmatter.description ? (
                <p className="mt-2 text-slate-600">{p.frontmatter.description}</p>
              ) : null}
            </article>
          ))}

          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-slate-600">
              No insights yet.
            </div>
          ) : null}
        </div>
      </main>
      <Footer includeHomepageAnchors />
    </>
  );
}
