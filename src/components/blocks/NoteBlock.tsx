import { cn } from "@/lib/utils"
import { AlertTriangle, Info, Lightbulb, XCircle } from "lucide-react"
import type { ReactNode } from "react"

interface NoteBlockProps {
  type?: "info" | "warning" | "tip" | "danger"
  children: ReactNode
}

const styles = {
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-700 dark:text-blue-300",
    iconColor: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-700 dark:text-amber-300",
    iconColor: "text-amber-500",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-700 dark:text-green-300",
    iconColor: "text-green-500",
  },
  danger: {
    icon: XCircle,
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-700 dark:text-red-300",
    iconColor: "text-red-500",
  },
}

export function NoteBlock({ type = "info", children }: NoteBlockProps) {
  const s = styles[type]
  const Icon = s.icon

  return (
    <div className={cn("my-4 flex gap-3 rounded-lg border p-4", s.bg, s.border)}>
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", s.iconColor)} />
      <div className={cn("text-sm", s.text)}>{children}</div>
    </div>
  )
}
