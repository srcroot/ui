import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverContextValue {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

interface PopoverProps {
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    defaultOpen?: boolean
}

/**
 * Popover component for floating content
 * 
 * @example
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button>Open Popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     Popover content here
 *   </PopoverContent>
 * </Popover>
 */
function Popover({ children, open: controlledOpen, onOpenChange, defaultOpen = false }: PopoverProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)

    const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
    const setOpen = onOpenChange || setUncontrolledOpen

    return (
        <PopoverContext.Provider value={{ open, onOpenChange: setOpen }}>
            <div className="relative inline-block">
                {children}
            </div>
        </PopoverContext.Provider>
    )
}

interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
    ({ onClick, asChild, children, ...props }, ref) => {
        const context = React.useContext(PopoverContext)
        if (!context) throw new Error("PopoverTrigger must be used within Popover")

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e)
            context.onOpenChange(!context.open)
        }

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                onClick: handleClick,
                "aria-expanded": context.open,
                "aria-haspopup": true,
                ref,
            })
        }

        return (
            <button
                ref={ref}
                aria-expanded={context.open}
                aria-haspopup={true}
                onClick={handleClick}
                {...props}
            >
                {children}
            </button>
        )
    }
)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(PopoverContext)
    if (!context) throw new Error("PopoverContent must be used within Popover")

    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (context.open && contentRef.current && !contentRef.current.contains(e.target as Node)) {
                context.onOpenChange(false)
            }
        }

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && context.open) {
                context.onOpenChange(false)
            }
        }

        // Delay adding the listener to prevent immediate close from the trigger click
        const timer = setTimeout(() => {
            document.addEventListener("click", handleClickOutside)
        }, 0)
        document.addEventListener("keydown", handleEscape)

        return () => {
            clearTimeout(timer)
            document.removeEventListener("click", handleClickOutside)
            document.removeEventListener("keydown", handleEscape)
        }
    }, [context.open, context])

    if (!context.open) return null

    return (
        <div
            ref={contentRef}
            className={cn(
                "absolute z-50 mt-2 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
