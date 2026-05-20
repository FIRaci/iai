import { useState } from "react"
import type { ReactNode } from "react"
import { filterCategories, type FilterCategory } from "@/data/comparison-data"

interface ComparisonTableProps {
  columns: string[]
  rows: Record<string, ReactNode>[]
}

export function ComparisonTable({ columns, rows }: ComparisonTableProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory | "all">("all")
  
  const filteredRows = activeFilter === "all" 
    ? rows 
    : rows.filter(row => "filterCategory" in row && row.filterCategory === activeFilter)

  return (
    <div className="my-6 space-y-4">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeFilter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All
        </button>
        {filterCategories.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveFilter(cat.category)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeFilter === cat.category
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            title={cat.description}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Desktop: table view */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[#d0d7de] dark:border-[#30363d]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f6f8fa] dark:bg-[#161b22]">
                {columns.map((col) => (
                  <th
                    key={col}
                    className="sticky top-0 bg-[#f6f8fa] dark:bg-[#161b22] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#656d76] dark:text-[#8b949e] border-b border-[#d0d7de] dark:border-[#30363d]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-[#d0d7de] dark:border-[#30363d] last:border-0 transition-colors hover:bg-[#f6f8fa] dark:hover:bg-[#161b22] ${i % 2 === 1 ? "bg-[#fafbfc] dark:bg-[#0d1117]" : ""}`}
                >
                  {columns.map((col) => {
                    const isFirst = columns.indexOf(col) === 0
                    return (
                      <td
                        key={col}
                        className={`px-4 py-3 ${isFirst ? "font-semibold text-[#1f2328] dark:text-[#e6edf3]" : "text-[#656d76] dark:text-[#8b949e]"}`}
                      >
                        {row[col]}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Mobile: card view */}
      <div className="md:hidden overflow-hidden rounded-xl border border-[#d0d7de] dark:border-[#30363d] divide-y divide-[#d0d7de] dark:divide-[#30363d]">
        {filteredRows.map((row, i) => (
          <div key={i} className="px-4 py-3 text-sm">
            {columns.map((col) => {
              const isFirst = columns.indexOf(col) === 0
              return (
                <div key={col} className={`flex items-center justify-between gap-3 py-1 ${isFirst ? "mb-2 pb-2 border-b border-[#d0d7de] dark:border-[#30363d]" : ""}`}>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#656d76] dark:text-[#8b949e] shrink-0">{col}</span>
                  <span className={`text-right ${isFirst ? "font-semibold text-[#1f2328] dark:text-[#e6edf3]" : "text-[#656d76] dark:text-[#8b949e]"}`}>{row[col]}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      
      {/* Row count */}
      <div className="text-xs text-muted-foreground text-center">
        Showing {filteredRows.length} of {rows.length} criteria
      </div>
    </div>
  )
}
