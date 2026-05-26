import { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeedbackData {
  up: number
  down: number
  voted: "up" | "down" | null
}

function getStorageKey(path: string): string {
  return `iai-feedback-${path}`
}

function loadFeedback(path: string): FeedbackData {
  try {
    const raw = localStorage.getItem(getStorageKey(path))
    if (raw) return JSON.parse(raw)
  } catch {}
  return { up: 0, down: 0, voted: null }
}

function saveFeedback(path: string, data: FeedbackData) {
  try {
    localStorage.setItem(getStorageKey(path), JSON.stringify(data))
  } catch {}
}

interface FeedbackWidgetProps {
  path: string
}

export function FeedbackWidget({ path }: FeedbackWidgetProps) {
  const [data, setData] = useState<FeedbackData>({ up: 0, down: 0, voted: null })

  useEffect(() => {
    setData(loadFeedback(path))
  }, [path])

  const handleVote = (vote: "up" | "down") => {
    setData((prev) => {
      const next: FeedbackData = { ...prev }
      if (prev.voted === vote) {
        next.voted = null
        if (vote === "up") next.up = Math.max(0, next.up - 1)
        else next.down = Math.max(0, next.down - 1)
      } else {
        if (prev.voted === "up") next.up = Math.max(0, next.up - 1)
        if (prev.voted === "down") next.down = Math.max(0, next.down - 1)
        if (vote === "up") next.up += 1
        else next.down += 1
        next.voted = vote
      }
      saveFeedback(path, next)
      return next
    })
  }

  const total = data.up + data.down

  return (
    <div className="flex items-center gap-4 py-4 border-t border-border">
      <span className="text-sm text-muted-foreground">Bài viết này hữu ích?</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleVote("up")}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
            data.voted === "up"
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
          aria-label="Hữu ích"
        >
          <ThumbsUp className="h-4 w-4" />
          {data.up > 0 && <span>{data.up}</span>}
        </button>
        <button
          onClick={() => handleVote("down")}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
            data.voted === "down"
              ? "bg-red-50 text-red-600 font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
          aria-label="Không hữu ích"
        >
          <ThumbsDown className="h-4 w-4" />
          {data.down > 0 && <span>{data.down}</span>}
        </button>
      </div>
      {total > 0 && (
        <span className="text-xs text-muted-foreground">
          {Math.round((data.up / total) * 100)}% hữu ích ({total} lượt)
        </span>
      )}
    </div>
  )
}