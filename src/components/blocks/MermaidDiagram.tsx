import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface MermaidDiagramProps {
  chart: string
  caption?: string
}

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setError(false)
    async function render() {
      try {
        const { default: mermaid } = await import("mermaid")
        if (cancelled || !ref.current) return
        const isDark = document.documentElement.classList.contains("dark")
        mermaid.initialize({
          theme: isDark ? "dark" : "neutral",
          startOnLoad: false,
          themeVariables: isDark
            ? { primaryColor: "#1e293b", primaryTextColor: "#e2e8f0", primaryBorderColor: "#334155", lineColor: "#64748b", secondaryColor: "#0f172a", tertiaryColor: "#1e293b" }
            : { primaryColor: "#eef2ff", primaryTextColor: "#1e1b4b", primaryBorderColor: "#c7d2fe", lineColor: "#6366f1", secondaryColor: "#f8fafc", tertiaryColor: "#f1f5f9" },
        })
        ref.current.innerHTML = `<div class="mermaid">${chart}</div>`
        await mermaid.run({ nodes: [ref.current] })
      } catch {
        if (!cancelled) setError(true)
      }
    }
    render()
    return () => { cancelled = true }
  }, [chart])

  if (error) {
    return (
      <figure className="my-6">
        <div className="flex items-center justify-center rounded-xl border border-red-200 bg-red-50 p-8 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          Không thể hiển thị sơ đồ
        </div>
        {caption && <figcaption className="mt-2 text-center text-xs text-muted-foreground">{caption}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className="my-6">
      <div
        ref={ref}
        className={cn(
          "flex justify-center rounded-xl border border-[#d0d7de] dark:border-[#30363d] p-6",
          "bg-white dark:bg-[#0d1117]",
        )}
      />
      {caption && (
        <figcaption className="mt-3 text-center text-xs font-medium text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
