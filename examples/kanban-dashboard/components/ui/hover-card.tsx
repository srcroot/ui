"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// HoverCard Context
interface HoverCardContextValue {
    open: boolean
    triggerRef: React.RefObject<HTMLDivElement | null>
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null)

function useHoverCard() {
    const context = React.useContext(HoverCardContext)
    if (!context) {
        throw new Error("useHoverCard must be used within a HoverCard")
    }
    return context
}

// HoverCard Root
interface HoverCardProps {
    children: React.ReactNode
    openDelay?: number
    closeDelay?: number
}

const HoverCard = ({ children, openDelay = 200, closeDelay = 300 }: HoverCardProps) => {
    const [open, setOpen] = React.useState(false)
    const triggerRef = React.useRef<HTMLDivElement>(null)
    const openTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
    const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const handleMouseEnter = React.useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }
        openTimeoutRef.current = setTimeout(() => {
            setOpen(true)
        }, openDelay)
    }, [openDelay])

    const handleMouseLeave = React.useCallback(() => {
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current)
            openTimeoutRef.current = null
        }
        closeTimeoutRef.current = setTimeout(() => {
            setOpen(false)
        }, closeDelay)
    }, [closeDelay])

    React.useEffect(() => {
        return () => {
            if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
        }
    }, [])

    return (
        <HoverCardContext.Provider value={{ open, triggerRef }}>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="inline-block"
            >
                {children}
            </div>
        </HoverCardContext.Provider>
    )
}

// HoverCard Trigger
interface HoverCardTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
}

const HoverCardTrigger = React.forwardRef<HTMLDivElement, HoverCardTriggerProps>(
    ({ children, asChild, className, ...props }, ref) => {
        const { triggerRef } = useHoverCard()

        return (
            <div
                ref={triggerRef}
                className={cn("inline-block cursor-pointer", className)}
                {...props}
            >
                {children}
            </div>
        )
    }
)
HoverCardTrigger.displayName = "HoverCardTrigger"

// HoverCard Content
interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "center" | "end"
    side?: "top" | "bottom"
    sideOffset?: number
}

const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
    ({ children, className, align = "center", side = "bottom", sideOffset = 8, ...props }, ref) => {
        const { open, triggerRef } = useHoverCard()
        const [position, setPosition] = React.useState({ top: 0, left: 0 })
        const contentRef = React.useRef<HTMLDivElement>(null)

        React.useEffect(() => {
            if (!open || !triggerRef.current || !contentRef.current) return

            const triggerRect = triggerRef.current.getBoundingClientRect()
            const contentRect = contentRef.current.getBoundingClientRect()

            let top = 0
            let left = 0

            // Calculate vertical position
            if (side === "bottom") {
                top = triggerRect.bottom + sideOffset
            } else {
                top = triggerRect.top - contentRect.height - sideOffset
            }

            // Calculate horizontal position
            if (align === "start") {
                left = triggerRect.left
            } else if (align === "end") {
                left = triggerRect.right - contentRect.width
            } else {
                left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
            }

            // Clamp to viewport
            left = Math.max(8, Math.min(left, window.innerWidth - contentRect.width - 8))
            top = Math.max(8, Math.min(top, window.innerHeight - contentRect.height - 8))

            setPosition({ top, left })
        }, [open, triggerRef, align, side, sideOffset])

        if (!open) return null

        return (
            <div
                ref={contentRef}
                className={cn(
                    "fixed z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
                    "animate-in fade-in-0 zoom-in-95",
                    className
                )}
                style={{
                    top: position.top,
                    left: position.left,
                }}
                {...props}
            >
                {children}
            </div>
        )
    }
)
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }
