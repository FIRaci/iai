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
    <div className="my-4 overflow-hidden rounded-lg border border-[#30363d]">
      <div className="flex items-center justify-between bg-[#161b22] px-4 py-1.5">
        <span className="text-xs font-medium text-[#8b949e]">{language}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-[#8b949e] hover:bg-[#30363d] hover:text-[#e6edf3]" onClick={handleCopy}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
      <pre className="overflow-x-auto bg-[#0d1117] p-4 text-sm leading-relaxed text-[#e6edf3]">
        <code>{text}</code>
      </pre>
    </div>
  )
}
