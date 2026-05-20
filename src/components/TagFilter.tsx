import { useMemo } from "react"
import { cn } from "@/lib/utils"

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onToggle: (tag: string) => void
  onClear: () => void
}

const filterTagColors: Record<string, { bg: string; text: string; ring: string; activeBg: string; activeText: string; activeRing: string }> = {
  cli: { bg: "bg-sky-50/80 dark:bg-sky-950/20", text: "text-sky-700 dark:text-sky-400", ring: "ring-sky-600/20 dark:ring-sky-400/30", activeBg: "bg-sky-500", activeText: "text-white", activeRing: "ring-sky-500" },
  cloud: { bg: "bg-blue-50/80 dark:bg-blue-950/20", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30", activeBg: "bg-blue-500", activeText: "text-white", activeRing: "ring-blue-500" },
  api: { bg: "bg-indigo-50/80 dark:bg-indigo-950/20", text: "text-indigo-700 dark:text-indigo-400", ring: "ring-indigo-600/20 dark:ring-indigo-400/30", activeBg: "bg-indigo-500", activeText: "text-white", activeRing: "ring-indigo-500" },
  ide: { bg: "bg-violet-50/80 dark:bg-violet-950/20", text: "text-violet-700 dark:text-violet-400", ring: "ring-violet-600/20 dark:ring-violet-400/30", activeBg: "bg-violet-500", activeText: "text-white", activeRing: "ring-violet-500" },
  agent: { bg: "bg-purple-50/80 dark:bg-purple-950/20", text: "text-purple-700 dark:text-purple-400", ring: "ring-purple-600/20 dark:ring-purple-400/30", activeBg: "bg-purple-500", activeText: "text-white", activeRing: "ring-purple-500" },
  local: { bg: "bg-emerald-50/80 dark:bg-emerald-950/20", text: "text-emerald-700 dark:text-emerald-400", ring: "ring-emerald-600/20 dark:ring-emerald-400/30", activeBg: "bg-emerald-500", activeText: "text-white", activeRing: "ring-emerald-500" },
  free: { bg: "bg-green-50/80 dark:bg-green-950/20", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30", activeBg: "bg-green-500", activeText: "text-white", activeRing: "ring-green-500" },
  paid: { bg: "bg-amber-50/80 dark:bg-amber-950/20", text: "text-amber-700 dark:text-amber-400", ring: "ring-amber-600/20 dark:ring-amber-400/30", activeBg: "bg-amber-500", activeText: "text-white", activeRing: "ring-amber-500" },
  opensource: { bg: "bg-orange-50/80 dark:bg-orange-950/20", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30", activeBg: "bg-orange-500", activeText: "text-white", activeRing: "ring-orange-500" },
  creative: { bg: "bg-pink-50/80 dark:bg-pink-950/20", text: "text-pink-700 dark:text-pink-400", ring: "ring-pink-600/20 dark:ring-pink-400/30", activeBg: "bg-pink-500", activeText: "text-white", activeRing: "ring-pink-500" },
  "multi-model": { bg: "bg-cyan-50/80 dark:bg-cyan-950/20", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30", activeBg: "bg-cyan-500", activeText: "text-white", activeRing: "ring-cyan-500" },
  autocomplete: { bg: "bg-teal-50/80 dark:bg-teal-950/20", text: "text-teal-700 dark:text-teal-400", ring: "ring-teal-600/20 dark:ring-teal-400/30", activeBg: "bg-teal-500", activeText: "text-white", activeRing: "ring-teal-500" },
  extension: { bg: "bg-slate-50/80 dark:bg-slate-950/20", text: "text-slate-700 dark:text-slate-400", ring: "ring-slate-600/20 dark:ring-slate-400/30", activeBg: "bg-slate-500", activeText: "text-white", activeRing: "ring-slate-500" },
  editor: { bg: "bg-blue-50/80 dark:bg-blue-950/20", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30", activeBg: "bg-blue-500", activeText: "text-white", activeRing: "ring-blue-500" },
  "ai-native": { bg: "bg-fuchsia-50/80 dark:bg-fuchsia-950/20", text: "text-fuchsia-700 dark:text-fuchsia-400", ring: "ring-fuchsia-600/20 dark:ring-fuchsia-400/30", activeBg: "bg-fuchsia-500", activeText: "text-white", activeRing: "ring-fuchsia-500" },
  anthropic: { bg: "bg-rose-50/80 dark:bg-rose-950/20", text: "text-rose-700 dark:text-rose-400", ring: "ring-rose-600/20 dark:ring-rose-400/30", activeBg: "bg-rose-500", activeText: "text-white", activeRing: "ring-rose-500" },
  github: { bg: "bg-gray-50/80 dark:bg-gray-950/20", text: "text-gray-700 dark:text-gray-400", ring: "ring-gray-600/20 dark:ring-gray-400/30", activeBg: "bg-gray-500", activeText: "text-white", activeRing: "ring-gray-500" },
  microsoft: { bg: "bg-blue-50/80 dark:bg-blue-950/20", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30", activeBg: "bg-blue-500", activeText: "text-white", activeRing: "ring-blue-500" },
}

const defaultColors = { bg: "bg-muted/50", text: "text-muted-foreground", ring: "ring-border", activeBg: "bg-primary", activeText: "text-primary-foreground", activeRing: "ring-primary" }

export function TagFilter({ tags, selectedTags, onToggle, onClear }: TagFilterProps) {
  const uniqueTags = useMemo(() => {
    const tagCounts = new Map<string, number>()
    tags.forEach(tag => tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1))
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag)
  }, [tags])

  if (uniqueTags.length === 0) return null

  return (
    <div className="mb-6 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Filter by tags</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all ({selectedTags.length})
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {uniqueTags.map((tag) => {
          const isActive = selectedTags.includes(tag)
          const colors = filterTagColors[tag] || defaultColors
          return (
            <button
              key={tag}
              onClick={() => onToggle(tag)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-all hover:scale-105",
                isActive
                  ? `${colors.activeBg} ${colors.activeText} ${colors.activeRing}`
                  : `${colors.bg} ${colors.text} ${colors.ring} hover:ring-2`
              )}
            >
              {tag}
              {isActive && (
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
