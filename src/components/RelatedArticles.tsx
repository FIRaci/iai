import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { getContentTree } from "@/lib/content-loader"
import type { RouteNode } from "@/types/content"

interface RelatedArticlesProps {
  currentPath: string
  category: string
  tags?: string[]
}

export function RelatedArticles({ currentPath, category, tags = [] }: RelatedArticlesProps) {
  const tree = getContentTree()
  const cat = tree.find((c) => c.path === `/${category}`)
  
  if (!cat || !cat.children) return null

  const related = cat.children
    .filter((item: RouteNode) => item.path !== currentPath)
    .filter((item: RouteNode) => {
      if (tags.length === 0) return true
      const itemTags = (item as any).tags || []
      return itemTags.some((tag: string) => tags.includes(tag))
    })
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Bài viết liên quan</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {related.map((item: RouteNode) => (
          <Link
            key={item.path}
            to={item.path}
            className="group flex items-center gap-2 rounded-lg border border-border bg-card p-3 card-hover"
          >
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary shrink-0" />
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
