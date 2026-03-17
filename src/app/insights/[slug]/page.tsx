import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

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
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="text-sm text-slate-500">{post.frontmatter.date}</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {post.frontmatter.title}
      </h1>
      {post.frontmatter.description ? (
        <p className="mt-3 text-slate-600">{post.frontmatter.description}</p>
      ) : null}

      <article className="prose prose-slate mt-10 max-w-none">{content}</article>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
