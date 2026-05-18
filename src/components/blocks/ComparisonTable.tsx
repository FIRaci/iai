interface ComparisonTableProps {
  columns: string[]
  rows: Record<string, string>[]
}

export function ComparisonTable({ columns, rows }: ComparisonTableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted">
            {columns.map((col) => (
              <th key={col} className="px-4 py-3 text-left font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
              {columns.map((col) => (
                <td key={col} className="px-4 py-2.5">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
