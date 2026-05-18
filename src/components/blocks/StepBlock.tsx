import type { ReactNode } from "react"

interface StepBlockProps {
  number: number
  title: string
  children: ReactNode
}

export function StepBlock({ number, title, children }: StepBlockProps) {
  return (
    <div className="my-4 rounded-lg border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {number}
        </span>
        <h4 className="font-medium">{title}</h4>
      </div>
      <div className="pl-8 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}
