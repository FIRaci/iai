import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Seo } from "@/components/Seo"
import {
  BookOpen, Code2, GitCompare, Sparkles, Palette, Database, ArrowRight,
  Cpu, Mic, Search, Shield, Eye, Layers, Monitor, FolderTree, FlaskConical,
  Server, Brain, Video, BarChart3, Cloud, TestTube, FileText, Notebook, Dice5,
  Package, Settings, Workflow, Terminal, Heart, Clock,
} from "lucide-react"
import { getContentTree } from "@/lib/content-loader"
import { useBookmarks } from "@/hooks/useBookmarks"
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed"
import { getToolIcon } from "@/lib/icons"

const iconMap: Record<string, any> = {
  "ai-coding": Code2,
  "ai-tools": Sparkles,
  "ai-services": Sparkles,
  "llm-runtimes": Cpu,
  "multimodal": Layers,
  "voice-audio": Mic,
  "mlops": FolderTree,
  "vector-db": Database,
  "vector-databases": Database,
  "datasets": FlaskConical,
  "data-datasets": FlaskConical,
  "observability": Eye,
  "security": Shield,
  "dev-tools": Monitor,
  "dev-infra": FolderTree,
  "productivity": Search,
  "frontend": Monitor,
  "backend": Server,
  "apis": Workflow,
  "automation": Workflow,
  "cloud": Cloud,
  "model-hubs": Database,
  "evaluation": TestTube,
  "benchmarking": TestTube,
  "testing": TestTube,
  "documentation": FileText,
  "notebooks": Notebook,
  "windows-setup": Monitor,
  "comparisons": GitCompare,
  "search": Search,
  "package-managers": Package,
  "utilities": Settings,
  "cli-tools": Terminal,
  "terminals": Terminal,
  "editors": Code2,
  "ide-plugins": Code2,
  "git-tools": GitCompare,
  "databases": Database,
  "data-processing": Layers,
  "fine-tuning": Brain,
  "frameworks": Code2,
  "libraries": Code2,
  "embeddings": Brain,
  "rag": Layers,
  "image-generation": Palette,
  "video": Video,
  "visualization": BarChart3,
  "monitoring": Eye,
  "devops": FolderTree,
  "deployment": Cloud,
  "tools": Settings,
}

const colorMap: Record<string, string> = {
  "ai-coding": "text-blue-500",
  "ai-tools": "text-indigo-500",
  "ai-services": "text-purple-500",
  "llm-runtimes": "text-orange-500",
  "multimodal": "text-purple-500",
  "voice-audio": "text-green-500",
  "mlops": "text-cyan-500",
  "vector-db": "text-red-500",
  "vector-databases": "text-red-500",
  "datasets": "text-amber-500",
  "data-datasets": "text-amber-500",
  "observability": "text-violet-500",
  "security": "text-rose-500",
  "dev-tools": "text-sky-500",
  "dev-infra": "text-indigo-500",
  "productivity": "text-teal-500",
  "frontend": "text-blue-500",
  "backend": "text-green-500",
  "apis": "text-cyan-500",
  "automation": "text-emerald-500",
  "cloud": "text-blue-500",
  "model-hubs": "text-purple-500",
  "evaluation": "text-violet-500",
  "benchmarking": "text-orange-500",
  "testing": "text-pink-500",
  "documentation": "text-slate-500",
  "notebooks": "text-amber-500",
  "windows-setup": "text-blue-500",
  "comparisons": "text-violet-500",
  "search": "text-teal-500",
  "package-managers": "text-green-500",
  "utilities": "text-gray-500",
  "cli-tools": "text-gray-500",
  "terminals": "text-gray-500",
  "editors": "text-blue-500",
  "ide-plugins": "text-purple-500",
  "git-tools": "text-orange-500",
  "databases": "text-blue-500",
  "data-processing": "text-cyan-500",
  "fine-tuning": "text-purple-500",
  "frameworks": "text-green-500",
  "libraries": "text-blue-500",
  "embeddings": "text-indigo-500",
  "rag": "text-cyan-500",
  "image-generation": "text-pink-500",
  "video": "text-red-500",
  "visualization": "text-blue-500",
  "monitoring": "text-green-500",
  "devops": "text-indigo-500",
  "deployment": "text-sky-500",
  "tools": "text-gray-500",
}

function getCategoryStats() {
  const tree = getContentTree()
  let totalTools = 0
  const categories = tree.map((cat) => {
    const count = cat.children?.length || 0
    totalTools += count
    return { title: cat.title, count, path: cat.path }
  })
  return { totalTools, categories }
}

