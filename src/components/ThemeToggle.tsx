import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"

export function ThemeToggle() {
  const { isDark, toggleLightDark } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLightDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Chế độ sáng" : "Chế độ tối"}
      className="theme-toggle text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    >
      <span className="relative h-4 w-4">
        {isDark ? (
          <Sun className="h-4 w-4 absolute inset-0 animate-fade-in" />
        ) : (
          <Moon className="h-4 w-4 absolute inset-0 animate-fade-in" />
        )}
      </span>
    </Button>
  )
}
