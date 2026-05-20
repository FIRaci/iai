import type { RouteNode } from "@/types/content"

interface MdxModule {
  default: React.ComponentType
  title?: string
  category?: string
  icon?: string
  difficulty?: string
  tags?: string[]
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

function getCategoryTitle(category: string): string {
  const titles: Record<string, string> = {
    "frontend": "Frontend",
    "backend": "Backend",
    "ai-tools": "AI Tools",
    "llm-runtimes": "LLM Runtimes & RAG",
    "ai-creative": "AI Creative",
    "video": "Video & Media",
    "visualization": "Visualization",
    "databases": "Data & Databases",
    "ml-training": "ML & Training",
    "cloud": "Cloud & Model Hubs",
    "evaluation": "Evaluation & Benchmarking",
    "testing": "Testing",
    "observability": "Observability & Monitoring",
    "security": "Security & Ethics",
    "dev-tools": "Dev Tools",
    "devops": "DevOps & Infra",
    "search": "Search & Automation",
    "package-managers": "Package Managers",
    "utilities": "Utilities",
    "documentation": "Documentation",
    "notebooks": "Notebooks",
    "windows-setup": "Windows 11 Setup",
    "comparisons": "So sánh",
    "pages": "Pages",
  }
  return titles[category] || category
}
