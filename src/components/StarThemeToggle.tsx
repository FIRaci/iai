import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"

export function StarThemeToggle() {
  const { isDark, isStar, toggleStar } = useTheme()

  if (!isDark) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleStar}
      aria-label={isStar ? "Disable star theme" : "Enable star theme"}
      title={isStar ? "Tắt theme sao" : "Bật theme sao"}
      className={cn(
        "theme-toggle text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        isStar && "text-sky-400 hover:text-sky-300"
      )}
    >
      <span className="relative h-4 w-4">
        <Sparkles
          className={cn(
            "h-4 w-4 absolute inset-0",
            isStar && "animate-pulse-glow"
          )}
        />
      </span>
    </Button>
  )
}
