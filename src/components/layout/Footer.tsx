import { BookOpen, GitBranch, Heart, Zap, Shield, BookMarked } from "lucide-react"
import { Link } from "react-router-dom"
import { getContentTree } from "@/lib/content-loader"

const APP_VERSION = "v1.3.0"

function getCategoryStats() {
  const tree = getContentTree()
  let totalTools = 0
  tree.forEach((cat) => { totalTools += cat.children?.length || 0 })
  return totalTools
}

export function Footer() {
  const totalTools = getCategoryStats()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Top section */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-500 text-white shadow-sm">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-semibold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">IAI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kho tàng {totalTools}+ AI tools và dev tools dành cho Windows 11.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Điều hướng</h3>
            <div className="space-y-2">
              <Link to="/getting-started" className="footer-link block text-sm text-muted-foreground">
                Bắt đầu
              </Link>
              <Link to="/comparisons" className="footer-link block text-sm text-muted-foreground">
                So sánh tools
              </Link>
              <Link to="/ai-tools" className="footer-link block text-sm text-muted-foreground">
                AI Tools
              </Link>
              <Link to="/dev-tools" className="footer-link block text-sm text-muted-foreground">
                Dev Tools
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Tính năng</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                Tìm kiếm nhanh Ctrl+K
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-green-500" />
                Chạy local, không tracking
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookMarked className="h-3.5 w-3.5 text-blue-500" />
                {totalTools}+ hướng dẫn chi tiết
              </div>
            </div>
          </div>

          {/* Open Source */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Mã nguồn mở</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dự án mã nguồn mở, đóng góp tự do trên GitHub.
            </p>
            <a
              href="https://github.com/FIRaci/iai"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link inline-flex items-center gap-1.5 text-sm text-primary font-medium"
            >
              <GitBranch className="h-4 w-4" />
              GitHub Repository
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2026 IAI</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500" /> for the AI community
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{totalTools}+ tools</span>
            <span className="text-border">|</span>
            <span>20+ categories</span>
            <span className="text-border">|</span>
            <span>Windows 11</span>
            <span className="text-border">|</span>
            <span>{APP_VERSION}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
