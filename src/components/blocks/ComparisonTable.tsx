import type { ReactNode } from "react"

interface ComparisonTableProps {
  columns: string[]
  rows: Record<string, ReactNode>[]
}

export function ComparisonTable({ columns, rows }: ComparisonTableProps) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border">
      {/* Horizontal scroll wrapper for mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              {columns.map((col) => (
                <th
                  key={col}
                  className="sticky top-0 bg-muted px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
              >
                {columns.map((col) => {
                  const isFirst = columns.indexOf(col) === 0
                  return (
                    <td
                      key={col}
                      className={`px-4 py-3 ${isFirst ? "font-medium text-foreground" : "text-muted-foreground"} ${i % 2 === 1 ? "bg-muted/20" : ""}`}
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
      {/* Mobile: card-based fallback for small screens */}
      <div className="divide-y divide-border md:hidden">
        {rows.map((row, i) => (
          <div key={i} className="px-4 py-3 text-sm">
            {columns.map((col) => {
              const isFirst = columns.indexOf(col) === 0
              return (
                <div key={col} className={`flex items-center justify-between gap-2 ${isFirst ? "mb-1.5 font-semibold text-foreground" : "text-muted-foreground"}`}>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground/70">{col}</span>
                  <span>{row[col]}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
