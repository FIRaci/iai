import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Keyboard, Search, Dice5, Home, ArrowUp } from "lucide-react"

const shortcuts = [
  { keys: ["Ctrl", "K"], desc: "Mở tìm kiếm", icon: Search },
  { keys: ["?"], desc: "Mở trợ giúp phím tắt", icon: Keyboard },
  { keys: ["R"], desc: "Công cụ ngẫu nhiên", icon: Dice5 },
  { keys: ["G", "H"], desc: "Về trang chủ", icon: Home },
  { keys: ["Esc"], desc: "Đóng overlay / quay lại", icon: ArrowUp },
]

export function ShortcutsHelp() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "?" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "Escape" && open) {
        setOpen(false)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/50 transition-all"
        aria-label="Keyboard shortcuts"
        title="Phím tắt (?)"
      >
        <Keyboard className="h-3 w-3" />
        <kbd className="rounded border border-border bg-muted px-1 text-[10px] font-mono">?</kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="h-4 w-4" />
              Phím tắt
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {shortcuts.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.keys.join("")} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors">
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1 text-sm">{s.desc}</span>
                  <div className="flex items-center gap-1">
                    {s.keys.map((k) => (
                      <kbd key={k} className="rounded border border-border bg-muted px-1.5 py-0.5 text-[11px] font-mono font-medium text-muted-foreground shadow-sm">
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
