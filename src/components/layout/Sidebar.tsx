import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  BookOpen, ChevronDown, Compass,
} from "lucide-react"
import { useState, useEffect } from "react"
import { getToolIcon } from "@/lib/icons"
import { getContentTree } from "@/lib/content-loader"
import { getCategoryConfig, getCategoryIcon, catGradients } from "@/data/category-config"
import type { LucideIcon } from "lucide-react"

const topLinks = [
  { title: "Bắt đầu", icon: Compass, path: "/getting-started" },
]

interface NavGroup {
  title: string
  icon: LucideIcon
  path: string
  categoryKey: string
  children: { title: string; path: string }[]
}

function buildNavTree(): NavGroup[] {
  const tree = getContentTree()
  const groups: NavGroup[] = []

  for (const node of tree) {
    if (node.type === "page" || node.category === "pages") continue
    if (!node.children || node.children.length === 0) continue
    if (node.path === "/vector-db") continue

    const catKey = node.category as string
    const config = getCategoryConfig(catKey)
    groups.push({
      title: config?.title || node.title || catKey,
      icon: (getCategoryIcon(catKey) || BookOpen) as typeof BookOpen,
      path: node.path,
      categoryKey: catKey,
      children: node.children.map((c) => ({
        title: c.title || "",
        path: c.path,
      })),
    })
  }

  return groups
}

function CatIcon({ item }: { item: NavGroup }) {
  const gradient = catGradients[item.categoryKey] || "from-primary to-blue-500"
  const Icon = item.icon
  return (
    <div className={`flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br ${gradient} text-white/90 shadow-sm`}>
      <Icon className="h-3 w-3" />
    </div>
  )
}

function NavItem({
  item,
  isActive,
}: {
  item: NavGroup
  isActive: boolean
}) {
  const location = useLocation()
  const childActive = item.children.some((c) => location.pathname === c.path)
  const [open, setOpen] = useState(childActive)

  useEffect(() => {
    if (childActive) setOpen(true)
  }, [childActive])

  const childCount = item.children.length
  const maxHeight = childCount * 36 + 16

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`nav-group-${item.title}`}
        className={cn(
          "sidebar-link flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
          isActive || childActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        )}
      >
        <CatIcon item={item} />
        <span className="flex-1 text-left truncate">{item.title}</span>
        <span className="cat-count flex h-4 min-w-4 items-center justify-center rounded-full bg-muted/60 px-1 text-[10px] font-medium text-muted-foreground/70">
          {childCount}
        </span>
        <ChevronDown
          className={cn(
            "h-3 w-3 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        id={`nav-group-${item.title}`}
        role="region"
        className="overflow-hidden collapsible-content"
        style={{ maxHeight: open ? `${maxHeight}px` : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="ml-3 mt-1 space-y-0.5 border-l border-sidebar-border pl-2">
          {item.children.map((child) => {
            const slug = child.path.split("/").pop() || ""
            const ChildIcon = getToolIcon(slug)
            const isChildActive = location.pathname === child.path
            return (
              <Link
                key={child.path}
                to={child.path}
                aria-current={isChildActive ? "page" : undefined}
                className={cn(
                  "sidebar-link flex items-center gap-2 rounded-md px-3 py-1.5 text-sm",
                  isChildActive
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <ChildIcon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{child.title}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const location = useLocation()
  const [navItems, setNavItems] = useState<NavGroup[]>([])

  useEffect(() => {
    setNavItems(buildNavTree())
  }, [])

  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar-background text-sidebar-foreground lg:block">
      <div className="flex h-full flex-col">
        <Link
          to="/"
          className="sidebar-link flex items-center gap-2.5 border-b border-sidebar-border px-4 py-4 font-semibold"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-500 text-white shadow-sm">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">IAI</span>
        </Link>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Main navigation">
          {topLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "sidebar-link flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {link.title}
              </Link>
            )
          })}
          <div className="my-2 border-t border-sidebar-border" />
          {navItems.map((item) => (
            <NavItem
              key={item.title}
              item={item}
              isActive={location.pathname.startsWith(item.path)}
            />
          ))}
        </nav>
      </div>
    </aside>
  )
}