const featuredTools = [
  { to: "/ai-tools/claude-code", title: "Claude Code CLI", desc: "AI coding trong terminal", gradient: "from-blue-500 to-indigo-600", icon: Code2 },
  { to: "/ai-tools/cursor", title: "Cursor", desc: "AI-native code editor", gradient: "from-cyan-500 to-teal-600", icon: Code2 },
  { to: "/ai-tools/chatgpt", title: "ChatGPT", desc: "AI chatbot hàng đầu", gradient: "from-emerald-500 to-teal-600", icon: Sparkles },
  { to: "/ai-tools/midjourney", title: "Midjourney", desc: "AI tạo ảnh chất lượng cao", gradient: "from-purple-500 to-pink-600", icon: Palette },
  { to: "/ai-tools/perplexity", title: "Perplexity", desc: "AI search engine", gradient: "from-teal-500 to-emerald-600", icon: BookOpen },
  { to: "/llm-runtimes/ollama", title: "Ollama", desc: "Local LLM runner", gradient: "from-sky-500 to-blue-600", icon: Cpu },
  { to: "/llm-runtimes/llama-cpp", title: "Llama.cpp", desc: "C/C++ LLM inference", gradient: "from-orange-500 to-amber-600", icon: Cpu },
  { to: "/llm-runtimes/langchain", title: "LangChain", desc: "LLM orchestration", gradient: "from-teal-500 to-cyan-600", icon: Layers },
]

const devTools = [
  { to: "/dev-tools/nodejs", title: "Node.js", desc: "JavaScript runtime", gradient: "from-green-500 to-emerald-600", icon: Code2 },
  { to: "/dev-tools/docker", title: "Docker", desc: "Container platform", gradient: "from-blue-500 to-cyan-600", icon: FolderTree },
  { to: "/dev-tools/postgresql", title: "PostgreSQL", desc: "Relational database", gradient: "from-blue-500 to-indigo-600", icon: Database },
  { to: "/dev-tools/vscode", title: "VS Code", desc: "Code editor phổ biến", gradient: "from-blue-500 to-sky-600", icon: Monitor },
  { to: "/dev-tools/git", title: "Git", desc: "Version control", gradient: "from-orange-500 to-amber-600", icon: Code2 },
  { to: "/dev-tools/figma", title: "Figma", desc: "Design tool", gradient: "from-purple-500 to-pink-600", icon: Palette },
]

function RandomToolWidget() {
  const tree = getContentTree()
  const allTools = tree.flatMap((c) => c.children || []).filter(Boolean)
  const [tool, setTool] = useState(allTools.length > 0 ? allTools[Math.floor(Math.random() * allTools.length)] : null)
  const withNav = useNavigate()

  const pick = () => {
    const t = allTools[Math.floor(Math.random() * allTools.length)]
    setTool(t)
    const el = document.getElementById("random-tool-card")
    el?.classList.remove("card-shake")
    void el?.offsetWidth
    el?.classList.add("card-shake")
  }

  if (!tool) return null

  return (
    <div
      id="random-tool-card"
      className="animate-fade-in-up stagger-1 rounded-xl border border-border bg-gradient-to-br from-primary/5 via-card to-blue-500/5 p-5 card-hover cursor-pointer"
      onClick={() => withNav(tool.path)}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-500 text-white shadow-sm glow-pulse">
          <Dice5 className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-0.5">
            <Sparkles className="h-3 w-3 text-primary" />
            Gợi ý ngẫu nhiên — nhấn để khám phá
          </div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate">{tool.title}</h3>
            <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              {tool.category || "tool"}
            </span>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); pick() }}
          className="shrink-0 flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all active:scale-95"
          aria-label="Random tool"
          title="Công cụ khác"
        >
          <Dice5 className="h-3.5 w-3.5 tool-icon-bounce" />
          Đổi
        </button>
      </div>
    </div>
  )
}

function getCategoryLinks() {
  const tree = getContentTree()
  return tree
    .filter((cat) => cat.path !== "/getting-started" && cat.path !== "/comparisons")
    .sort((a, b) => (b.children?.length || 0) - (a.children?.length || 0))
    .map((cat) => {
      const slug = cat.path.replace("/", "")
      const Icon = iconMap[slug] || BookOpen
      const color = colorMap[slug] || "text-muted-foreground"
      return { to: cat.path, title: cat.title, icon: Icon, color, count: cat.children?.length || 0 }
    })
}

