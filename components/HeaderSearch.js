"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeaderSearch() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q") || "";
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 max-w-md hidden sm:flex items-center gap-2 border border-line rounded-sm px-3 h-9 bg-white/60"
    >
      <Search size={15} className="text-muted shrink-0" />
      <input
        name="q"
        type="text"
        placeholder="Search tools by name or task…"
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted"
      />
    </form>
  );
}
