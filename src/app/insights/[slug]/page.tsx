import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

import Button from "@/components/Button";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { getInsightPost, listInsightSlugs } from "@/lib/insights";

type Params = { slug: string };

export function generateStaticParams() {
  return listInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  try {
    const post = getInsightPost(slug);
    return {
      title: `${post.frontmatter.title} | Aqount Insights`,
      description: post.frontmatter.description,
      alternates: { canonical: `https://clarity.aqount.tech/insights/${slug}` },
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        url: `https://clarity.aqount.tech/insights/${slug}`,
        type: "article",
      },
    };
  } catch {
    return {};
  }
}

export default async function InsightPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getInsightPost(slug);
  } catch {
    notFound();
  }

  const { content } = await compileMDX({ source: post.content });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    mainEntityOfPage: `https://clarity.aqount.tech/insights/${slug}`,
    publisher: { "@type": "Organization", name: "Aqount" },
  };

  return (
    <>
      <TopNav />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="text-sm text-slate-500">{post.frontmatter.date}</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.description ? (
          <p className="mt-3 text-slate-600">{post.frontmatter.description}</p>
        ) : null}

        <article className="insights-content mt-10">{content}</article>

        {/* CTA (match homepage style) */}
        <section className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-8 shadow-[0_1px_0_rgba(17,24,39,0.02),0_25px_70px_rgba(17,24,39,0.12)] sm:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[color:var(--accent-soft)] blur-2xl" />
            <div className="relative">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
                    Discover Your Financial Clarity Score
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
                    A complimentary, read-only diagnostic tool for growing business using Xero.
                  </p>
                </div>
                <div className="lg:justify-self-end">
                  <Button href="/api/xero/connect">Get Your Clarity Score</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <Footer includeHomepageAnchors />
    </>
  );
}
