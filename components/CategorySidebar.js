"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategorySidebar({ categories, toolCounts, activeSlug }) {
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";

  return (
    <aside className="w-full lg:w-56 shrink-0">
      <div className="lg:sticky lg:top-24">
        <div className="text-xs text-muted mb-3 font-medium">Filter by category</div>
        <ul className="flex flex-wrap lg:flex-col gap-2 lg:gap-0.5">
          <li>
            <Link
              href={isSearchPage ? "/search" : "/search"}
              className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-sm text-sm border ${
                !activeSlug
                  ? "border-ink bg-ink text-paper"
                  : "border-line hover:border-ink"
              }`}
            >
              All tools
            </Link>
          </li>
          {categories.map((c) => {
            const active = activeSlug === c.slug;
            return (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-sm text-sm border ${
                    active
                      ? "border-ink bg-ink text-paper"
                      : "border-line hover:border-ink"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    {c.name}
                  </span>
                  <span
                    className={`text-xs ${active ? "text-paper/60" : "text-muted"}`}
                  >
                    {toolCounts[c.slug] ?? 0}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
