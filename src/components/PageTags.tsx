import { cn } from "@/lib/utils"

const difficultyLabels: Record<string, string> = {
  beginner: "Cơ bản",
  intermediate: "Trung cấp",
  advanced: "Nâng cao",
}

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950/30 dark:text-emerald-400 dark:ring-emerald-400/30",
  intermediate: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950/30 dark:text-amber-400 dark:ring-amber-400/30",
  advanced: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/30 dark:text-red-400 dark:ring-red-400/30",
}

export function DifficultyBadge({ difficulty }: { difficulty?: string }) {
  if (!difficulty || !difficultyLabels[difficulty]) return null
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
        difficultyColors[difficulty],
      )}
    >
      {difficultyLabels[difficulty]}
    </span>
  )
}

export function TagBadge({ tag }: { tag: string }) {
  const tagColorMap: Record<string, string> = {
    cli: "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-950/30 dark:text-sky-400 dark:ring-sky-400/30",
    anthropic: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-600/20 dark:bg-fuchsia-950/30 dark:text-fuchsia-400 dark:ring-fuchsia-400/30",
    editor: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-950/30 dark:text-blue-400 dark:ring-blue-400/30",
    "ai-native": "bg-cyan-50 text-cyan-700 ring-cyan-600/20 dark:bg-cyan-950/30 dark:text-cyan-400 dark:ring-cyan-400/30",
    "ai-engineer": "bg-indigo-50 text-indigo-700 ring-indigo-600/20 dark:bg-indigo-950/30 dark:text-indigo-400 dark:ring-indigo-400/30",
    "open-source": "bg-orange-50 text-orange-700 ring-orange-600/20 dark:bg-orange-950/30 dark:text-orange-400 dark:ring-orange-400/30",
    github: "bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-950/30 dark:text-gray-400 dark:ring-gray-400/30",
    microsoft: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-950/30 dark:text-blue-400 dark:ring-blue-400/30",
    "version-control": "bg-orange-50 text-orange-700 ring-orange-600/20 dark:bg-orange-950/30 dark:text-orange-400 dark:ring-orange-400/30",
    javascript: "bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-950/30 dark:text-yellow-400 dark:ring-yellow-400/30",
    runtime: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-950/30 dark:text-green-400 dark:ring-green-400/30",
    comparison: "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-950/30 dark:text-violet-400 dark:ring-violet-400/30",
    orchestration: "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-950/30 dark:text-purple-400 dark:ring-purple-400/30",
    ide: "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-950/30 dark:text-sky-400 dark:ring-sky-400/30",
    web: "bg-teal-50 text-teal-700 ring-teal-600/20 dark:bg-teal-950/30 dark:text-teal-400 dark:ring-teal-400/30",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1",
        tagColorMap[tag] || "bg-muted text-muted-foreground ring-border",
      )}
    >
      {tag}
    </span>
  )
}

export function PageTags({ difficulty, tags }: { difficulty?: string; tags?: string[] }) {
  if (!difficulty && (!tags || tags.length === 0)) return null
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {difficulty && <DifficultyBadge difficulty={difficulty} />}
      {tags?.map((tag) => <TagBadge key={tag} tag={tag} />)}
    </div>
  )
}
