"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
    <div className="my-4 overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between bg-muted px-4 py-1.5">
        <span className="text-xs font-medium text-muted-foreground">{language}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
      <pre className={cn("overflow-x-auto p-4 text-sm")}>
        <code>{text}</code>
      </pre>
    </div>
  )
}
