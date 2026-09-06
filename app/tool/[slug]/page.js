import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import {
  getTools,
  getToolBySlug,
  getCategoryBySlug,
  getRelatedTools,
} from "@/lib/data";
import ToolCard from "@/components/ToolCard";

export function generateStaticParams() {
  return getTools().map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — BestTools`,
    description: tool.description,
  };
}

export default function ToolPage({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);
  const related = getRelatedTools(tool);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
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

      <h1 className="font-display text-4xl font-bold">{tool.name}</h1>
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

      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t border-line">
          <h2 className="font-display text-lg font-semibold mb-5">
            More in {category?.name}
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
