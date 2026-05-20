import { Link, useLocation } from "react-router-dom"
import { ChevronRight, Home } from "lucide-react"

const pageLabels: Record<string, string> = {
  "getting-started": "Bắt đầu",
}

const categoryLabels: Record<string, string> = {
  "ai-tools": "AI Tools",
  "dev-tools": "Dev Tools",
  comparisons: "So sánh",
  "llm-runtimes": "LLM Runtimes",
  multimodal: "Multimodal",
  "voice-audio": "Voice & Audio",
  mlops: "MLOps",
  "data-datasets": "Data & Datasets",
  deployment: "Deployment",
  monitoring: "Monitoring",
  testing: "Testing",
  security: "Security",
  documentation: "Documentation",
  "cli-tools": "CLI Tools",
  visualization: "Visualization",
  utilities: "Utilities",
  frameworks: "Frameworks",
  libraries: "Libraries",
  "ai-coding": "AI Coding",
  "vector-databases": "Vector DBs",
  rag: "RAG",
  "fine-tuning": "Fine-tuning",
  "image-generation": "Image Generation",
  video: "Video",
  cloud: "Cloud",
  devops: "DevOps",
  "package-managers": "Package Managers",
  editors: "Editors",
  terminals: "Terminals",
  "git-tools": "Git Tools",
  apis: "APIs",
  databases: "Databases",
  search: "Search",
  automation: "Automation",
  "ai-agents": "AI Agents",
  "local-ai": "Local AI",
  notebooks: "Notebooks",
  "data-processing": "Data Processing",
  "ai-services": "AI Services",
  "model-hubs": "Model Hubs",
  embeddings: "Embeddings",
  evaluation: "Evaluation",
  benchmarking: "Benchmarking",
  datasets: "Datasets",
  tools: "Tools",
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
  "llama-cpp": "Llama.cpp",
  ollama: "Ollama",
  vllm: "vLLM",
  transformers: "Transformers",
  whisper: "Whisper",
  docker: "Docker",
  postgresql: "PostgreSQL",
  mongodb: "MongoDB",
}

export function Breadcrumbs() {
  const { pathname } = useLocation()
  const parts = pathname.split("/").filter(Boolean)

  if (parts.length === 0) return null

  return (
    <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
      <Link to="/" className="breadcrumb-link flex items-center gap-1.5 text-muted-foreground" aria-label="Home">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {parts.map((part, i) => {
        const href = "/" + parts.slice(0, i + 1).join("/")
        const label = pageLabels[part] || (i === 0 ? categoryLabels[part] : toolLabels[part]) || part
        const isLast = i === parts.length - 1
        return (
          <span key={href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-border" />
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link to={href} className="breadcrumb-link text-muted-foreground">
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
