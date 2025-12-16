"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
    children: string
    language?: string
    showLineNumbers?: boolean
    className?: string
}

export function CodeBlock({
    children,
    language = "text",
    showLineNumbers = false,
    className,
}: CodeBlockProps) {
    const [copied, setCopied] = React.useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(children)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    const lines = children.split("\n")

    return (
        <div className={cn("relative group rounded-lg border bg-zinc-950 text-zinc-50", className)}>
            {/* Header with language and copy button */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    {language}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                    onClick={copyToClipboard}
                >
                    {copied ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                        <Copy className="h-3.5 w-3.5" />
                    )}
                    <span className="sr-only">Copy code</span>
                </Button>
            </div>

            {/* Code content */}
            <div className="overflow-x-auto">
                <pre className="p-4 text-sm leading-relaxed">
                    <code className="font-mono">
                        {showLineNumbers ? (
                            lines.map((line, index) => (
                                <div key={index} className="table-row">
                                    <span className="table-cell pr-4 text-right text-zinc-600 select-none">
                                        {index + 1}
                                    </span>
                                    <span className="table-cell">{line}</span>
                                </div>
                            ))
                        ) : (
                            children
                        )}
                    </code>
                </pre>
            </div>
        </div>
    )
}

// Inline code component for short code snippets
interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode
}

export function InlineCode({ children, className, ...props }: InlineCodeProps) {
    return (
        <code
            className={cn(
                "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
                className
            )}
            {...props}
        >
            {children}
        </code>
    )
}
