import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CategoryGrid from "@/components/CategoryGrid";
import HomeSearch from "@/components/HomeSearch";
import ToolCard from "@/components/ToolCard";
import { getCategories, getFeaturedTools, getTools } from "@/lib/data";

export const metadata = {
  title: "Best Free AI Tools for Every Task — BestTools",
  description:
    "Explore the best free AI tools for writing, coding, image generation, video, research, productivity, and more. Compare 240 AI tools across 24 categories.",
};

export default function HomePage() {
  const totalTools = getTools().length;
  const categories = getCategories();
  const featuredTools = getFeaturedTools(6);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 text-center sm:pt-28">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Free AI Tools Directory — Updated Daily
        </p>
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
          Find the Right AI Tool for Any Task
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Discover {totalTools}+ curated free and freemium AI tools for writing,
          coding, image editing, research, productivity, and more.
        </p>

        <div className="mx-auto mt-9 max-w-2xl">
          <HomeSearch />
        </div>
        <Link
          href="/all-tools"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          Explore all {totalTools} tools <ArrowRight size={15} />
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Browse AI Tools by Category</h2>
          <Link href="/all-tools" className="flex items-center gap-1 text-sm text-muted hover:text-accent">
            View all <ArrowUpRight size={15} />
          </Link>
        </div>
        <CategoryGrid />
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Featured AI Tools</h2>
            <Link href="/all-tools" className="flex items-center gap-1 text-sm text-muted hover:text-accent">
              Browse all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
