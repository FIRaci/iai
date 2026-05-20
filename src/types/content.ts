export interface HeadingItem {
  id: string
  text: string
  level: number
}

export interface RouteNode {
  path: string
  title: string
  category: string
  type?: "category" | "guide" | "page"
  icon?: string
  difficulty?: "beginner" | "intermediate" | "advanced"
  tags?: string[]
  children: RouteNode[]
  headings: HeadingItem[]
  frontmatter: Record<string, unknown>
}
