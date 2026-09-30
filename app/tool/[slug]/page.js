import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import {
  getTools,
  getToolBySlug,
  getCategoryBySlug,
  getRelatedTools,
} from "@/lib/data";
import { landingPages, getComparisonsForTool } from "@/lib/seo-content";
import ToolCard from "@/components/ToolCard";

export function generateStaticParams() {
  return getTools().map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  return {
    title: `${tool.name} Review: Features, Pricing, Best Uses & Alternatives | BestTools`,
    description: `${tool.description} See listed pricing, best-fit uses, key features, and similar tools.`,
  };
}

export default function ToolPage({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);
  const related = getRelatedTools(tool);
  const comparisonsForTool = getComparisonsForTool(tool.slug);
  const guides = landingPages.filter((page) => page.toolSlugs.includes(tool.slug));
  const audienceByCategory = {
    chat: "general users, writers, and researchers",
    image: "visual creators and designers",
    video: "video creators and editors",
    voice: "audio creators and teams working with recordings",
    music: "musicians and content creators",
    writer: "writers and marketers",
    code: "software developers",
    design: "designers and creative teams",
    business: "teams and business operators",
    study: "students, educators, and researchers",
    "resume-builder": "job seekers",
    "pdf-tools": "people working with PDF documents",
    "youtube-tools": "YouTube creators",
    transcription: "people who need searchable transcripts",
    translate: "people working across languages",
    search: "people researching topics online",
  };
  const bestFor = audienceByCategory[tool.category] || category?.name.toLowerCase() || "general users";
  const freeAccess = /free/i.test(tool.pricing) ? "Mentioned in listing" : "Not mentioned in listing";
  const featureLabels = (tool.tags || []).map((tag) =>
    tag.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
  );
  const categoryUse = category?.description || tool.description;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://besttools.ai" },
      ...(category
        ? [{ "@type": "ListItem", position: 2, name: category.name, item: `https://besttools.ai/category/${category.slug}` }]
        : []),
      { "@type": "ListItem", position: category ? 3 : 2, name: tool.name, item: `https://besttools.ai/tool/${tool.slug}` },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Link
        href={category ? `/category/${category.slug}` : "/search"}
        className="text-sm text-muted flex items-center gap-1 hover:text-ink transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        Back to {category ? category.name : "all tools"}
      </Link>

      <div className="flex items-center gap-3 mb-3">
        {category && (
          <span
            className="font-display text-xs font-semibold px-2 py-1 rounded-sm text-white"
            style={{ backgroundColor: category.color }}
          >
            {category.code}
          </span>
        )}
        <span className="text-xs text-muted">{tool.pricing}</span>
      </div>

      <h1 className="font-display text-4xl font-bold">{tool.name} Review</h1>
      <p className="text-muted mt-4 text-lg leading-relaxed max-w-xl">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        {(tool.tags || []).map((tag) => (
          <span
            key={tag}
            className="text-xs border border-line rounded-sm px-2 py-1 text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-8 inline-flex items-center gap-2 bg-ink text-paper rounded-sm px-5 h-11 text-sm font-medium hover:bg-accent transition-colors"
      >
        Visit {tool.name}
        <ArrowUpRight size={15} />
      </a>

      <section className="mt-12 border-y border-line py-7" aria-label={`${tool.name} at a glance`}>
        <h2 className="font-display text-lg font-semibold">{tool.name} at a glance</h2>
        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {[
            ["Best for", bestFor],
            ["Listed price", tool.pricing],
            ["Free access", freeAccess],
            ["Category", category?.name || "AI tool"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-medium uppercase text-muted">{label}</dt>
              <dd className="mt-1 text-sm capitalize">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">What {tool.name} does</h2>
        <p className="mt-3 leading-relaxed text-muted">{tool.description}</p>
        <h3 className="mt-7 font-display text-lg font-semibold">Key listed features</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {featureLabels.map((feature) => (
            <li key={feature} className="border border-line bg-white px-3 py-2 text-sm capitalize">{feature}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold">Strengths listed in the directory</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The listing highlights {categoryUse.toLowerCase()}
            {featureLabels.length ? `, including ${featureLabels.slice(0, 3).join(", ")}` : ""}. These are useful starting points
            for deciding whether it fits your workflow, not independently verified test results.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold">Limitations and details to verify</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Our listing does not include verified platform availability, plan limits, or independent test results.
            It records pricing as <strong className="font-medium text-ink">{tool.pricing}</strong>; confirm current plans,
            limits, and features with the provider before relying on them.
          </p>
        </div>
      </section>

      <section className="mt-10 border-t border-line pt-8">
        <h2 className="font-display text-xl font-semibold">Frequently asked questions</h2>
        <div className="mt-5 divide-y divide-line">
          <details className="py-4">
            <summary className="cursor-pointer font-medium">Does {tool.name} have a free plan?</summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              The directory currently lists: {tool.pricing}. Check the provider for current eligibility and limits.
            </p>
          </details>
          <details className="py-4">
            <summary className="cursor-pointer font-medium">What is {tool.name} best used for?</summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">Its listed focus is {tool.description.toLowerCase()}</p>
          </details>
          <details className="py-4">
            <summary className="cursor-pointer font-medium">What are alternatives to {tool.name}?</summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Compare similar tools below, then check each provider's features and current terms against your needs.
            </p>
          </details>
        </div>
      </section>

      <p className="mt-8 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
        Editorial note: this page is based on the information currently recorded in our directory, not independent product testing.
        Product features and pricing may change.
      </p>

      {guides.length > 0 && (
        <section className="mt-12 border-t border-line pt-8">
          <h2 className="font-display text-lg font-semibold">Guides featuring {tool.name}</h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {guides.map((guide) => (
              <Link key={guide.slug} href={`/${guide.slug}`} className="text-sm font-medium text-accent hover:underline">
                {guide.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {comparisonsForTool.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold">Compare {tool.name}</h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {comparisonsForTool.map((comparison) => (
              <Link key={comparison.slug} href={`/compare/${comparison.slug}`} className="text-sm font-medium text-accent hover:underline">
                {comparison.tools.map((slug) => getToolBySlug(slug)?.name).filter(Boolean).join(" vs ")}
              </Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t border-line">
          <h2 className="font-display text-lg font-semibold mb-5">
            Similar tools and alternatives
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
