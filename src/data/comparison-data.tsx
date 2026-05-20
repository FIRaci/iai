import type { ReactNode } from "react"
import { YesNoBadge } from "@/components/YesNoBadge"

export type FilterCategory = "pricing" | "platform" | "features" | "models" | "usecase"

interface ToolFilter {
  category: FilterCategory
  label: string
  description: string
}

export const filterCategories: ToolFilter[] = [
  { category: "pricing", label: "Pricing", description: "Free, paid, API costs" },
  { category: "platform", label: "Platform", description: "OS support, deployment" },
  { category: "features", label: "Features", description: "Core capabilities" },
  { category: "models", label: "Models", description: "LLM support" },
  { category: "usecase", label: "Use Case", description: "Best for scenarios" },
]

interface ComparisonRow {
  "Tiêu chí": string
  "Claude Code": ReactNode
  "Cursor": ReactNode
  "Copilot": ReactNode
  "Windsurf": ReactNode
  "Devin": ReactNode
  "Junie": ReactNode
  "Amazon Q": ReactNode
  "DeepSeek": ReactNode
  "Copilot WS": ReactNode
  "GitHub Spark": ReactNode
  "OpenCode": ReactNode
  "Aider": ReactNode
  "Continue": ReactNode
  "Cline": ReactNode
  "OpenClaw": ReactNode
  filterCategory: FilterCategory
}

const Y = <YesNoBadge value={true} />
const N = <span className="text-muted-foreground font-medium text-xs">No</span>
const P = <span className="text-amber-500 font-medium text-xs">Partial</span>

export const comparisonColumns = [
  "Tiêu chí", "Claude Code", "Cursor", "Copilot",
  "Windsurf", "Devin", "Junie", "Amazon Q", "DeepSeek",
  "Copilot WS", "GitHub Spark", "OpenCode", "Aider", "Continue", "Cline", "OpenClaw",
]

