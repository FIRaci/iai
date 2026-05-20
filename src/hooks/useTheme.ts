import { useEffect, useState, useCallback } from "react"

type Theme = "light" | "dark" | "star"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light"
    const stored = localStorage.getItem("iai-theme") as Theme | null
    if (stored) return stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("dark", "star")
    if (theme === "dark") root.classList.add("dark")
    if (theme === "star") root.classList.add("star", "dark")
    localStorage.setItem("iai-theme", theme)
  }, [theme])

  const toggleLightDark = useCallback(() => {
    setTheme((t) => {
      if (t === "star") return "dark"
      return t === "light" ? "dark" : "light"
    })
  }, [])

  const toggleStar = useCallback(() => {
    setTheme((t) => {
      if (t === "star") return "dark"
      return "star"
    })
  }, [])

  const setThemeDirect = useCallback((t: Theme) => {
    setTheme(t)
  }, [])

  const isStar = theme === "star"
  const isDark = theme === "dark" || theme === "star"

  return { theme, toggleLightDark, toggleStar, setThemeDirect, isStar, isDark }
}
