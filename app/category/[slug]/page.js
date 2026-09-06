import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  getCategories,
  getCategoryBySlug,
  getToolsByCategory,
  getToolCount,
} from "@/lib/data";
import CategorySidebar from "@/components/CategorySidebar";
import ToolExplorer from "@/components/ToolExplorer";

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};
  return {
    title: `${category.name} tools — BestTools`,
    description: category.description,
  };
}

export default function CategoryPage({ params }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categories = getCategories();
  const tools = getToolsByCategory(category.slug);
  const toolCounts = Object.fromEntries(
    categories.map((c) => [c.slug, getToolCount(c.slug)])
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-start gap-3 mb-2">
        <span
          className="font-display text-xs font-semibold px-2 py-1 rounded-sm text-white"
          style={{ backgroundColor: category.color }}
        >
          {category.code}
        </span>
      </div>
      <h1 className="font-display text-3xl font-bold">{category.name}</h1>
      <p className="text-muted mt-2 max-w-xl">{category.description}</p>

      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        <CategorySidebar
          categories={categories}
          toolCounts={toolCounts}
          activeSlug={category.slug}
        />
        <div className="flex-1">
          <Suspense fallback={null}>
            <ToolExplorer tools={tools} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
