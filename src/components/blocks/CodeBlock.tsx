"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  language?: string
  code?: string
  children?: string
}

export function CodeBlock({ language = "text", code, children }: CodeBlockProps) {
  const text = code || (typeof children === "string" ? children : "")
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-[#d0d7de] dark:border-[#30363d]">
      <div className="flex items-center justify-between bg-[#f6f8fa] dark:bg-[#161b22] px-4 py-2 border-b border-[#d0d7de] dark:border-[#30363d]">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#656d76] dark:text-[#8b949e]">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-[#656d76] hover:bg-[#d0d7de] hover:text-[#1f2328] dark:text-[#8b949e] dark:hover:bg-[#30363d] dark:hover:text-[#e6edf3]"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
      <pre className="overflow-x-auto bg-[#f6f8fa] dark:bg-[#0d1117] p-4 text-sm leading-relaxed text-[#1f2328] dark:text-[#e6edf3]">
        <code>{text}</code>
      </pre>
    </div>
  )
}
