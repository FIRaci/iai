import type { ReactNode } from "react"
import { YesNoBadge } from "@/components/YesNoBadge"

interface ComparisonRow {
  "Tiêu chí": string
  "Claude Code": ReactNode
  "Cursor": ReactNode
  "Copilot": ReactNode
  "Devin": ReactNode
  "Windsurf": ReactNode
  "ClaudeKit": ReactNode
  "OpenClaw": ReactNode
}

const Y = <YesNoBadge value={true} />
const N = <YesNoBadge value={false} />

export const comparisonColumns = [
  "Tiêu chí", "Claude Code", "Cursor", "Copilot",
  "Devin", "Windsurf", "ClaudeKit", "OpenClaw",
]

export const comparisonRows: ComparisonRow[] = [
  { "Tiêu chí": "Giá", "Claude Code": "Free (API)", "Cursor": "$20/th", "Copilot": "$10/th", "Devin": "$500/th", "Windsurf": "$15/th", "ClaudeKit": "Free", "OpenClaw": "Free" },
  { "Tiêu chí": "Nền tảng", "Claude Code": "Terminal", "Cursor": "IDE", "Copilot": "VS Code", "Devin": "Web", "Windsurf": "IDE", "ClaudeKit": "Terminal", "OpenClaw": "Terminal" },
  { "Tiêu chí": "Windows", "Claude Code": Y, "Cursor": Y, "Copilot": Y, "Devin": "Web", "Windsurf": Y, "ClaudeKit": Y, "OpenClaw": Y },
  { "Tiêu chí": "Multi-file", "Claude Code": Y, "Cursor": Y, "Copilot": Y, "Devin": Y, "Windsurf": Y, "ClaudeKit": Y, "OpenClaw": Y },
  { "Tiêu chí": "Terminal", "Claude Code": "Native", "Cursor": "Agent", "Copilot": N, "Devin": Y, "Windsurf": "Cascade", "ClaudeKit": Y, "OpenClaw": Y },
  { "Tiêu chí": "Rules", "Claude Code": ".claude/", "Cursor": ".cursorrules", "Copilot": N, "Devin": N, "Windsurf": N, "ClaudeKit": "Skills", "OpenClaw": N },
  { "Tiêu chí": "Web search", "Claude Code": Y, "Cursor": N, "Copilot": N, "Devin": Y, "Windsurf": N, "ClaudeKit": Y, "OpenClaw": N },
  { "Tiêu chí": "Tiếng Việt", "Claude Code": Y, "Cursor": Y, "Copilot": "Partial", "Devin": Y, "Windsurf": Y, "ClaudeKit": Y, "OpenClaw": Y },
  { "Tiêu chí": "Offline", "Claude Code": N, "Cursor": "Partial", "Copilot": "Partial", "Devin": N, "Windsurf": "Partial", "ClaudeKit": N, "OpenClaw": N },
  { "Tiêu chí": "Mã nguồn", "Claude Code": N, "Cursor": N, "Copilot": N, "Devin": N, "Windsurf": N, "ClaudeKit": "MIT", "OpenClaw": "MIT" },
  { "Tiêu chí": "Hỗ trợ Claude", "Claude Code": "Native", "Cursor": Y, "Copilot": N, "Devin": N, "Windsurf": N, "ClaudeKit": Y, "OpenClaw": Y },
  { "Tiêu chí": "Hỗ trợ GPT", "Claude Code": N, "Cursor": Y, "Copilot": Y, "Devin": N, "Windsurf": Y, "ClaudeKit": Y, "OpenClaw": Y },
]
