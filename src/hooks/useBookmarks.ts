import { useState, useCallback } from "react"

const STORAGE_KEY = "iai-bookmarks"

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })

  const isBookmarked = useCallback((path: string) => bookmarks.includes(path), [bookmarks])

  const toggleBookmark = useCallback((path: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { bookmarks, isBookmarked, toggleBookmark }
}
