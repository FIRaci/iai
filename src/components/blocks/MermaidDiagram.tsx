import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface MermaidDiagramProps {
  chart: string
  caption?: string
}

let globalMermaidInitialized = false

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [svgContent, setSvgContent] = useState<string>("")
  const chartRef = useRef(chart)
  chartRef.current = chart

  const getThemeVariables = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark")
    return isDark
      ? {
          primaryColor: "#1e293b",
          primaryTextColor: "#e2e8f0",
          primaryBorderColor: "#334155",
          lineColor: "#64748b",
          secondaryColor: "#0f172a",
          tertiaryColor: "#1e293b",
          fontSize: "14px",
          background: "#0d1117",
        }
      : {
          primaryColor: "#eef2ff",
          primaryTextColor: "#1e1b4b",
          primaryBorderColor: "#c7d2fe",
          lineColor: "#6366f1",
          secondaryColor: "#f8fafc",
          tertiaryColor: "#f1f5f9",
          fontSize: "14px",
          background: "#ffffff",
        }
  }, [])

  const renderMermaid = useCallback(async () => {
    if (!containerRef.current) return
    setLoading(true)
    setError(null)
    setSvgContent("")

    try {
      const { default: mermaid } = await import("mermaid")

      if (!globalMermaidInitialized) {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "base",
          themeVariables: getThemeVariables(),
        })
        globalMermaidInitialized = true
      }

      const trimmedChart = chartRef.current.trim()

      try {
        await mermaid.parse(trimmedChart)
      } catch (parseError: unknown) {
        const msg = parseError instanceof Error ? parseError.message : "Invalid diagram syntax"
        setError(msg)
        setLoading(false)
        return
      }

      const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

      const oldSvgs = containerRef.current.querySelectorAll("svg")
      oldSvgs.forEach((svg) => svg.remove())

      const { svg } = await mermaid.render(id, trimmedChart)

      const tempEl = document.getElementById(id)
      if (tempEl) tempEl.remove()

      setSvgContent(svg)
      setLoading(false)
    } catch (renderError: unknown) {
      const msg = renderError instanceof Error ? renderError.message : "Render failed"
      console.error("Mermaid render error:", msg)
      setError(msg)
      setLoading(false)
    }
  }, [getThemeVariables])

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      renderMermaid()
    }
  }, [renderMermaid])

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const target = mutation.target as HTMLElement
          if (target === document.documentElement) {
            renderMermaid()
            break
          }
        }
      }
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [renderMermaid])

  if (error) {
    return (
      <figure className="my-6">
        <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          <p className="font-medium">Không thể hiển thị sơ đồ</p>
          <p className="mt-1 text-xs opacity-75 font-mono break-all max-w-md">{error}</p>
        </div>
        {caption && <figcaption className="mt-2 text-center text-xs text-muted-foreground">{caption}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className="my-6">
      <div
        ref={containerRef}
        className={cn(
          "flex justify-center rounded-xl border border-[#d0d7de] dark:border-[#30363d] p-6",
          "bg-white dark:bg-[#0d1117]",
          loading && "min-h-[120px] items-center",
        )}
      >
        {loading ? (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Đang vẽ sơ đồ...
          </div>
        ) : (
          <div
            className="mermaid-output w-full overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs font-medium text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
