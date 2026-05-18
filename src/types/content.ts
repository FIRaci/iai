export interface HeadingItem {
  id: string
  text: string
  level: number
}

export interface RouteNode {
  path: string
  title: string
  category: "ai-tools" | "dev-tools" | "comparisons" | "pages" | "home"
  type?: "category" | "guide" | "page"
  icon?: string
  difficulty?: "beginner" | "intermediate" | "advanced"
  tags?: string[]
  children: RouteNode[]
  headings: HeadingItem[]
  frontmatter: Record<string, unknown>
}
