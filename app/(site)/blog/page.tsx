import type { Metadata } from "next";

import NextLink from "next/link";

import { BLOG_POSTS, formatBlogDate } from "@/data/blog";
import { OG_IMAGE } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const title = "Blog";
const description =
  "Guides by Shubham Chaudhary for small shop owners, including a step-by-step WhatsApp reminder flow for udhaar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog | Shubham Chaudhary",
    description,
    url: `${SITE_URL}/blog`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Shubham Chaudhary",
    description,
    images: [OG_IMAGE.url],
  },
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Guides
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
          Blog
        </h1>
        <p className="mt-4 text-base leading-relaxed text-foreground-500 md:text-lg">
          Practical notes for shop owners and small teams. No fluff, just the steps.
        </p>
      </header>

      <ul className="mx-auto grid max-w-3xl gap-6">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug}>
            <NextLink
              className="block rounded-3xl border border-divider bg-content1/90 p-6 shadow-sm transition-colors hover:border-primary/40 md:p-8"
              href={`/blog/${post.slug}`}
            >
              <time className="text-sm text-primary" dateTime={post.date}>
                {formatBlogDate(post.date)}
              </time>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl">
                {post.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-foreground-500">
                {post.excerpt}
              </p>
              <span className="mt-5 inline-flex text-sm font-medium text-primary">
                Read the guide
              </span>
            </NextLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
