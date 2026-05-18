import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { BookOpen, Code2, GitCompare, ChevronDown, Compass } from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { getToolIcon } from "@/lib/icons"

const topLinks = [
  { title: "Bắt đầu", icon: Compass, path: "/getting-started" },
]

interface NavChild {
  title: string
  path: string
}

interface NavGroup {
  title: string
  icon: typeof BookOpen
  path: string
  children: NavChild[]
}

const navItems: NavGroup[] = [
  {
    title: "AI Tools",
    icon: BookOpen,
    path: "/ai-tools",
    children: [
      { title: "Claude Code CLI", path: "/ai-tools/claude-code" },
      { title: "ClaudeKit", path: "/ai-tools/claude-kit" },
      { title: "Cursor", path: "/ai-tools/cursor" },
      { title: "GitHub Copilot", path: "/ai-tools/copilot" },
      { title: "Devin", path: "/ai-tools/devin" },
      { title: "Windsurf", path: "/ai-tools/windsurf" },
      { title: "OpenClaw", path: "/ai-tools/openclaw" },
    ],
  },
  {
    title: "Dev Tools",
    icon: Code2,
    path: "/dev-tools",
    children: [
      { title: "Node.js", path: "/dev-tools/nodejs" },
      { title: "Git", path: "/dev-tools/git" },
      { title: "VS Code", path: "/dev-tools/vscode" },
    ],
  },
  {
    title: "So sánh",
    icon: GitCompare,
    path: "/comparisons",
    children: [
      { title: "AI Coding Tools", path: "/comparisons/ai-coding-tools" },
    ],
  },
]

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

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
          isActive || childActive
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
        <span className="flex-1 text-left truncate">{item.title}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "ml-2 mt-1 space-y-1 overflow-hidden transition-all duration-200",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="border-l pl-2">
          {item.children.map((child) => {
            const slug = child.path.split("/").pop() || ""
            const ChildIcon = getToolIcon(slug)
            const isChildActive = location.pathname === child.path
            return (
              <Link
                key={child.path}
                to={child.path}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-all duration-150",
                  isChildActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
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

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-sidebar-background text-sidebar-foreground lg:block">
      <div className="flex h-full flex-col">
        <Link
          to="/"
          className="flex items-center gap-2 border-b px-4 py-4 font-semibold transition-colors hover:bg-accent"
        >
          <BookOpen className="h-5 w-5 text-primary" />
          <span>IAI</span>
        </Link>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {topLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {link.title}
              </Link>
            )
          })}
          <div className="my-2 border-t" />
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              isActive={location.pathname.startsWith(item.path)}
            />
          ))}
        </nav>
        <div className="border-t p-3">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  )
}
