import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipContextValue {
    open: boolean
    setOpen: (open: boolean) => void
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null)

interface TooltipProviderProps {
    children: React.ReactNode
    delayDuration?: number
}

/**
 * TooltipProvider wraps your app to enable tooltips
 */
function TooltipProvider({ children }: TooltipProviderProps) {
    return <>{children}</>
}

interface TooltipProps {
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    defaultOpen?: boolean
}

/**
 * Tooltip component for hover hints
 * 
 * @example
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>Tooltip text</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 */
function Tooltip({ children, open: controlledOpen, onOpenChange, defaultOpen = false }: TooltipProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)

    const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
    const setOpen = onOpenChange || setUncontrolledOpen

    return (
        <TooltipContext.Provider value={{ open, setOpen }}>
            <span className="relative inline-block">
                {children}
            </span>
        </TooltipContext.Provider>
    )
}

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLSpanElement> {
    asChild?: boolean
}

const TooltipTrigger = React.forwardRef<HTMLSpanElement, TooltipTriggerProps>(
    ({ children, asChild, ...props }, ref) => {
        const context = React.useContext(TooltipContext)
        if (!context) throw new Error("TooltipTrigger must be used within Tooltip")

        const handleMouseEnter = () => context.setOpen(true)
        const handleMouseLeave = () => context.setOpen(false)
        const handleFocus = () => context.setOpen(true)
        const handleBlur = () => context.setOpen(false)

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                onFocus: handleFocus,
                onBlur: handleBlur,
                ref,
            })
        }

        return (
            <span
                ref={ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                tabIndex={0}
                {...props}
            >
                {children}
            </span>
        )
    }
)
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(TooltipContext)
    if (!context) throw new Error("TooltipContent must be used within Tooltip")

    if (!context.open) return null

    return (
        <div
            ref={ref}
            role="tooltip"
            className={cn(
                "absolute left-1/2 bottom-full z-50 mb-2 -translate-x-1/2 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
