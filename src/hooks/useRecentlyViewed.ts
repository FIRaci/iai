import { useState, useCallback } from "react"

const STORAGE_KEY = "iai-recent"
const MAX_ITEMS = 10

export interface RecentItem {
  path: string
  title: string
  category: string
  difficulty?: string
}

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<RecentItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })

  const addToRecent = useCallback((item: RecentItem) => {
    setRecent((prev) => {
      const filtered = prev.filter((p) => p.path !== item.path)
      const next = [item, ...filtered].slice(0, MAX_ITEMS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { recent, addToRecent }
}
