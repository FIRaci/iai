import { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import Fuse from "fuse.js"
import { BookOpen, Code2, GitCompare, Compass, Palette, Database, Monitor, Cpu, Search, Mic, Shield, Eye, FlaskConical, FolderTree, Layers, Tag } from "lucide-react"
import { getContentTree, getContentModule } from "@/lib/content-loader"
import { cn } from "@/lib/utils"

interface SearchItem {
  title: string
  path: string
  category: string
  tags: string[]
  difficulty: string
}

const categoryIcons: Record<string, typeof BookOpen> = {
  "Hướng dẫn": Compass,
  "AI Coding": Code2,
  "LLM Runtimes": Cpu,
  "AI Creative": Palette,
  "Multimodal": Layers,
  "AI Productivity": BookOpen,
  "Search & Aggregators": Search,
  "AI Voice & Audio": Mic,
  "IDEs & Editors": Monitor,
  "IDE Plugins": Monitor,
  "Dev Essentials": Code2,
  "Dev Infra": FolderTree,
  "Dev Utilities": Code2,
  "Databases": Database,
  "Vector DBs": Database,
  "Datasets & Labeling": FlaskConical,
  "MLOps & Deploy": Layers,
  "Observability": Eye,
  "Security & Ethics": Shield,
  "Other Tools": Code2,
  "So sánh": GitCompare,
}

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  const searchItems = useMemo<SearchItem[]>(() => {
    const tree = getContentTree()
    const items: SearchItem[] = []

    for (const cat of tree) {
      const catTitle = cat.title || cat.path.replace("/", "")
      for (const child of cat.children) {
        const mod = getContentModule(child.path)()
        items.push({
          title: child.title || "Untitled",
          path: child.path,
          category: catTitle,
          tags: mod.tags || [],
          difficulty: mod.difficulty || "",
        })
      }
    }

    return items
  }, [])

  const fuse = useMemo(() => new Fuse(searchItems, {
    keys: ["title", "tags", "category"],
    threshold: 0.4,
    includeScore: true,
  }), [searchItems])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, onOpenChange])

  const results = useMemo(() => {
    if (!query) return searchItems
    return fuse.search(query).map((r) => r.item)
  }, [query, fuse, searchItems])

  const grouped = useMemo(() => {
    return results.reduce(
      (acc, item) => {
        if (!acc[item.category]) acc[item.category] = []
        acc[item.category].push(item)
        return acc
      },
      {} as Record<string, SearchItem[]>,
    )
  }, [results])

  const difficultyColors: Record<string, string> = {
    beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Tìm kiếm công cụ, tags, danh mục..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-6 text-muted-foreground">
            <Search className="h-8 w-8 opacity-50" />
            <p>Không tìm thấy kết quả cho "{query}"</p>
          </div>
        </CommandEmpty>
        {Object.entries(grouped).map(([category, items], idx) => {
          const Icon = categoryIcons[category] || BookOpen
          return (
            <div key={category}>
              {idx > 0 && <CommandSeparator />}
              <CommandGroup heading={
                <span className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" />
                  {category}
                  <span className="text-xs text-muted-foreground font-normal">({items.length})</span>
                </span>
              }>
                {items.map((item) => (
                  <CommandItem
                    key={item.path}
                    onSelect={() => {
                      navigate(item.path)
                      onOpenChange(false)
                      setQuery("")
                    }}
                    className="gap-3"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="flex flex-1 min-w-0 items-center gap-2">
                      <span className="truncate font-medium">{item.title}</span>
                      {item.difficulty && (
                        <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", difficultyColors[item.difficulty])}>
                          {item.difficulty}
                        </span>
                      )}
                    </div>
                    {item.tags.length > 0 && (
                      <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                        <Tag className="h-3 w-3" />
                        {item.tags.slice(0, 2).join(", ")}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          )
        })}
      </CommandList>
    </CommandDialog>
  )
}
