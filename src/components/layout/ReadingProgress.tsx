import { useState, useEffect } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, scrolled)))
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 z-50 h-0.5 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
    </div>
  )
}
