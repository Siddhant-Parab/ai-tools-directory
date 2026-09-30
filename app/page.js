import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CategoryGrid from "@/components/CategoryGrid";
import HomeSearch from "@/components/HomeSearch";
import ToolCard from "@/components/ToolCard";
import { getCategories, getFeaturedTools, getTools } from "@/lib/data";

export const metadata = {
  title: "Best AI Tools 2026: Free & Paid Tools for Every Task | BestTools",
  description:
    "Discover and compare AI tools for writing, coding, images, video, research, study, PDFs, business, and productivity. Browse free and paid options by task.",
};

export default function HomePage() {
  const totalTools = getTools().length;
  const categories = getCategories();
  const featuredTools = getFeaturedTools(6);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 text-center sm:pt-28">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Curated AI tools, organized around the work you need to do
        </p>
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
          Best AI Tools for Every Task
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Discover and compare {totalTools}+ free and paid AI tools for writing,
          coding, images, video, research, study, business, and productivity.
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

      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-xl font-semibold">Explore by goal</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Start with a specific workflow, compare the options, then follow
              each tool profile for its listed features, pricing, and alternatives.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {[
              ["Best AI tools for students", "/best-ai-tools-for-students"],
              ["Best AI coding tools", "/best-ai-tools-for-developers"],
              ["Free AI image generators", "/free-ai-image-generators"],
              ["AI tools for YouTube", "/ai-tools-for-youtube"],
              ["AI resume builders", "/ai-tools-for-resume"],
              ["PDF tools for study and work", "/ai-tools-for-pdf"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium hover:text-accent">
                {label} <ArrowRight className="inline" size={14} />
              </Link>
            ))}
            {[
              ["ChatGPT vs Claude", "/compare/chatgpt-vs-claude"],
              ["ChatGPT vs Gemini", "/compare/chatgpt-vs-gemini"],
              ["ChatGPT vs Perplexity", "/compare/perplexity-vs-chatgpt"],
              ["Midjourney vs Leonardo AI", "/compare/midjourney-vs-leonardo-ai"],
              ["Runway vs Pika", "/compare/runway-vs-pika"],
              ["Canva AI vs Firefly", "/compare/canva-ai-vs-adobe-firefly"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium hover:text-accent">
                {label} <ArrowRight className="inline" size={14} />
              </Link>
            ))}
          </div>
        </div>
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
