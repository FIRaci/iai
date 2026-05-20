import { cn } from "@/lib/utils"
import { AlertTriangle, Info, Lightbulb, XCircle } from "lucide-react"
import type { ReactNode } from "react"

interface NoteBlockProps {
  type?: "info" | "warning" | "tip" | "danger"
  children?: ReactNode
}

const styles = {
  info: {
    icon: Info,
    bg: "bg-blue-50/80 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800/50",
    text: "text-blue-800 dark:text-blue-300",
    iconColor: "text-blue-500",
    label: "Lưu ý",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50/80 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800/50",
    text: "text-amber-800 dark:text-amber-300",
    iconColor: "text-amber-500",
    label: "Cảnh báo",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-emerald-50/80 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-800/50",
    text: "text-emerald-800 dark:text-emerald-300",
    iconColor: "text-emerald-500",
    label: "Mẹo",
  },
  danger: {
    icon: XCircle,
    bg: "bg-red-50/80 dark:bg-red-950/20",
    border: "border-red-200 dark:border-red-800/50",
    text: "text-red-800 dark:text-red-300",
    iconColor: "text-red-500",
    label: "Nguy hiểm",
  },
}

export function NoteBlock({ type = "info", children }: NoteBlockProps) {
  if (!children) return null
  const s = styles[type]
  const Icon = s.icon

  return (
    <div className={cn("note-hover my-5 flex gap-3 rounded-xl border p-4", s.bg, s.border)}>
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", s.iconColor)} />
      <div className="flex-1">
        <div className={cn("text-xs font-semibold capitalize mb-1", s.iconColor)}>{s.label}</div>
        <div className={cn("text-sm leading-relaxed", s.text)}>{children}</div>
      </div>
    </div>
  )
}
