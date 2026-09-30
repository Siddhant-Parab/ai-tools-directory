export const landingPages = [
  {
    slug: "best-ai-tools-for-students",
    title: "Best AI Tools for Students in 2026",
    description:
      "Compare AI study tools for research, note summaries, practice, writing, and problem explanations.",
    intro:
      "The most useful study assistant depends on the work in front of you: finding sources, understanding a difficult concept, or reviewing notes. This shortlist groups tools by those jobs instead of treating every chatbot as a study tool.",
    toolSlugs: [
      "notebooklm", "consensus", "scite", "quizlet-ai", "socratic", "photomath",
      "wolfram-alpha", "knowt", "khanmigo", "chatgpt", "claude", "perplexity",
    ],
    advice:
      "Use AI to explain and quiz you, then check important claims against course materials and original sources. Do not submit generated work as your own.",
    related: ["ai-tools-for-pdf", "best-ai-tools-for-developers"],
  },
  {
    slug: "best-ai-tools-for-developers",
    title: "Best AI Coding Tools for Developers in 2026",
    description:
      "Compare AI coding assistants for in-editor suggestions, codebase questions, debugging, and app building.",
    intro:
      "Coding assistants vary by where they work: inside an editor, across a repository, or in a browser-based build environment. Start with the workflow you want to speed up, and review generated changes before merging them.",
    toolSlugs: [
      "github-copilot", "cursor", "tabnine", "replit-agent", "amazon-q-developer",
      "codeium", "sourcegraph-cody", "phind", "blackbox-ai", "claude",
    ],
    advice:
      "Treat generated code as a draft. Check dependencies, tests, security implications, and licensing before shipping changes.",
    related: ["best-ai-tools-for-students", "free-ai-image-generators"],
  },
  {
    slug: "free-ai-image-generators",
    title: "Free AI Image Generators to Try in 2026",
    description:
      "Explore image generators with free access or tiers, and compare their listed creative strengths.",
    intro:
      "Free access can mean a limited tier, credits, local installation, or a trial, and those terms change. These picks have free access listed in our catalog; check each provider for current generation limits and commercial-use terms before relying on it.",
    toolSlugs: [
      "leonardo-ai", "adobe-firefly", "ideogram", "stable-diffusion", "playground-ai",
      "krea-ai", "flux", "pixlr-ai",
    ],
    advice:
      "Choose by output and workflow: typography and layout, editing an existing image, local control, or quick browser-based creation.",
    related: ["ai-tools-for-youtube", "ai-tools-for-resume"],
  },
  {
    slug: "ai-tools-for-youtube",
    title: "AI Tools for YouTube Creators in 2026",
    description:
      "Find tools for YouTube research, video editing, summaries, short clips, and thumbnails.",
    intro:
      "A YouTube workflow spans planning, production, editing, and repurposing. The tools below are grouped by the job their catalog descriptions cover, so you can build a focused stack rather than add another general-purpose assistant.",
    toolSlugs: [
      "vidiq", "tubebuddy", "youtube-bert", "opusclip-youtube", "descript-youtube",
      "invideo-youtube", "pictory", "thumbnail-ai", "capcut-ai", "elevenlabs",
    ],
    advice:
      "Review generated scripts, captions, and thumbnails for accuracy, rights, and consistency with your channel before publishing.",
    related: ["free-ai-image-generators", "best-ai-tools-for-developers"],
  },
  {
    slug: "ai-tools-for-resume",
    title: "AI Resume Builders: Free Plans and Paid Options in 2026",
    description:
      "Compare resume tools for tailoring applications, ATS-oriented formatting, and cover-letter drafts.",
    intro:
      "Resume builders can help structure experience and tailor wording to a role, but your claims and achievements must stay accurate. This shortlist compares the resume-specific tools currently in our directory.",
    toolSlugs: ["teal-resume-builder", "rezi", "kickresume"],
    advice:
      "Check every suggested skill, metric, and employment detail before sending an application. Pricing and free-plan limits should be confirmed with each provider.",
    related: ["best-ai-tools-for-students", "best-ai-tools-for-developers"],
  },
  {
    slug: "ai-tools-for-pdf",
    title: "AI and PDF Tools for Students and Professionals in 2026",
    description:
      "Compare tools for PDF editing, conversion, OCR, annotations, and document workflows.",
    intro:
      "PDF tools solve different problems: extracting text from scans, editing pages, signing forms, or annotating course material. The catalog descriptions below make those distinctions visible; review file handling and privacy terms before uploading sensitive documents.",
    toolSlugs: [
      "pdfescape-tools", "foxit-pdf", "pdfcandy", "docfly", "pdf2go", "ocr-space",
      "pdfsam", "kami-pdf", "dochub", "pdfbob",
    ],
    advice:
      "For confidential or regulated files, check retention, training, and deletion policies before using any online document service.",
    related: ["best-ai-tools-for-students", "ai-tools-for-resume"],
  },
];

