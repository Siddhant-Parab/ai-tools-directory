import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { getToolsBySlugs } from "@/lib/data";
import { getLandingPage, landingPages } from "@/lib/seo-content";

export function generateStaticParams() {
  return landingPages.map((page) => ({ landing: page.slug }));
}

export function generateMetadata({ params }) {
  const page = getLandingPage(params.landing);
  if (!page) return {};
  return {
    title: `${page.title} | BestTools`,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default function LandingPage({ params }) {
  const page = getLandingPage(params.landing);
  if (!page) notFound();

  const tools = getToolsBySlugs(page.toolSlugs);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    author: { "@type": "Organization", name: "BestTools" },
    mainEntityOfPage: `https://besttools.ai/${page.slug}`,
  };

  return (
    <article className="mx-auto max-w-6xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span className="px-2">/</span>
        <span>{page.title}</span>
      </nav>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase text-accent">Practical guide · 2026</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{page.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{page.intro}</p>
      </header>

      <section className="mt-8 max-w-3xl border-l-2 border-accent pl-4" aria-label="Editorial note">
        <p className="text-sm leading-relaxed text-muted">
          Selection basis: directory descriptions, categories, listed features, and pricing labels. These are not
          independently tested rankings; verify current product details and terms with each provider.
        </p>
      </section>

      <section className="mt-10" aria-label="Tool recommendations">
        <h2 className="font-display text-xl font-semibold">Tools to compare ({tools.length})</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
      </section>

      <section className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold">How to choose</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{page.advice}</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold">Questions to check</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
            <li>Does the free tier cover the volume and features you need?</li>
            <li>Can you export your work in a format you can keep using?</li>
            <li>What data, copyright, and privacy terms apply to your inputs and outputs?</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 border-t border-line pt-8">
        <h2 className="font-display text-lg font-semibold">Frequently asked questions</h2>
        <div className="mt-4 divide-y divide-line">
          <details className="py-4">
            <summary className="cursor-pointer font-medium">How were these tools selected?</summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              They were selected from our directory based on their listed category, description, and features relevant to this guide.
            </p>
          </details>
          <details className="py-4">
            <summary className="cursor-pointer font-medium">Are the prices and features guaranteed to be current?</summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              No. Our pricing labels are a starting point, not a quote. Check each provider's website for current plans, limits, and terms.
            </p>
          </details>
        </div>
      </section>

      <nav aria-label="Related guides" className="mt-10 border-t border-line pt-8">
        <h2 className="font-display text-lg font-semibold">Related guides</h2>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {page.related.map((slug) => {
            const related = getLandingPage(slug);
            return related ? (
              <Link key={slug} href={`/${slug}`} className="text-sm font-medium text-accent hover:underline">
                {related.title} <ArrowRight className="inline" size={14} />
              </Link>
            ) : null;
          })}
          <Link href="/all-tools" className="text-sm font-medium text-accent hover:underline">
            Browse all AI tools <ArrowRight className="inline" size={14} />
          </Link>
        </div>
      </nav>
    </article>
  );
}