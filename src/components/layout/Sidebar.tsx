import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { BookOpen, Code2, GitCompare, ChevronDown } from "lucide-react"
import { useState } from "react"

const navItems = [
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
  item: (typeof navItems)[number]
  isActive: boolean
}) {
  const location = useLocation()
  const [open, setOpen] = useState(true)

  if (!("children" in item) || !item.children) return null

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        {item.icon && <item.icon className="h-4 w-4" />}
        <span className="flex-1 text-left">{item.title}</span>
        <ChevronDown
          className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="ml-2 mt-1 space-y-1 border-l pl-2">
          {item.children.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              className={cn(
                "block rounded-md px-3 py-1.5 text-sm transition-colors",
                location.pathname === child.path
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
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
          className="flex items-center gap-2 border-b px-4 py-4 font-semibold"
        >
          <BookOpen className="h-5 w-5 text-primary" />
          IAI
        </Link>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              isActive={location.pathname.startsWith(item.path)}
            />
          ))}
        </nav>
      </div>
    </aside>
  )
}
