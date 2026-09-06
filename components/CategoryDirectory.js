import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  FileText,
  FileType2,
  Film,
  Globe2,
  Image,
  MessageCircle,
  Mic2,
  Music2,
  Palette,
  PenLine,
} from "lucide-react";
import { getCategories, getToolsByCategory } from "@/lib/data";

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

export default function CategoryDirectory() {
  const categories = getCategories();

  return (
    <div className="space-y-12">
      {categories.map((category) => {
        const tools = getToolsByCategory(category.slug);
        const Icon = categoryIcons[category.slug];

        return (
          <section key={category.slug} id={category.slug} className="scroll-mt-28">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: `${category.color}16`, color: category.color }}
              >
                <Icon size={18} strokeWidth={2} aria-hidden="true" />
              </span>
              <h2 className="font-display text-xl font-semibold">{category.name}</h2>
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-muted">
                {tools.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tool/${tool.slug}`}
                  className="group flex min-h-12 items-center justify-between gap-3 rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_8px_18px_-14px_rgba(23,32,51,0.7)]"
                >
                  <span className="truncate">{tool.name}</span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
