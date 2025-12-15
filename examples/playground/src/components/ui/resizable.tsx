"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Resizable Context
interface ResizablePanelGroupContextValue {
    direction: "horizontal" | "vertical"
    sizes: number[]
    setSizes: React.Dispatch<React.SetStateAction<number[]>>
    registerPanel: () => number
    getPanelCount: () => number
}

const ResizablePanelGroupContext = React.createContext<ResizablePanelGroupContextValue | null>(null)

function useResizablePanelGroup() {
    const context = React.useContext(ResizablePanelGroupContext)
    if (!context) {
        throw new Error("useResizablePanelGroup must be used within a ResizablePanelGroup")
    }
    return context
}

// ResizablePanelGroup
interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: "horizontal" | "vertical"
    onLayout?: (sizes: number[]) => void
}

const ResizablePanelGroup = React.forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
    ({ className, direction = "horizontal", children, onLayout, ...props }, ref) => {
        const [sizes, setSizes] = React.useState<number[]>([])
        const panelCountRef = React.useRef(0)

        // Reset panel count on each render to handle re-renders properly
        React.useLayoutEffect(() => {
            panelCountRef.current = 0
        })

        const registerPanel = React.useCallback(() => {
            const index = panelCountRef.current
            panelCountRef.current += 1
            return index
        }, [])

        const getPanelCount = React.useCallback(() => {
            return panelCountRef.current
        }, [])

        // Notify layout changes
        React.useEffect(() => {
            if (sizes.length > 0) {
                onLayout?.(sizes)
            }
        }, [sizes, onLayout])

        return (
            <ResizablePanelGroupContext.Provider value={{ direction, sizes, setSizes, registerPanel, getPanelCount }}>
                <div
                    ref={ref}
                    data-panel-group
                    data-direction={direction}
                    className={cn(
                        "flex h-full w-full",
                        direction === "horizontal" ? "flex-row" : "flex-col",
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </ResizablePanelGroupContext.Provider>
        )
    }
)
ResizablePanelGroup.displayName = "ResizablePanelGroup"

// ResizablePanel
interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultSize?: number
    minSize?: number
    maxSize?: number
}

const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
    ({ className, defaultSize = 50, minSize = 10, maxSize = 90, children, style, ...props }, ref) => {
        const { direction, sizes, setSizes, registerPanel } = useResizablePanelGroup()
        const [index] = React.useState(() => registerPanel())

        // Initialize size
        React.useLayoutEffect(() => {
            setSizes(prev => {
                const newSizes = [...prev]
                if (newSizes[index] === undefined) {
                    newSizes[index] = defaultSize
                }
                return newSizes
            })
        }, [index, defaultSize, setSizes])

        const size = sizes[index] ?? defaultSize

        return (
            <div
                ref={ref}
                data-panel
                data-panel-index={index}
                className={cn("overflow-hidden", className)}
                style={{
                    ...style,
                    flex: `0 0 ${size}%`,
                }}
                {...props}
            >
                {children}
            </div>
        )
    }
)
ResizablePanel.displayName = "ResizablePanel"

// ResizableHandle
interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
    withHandle?: boolean
}

const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
    ({ className, withHandle = false, ...props }, ref) => {
        const { direction, setSizes } = useResizablePanelGroup()
        const [isDragging, setIsDragging] = React.useState(false)
        const handleRef = React.useRef<HTMLDivElement>(null)

        const handleMouseDown = (e: React.MouseEvent) => {
            e.preventDefault()
            setIsDragging(true)

            const startPos = direction === "horizontal" ? e.clientX : e.clientY
            const handle = handleRef.current
            if (!handle) return

            // Find adjacent panels
            const prevPanel = handle.previousElementSibling as HTMLElement
            const nextPanel = handle.nextElementSibling as HTMLElement
            if (!prevPanel || !nextPanel) return

            const prevIndex = parseInt(prevPanel.dataset.panelIndex || "0")
            const nextIndex = parseInt(nextPanel.dataset.panelIndex || "1")

            // Get current sizes
            const prevRect = prevPanel.getBoundingClientRect()
            const nextRect = nextPanel.getBoundingClientRect()
            const totalSize = direction === "horizontal"
                ? prevRect.width + nextRect.width
                : prevRect.height + nextRect.height

            const handleMouseMove = (moveEvent: MouseEvent) => {
                const currentPos = direction === "horizontal" ? moveEvent.clientX : moveEvent.clientY
                const delta = currentPos - startPos
                const deltaPercent = (delta / totalSize) * 100

                setSizes(prev => {
                    const newSizes = [...prev]
                    const prevSize = prev[prevIndex] ?? 50
                    const nextSize = prev[nextIndex] ?? 50

                    // Calculate new sizes with constraints
                    let newPrevSize = prevSize + deltaPercent
                    let newNextSize = nextSize - deltaPercent

                    // Apply min/max constraints
                    if (newPrevSize < 10) {
                        newPrevSize = 10
                        newNextSize = prevSize + nextSize - 10
                    }
                    if (newNextSize < 10) {
                        newNextSize = 10
                        newPrevSize = prevSize + nextSize - 10
                    }
                    if (newPrevSize > 90) {
                        newPrevSize = 90
                        newNextSize = prevSize + nextSize - 90
                    }
                    if (newNextSize > 90) {
                        newNextSize = 90
                        newPrevSize = prevSize + nextSize - 90
                    }

                    newSizes[prevIndex] = newPrevSize
                    newSizes[nextIndex] = newNextSize
                    return newSizes
                })
            }

            const handleMouseUp = () => {
                setIsDragging(false)
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)
            }

            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }

        return (
            <div
                ref={handleRef}
                data-panel-resize-handle
                className={cn(
                    "relative flex items-center justify-center bg-border",
                    direction === "horizontal"
                        ? "w-px cursor-col-resize hover:w-1 hover:bg-primary/50"
                        : "h-px cursor-row-resize hover:h-1 hover:bg-primary/50",
                    isDragging && (direction === "horizontal" ? "w-1 bg-primary" : "h-1 bg-primary"),
                    "transition-all",
                    className
                )}
                onMouseDown={handleMouseDown}
                {...props}
            >
                {withHandle && (
                    <div
                        className={cn(
                            "z-10 flex items-center justify-center rounded-sm border bg-border",
                            direction === "horizontal" ? "h-4 w-3" : "h-3 w-4"
                        )}
                    >
                        <svg
                            className={cn(
                                "h-2.5 w-2.5 text-muted-foreground",
                                direction === "vertical" && "rotate-90"
                            )}
                            viewBox="0 0 6 10"
                            fill="currentColor"
                        >
                            <circle cx="1" cy="2" r="1" />
                            <circle cx="1" cy="5" r="1" />
                            <circle cx="1" cy="8" r="1" />
                            <circle cx="5" cy="2" r="1" />
                            <circle cx="5" cy="5" r="1" />
                            <circle cx="5" cy="8" r="1" />
                        </svg>
                    </div>
                )}
            </div>
        )
    }
)
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
