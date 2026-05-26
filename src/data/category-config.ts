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
