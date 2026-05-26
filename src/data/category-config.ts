import {
  Monitor, Server, Sparkles, Cpu, Video, BarChart3, Database,
  Cloud, TestTube, Eye, Shield, FolderTree, Workflow,
  Package, Settings, FileText, Notebook, GitCompare,
  Compass, Mic, Search, Code2, Layers, FlaskConical,
  Braces, GitBranch, Puzzle, Image, Library,
  Box, Cog, Container, FileCode,
  Hammer, Network, Sliders, Terminal, Store,
  type LucideIcon,
} from "lucide-react"

export interface CategoryConfig {
  key: string
  title: string
  icon: LucideIcon
  order: number
}

export const categoryConfigs: CategoryConfig[] = [
  { key: "getting-started", title: "Bắt đầu", icon: Compass, order: 0 },
  { key: "ai-coding", title: "AI Coding", icon: Code2, order: 1 },
  { key: "ai-tools", title: "AI Tools", icon: Sparkles, order: 2 },
  { key: "ai-services", title: "AI Services", icon: Cloud, order: 3 },
  { key: "llm-runtimes", title: "LLM Runtimes & RAG", icon: Cpu, order: 4 },
  { key: "multimodal", title: "Multimodal", icon: Layers, order: 5 },
  { key: "image-generation", title: "Image Generation", icon: Image, order: 6 },
  { key: "voice-audio", title: "Voice & Audio", icon: Mic, order: 7 },
  { key: "video", title: "Video & Media", icon: Video, order: 8 },
  { key: "embeddings", title: "Embeddings", icon: Braces, order: 9 },
  { key: "frameworks", title: "Frameworks", icon: Box, order: 10 },
  { key: "libraries", title: "Libraries", icon: Library, order: 11 },
  { key: "tools", title: "Tools", icon: Hammer, order: 12 },
  { key: "other-tools", title: "Other Tools", icon: Hammer, order: 13 },
  { key: "productivity", title: "Productivity", icon: Sparkles, order: 14 },
  { key: "frontend", title: "Frontend", icon: Monitor, order: 14 },
  { key: "backend", title: "Backend", icon: Server, order: 15 },
  { key: "apis", title: "APIs", icon: Network, order: 16 },
  { key: "databases", title: "Databases", icon: Database, order: 17 },
  { key: "vector-databases", title: "Vector Databases", icon: Database, order: 18 },
  { key: "data-datasets", title: "Data & Datasets", icon: Database, order: 19 },
  { key: "data-processing", title: "Data Processing", icon: Sliders, order: 20 },
  { key: "datasets", title: "Datasets & Labeling", icon: FlaskConical, order: 21 },
  { key: "fine-tuning", title: "Fine-tuning", icon: Sliders, order: 22 },
  { key: "evaluation", title: "Evaluation", icon: BarChart3, order: 23 },
  { key: "benchmarking", title: "Benchmarking", icon: BarChart3, order: 24 },
  { key: "mlops", title: "MLOps", icon: Cog, order: 25 },
  { key: "deployment", title: "Deployment", icon: Container, order: 26 },
  { key: "model-hubs", title: "Model Hubs", icon: Store, order: 27 },
  { key: "cloud", title: "Cloud", icon: Cloud, order: 28 },
  { key: "devops", title: "DevOps & Infra", icon: FolderTree, order: 29 },
  { key: "dev-infra", title: "Dev Infra", icon: FolderTree, order: 30 },
  { key: "dev-tools", title: "Dev Tools", icon: Monitor, order: 31 },
  { key: "editors", title: "Editors", icon: FileCode, order: 32 },
  { key: "ide-plugins", title: "IDE Plugins", icon: Puzzle, order: 33 },
  { key: "cli-tools", title: "CLI Tools", icon: Terminal, order: 34 },
  { key: "terminals", title: "Terminals", icon: Monitor, order: 35 },
  { key: "git-tools", title: "Git Tools", icon: GitBranch, order: 36 },
  { key: "package-managers", title: "Package Managers", icon: Package, order: 37 },
  { key: "testing", title: "Testing", icon: TestTube, order: 38 },
  { key: "observability", title: "Observability & Monitoring", icon: Eye, order: 39 },
  { key: "monitoring", title: "Monitoring", icon: Eye, order: 40 },
  { key: "security", title: "Security & Ethics", icon: Shield, order: 41 },
  { key: "search", title: "Search & Automation", icon: Search, order: 42 },
  { key: "automation", title: "Automation", icon: Workflow, order: 43 },
  { key: "rag", title: "RAG", icon: Network, order: 44 },
  { key: "utilities", title: "Utilities", icon: Settings, order: 45 },
  { key: "documentation", title: "Documentation", icon: FileText, order: 46 },
  { key: "notebooks", title: "Notebooks", icon: Notebook, order: 47 },
  { key: "visualization", title: "Visualization", icon: BarChart3, order: 48 },
  { key: "windows-setup", title: "Windows 11 Setup", icon: Monitor, order: 49 },
  { key: "comparisons", title: "So sánh", icon: GitCompare, order: 50 },
]

export function getCategoryConfig(key: string): CategoryConfig | undefined {
  return categoryConfigs.find((c) => c.key === key)
}

export function getCategoryTitle(key: string): string {
  return getCategoryConfig(key)?.title || key
}

export function getCategoryIcon(key: string): LucideIcon {
  return getCategoryConfig(key)?.icon || Code2
}

export const categoryOrder = categoryConfigs.map((c) => c.key)

export const catGradients: Record<string, string> = {
  "getting-started": "from-primary to-blue-500",
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
  "other-tools": "from-gray-500 via-slate-500 to-zinc-500",
  "productivity": "from-violet-500 via-purple-500 to-fuchsia-500",
  "utilities": "from-gray-500 via-slate-500 to-zinc-500",
  "documentation": "from-cyan-500 via-blue-500 to-indigo-500",
  "notebooks": "from-amber-500 via-orange-500 to-red-500",
  "visualization": "from-cyan-500 via-blue-500 to-indigo-500",
  "windows-setup": "from-blue-500 via-indigo-500 to-violet-500",
  "comparisons": "from-violet-500 to-purple-600",
  "apis": "from-blue-500 via-indigo-500 to-violet-500",
}
