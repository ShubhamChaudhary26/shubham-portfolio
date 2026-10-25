import type { Metadata } from "next";

import NextLink from "next/link";
import { notFound } from "next/navigation";

import { BlogBookingCTA } from "@/components/blog/blog-booking-cta";
import { DATA } from "@/data";
import { BLOG_POSTS, formatBlogDate, getBlogPost } from "@/data/blog";
import { OG_IMAGE } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Blog" };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [DATA.about.profile.name],
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "hi-Latn",
    mainEntityOfPage: url,
    url,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    author: {
      "@type": "Person",
      name: "Shubham Chaudhary",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Shubham Chaudhary",
      url: SITE_URL,
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 text-foreground md:py-24">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        type="application/ld+json"
      />
      <p className="text-sm font-medium text-primary">
        <NextLink className="hover:underline" href="/blog">
          Blog
        </NextLink>
      </p>
      <header className="mt-4 border-b border-divider pb-8">
        <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-foreground-500">
          <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          <span>{DATA.about.profile.name}</span>
        </p>
      </header>

      <div className="mt-8 space-y-10 text-base leading-relaxed text-foreground-600 md:text-lg">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.blocks.map((block, index) => {
                if (block.kind === "paragraphs") {
                  return block.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ));
                }

                if (block.kind === "list") {
                  return (
                    <ul key={`${section.heading}-list-${index}`} className="list-disc space-y-2 pl-5">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <div key={`${section.heading}-templates-${index}`} className="space-y-4">
                    {block.items.map((template) => (
                      <figure
                        key={template.label}
                        className="rounded-2xl border border-divider bg-content2/50 p-4 md:p-5"
                      >
                        <figcaption className="text-sm font-semibold text-foreground">
                          {template.label}
                        </figcaption>
                        <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-base leading-relaxed text-foreground-600">
                          {template.text}
                        </pre>
                      </figure>
                    ))}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <p>
          Calls bhi cover karni hain?{" "}
          <NextLink className="font-medium text-primary hover:underline" href="/ai-calling-agent">
            AI Calling Agent
          </NextLink>{" "}
          Hindi mein call uthata hai, sawal jawab karta hai, aur appointment note kar sakta hai.
        </p>
        <BlogBookingCTA slug={post.slug} />
      </div>
    </article>
  );
}