export const comparisons = [
  {
    slug: "chatgpt-vs-claude",
    tools: ["chatgpt", "claude"],
    description:
      "Compare ChatGPT and Claude by their listed use cases, pricing labels, and the kind of work each description emphasizes.",
    takeaway:
      "Both are general-purpose assistants. ChatGPT's directory entry emphasizes everyday questions and broad task coverage; Claude's entry highlights analysis and long documents. The better fit depends on the material and workflow you need to handle.",
  },
  {
    slug: "chatgpt-vs-gemini",
    tools: ["chatgpt", "gemini"],
    description:
      "Compare ChatGPT and Gemini for general questions, content creation, and working with files.",
    takeaway:
      "The catalog describes both as broad assistants, while Gemini's listing specifically calls out multimodal work and files. Confirm current capabilities in each product before choosing around a feature.",
  },
  {
    slug: "midjourney-vs-leonardo-ai",
    tools: ["midjourney", "leonardo-ai"],
    description:
      "Compare Midjourney and Leonardo AI for stylized image generation, game assets, product shots, and concept art.",
    takeaway:
      "Midjourney is listed for painterly, stylized output; Leonardo AI is listed for fine-tuned models and practical asset types. Their pricing labels also differ: Midjourney is listed as paid-only, while Leonardo AI has a free tier and paid plans.",
  },
  {
    slug: "runway-vs-pika",
    tools: ["runway", "pika"],
    description:
      "Compare Runway and Pika for generative video, editing, short clips, and social content.",
    takeaway:
      "Runway's listing combines generation with editing tools; Pika's description focuses on fast short clips, loops, and social content. Both are listed with free tiers and paid plans, but current limits need checking at the source.",
  },
  {
    slug: "perplexity-vs-chatgpt",
    tools: ["perplexity", "chatgpt"],
    description:
      "Compare Perplexity and ChatGPT for research questions, cited sources, writing, and general assistance.",
    takeaway:
      "Perplexity is explicitly described as a web-search answer engine with cited sources. ChatGPT is described as a general-purpose assistant. For research, inspect citations and verify claims rather than treating either output as authoritative by default.",
  },
  {
    slug: "canva-ai-vs-adobe-firefly",
    tools: ["canva-magic-studio", "adobe-firefly"],
    description:
      "Compare Canva Magic Studio and Adobe Firefly for AI-assisted graphics, presentations, image creation, and editing.",
    takeaway:
      "Canva Magic Studio's catalog entry spans presentations, graphics, images, and layouts; Adobe Firefly's focuses on images, vectors, and creative assets. Both are listed with free tiers and paid plans; check current terms and asset-use rights for your project.",
  },
];

export function getLandingPage(slug) {
  return landingPages.find((page) => page.slug === slug) || null;
}

export function getComparison(slug) {
  return comparisons.find((comparison) => comparison.slug === slug) || null;
}

export function getComparisonsForTool(toolSlug) {
  return comparisons.filter((comparison) => comparison.tools.includes(toolSlug));
}