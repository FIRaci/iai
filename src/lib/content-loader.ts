import type { RouteNode } from "@/types/content"
import { getCategoryTitle } from "@/data/category-config"

interface MdxModule {
  default: React.ComponentType
  title?: string
  category?: string
  icon?: string
  difficulty?: string
  tags?: string[]
  lastUpdated?: string
  author?: string
}

const contentModules = import.meta.glob<MdxModule>(
  "/src/content/**/*.mdx",
  { eager: true },
)

export function getContentTree(): RouteNode[] {
  const categories: Record<string, RouteNode> = {}
  const pages: RouteNode[] = []

  for (const [filepath, mod] of Object.entries(contentModules)) {
    const rel = filepath
      .replace("/src/content/", "")
      .replace("/index.mdx", "")
      .replace(".mdx", "")

    const parts = rel.split("/")
    const categoryKey = parts[0]
    const slug = parts[1]

    if (categoryKey === "pages") {
      pages.push({
        path: `/${slug}`,
        title: mod.title || slug || "",
        category: "pages",
        type: "page",
        icon: mod.icon,
        headings: [],
        frontmatter: {},
        children: [],
      })
      continue
    }

    if (!slug) continue

    if (!categories[categoryKey]) {
      categories[categoryKey] = {
        path: `/${categoryKey}`,
        title: getCategoryTitle(categoryKey),
        category: categoryKey as RouteNode["category"],
        type: "category",
        children: [],
        headings: [],
        frontmatter: {},
      }
    }

    categories[categoryKey].children.push({
      path: `/${categoryKey}/${slug}`,
      title: mod.title || slug,
      category: categoryKey as RouteNode["category"],
      type: "guide",
      icon: mod.icon,
      difficulty: mod.difficulty as RouteNode["difficulty"],
      tags: mod.tags || [],
      headings: [],
      frontmatter: {},
      children: [],
    })
  }

  return [...pages, ...Object.values(categories)]
}

export function getContentModule(path: string): () => MdxModule {
  const pagePath = `/src/content/pages${path}.mdx`
  if (contentModules[pagePath]) return () => contentModules[pagePath]
  const mdxPaths = [
    `/src/content${path === "/" ? "/index" : path}.mdx`,
    `/src/content${path}/index.mdx`,
  ]
  for (const p of mdxPaths) {
    if (contentModules[p]) return () => contentModules[p]
  }
  return () => contentModules[mdxPaths[0]]
}

