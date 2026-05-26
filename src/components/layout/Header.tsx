import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SearchDialog } from "@/components/SearchDialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"
import { Breadcrumbs } from "./Breadcrumbs"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

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
