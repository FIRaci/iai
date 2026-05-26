import { useState, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { getContentTree } from "@/lib/content-loader"
import { getToolIcon } from "@/lib/icons"
import { ChevronRight } from "lucide-react"
import { getCategoryTitle, getCategoryIcon } from "@/data/category-config"
import { Seo } from "@/components/Seo"
import { DifficultyBadge } from "@/components/PageTags"
import { TagFilter } from "@/components/TagFilter"

const catGradients: Record<string, string> = {
  "frontend": "from-blue-500 via-cyan-500 to-teal-500",
  "backend": "from-emerald-500 via-green-500 to-lime-500",
  "ai-tools": "from-purple-500 via-pink-500 to-rose-500",
  "ai-coding": "from-blue-600 via-indigo-500 to-purple-600",
  "llm-runtimes": "from-orange-500 via-amber-500 to-yellow-500",
  "multimodal": "from-violet-500 via-purple-500 to-fuchsia-500",
  "image-generation": "from-pink-500 via-rose-500 to-red-500",
  "voice-audio": "from-green-500 via-emerald-500 to-teal-500",
  "video": "from-red-500 via-rose-500 to-pink-500",
  "ai-services": "from-sky-500 via-blue-500 to-indigo-500",
  "databases": "from-blue-500 via-indigo-500 to-violet-500",
  "vector-databases": "from-cyan-500 via-blue-500 to-indigo-500",
  "data-datasets": "from-yellow-500 via-amber-500 to-orange-500",
  "data-processing": "from-gray-500 via-slate-500 to-zinc-500",
  "datasets": "from-green-500 via-emerald-500 to-teal-500",
  "evaluation": "from-yellow-500 via-amber-500 to-orange-500",
  "benchmarking": "from-amber-500 via-yellow-500 to-lime-500",
  "fine-tuning": "from-red-500 via-rose-500 to-pink-500",
  "mlops": "from-teal-500 via-cyan-500 to-sky-500",
  "deployment": "from-orange-500 via-red-500 to-rose-500",
  "model-hubs": "from-yellow-500 via-amber-500 to-orange-500",
  "cloud": "from-sky-500 via-blue-500 to-indigo-500",
  "devops": "from-violet-500 via-purple-500 to-fuchsia-500",
  "dev-infra": "from-gray-500 via-slate-500 to-zinc-500",
  "dev-tools": "from-emerald-500 via-teal-500 to-cyan-500",
  "editors": "from-blue-500 via-indigo-500 to-violet-500",
  "ide-plugins": "from-purple-500 via-violet-500 to-indigo-500",
  "cli-tools": "from-gray-600 via-slate-600 to-zinc-600",
  "terminals": "from-gray-500 via-slate-500 to-zinc-500",
  "git-tools": "from-orange-500 via-amber-500 to-yellow-500",
  "package-managers": "from-blue-500 via-indigo-500 to-violet-500",
  "testing": "from-green-500 via-emerald-500 to-teal-500",
  "observability": "from-orange-500 via-amber-500 to-yellow-500",
  "monitoring": "from-red-500 via-rose-500 to-pink-500",
  "security": "from-red-500 via-rose-500 to-pink-500",
  "search": "from-teal-500 via-emerald-500 to-green-500",
  "automation": "from-cyan-500 via-blue-500 to-indigo-500",
  "rag": "from-blue-500 via-indigo-500 to-violet-500",
  "embeddings": "from-green-500 via-emerald-500 to-teal-500",
  "frameworks": "from-amber-500 via-yellow-500 to-lime-500",
  "libraries": "from-blue-500 via-cyan-500 to-teal-500",
  "tools": "from-gray-500 via-slate-500 to-zinc-500",
  "productivity": "from-violet-500 via-purple-500 to-fuchsia-500",
  "utilities": "from-gray-500 via-slate-500 to-zinc-500",
  "documentation": "from-cyan-500 via-blue-500 to-indigo-500",
  "notebooks": "from-amber-500 via-orange-500 to-red-500",
  "visualization": "from-cyan-500 via-blue-500 to-indigo-500",
  "windows-setup": "from-blue-500 via-indigo-500 to-violet-500",
  "comparisons": "from-violet-500 to-purple-600",
  "apis": "from-blue-500 via-indigo-500 to-violet-500",
}

const catDescriptions: Record<string, string> = {
  "frontend": "Frontend frameworks, UI libraries, state management, và testing tools",
  "backend": "Backend frameworks, databases, message queues, và API tools",
  "ai-tools": "AI coding assistants, chat models, và AI productivity tools",
  "ai-coding": "AI-powered coding assistants và IDE extensions",
  "llm-runtimes": "Local LLM runtimes, agent frameworks, và RAG tools",
  "multimodal": "Image/video generation, AI music, và multimedia AI tools",
  "image-generation": "Stable Diffusion, ComfyUI, và text-to-image tools",
  "voice-audio": "Text-to-speech, voice cloning, và audio processing",
  "ai-services": "Cloud API services cho AI inference và model serving",
  "video": "Video editing, encoding, streaming, và media players",
  "databases": "Relational DBs, vector DBs, data processing, và embeddings",
  "vector-databases": "Vector databases cho semantic search và RAG pipelines",
  "security": "Security scanning, secret detection, và AI ethics",
  "dev-tools": "Editors, terminals, Git clients, và development utilities",
  "devops": "CI/CD, containers, orchestration, và infrastructure-as-code",
  "cloud": "Cloud AI platforms, model hubs, và GPU cloud services",
  "testing": "Unit testing, E2E testing, và test automation frameworks",
  "search": "Search engines, workflow automation, và integration platforms",
  "package-managers": "Package managers cho mọi ngôn ngữ và platform",
  "windows-setup": "Hướng dẫn cài đặt và cấu hình Windows 11 cho developers",
  "comparisons": "Bảng so sánh chi tiết — chọn công cụ phù hợp nhất",
  "evaluation": "LLM evaluation, benchmarks, và model comparison tools",
  "observability": "Monitoring, error tracking, load testing, và data quality",
  "documentation": "Documentation generators, static site builders, và wiki tools",
  "notebooks": "Interactive notebooks cho data science và ML experimentation",
  "visualization": "Chart libraries, data visualization, và plotting tools",
  "utilities": "CLI utilities, argument parsers, và terminal helpers",
  "rag": "Retrieval-Augmented Generation frameworks và tools",
  "frameworks": "Web frameworks, API frameworks, và application frameworks",
  "libraries": "Programming libraries cho data science, ML, và computer vision",
}

export function CategoryPage() {
  const { category } = useParams()
  const tree = getContentTree()
  const cat = tree.find((c) => c.path === `/${category}`)
  const catKey = category || ""
  const Icon = getCategoryIcon(catKey)
  const gradient = catGradients[catKey] || "from-primary to-blue-500"
  const catTitle = getCategoryTitle(catKey)
  const catDesc = catDescriptions[catKey] || `Hướng dẫn về ${catTitle.toLowerCase()} trên Windows 11`
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

  if (!cat) return <div className="py-20 text-center text-muted-foreground">Không tìm thấy danh mục</div>

  return (
    <>
      <Seo
        title={catTitle}
        description={catDesc}
        path={`/${category}`}
      />
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}>
              <Icon className="h-5 w-5" />
            </div>
            <h1 className={`bg-gradient-to-r ${gradient} bg-clip-text text-3xl font-bold text-transparent`}>
              {catTitle}
            </h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{catDesc}</p>
        </div>

        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onToggle={handleToggleTag}
          onClear={handleClearTags}
        />

        {selectedTags.length > 0 && (
          <div className="mb-4 text-sm text-muted-foreground">
            Hiển thị {filteredChildren.length} / {cat.children.length} công cụ
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {filteredChildren.map((item, index) => {
            const slug = item.path.split("/").pop() || ""
            const ItemIcon = getToolIcon(slug)
            return (
              <Link key={item.path} to={item.path}>
                <div
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 card-hover cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(index * 0.04, 0.5)}s` }}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white/90 shadow-sm group-hover:scale-105 transition-transform`}>
                    <ItemIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
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
                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                </div>
              </Link>
            )
          })}
        </div>

        {filteredChildren.length === 0 && selectedTags.length > 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Không có công cụ nào phù hợp với tag đã chọn</p>
            <button
              onClick={handleClearTags}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Xoá bộ lọc
            </button>
          </div>
        )}
      </div>
    </>
  )
}