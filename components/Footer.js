import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import { getCategories } from "@/lib/data";

export default function Footer() {
  const categories = getCategories();

  return (
    <footer className="border-t border-line mt-24">
      <Newsletter />
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display font-bold">BestTools</div>
          <p className="text-muted mt-2 max-w-[22ch]">
            A hand-curated directory of free and freemium AI tools.
          </p>
        </div>
        <div>
          <div className="text-xs text-muted mb-3">Categories</div>
          <ul className="space-y-2">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="hover:text-accent">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs text-muted mb-3">More categories</div>
          <ul className="space-y-2">
            {categories.slice(6).map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="hover:text-accent">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs text-muted mb-3">Directory</div>
          <ul className="space-y-2">
            <li>
              <Link href="/search" className="hover:text-accent">
                Browse all tools
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-muted flex justify-between">
          <span>© {new Date().getFullYear()} BestTools</span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
