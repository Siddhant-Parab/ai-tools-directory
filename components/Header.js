import Link from "next/link";
import { getCategories } from "@/lib/data";
import HeaderSearch from "@/components/HeaderSearch";

export default function Header() {
  const categories = getCategories();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-display font-bold text-xl tracking-tight text-accent">
              Best<span className="text-ink">Tools</span>
            </span>
            <span className="hidden sm:inline rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
              AI directory
            </span>
          </Link>

          <HeaderSearch />

          <nav className="hidden lg:flex items-center gap-6 shrink-0 text-sm">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/all-tools" className="hover:text-accent transition-colors">
              All tools
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4 h-10 overflow-x-auto text-xs border-t border-line">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="whitespace-nowrap text-muted hover:text-ink transition-colors flex items-center gap-1.5"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: c.color }}
              />
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
