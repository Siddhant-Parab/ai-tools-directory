"use client";

import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

export default function HomeSearch() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q") || "";
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-full border-2 border-accent bg-white px-5 h-14 shadow-[0_8px_24px_-20px_rgba(17,158,83,0.8)] focus-within:ring-4 focus-within:ring-accent/10 transition-all"
    >
      <Search size={18} className="text-muted shrink-0" />
      <input
        name="q"
        type="text"
        placeholder='Search by task (e.g., "extract tables from PDF", "AI video generator", "resume builder")...'
        className="flex-1 bg-transparent outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-ink"
      >
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
