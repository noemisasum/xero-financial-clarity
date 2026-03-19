import Link from "next/link";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { listInsightPosts } from "@/lib/insights";

export const metadata = {
  title:
    "Financial Clarity Guides for SMEs — Reporting & Cash Flow Visibility in Xero",
  description:
    "Actionable insights on improving financial reporting, cash flow visibility, and decision-making for SMEs using Xero.",
};

export default function InsightsIndexPage() {
  const posts = listInsightPosts();

  return (
    <>
      <TopNav />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight text-[color:var(--heading)]">
          <span className="block text-[0.65em] font-medium leading-tight text-slate-500">
            Financial Clarity Guides for SMEs
          </span>
          <span className="mt-1 block leading-tight">
            Reporting &amp; Cash Flow Visibility in Xero
          </span>
        </h1>

        <p className="mt-6 text-slate-600">
          Actionable insights on improving financial reporting, cash flow visibility, and
          decision-making for SMEs using Xero.
        </p>

        <p className="mt-3 italic text-slate-600">
          If your reports don’t drive decisions, they’re not doing their job.
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
