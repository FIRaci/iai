import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import Fuse from "fuse.js"
import { BookOpen, Code2, GitCompare, Compass } from "lucide-react"

interface SearchItem {
  title: string
  path: string
  category: string
}

const searchItems: SearchItem[] = [
  { title: "Bắt đầu với AI Tools", path: "/getting-started", category: "Hướng dẫn" },
  { title: "Claude Code CLI", path: "/ai-tools/claude-code", category: "AI Tools" },
  { title: "ClaudeKit", path: "/ai-tools/claude-kit", category: "AI Tools" },
  { title: "Cursor", path: "/ai-tools/cursor", category: "AI Tools" },
  { title: "GitHub Copilot", path: "/ai-tools/copilot", category: "AI Tools" },
  { title: "Devin", path: "/ai-tools/devin", category: "AI Tools" },
  { title: "Windsurf", path: "/ai-tools/windsurf", category: "AI Tools" },
  { title: "OpenClaw", path: "/ai-tools/openclaw", category: "AI Tools" },
  { title: "Node.js", path: "/dev-tools/nodejs", category: "Dev Tools" },
  { title: "Git", path: "/dev-tools/git", category: "Dev Tools" },
  { title: "VS Code", path: "/dev-tools/vscode", category: "Dev Tools" },
  { title: "So sánh AI Coding Tools", path: "/comparisons/ai-coding-tools", category: "So sánh" },
]

const fuse = new Fuse(searchItems, {
  keys: ["title", "category"],
  threshold: 0.4,
})

const categoryIcons: Record<string, typeof BookOpen> = {
  "Hướng dẫn": Compass,
  "AI Tools": BookOpen,
  "Dev Tools": Code2,
  "So sánh": GitCompare,
}

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

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

  const results = query ? fuse.search(query).map((r) => r.item) : searchItems

  const grouped = results.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, SearchItem[]>,
  )

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Tìm kiếm công cụ..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
        {Object.entries(grouped).map(([category, items]) => {
          const Icon = categoryIcons[category] || BookOpen
          return (
            <CommandGroup key={category} heading={category}>
              {items.map((item) => (
                <CommandItem
                  key={item.path}
                  onSelect={() => {
                    navigate(item.path)
                    onOpenChange(false)
                    setQuery("")
                  }}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )
        })}
      </CommandList>
    </CommandDialog>
  )
}
