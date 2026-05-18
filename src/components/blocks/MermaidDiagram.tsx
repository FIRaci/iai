import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface MermaidDiagramProps {
  chart: string
  caption?: string
}

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    async function render() {
      const { default: mermaid } = await import("mermaid")
      if (cancelled || !ref.current) return
      mermaid.initialize({ theme: "neutral", startOnLoad: false })
          ref.current.innerHTML = `<div class="mermaid">${chart}</div>`
      try {
        await mermaid.run({ nodes: [ref.current] })
      } catch {
        // silent fail - diagram might not render
      }
    }
    render()
    return () => { cancelled = true }
  }, [chart])

  return (
    <figure className="my-6">
      <div
        ref={ref}
        className={cn(
          "flex justify-center rounded-lg border bg-white p-4 dark:bg-card",
        )}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
