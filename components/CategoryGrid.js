import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Film,
  Globe2,
  Image,
  MessageCircle,
  Mic2,
  Music2,
  Palette,
  PenLine,
  FileText,
  FileType2,
} from "lucide-react";
import { getCategories, getToolCount } from "@/lib/data";

const categoryIcons = {
  chat: MessageCircle,
  image: Image,
  video: Film,
  voice: Mic2,
  music: Music2,
  writer: PenLine,
  code: Code2,
  design: Palette,
  business: BriefcaseBusiness,
  study: BookOpen,
  "website-builder": Globe2,
  "resume-builder": FileText,
  "pdf-converter": FileType2,
  search: MessageCircle,
  "my-ai": MessageCircle,
  transcription: Mic2,
  translate: Globe2,
  "text-tools": PenLine,
  "pdf-tools": FileType2,
  "study-tools": BookOpen,
  "youtube-tools": Film,
  "business-tools": BriefcaseBusiness,
  "social-media": MessageCircle,
  "health-lifestyle": BookOpen,
};

export default function CategoryGrid() {
  const categories = getCategories();

  return (
    <div
      id="categories"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line"
    >
      {categories.map((c) => {
        const count = getToolCount(c.slug);
        return (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="group relative overflow-hidden bg-white p-6 flex flex-col justify-between min-h-[190px] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-24px_rgba(23,32,51,0.7)]"
          >
            <div className="flex items-start justify-between">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${c.color}16`, color: c.color }}
              >
                {(() => {
                  const Icon = categoryIcons[c.slug];
                  return <Icon size={22} strokeWidth={2.2} aria-hidden="true" />;
                })()}
              </span>
              <ArrowUpRight
                size={18}
                className="text-muted group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-lg">{c.name}</h3>
                <span
                  className="font-display text-[10px] font-semibold tracking-wide"
                  style={{ color: c.color }}
                >
                  {c.code}
                </span>
              </div>
              <p className="text-muted text-sm mt-1.5 line-clamp-2 leading-relaxed">
                {c.description}
              </p>
              <p className="text-xs text-muted mt-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                {count} {count === 1 ? "tool" : "tools"}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
