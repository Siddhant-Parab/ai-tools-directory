import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <p className="font-display text-xs text-muted mb-3">404</p>
      <h1 className="font-display text-2xl font-bold">
        That page isn't in the directory.
      </h1>
      <p className="text-muted mt-2">
        It may have been renamed or removed. Try searching instead.
      </p>
      <Link
        href="/search"
        className="inline-block mt-6 bg-ink text-paper rounded-sm px-5 h-10 leading-10 text-sm font-medium hover:bg-accent transition-colors"
      >
        Browse all tools
      </Link>
    </div>
  );
}
