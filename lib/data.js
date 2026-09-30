import categories from "@/data/categories.json";
import tools from "@/data/tools.json";

/**
 * All data access for the directory goes through this file.
 * Today it reads from the local JSON files in /data. To move to a database
 * later (MongoDB, Firebase, etc.), swap the bodies of these functions to
 * fetch from your DB instead — nothing else in the app needs to change.
 */

export function getCategories() {
  return categories;
}

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) || null;
}

export function getTools() {
  return tools;
}

export function getToolBySlug(slug) {
  return tools.find((t) => t.slug === slug) || null;
}

export function getToolsBySlugs(slugs) {
  return slugs.map((slug) => getToolBySlug(slug)).filter(Boolean);
}

export function getToolsByCategory(categorySlug) {
  return tools.filter((t) => t.category === categorySlug);
}

export function getToolCount(categorySlug) {
  return tools.filter((t) => t.category === categorySlug).length;
}

export function getFeaturedTools(limit = 6) {
  return tools.filter((t) => t.featured).slice(0, limit);
}

export function searchTools(query, categorySlug) {
  const q = query.trim().toLowerCase();
  return tools.filter((t) => {
    const matchesCategory = categorySlug ? t.category === categorySlug : true;
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = [t.name, t.description, ...(t.tags || [])]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getRelatedTools(tool, limit = 3) {
  return tools
    .filter((candidate) => candidate.slug !== tool.slug)
    .map((candidate) => {
      const sharedTags = (tool.tags || []).filter((tag) =>
        (candidate.tags || []).includes(tag),
      ).length;
      return {
        tool: candidate,
        score: sharedTags * 2 + (candidate.category === tool.category ? 1 : 0),
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ tool: candidate }) => candidate);
}
