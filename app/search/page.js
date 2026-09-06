import { Suspense } from "react";
import { getCategories, getTools, getToolCount } from "@/lib/data";
import CategorySidebar from "@/components/CategorySidebar";
import ToolExplorer from "@/components/ToolExplorer";

export const metadata = {
  title: "Browse all tools — BestTools",
};

export default function SearchPage() {
  const categories = getCategories();
  const tools = getTools();
  const toolCounts = Object.fromEntries(
    categories.map((c) => [c.slug, getToolCount(c.slug)])
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-bold">Browse all tools</h1>
      <p className="text-muted mt-2 max-w-xl">
        Search the full index, or narrow it down by category.
      </p>

      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        <CategorySidebar
          categories={categories}
          toolCounts={toolCounts}
          activeSlug={null}
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
