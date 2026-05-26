import { Search, Menu, Dice5 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { SearchDialog } from "@/components/SearchDialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"
import { Breadcrumbs } from "./Breadcrumbs"
import { ShortcutsHelp } from "@/components/ShortcutsHelp"
import { getContentTree } from "@/lib/content-loader"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  const goToRandomTool = () => {
    const tree = getContentTree()
    const allTools = tree.flatMap((c) => c.children || [])
    if (allTools.length === 0) return
    const pick = allTools[Math.floor(Math.random() * allTools.length)]
    navigate(pick.path)
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "r" && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        const tag = (e.target as HTMLElement)?.tagName
        if (tag === "INPUT" || tag === "TEXTAREA") return
        e.preventDefault()
        goToRandomTool()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-xl px-4 lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 mobile-menu-enter">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="min-w-0">
        <Breadcrumbs />
      </div>

      <div className="flex-1" />

      <Button
        variant="ghost"
        size="icon"
        className="hidden sm:inline-flex text-muted-foreground hover:text-foreground hover:bg-muted/50 btn-press tool-icon-bounce"
        onClick={goToRandomTool}
        aria-label="Random tool"
        title="Công cụ ngẫu nhiên (R)"
      >
        <Dice5 className="h-4 w-4" />
      </Button>

      <ShortcutsHelp />

      <Button
        variant="outline"
        className="search-btn-hover gap-2 text-muted-foreground border-border btn-press"
        onClick={() => setSearchOpen(true)}
        aria-label="Search tools and guides"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Tìm kiếm...</span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 text-xs font-mono text-muted-foreground sm:inline">
          Ctrl+K
        </kbd>
      </Button>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
