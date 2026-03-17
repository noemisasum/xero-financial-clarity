import Link from "next/link";
import TopNav from "@/components/TopNav";
import { listInsightPosts } from "@/lib/insights";

export const metadata = {
  title: "Insights | Aqount",
  description:
    "Articles on financial clarity, Xero reporting structure, and decision-ready finance for SMEs.",
};

export default function InsightsIndexPage() {
  const posts = listInsightPosts();

  return (
    <>
      <TopNav />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Insights</h1>
      <p className="mt-3 text-slate-600">
        Practical notes on financial clarity, reporting structure, and cash visibility
        for SMEs using Xero.
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
    </>
  );
}
