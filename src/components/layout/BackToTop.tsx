import { ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg btn-press",
        "transition-all duration-300 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none",
      )}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}
