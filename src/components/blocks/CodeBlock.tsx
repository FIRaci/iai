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
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access denied or not available
    }
  }

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between bg-muted/50 px-4 py-2 border-b border-border">
        <span className="text-xs font-medium capitalize text-muted-foreground">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="copy-btn h-7 w-7 opacity-60 text-muted-foreground"
          onClick={handleCopy}
          aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto bg-muted/30 dark:bg-muted/50 p-4 text-sm leading-relaxed text-foreground">
        <code>{text}</code>
      </pre>
    </div>
  )
}
