import { getCategories, getTools } from "@/lib/data";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://besttools.ai").replace(
  /\/$/,
  "",
);

export default function sitemap() {
  const categories = getCategories().map((category) => ({
    url: `${siteUrl}/category/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const tools = getTools().map((tool) => ({
    url: `${siteUrl}/tool/${tool.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/all-tools`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...categories,
    ...tools,
  ];
}