import type { ReactNode } from "react"

interface StepBlockProps {
  number: number
  title: string
  children: ReactNode
}

export function StepBlock({ number, title, children }: StepBlockProps) {
  return (
    <div className="my-5 rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-card p-5">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
          {number}
        </span>
        <h4 className="font-semibold text-[#1f2328] dark:text-[#e6edf3]">{title}</h4>
      </div>
      <div className="pl-10 text-sm leading-relaxed text-[#656d76] dark:text-[#8b949e]">{children}</div>
    </div>
  )
}
