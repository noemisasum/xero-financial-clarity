import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

import Button from "@/components/Button";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import {
  getInsightCtaVariant,
  getInsightPost,
  listInsightSlugs,
} from "@/lib/insights";

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

  const cta = getInsightCtaVariant(post.frontmatter.tags);

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

        {/* CTA (match homepage style, but more compact for article pages) */}
        <section className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_1px_0_rgba(17,24,39,0.02),0_20px_55px_rgba(17,24,39,0.10)] sm:p-8">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[color:var(--accent-soft)] blur-2xl" />
            <div className="relative">
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-2xl">
                    {cta.headline}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
                    {cta.sentence}
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
