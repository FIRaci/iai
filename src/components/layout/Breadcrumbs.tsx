import { Link, useLocation } from "react-router-dom"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { getCategoryTitle } from "@/data/category-config"
import { getContentTree } from "@/lib/content-loader"

export function Breadcrumbs() {
  const { pathname } = useLocation()
  const parts = pathname.split("/").filter(Boolean)

  if (parts.length === 0) return null

  const tree = getContentTree()

  function findLabel(part: string, index: number): string {
    if (index === 0) return getCategoryTitle(part)
    const categoryKey = parts[0]
    const cat = tree.find((c) => c.category === categoryKey || c.path === `/${categoryKey}`)
    if (cat) {
      const child = cat.children?.find((c) => c.path.endsWith(`/${part}`) || c.path === `/${categoryKey}/${part}`)
      if (child?.title) return child.title
    }
    return part
  }

  return (
    <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
      <Link to="/" className="breadcrumb-link flex items-center gap-1.5 text-muted-foreground" aria-label="Home">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {parts.map((part, i) => {
        const href = "/" + parts.slice(0, i + 1).join("/")
        const label = findLabel(part, i)
        const isLast = i === parts.length - 1
        return (
          <span key={href} className={cn("flex items-center gap-1.5", !isLast && "max-sm:hidden")}>
            <ChevronRight className="h-3 w-3 text-border" />
            {isLast ? (
              <span className="font-medium text-foreground truncate max-w-[160px] sm:max-w-none">{label}</span>
            ) : (
              <Link to={href} className="breadcrumb-link text-muted-foreground whitespace-nowrap">
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}