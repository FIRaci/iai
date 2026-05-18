import {
  Terminal, Workflow, MousePointer, Sparkles, Globe,
  Waves, Code2, FileJson, GitBranch, Monitor,
  ListChecks, type LucideIcon,
} from "lucide-react"

export const toolIcons: Record<string, LucideIcon> = {
  "claude-code": Terminal,
  "claude-kit": Workflow,
  cursor: MousePointer,
  copilot: Sparkles,
  devin: Globe,
  windsurf: Waves,
  openclaw: Code2,
  nodejs: FileJson,
  git: GitBranch,
  vscode: Monitor,
  "ai-coding-tools": ListChecks,
}

export function getToolIcon(slug: string): LucideIcon {
  return toolIcons[slug] || Code2
}
