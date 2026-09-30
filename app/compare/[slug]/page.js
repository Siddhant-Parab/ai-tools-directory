import Link from "next/link";
import { notFound } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import { getToolBySlug } from "@/lib/data";
import { comparisons, getComparison } from "@/lib/seo-content";

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export function generateMetadata({ params }) {
  const comparison = getComparison(params.slug);
  if (!comparison) return {};
  const names = comparison.tools.map((slug) => getToolBySlug(slug)?.name).filter(Boolean);
  return {
    title: `${names.join(" vs ")}: Features, Pricing & Differences | BestTools`,
    description: comparison.description,
    alternates: { canonical: `/compare/${comparison.slug}` },
  };
}

export default function ComparisonPage({ params }) {
  const comparison = getComparison(params.slug);
  if (!comparison) notFound();

  const tools = comparison.tools.map((slug) => getToolBySlug(slug)).filter(Boolean);
  if (tools.length !== 2) notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${tools[0].name} vs ${tools[1].name}`,
    description: comparison.description,
    author: { "@type": "Organization", name: "BestTools" },
    mainEntityOfPage: `https://besttools.ai/compare/${comparison.slug}`,
  };

  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span className="px-2">/</span>
        <span>Comparisons</span>
      </nav>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase text-accent">AI tool comparison · 2026</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          {tools[0].name} vs {tools[1].name}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{comparison.description}</p>
      </header>

      <section className="mt-8 border-l-2 border-accent pl-4">
        <p className="text-sm leading-relaxed text-muted">
          This comparison uses our directory's product descriptions and pricing labels. It is not a hands-on test;
          features, plan details, and availability may change.
        </p>
      </section>

      <section className="mt-10" aria-label="Side-by-side comparison">
        <h2 className="font-display text-xl font-semibold">At a glance</h2>
        <div className="mt-4 overflow-x-auto border border-line bg-white">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-paper">
                <th className="p-4 font-semibold">Details</th>
                {tools.map((tool) => <th key={tool.slug} className="p-4 font-semibold">{tool.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                ["Listed focus", ...tools.map((tool) => tool.description)],
                ["Listed pricing", ...tools.map((tool) => tool.pricing)],
                ["Category", ...tools.map((tool) => tool.category.replace(/-/g, " "))],
                ["Listed features", ...tools.map((tool) => (tool.tags || []).map((tag) => tag.replace(/-/g, " ")).join(", "))],
              ].map(([label, ...values]) => (
                <tr key={label} className="border-b border-line last:border-0">
                  <th scope="row" className="min-w-32 p-4 align-top font-medium">{label}</th>
                  {values.map((value, index) => <td key={tools[index].slug} className="min-w-56 p-4 align-top leading-relaxed text-muted">{value}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 max-w-3xl">
        <h2 className="font-display text-xl font-semibold">Which one should you choose?</h2>
        <p className="mt-3 leading-relaxed text-muted">{comparison.takeaway}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          For a decision, check the current plan pages and try the same representative task in both products. This directory does not claim a personal test result.
        </p>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
      </section>
      <nav aria-label="Related tools" className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tool/${tool.slug}`} className="text-sm font-medium text-accent hover:underline">
            Read the {tool.name} profile
          </Link>
        ))}
        <Link href="/all-tools" className="text-sm font-medium text-accent hover:underline">Browse all tools</Link>
      </nav>
    </article>
  );
}