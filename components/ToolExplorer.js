"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import ToolCard from "@/components/ToolCard";

export default function ToolExplorer({ tools }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter((t) => {
      const haystack = [t.name, t.description, ...(t.tags || [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [tools, query]);

  return (
    <div>
      <div className="flex items-center gap-2 border border-line rounded-sm px-3 h-11 bg-white mb-6 max-w-lg">
        <Search size={16} className="text-muted shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search by name, task, or tag…"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted"
        />
      </div>

      <p className="text-xs text-muted mb-4">
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
      </p>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-line rounded-sm p-10 text-center text-muted text-sm">
          No tools match “{query}”. Try a different word, or browse a
          category from the sidebar.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      )}
    </div>
  );
}
