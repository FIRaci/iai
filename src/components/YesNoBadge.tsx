import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

export function YesNoBadge({ value }: { value: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        value
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-950/30 dark:text-emerald-400 dark:ring-emerald-400/30"
          : "bg-red-50 text-red-700 ring-1 ring-red-600/20 dark:bg-red-950/30 dark:text-red-400 dark:ring-red-400/30",
      )}
    >
      {value ? (
        <Check className="h-3 w-3" />
      ) : (
        <X className="h-3 w-3" />
      )}
      {value ? "Có" : "Không"}
    </span>
  )
}

export function CheckRow({ label, value }: { label: string; value: boolean | string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {typeof value === "boolean" ? <YesNoBadge value={value} /> : <span>{value}</span>}
      <span>{label}</span>
    </span>
  )
}
