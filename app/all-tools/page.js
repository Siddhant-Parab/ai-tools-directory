import Link from "next/link";
import CategoryDirectory from "@/components/CategoryDirectory";
import HomeSearch from "@/components/HomeSearch";
import { getCategories, getTools } from "@/lib/data";

export const metadata = {
  title: "Best Free AI Tools for Every Task — BestTools",
  description:
    "Explore the best free AI tools for writing, coding, image generation, video, research, productivity, and more. Compare 240 AI tools across 24 categories.",
};

export default function AllToolsPage({ showSearch = false }) {
  const categories = getCategories();
  const totalTools = getTools().length;

  return (
    <div>
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-3 text-sm text-muted">
          <Link href="/" className="font-medium text-accent hover:underline">
            Home
          </Link>
          <span>/</span>
          <span>All Tools</span>
        </div>
      </div>

      <section className="mx-auto max-w-6xl border-b border-line px-6 pb-10 pt-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          The complete directory
        </p>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              All AI Tools
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted">
              Compare {totalTools} curated tools across {categories.length} categories,
              organized for quick browsing.
            </p>
          </div>
          <span className="w-fit rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-muted">
            {totalTools} tools indexed
          </span>
        </div>

        {showSearch && (
          <div className="mt-8 max-w-2xl">
            <HomeSearch />
          </div>
        )}

        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Browse AI tools by category">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`#${category.slug}`}
              className="rounded-md border border-line bg-white px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
          <h2 className="font-display text-xl font-semibold">Browse AI Tools by Category</h2>
        </div>
        <CategoryDirectory />
      </section>
    </div>
  );
}