export function Home() {
  const { totalTools } = getCategoryStats()
  const categoryLinks = getCategoryLinks()
  const { bookmarks } = useBookmarks()
  const { recent } = useRecentlyViewed()
  const tree = getContentTree()
  const allTools = tree.flatMap((c) => c.children || []).filter(Boolean)
  const bookmarkedTools = allTools.filter((t) => bookmarks.includes(t.path))
  return (
    <>
      <Seo
        title="Trang chủ"
        description={`Kho tàng ${totalTools}+ AI tools và dev tools toàn diện dành cho người dùng Windows 11`}
        path="/"
      />
      <div className="mx-auto max-w-5xl space-y-14">
        {/* Hero */}
        <div className="space-y-6 pt-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Kho tàng AI & Dev Tools — {totalTools}+ công cụ
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Chào mừng đến với{" "}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              IAI
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Kho tàng toàn diện về AI tools và dev tools dành cho người dùng Windows 11.
            Từ AI coding, AI creative, đến dev essentials — tất cả trong một nơi.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 pt-2">
            {[
              { label: "Công cụ", value: `${totalTools}+`, icon: Sparkles },
              { label: "Danh mục", value: "20+", icon: BookOpen },
              { label: "Hướng dẫn", value: "150+", icon: Code2 },
              { label: "Cập nhật", value: "2026", icon: GitCompare },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 card-hover"
              >
                <stat.icon className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                <div>
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Random Tool */}
        <RandomToolWidget />

        {/* Bookmarks */}
        {bookmarkedTools.length > 0 && (
          <div className="animate-fade-in-up stagger-2">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Yêu thích
            </h2>
            <div className="flex flex-wrap gap-2">
              {bookmarkedTools.map((t) => {
                const Icon = getToolIcon(t.path.split("/").pop() || "")
                return (
                  <Link
                    key={t.path}
                    to={t.path}
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground hover:bg-muted/50 hover:border-primary/30 transition-all"
                  >
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    {t.title}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Recently viewed */}
        {recent.length > 0 && (
          <div className="animate-fade-in-up stagger-3">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Đã xem gần đây
            </h2>
            <div className="flex flex-wrap gap-2">
              {recent.map((r) => {
                const Icon = getToolIcon(r.path.split("/").pop() || "")
                return (
                  <Link
                    key={r.path}
                    to={r.path}
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground hover:bg-muted/50 hover:border-primary/30 transition-all"
                  >
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    {r.title}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Quick Categories */}
        <div className="animate-fade-in-up stagger-4">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Danh mục
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryLinks.map((cat) => (
              <Link
                key={cat.to}
                to={cat.to}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 card-hover cursor-pointer"
              >
                <cat.icon className={`h-5 w-5 ${cat.color} transition-transform group-hover:scale-110`} />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors truncate block">
                    {cat.title}
                  </span>
                  <span className="text-xs text-muted-foreground">{cat.count} tools</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* AI Tools Section */}
        <div className="animate-fade-in-up stagger-5">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Tools nổi bật
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="group relative rounded-xl border border-border bg-card p-5 card-hover cursor-pointer"
              >
                <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${tool.gradient} text-white shadow-sm`}>
                  <tool.icon className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{tool.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
              </Link>
            ))}
            <Link
              to="/ai-tools"
              className="group relative rounded-xl border border-dashed border-border bg-card p-5 card-hover flex items-center justify-center cursor-pointer"
            >
              <div className="text-center">
                <p className="font-semibold text-primary flex items-center justify-center gap-1">
                  Xem tất cả <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </p>
                <p className="text-xs text-muted-foreground mt-1">Tất cả AI tools</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Dev Tools Section */}
        <div className="animate-fade-in-up stagger-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Dev Tools phổ biến
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {devTools.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="group relative rounded-xl border border-border bg-card p-5 card-hover cursor-pointer"
              >
                <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${tool.gradient} text-white shadow-sm`}>
                  <tool.icon className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{tool.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
              </Link>
            ))}
            <Link
              to="/dev-tools"
              className="group relative rounded-xl border border-dashed border-border bg-card p-5 card-hover flex items-center justify-center cursor-pointer"
            >
              <div className="text-center">
                <p className="font-semibold text-primary flex items-center justify-center gap-1">
                  Xem tất cả <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </p>
                <p className="text-xs text-muted-foreground mt-1">Tất cả dev tools</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="animate-fade-in-up stagger-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-primary" />
            So sánh
          </h2>
          <Link
            to="/comparisons"
            className="group relative rounded-xl border border-border bg-card p-6 card-hover block cursor-pointer"
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm">
              <GitCompare className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">So sánh AI Coding Tools</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Bảng so sánh chi tiết các AI coding tools — giúp bạn chọn công cụ phù hợp nhất.
            </p>
          </Link>
        </div>

        {/* Getting started guide */}
        <div className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/50 dark:to-muted/30 p-6 animate-fade-in-up stagger-10">
          <h2 className="mb-5 text-lg font-semibold text-foreground">Bắt đầu từ đâu?</h2>
          <ol className="space-y-4">
            {[
              { num: "1", text: "Cài đặt môi trường:", links: [{ to: "/dev-tools/nodejs", label: "Node.js" }, { to: "/dev-tools/git", label: "Git" }] },
              { num: "2", text: "Chọn AI tool phù hợp qua", link: { to: "/comparisons", label: "bảng so sánh" } },
              { num: "3", text: "Làm theo hướng dẫn chi tiết để cài đặt và sử dụng tool bạn chọn" },
              { num: "4", text: `Khám phá kho tàng ${totalTools}+ công cụ AI và dev tools!` },
            ].map((step) => (
              <li key={step.num} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                  {step.num}
                </span>
                <span className="text-muted-foreground leading-relaxed">
                  {step.text}
                  {"links" in step && step.links && step.links.map((l, i) => (
                    <span key={l.to}>
                      {" "}<Link to={l.to} className="font-semibold text-primary hover:underline">{l.label}</Link>
                      {i < step.links!.length - 1 && " + "}
                    </span>
                  ))}
                  {"link" in step && step.link && (
                    <span>
                      {" "}<Link to={step.link.to} className="font-semibold text-primary hover:underline">{step.link.label}</Link>
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}
