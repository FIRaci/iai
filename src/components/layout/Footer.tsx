import { BookOpen, GitBranch } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="border-t border-[#d0d7de] dark:border-[#30363d] bg-background">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#656d76] dark:text-[#8b949e]">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-blue-500 text-white">
              <BookOpen className="h-3.5 w-3.5" />
            </div>
            <span>© 2026 IAI — Cẩm nang AI Tools & Dev Tools</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/FIRaci/iai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#656d76] dark:text-[#8b949e] hover:text-[#1f2328] dark:hover:text-[#e6edf3] transition-colors"
            >
              <GitBranch className="h-4 w-4" />
              GitHub
            </a>
            <Link to="/getting-started" className="text-sm text-primary hover:underline font-medium">
              Bắt đầu
            </Link>
            <Link to="/comparisons" className="text-sm text-primary hover:underline font-medium">
              So sánh
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
