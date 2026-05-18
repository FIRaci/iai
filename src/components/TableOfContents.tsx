import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const article = document.querySelector(".prose")
    if (!article) return

    const headings = article.querySelectorAll("h2, h3")
    const tocItems: TocItem[] = []

    headings.forEach((h) => {
      const id = h.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || ""
      h.id = id
      tocItems.push({
        id,
        text: h.textContent || "",
        level: Number(h.tagName[1]),
      })
    })

    setItems(tocItems)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" },
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  if (items.length === 0) return null

  return (
    <nav className="hidden w-56 shrink-0 xl:block">
      <div className="sticky top-20">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Trong trang này
        </h4>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block text-sm transition-colors hover:text-foreground",
                  item.level === 3 && "pl-3",
                  activeId === item.id
                    ? "font-medium text-primary"
                    : "text-muted-foreground",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