export const comparisonRows: ComparisonRow[] = [
  // Pricing
  { "Tiêu chí": "Giá", "Claude Code": "Free (API)", "Cursor": "$20/th", "Copilot": "$10/th", "Windsurf": "Free/$15", "Devin": "$500/th", "Junie": "$20/th", "Amazon Q": "Free/$19", "DeepSeek": "Free/API", "Copilot WS": "Included", "GitHub Spark": "Free", "OpenCode": "Free", "Aider": "Free", "Continue": "Free", "Cline": "Free", "OpenClaw": "Free", filterCategory: "pricing" },
  { "Tiêu chí": "API Cost", "Claude Code": "$$", "Cursor": "$$", "Copilot": "$", "Windsurf": "$", "Devin": "$$$$", "Junie": "$$", "Amazon Q": "$", "DeepSeek": "$", "Copilot WS": "$", "GitHub Spark": "Free", "OpenCode": "$$", "Aider": "$$", "Continue": "Free", "Cline": "$$", "OpenClaw": "Free", filterCategory: "pricing" },
  
  // Platform
  { "Tiêu chí": "Windows", "Claude Code": Y, "Cursor": Y, "Copilot": Y, "Windsurf": Y, "Devin": "Web", "Junie": Y, "Amazon Q": Y, "DeepSeek": "Web", "Copilot WS": "Web", "GitHub Spark": "Web", "OpenCode": Y, "Aider": Y, "Continue": Y, "Cline": Y, "OpenClaw": Y, filterCategory: "platform" },
  { "Tiêu chí": "macOS", "Claude Code": Y, "Cursor": Y, "Copilot": Y, "Windsurf": Y, "Devin": "Web", "Junie": Y, "Amazon Q": Y, "DeepSeek": "Web", "Copilot WS": "Web", "GitHub Spark": "Web", "OpenCode": Y, "Aider": Y, "Continue": Y, "Cline": Y, "OpenClaw": Y, filterCategory: "platform" },
  { "Tiêu chí": "Linux", "Claude Code": Y, "Cursor": Y, "Copilot": Y, "Windsurf": Y, "Devin": "Web", "Junie": Y, "Amazon Q": Y, "DeepSeek": "Web", "Copilot WS": "Web", "GitHub Spark": "Web", "OpenCode": Y, "Aider": Y, "Continue": Y, "Cline": Y, "OpenClaw": Y, filterCategory: "platform" },
  { "Tiêu chí": "Type", "Claude Code": "Terminal", "Cursor": "IDE", "Copilot": "Extension", "Windsurf": "IDE", "Devin": "Cloud Agent", "Junie": "IDE Agent", "Amazon Q": "IDE+CLI", "DeepSeek": "Web/API", "Copilot WS": "Cloud IDE", "GitHub Spark": "No-code", "OpenCode": "Terminal", "Aider": "Terminal", "Continue": "Extension", "Cline": "Extension", "OpenClaw": "Terminal", filterCategory: "platform" },
  
  // Features
  { "Tiêu chí": "Multi-file edit", "Claude Code": Y, "Cursor": Y, "Copilot": Y, "Windsurf": Y, "Devin": Y, "Junie": Y, "Amazon Q": Y, "DeepSeek": P, "Copilot WS": Y, "GitHub Spark": P, "OpenCode": Y, "Aider": Y, "Continue": Y, "Cline": Y, "OpenClaw": Y, filterCategory: "features" },
  { "Tiêu chí": "Terminal access", "Claude Code": "Native", "Cursor": "Agent", "Copilot": N, "Windsurf": "Cascade", "Devin": Y, "Junie": Y, "Amazon Q": Y, "DeepSeek": N, "Copilot WS": Y, "GitHub Spark": N, "OpenCode": "Native", "Aider": "Native", "Continue": N, "Cline": Y, "OpenClaw": "Native", filterCategory: "features" },
  { "Tiêu chí": "Codebase context", "Claude Code": Y, "Cursor": Y, "Copilot": P, "Windsurf": Y, "Devin": Y, "Junie": Y, "Amazon Q": Y, "DeepSeek": N, "Copilot WS": Y, "GitHub Spark": N, "OpenCode": Y, "Aider": Y, "Continue": Y, "Cline": Y, "OpenClaw": Y, filterCategory: "features" },
  { "Tiêu chí": "Web search", "Claude Code": Y, "Cursor": N, "Copilot": N, "Windsurf": N, "Devin": Y, "Junie": N, "Amazon Q": P, "DeepSeek": Y, "Copilot WS": Y, "GitHub Spark": N, "OpenCode": P, "Aider": N, "Continue": N, "Cline": Y, "OpenClaw": N, filterCategory: "features" },
  { "Tiêu chí": "Autonomous agent", "Claude Code": P, "Cursor": Y, "Copilot": N, "Windsurf": P, "Devin": Y, "Junie": Y, "Amazon Q": N, "DeepSeek": N, "Copilot WS": Y, "GitHub Spark": N, "OpenCode": N, "Aider": N, "Continue": N, "Cline": Y, "OpenClaw": N, filterCategory: "features" },
  { "Tiêu chí": "Git integration", "Claude Code": Y, "Cursor": Y, "Copilot": Y, "Windsurf": Y, "Devin": Y, "Junie": Y, "Amazon Q": Y, "DeepSeek": N, "Copilot WS": Y, "GitHub Spark": N, "OpenCode": Y, "Aider": Y, "Continue": P, "Cline": Y, "OpenClaw": Y, filterCategory: "features" },
  { "Tiêu chí": "Rules/Custom", "Claude Code": ".claude/", "Cursor": ".cursorrules", "Copilot": N, "Windsurf": N, "Devin": N, "Junie": N, "Amazon Q": N, "DeepSeek": N, "Copilot WS": N, "GitHub Spark": N, "OpenCode": N, "Aider": N, "Continue": N, "Cline": N, "OpenClaw": N, filterCategory: "features" },
  { "Tiêu chí": "Mã nguồn mở", "Claude Code": N, "Cursor": N, "Copilot": N, "Windsurf": N, "Devin": N, "Junie": N, "Amazon Q": N, "DeepSeek": P, "Copilot WS": N, "GitHub Spark": N, "OpenCode": Y, "Aider": "Apache", "Continue": "Apache", "Cline": "Apache", "OpenClaw": "MIT", filterCategory: "features" },
  
  // Models
  { "Tiêu chí": "Multi-model", "Claude Code": P, "Cursor": Y, "Copilot": P, "Windsurf": Y, "Devin": N, "Junie": N, "Amazon Q": P, "DeepSeek": "DeepSeek only", "Copilot WS": Y, "GitHub Spark": N, "OpenCode": Y, "Aider": Y, "Continue": Y, "Cline": Y, "OpenClaw": Y, filterCategory: "models" },
  { "Tiêu chí": "Local LLM", "Claude Code": N, "Cursor": Y, "Copilot": N, "Windsurf": N, "Devin": N, "Junie": N, "Amazon Q": N, "DeepSeek": N, "Copilot WS": N, "GitHub Spark": N, "OpenCode": Y, "Aider": Y, "Continue": Y, "Cline": Y, "OpenClaw": Y, filterCategory: "models" },
  { "Tiêu chí": "Hỗ trợ Claude", "Claude Code": "Native", "Cursor": Y, "Copilot": N, "Windsurf": N, "Devin": N, "Junie": N, "Amazon Q": N, "DeepSeek": N, "Copilot WS": Y, "GitHub Spark": N, "OpenCode": Y, "Aider": Y, "Continue": Y, "Cline": Y, "OpenClaw": Y, filterCategory: "models" },
  { "Tiêu chí": "Hỗ trợ GPT", "Claude Code": N, "Cursor": Y, "Copilot": Y, "Windsurf": Y, "Devin": N, "Junie": N, "Amazon Q": N, "DeepSeek": N, "Copilot WS": Y, "GitHub Spark": N, "OpenCode": Y, "Aider": Y, "Continue": Y, "Cline": Y, "OpenClaw": Y, filterCategory: "models" },
  { "Tiêu chí": "Hỗ trợ Gemini", "Claude Code": N, "Cursor": Y, "Copilot": N, "Windsurf": Y, "Devin": N, "Junie": N, "Amazon Q": N, "DeepSeek": N, "Copilot WS": N, "GitHub Spark": N, "OpenCode": Y, "Aider": Y, "Continue": Y, "Cline": Y, "OpenClaw": Y, filterCategory: "models" },
  
  // Use Case
  { "Tiêu chí": "Tiếng Việt", "Claude Code": Y, "Cursor": Y, "Copilot": P, "Windsurf": Y, "Devin": Y, "Junie": Y, "Amazon Q": Y, "DeepSeek": Y, "Copilot WS": Y, "GitHub Spark": Y, "OpenCode": Y, "Aider": Y, "Continue": Y, "Cline": Y, "OpenClaw": Y, filterCategory: "usecase" },
  { "Tiêu chí": "Best cho", "Claude Code": "Terminal devs", "Cursor": "Pro devs", "Copilot": "VS Code users", "Windsurf": "Free AI IDE", "Devin": "Enterprise", "Junie": "JetBrains users", "Amazon Q": "AWS devs", "DeepSeek": "Budget API", "Copilot WS": "Cloud teams", "GitHub Spark": "No-code", "OpenCode": "Open source", "Aider": "Pair programming", "Continue": "Self-hosted", "Cline": "Autonomous", "OpenClaw": "Free terminal", filterCategory: "usecase" },
]

export function getRowsByCategory(category: FilterCategory): ComparisonRow[] {
  return comparisonRows.filter(row => row.filterCategory === category)
}
