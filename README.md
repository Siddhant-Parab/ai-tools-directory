# BestTools — AI Tools Directory

A starter site for an "All AI Tools" directory, in the spirit of Free.ai's
tool list: a searchable, filterable catalog of AI tools grouped into
categories, each with its own page and a detail page per tool.

Built with **Next.js 14 (App Router)**, **React 18**, and **Tailwind CSS**.
Data lives in two JSON files, so you don't need a database to get started —
but the data layer is written so you can swap in MongoDB or Firebase later
without touching any page or component.

## What's included

- **Homepage** (`/`) — hero with search, a grid of 11 categories, featured tools.
- **Category pages** (`/category/[slug]`) — one per category, with a sidebar
  filter and live search scoped to that category.
- **Search / browse-all page** (`/search`) — same sidebar + search, across
  every tool. Also where the homepage search bar sends you.
- **Tool detail pages** (`/tool/[slug]`) — name, description, tags, pricing,
  an external link button, and related tools from the same category.
- **Newsletter signup** in the footer (front-end only — wire it to a
  provider, see below).
- 22 sample tools across all 11 categories (`data/tools.json`).

## Project structure

```
app/
  layout.js              Root layout: fonts, header, footer
  page.js                Homepage
  globals.css            Design tokens (colors, fonts) + base styles
  category/[slug]/page.js  Category page
  tool/[slug]/page.js      Tool detail page
  search/page.js           Browse-all / search page
  not-found.js             Custom 404

components/
  Header.js, HeaderSearch.js   Top nav + global search
  HomeSearch.js                 Big hero search on the homepage
  CategoryGrid.js               The 11-category grid on the homepage
  CategorySidebar.js            Category filter sidebar
  ToolExplorer.js               Client-side search/filter over a tool list
  ToolCard.js                   Tool card used in every listing
  Newsletter.js                 Footer signup form
  Footer.js

data/
  categories.json         The 11 categories: name, slug, color, description
  tools.json               The tool listings

lib/
  data.js                  All data-access functions (read from JSON today)
```

## Running it locally

Requires Node.js 18.18+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

## How to add a new tool

Open `data/tools.json` and add an object to the array:

```json
{
  "slug": "my-new-tool",
  "name": "My New Tool",
  "category": "writer",
  "description": "One sentence on what it does and who it's for.",
  "tags": ["templates", "long-form"],
  "url": "https://example.com",
  "pricing": "Free tier + paid plans",
  "featured": false
}
```

Notes:
- `slug` must be unique — it becomes the URL at `/tool/<slug>`.
- `category` must match one of the `slug` values in `data/categories.json`
  (`chat`, `image`, `video`, `voice`, `music`, `writer`, `code`, `design`,
  `business`, `study`, `website-builder`).
- Set `"featured": true` to show it in the homepage's Featured Tools section.
- No build step is required in dev — just save the file and refresh. For a
  static/production deploy, re-run `npm run build`.

## How to add or edit a category

Edit `data/categories.json`. Each category needs:

```json
{
  "slug": "podcasts",
  "code": "PO",
  "name": "Podcasts",
  "color": "#7A5CFF",
  "description": "One sentence describing the category."
}
```

`code` is the two-letter tag shown on cards and category tiles — keep it
short. `color` is used for that tag, the category tile accent, and the
sidebar dot.

## Moving from JSON to a real database

Everything reads through `lib/data.js`. To switch to MongoDB, Firebase, or
any other store, you only need to change the bodies of the functions in that
file — every page and component calls `getTools()`, `getToolsByCategory()`,
etc. and doesn't care where the data comes from.

Example sketch for MongoDB:

```js
// lib/data.js
import clientPromise from "@/lib/mongodb";

export async function getTools() {
  const client = await clientPromise;
  return client.db("directory").collection("tools").find({}).toArray();
}
```

If you do this, note that `getCategories`, `getToolBySlug`, etc. become
`async`, and the pages in `app/` that call them (they're React Server
Components) will need an `await` in front of each call — that's the only
ripple effect.

A minimal Express + MongoDB API (if you want a separate backend instead of
Next.js server components/route handlers) would expose:

```
GET  /api/tools                 list all tools (supports ?q=&category=)
GET  /api/tools/:slug           single tool
GET  /api/categories            list all categories
POST /api/tools                 add a tool (admin-only)
```

## Wiring up the newsletter

`components/Newsletter.js` is a plain form that currently just flips to a
"you're on the list" state locally. Point its `onSubmit` at:
- A Mailchimp/ConvertKit/Beehiiv signup endpoint, or
- A Next.js Route Handler (`app/api/subscribe/route.js`) that forwards to
  whatever email service you use.

## Deploying

**Vercel** (recommended, zero-config for Next.js):
1. Push this project to a GitHub repo.
2. Import it at vercel.com/new.
3. Vercel detects Next.js automatically — no build settings needed.

**Netlify:**
1. Push to GitHub.
2. New site from Git → pick the repo.
3. Build command: `npm run build`, publish directory: handled automatically
   by the Next.js Netlify plugin (Netlify prompts you to add it).

**Firebase Hosting:**
Use `firebase-frameworks` (`firebase experiments:enable webframeworks`) so
Firebase can build and serve the Next.js app directly, or export a fully
static build (`next.config.js` → `output: "export"`) if you don't need
server rendering — note that a static export means `ToolExplorer`'s search
still works (it's client-side), but you lose server-rendered per-request
data if you later move to a live database.

## Customizing the look

Colors, type, and spacing tokens live in `tailwind.config.js` (`paper`,
`ink`, `muted`, `line`, `accent`) and `app/globals.css` (font stacks). Each
category's accent color is set per-category in `data/categories.json`, so
you can restyle a single category without touching any component.
