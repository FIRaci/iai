import { useState, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { getContentTree } from "@/lib/content-loader"
import { getToolIcon } from "@/lib/icons"
import {
  BookOpen,
  GitCompare,
  ChevronRight,
  Cpu,
  Database,
  Monitor,
  Shield,
  Eye,
  FolderTree,
  BarChart3,
  Video,
  Cloud,
  Settings,
  FileText,
  Package,
  Workflow,
  TestTube,
  Brain,
  Notebook,
  Sparkles,
  Palette,
  Server,
} from "lucide-react"
import { Seo } from "@/components/Seo"
import { DifficultyBadge } from "@/components/PageTags"
import { TagFilter } from "@/components/TagFilter"

const categoryConfig: Record<string, { title: string; icon: typeof BookOpen; gradient: string; desc: string }> = {
  "frontend": {
    title: "Frontend",
    icon: Monitor,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    desc: "Frontend frameworks, UI libraries, state management, và testing tools",
  },
  "backend": {
    title: "Backend",
    icon: Server,
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    desc: "Backend frameworks, databases, message queues, và API tools",
  },
  "ai-tools": {
    title: "AI Tools",
    icon: Sparkles,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    desc: "AI coding assistants, chat models, và AI productivity tools",
  },
  "llm-runtimes": {
    title: "LLM Runtimes & RAG",
    icon: Cpu,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    desc: "Local LLM runtimes, agent frameworks, và RAG tools",
  },
  "ai-creative": {
    title: "AI Creative",
    icon: Palette,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    desc: "Image generation, video AI, music AI, và creative tools",
  },
  "video": {
    title: "Video & Media",
    icon: Video,
    gradient: "from-red-500 via-rose-500 to-pink-500",
    desc: "Video editing, encoding, streaming, và media players",
  },
  "visualization": {
    title: "Visualization",
    icon: BarChart3,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    desc: "Chart libraries, data visualization, và plotting tools",
  },
  "databases": {
    title: "Data & Databases",
    icon: Database,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    desc: "Vector databases, relational DBs, data processing, và embeddings",
  },
  "ml-training": {
    title: "ML & Training",
    icon: Brain,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    desc: "ML training frameworks, model optimization, và experiment tracking",
  },
  "cloud": {
    title: "Cloud & Model Hubs",
    icon: Cloud,
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    desc: "Cloud AI platforms, model hubs, và GPU cloud services",
  },
  "evaluation": {
    title: "Evaluation & Benchmarking",
    icon: TestTube,
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    desc: "LLM evaluation, benchmarks, và model comparison tools",
  },
  "testing": {
    title: "Testing",
    icon: TestTube,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    desc: "Unit testing, E2E testing, và test automation frameworks",
  },
  "observability": {
    title: "Observability & Monitoring",
    icon: Eye,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    desc: "Monitoring, error tracking, load testing, và data quality",
  },
  "security": {
    title: "Security & Ethics",
    icon: Shield,
    gradient: "from-red-500 via-rose-500 to-pink-500",
    desc: "Security scanning, secret detection, và AI ethics",
  },
  "dev-tools": {
    title: "Dev Tools",
    icon: Monitor,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    desc: "Editors, terminals, Git clients, và development utilities",
  },
  "devops": {
    title: "DevOps & Infra",
    icon: FolderTree,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    desc: "CI/CD, containers, orchestration, và infrastructure-as-code",
  },
  "search": {
    title: "Search & Automation",
    icon: Workflow,
    gradient: "from-teal-500 via-emerald-500 to-green-500",
    desc: "Search engines, workflow automation, và integration platforms",
  },
  "package-managers": {
    title: "Package Managers",
    icon: Package,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    desc: "Package managers cho mọi ngôn ngữ và platform",
  },
  "utilities": {
    title: "Utilities",
    icon: Settings,
    gradient: "from-gray-500 via-slate-500 to-zinc-500",
    desc: "CLI utilities, argument parsers, và terminal helpers",
  },
  "documentation": {
    title: "Documentation",
    icon: FileText,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    desc: "Documentation generators, static site builders, và wiki tools",
  },
  "notebooks": {
    title: "Notebooks",
    icon: Notebook,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    desc: "Interactive notebooks cho data science và ML experimentation",
  },
  "windows-setup": {
    title: "Windows 11 Setup",
    icon: Monitor,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    desc: "Hướng dẫn cài đặt và cấu hình Windows 11 cho developers",
  },
  comparisons: {
    title: "So sánh",
    icon: GitCompare,
    gradient: "from-violet-500 to-purple-600",
    desc: "Bảng so sánh chi tiết — chọn công cụ phù hợp nhất",
  },
}

export function CategoryPage() {
  const { category } = useParams()
  const tree = getContentTree()
  const cat = tree.find((c) => c.path === `/${category}`)
  const config = category ? categoryConfig[category] : null
  const catTitle = config?.title || category || ""
  const catDesc = config?.desc || ""
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const allTags = useMemo(() => {
    if (!cat) return []
    return cat.children.flatMap(item => item.tags || [])
  }, [cat])

  const filteredChildren = useMemo(() => {
    if (!cat) return []
    if (selectedTags.length === 0) return cat.children
    return cat.children.filter(item => {
      const itemTags = item.tags || []
      return selectedTags.some(tag => itemTags.includes(tag))
    })
  }, [cat, selectedTags])

  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handleClearTags = () => setSelectedTags([])

  if (!cat || !config) return <div className="py-20 text-center text-muted-foreground">Khong tim thay danh muc</div>

  const Icon = config.icon
  const gradient = config.gradient

  return (
    <>
      <Seo
        title={catTitle}
        description={catDesc}
        path={`/${category}`}
      />
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}>
              <Icon className="h-5 w-5" />
            </div>
            <h1 className={`bg-gradient-to-r ${gradient} bg-clip-text text-3xl font-bold text-transparent`}>
              {cat.title}
            </h1>
          </div>
          <p className="mt-2 text-sm text-[#656d76] dark:text-[#8b949e]">{catDesc}</p>
        </div>

        {/* Tag Filter */}
        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onToggle={handleToggleTag}
          onClear={handleClearTags}
        />

        {/* Results count */}
        {selectedTags.length > 0 && (
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredChildren.length} of {cat.children.length} tools
          </div>
        )}

        {/* Tool list */}
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredChildren.map((item, index) => {
            const slug = item.path.split("/").pop() || ""
            const ItemIcon = getToolIcon(slug)
            return (
              <Link key={item.path} to={item.path}>
                <div
                  className="group flex items-center gap-3 rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-card px-5 py-4 card-hover cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(index * 0.04, 0.5)}s` }}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white/90 shadow-sm group-hover:scale-105 transition-transform`}>
                    <ItemIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-[#1f2328] dark:text-[#e6edf3] group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      {item.difficulty && <DifficultyBadge difficulty={item.difficulty} />}
                      {item.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#656d76] dark:text-[#8b949e] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* No results */}
        {filteredChildren.length === 0 && selectedTags.length > 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No tools match the selected tags</p>
            <button
              onClick={handleClearTags}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </>
  )
}
