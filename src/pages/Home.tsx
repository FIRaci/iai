import { Link } from "react-router-dom"
import { Seo } from "@/components/Seo"
import {
  BookOpen, Code2, GitCompare, Sparkles, Palette, Database, ArrowRight,
  Cpu, Mic, Search, Shield, Eye, Layers, Monitor, FolderTree, FlaskConical,
} from "lucide-react"
import { getContentTree } from "@/lib/content-loader"

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

const categoryLinks = [
  { to: "/ai-tools", title: "AI Coding", icon: Code2, color: "text-blue-500" },
  { to: "/llm-runtimes", title: "LLM Runtimes", icon: Cpu, color: "text-orange-500" },
  { to: "/multimodal", title: "Multimodal", icon: Layers, color: "text-purple-500" },
  { to: "/voice-audio", title: "Voice & Audio", icon: Mic, color: "text-green-500" },
  { to: "/mlops", title: "MLOps", icon: FolderTree, color: "text-cyan-500" },
  { to: "/vector-db", title: "Vector DBs", icon: Database, color: "text-red-500" },
  { to: "/datasets", title: "Datasets", icon: FlaskConical, color: "text-amber-500" },
  { to: "/observability", title: "Observability", icon: Eye, color: "text-violet-500" },
  { to: "/security", title: "Security", icon: Shield, color: "text-rose-500" },
  { to: "/dev-tools", title: "Dev Tools", icon: Monitor, color: "text-sky-500" },
  { to: "/dev-infra", title: "Dev Infra", icon: FolderTree, color: "text-indigo-500" },
  { to: "/productivity", title: "Productivity", icon: Search, color: "text-teal-500" },
]

export function Home() {
  const { totalTools } = getCategoryStats()

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

        {/* Quick Categories */}
        <div className="animate-fade-in-up stagger-2">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Danh mục
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categoryLinks.map((cat) => (
              <Link
                key={cat.to}
                to={cat.to}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 card-hover cursor-pointer"
              >
                <cat.icon className={`h-5 w-5 ${cat.color} transition-transform group-hover:scale-110`} />
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {cat.title}
                </span>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>

        {/* AI Tools Section */}
        <div className="animate-fade-in-up stagger-4">
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
