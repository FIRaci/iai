import { Link, useLocation } from "react-router-dom"
import { ChevronRight, Home } from "lucide-react"

const pageLabels: Record<string, string> = {
  "getting-started": "Bắt đầu",
}

const categoryLabels: Record<string, string> = {
  "ai-tools": "AI Tools",
  "dev-tools": "Dev Tools",
  comparisons: "So sánh",
}

const toolLabels: Record<string, string> = {
  "claude-code": "Claude Code CLI",
  "claude-kit": "ClaudeKit",
  cursor: "Cursor",
  copilot: "GitHub Copilot",
  devin: "Devin",
  windsurf: "Windsurf",
  openclaw: "OpenClaw",
  nodejs: "Node.js",
  git: "Git",
  vscode: "VS Code",
  "ai-coding-tools": "So sánh AI Coding Tools",
}

export function Breadcrumbs() {
  const { pathname } = useLocation()
  const parts = pathname.split("/").filter(Boolean)

  if (parts.length === 0) return null

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      <Link to="/" className="hover:text-foreground transition-colors">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {parts.map((part, i) => {
        const href = "/" + parts.slice(0, i + 1).join("/")
        const label = pageLabels[part] || (i === 0 ? categoryLabels[part] : toolLabels[part]) || part
        const isLast = i === parts.length - 1
        return (
          <span key={href} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link to={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
