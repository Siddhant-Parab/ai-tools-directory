import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategoryBySlug } from "@/lib/data";

export default function ToolCard({ tool }) {
  const category = getCategoryBySlug(tool.category);
  const toolDomain = new URL(tool.url).hostname.replace(/^www\./, "");
  const toolIcon = `https://icons.duckduckgo.com/ip3/${toolDomain}.ico`;

  return (
    <div className="border border-line bg-white/90 p-5 flex flex-col justify-between gap-4 hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_12px_28px_-20px_rgba(23,32,51,0.55)] transition-all duration-200">
      <div>
        <div className="flex items-start justify-between gap-3">
          <Link href={`/tool/${tool.slug}`} className="group">
            <h3 className="font-display font-semibold text-base group-hover:text-accent transition-colors">
              {tool.name}
            </h3>
          </Link>
          {category && (
            <span className="w-8 h-8 rounded-sm border border-line bg-white flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={toolIcon}
                alt={`${tool.name} logo`}
                width="22"
                height="22"
                className="object-contain"
                loading="lazy"
              />
            </span>
          )}
        </div>
        <p className="text-sm text-muted mt-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-muted">{tool.pricing}</span>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center gap-1 font-medium hover:text-accent transition-colors"
        >
          Visit site
          <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}
