import type { ReactNode } from "react"

interface ComparisonTableProps {
  columns: string[]
  rows: Record<string, ReactNode>[]
}

export function ComparisonTable({ columns, rows }: ComparisonTableProps) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-[#d0d7de] dark:border-[#30363d]">
      {/* Desktop: table view */}
      <div className="hidden md:block overflow-x-auto">
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
            {rows.map((row, i) => (
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
      {/* Mobile: card view */}
      <div className="md:hidden divide-y divide-[#d0d7de] dark:divide-[#30363d]">
        {rows.map((row, i) => (
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
    </div>
  )
}
