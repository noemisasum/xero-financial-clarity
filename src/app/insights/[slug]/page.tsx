import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

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

        {/* CTA (text-only, consistent across Insights posts) */}
        <section className="mt-10 border-t border-slate-200 pt-8">
          <h3 className="text-base font-semibold text-[color:var(--heading)]">
            Aqount Financial Clarity Diagnostic
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Want a fast, read-only view of where your Xero reporting is unclear (and what to fix
            first)? Run the Aqount Financial Clarity Diagnostic.
          </p>
          <p className="mt-3 text-sm sm:text-base">
            <a href="/api/xero/connect" className="font-medium text-[color:var(--link)]">
              Run the diagnostic
            </a>
          </p>
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
