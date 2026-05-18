import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SearchDialog } from "@/components/SearchDialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"
import { Breadcrumbs } from "./Breadcrumbs"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-[#d0d7de] dark:border-[#30363d] bg-background/80 backdrop-blur-xl px-4 lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden text-[#656d76] dark:text-[#8b949e]">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="hidden min-w-0 sm:block">
        <Breadcrumbs />
      </div>

      <div className="flex-1" />

      <ThemeToggle />

      <Button
        variant="outline"
        className="gap-2 text-[#656d76] dark:text-[#8b949e] border-[#d0d7de] dark:border-[#30363d] hover:bg-[#f6f8fa] dark:hover:bg-[#161b22]"
        onClick={() => setSearchOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Tìm kiếm...</span>
        <kbd className="hidden rounded border border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#161b22] px-1.5 text-xs font-mono text-[#656d76] dark:text-[#8b949e] sm:inline">
          ⌘K
        </kbd>
      </Button>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
