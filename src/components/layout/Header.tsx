import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SearchDialog } from "@/components/SearchDialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex-1" />

      <Button
        variant="outline"
        className="gap-2 text-muted-foreground"
        onClick={() => setSearchOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Tìm kiếm...</span>
        <kbd className="hidden rounded border bg-muted px-1.5 text-xs sm:inline">
          Ctrl+K
        </kbd>
      </Button>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
