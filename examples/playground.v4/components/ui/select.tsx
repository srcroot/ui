import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectContextValue {
    value: string
    label: string
    onValueChange: (value: string, label: string) => void
    open: boolean
    setOpen: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

interface SelectProps {
    children: React.ReactNode
    value?: string
    onValueChange?: (value: string) => void
    defaultValue?: string
}

/**
 * Custom Select dropdown with keyboard navigation
 * 
 * @example
 * <Select value={value} onValueChange={setValue}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select option" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="option1">Option 1</SelectItem>
 *     <SelectItem value="option2">Option 2</SelectItem>
 *   </SelectContent>
 * </Select>
 */
function Select({ children, value: controlledValue, onValueChange, defaultValue = "" }: SelectProps) {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const [label, setLabel] = React.useState("")
    const [open, setOpen] = React.useState(false)

    const value = controlledValue !== undefined ? controlledValue : uncontrolledValue

    const handleValueChange = React.useCallback((newValue: string, newLabel: string) => {
        if (onValueChange) {
            onValueChange(newValue)
        } else {
            setUncontrolledValue(newValue)
        }
        setLabel(newLabel)
    }, [onValueChange])

    return (
        <SelectContext.Provider value={{ value, label, onValueChange: handleValueChange, open, setOpen }}>
            <div className="relative">
                {children}
            </div>
        </SelectContext.Provider>
    )
}

const SelectTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error("SelectTrigger must be used within Select")

    return (
        <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={context.open}
            aria-haspopup="listbox"
            className={cn(
                "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                className
            )}
            onClick={() => context.setOpen(!context.open)}
            {...props}
        >
            {children}
            <svg
                className={cn("h-4 w-4 opacity-50 transition-transform", context.open && "rotate-180")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    )
})
SelectTrigger.displayName = "SelectTrigger"

interface SelectValueProps {
    placeholder?: string
}

function SelectValue({ placeholder }: SelectValueProps) {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error("SelectValue must be used within Select")

    return (
        <span className={cn(!context.value && "text-muted-foreground")}>
            {context.label || context.value || placeholder}
        </span>
    )
}


const SelectContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error("SelectContent must be used within Select")

    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (context.open && contentRef.current && !contentRef.current.contains(e.target as Node)) {
                // Small delay to allow onClick handlers to fire first
                setTimeout(() => context.setOpen(false), 0)
            }
        }

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && context.open) {
                context.setOpen(false)
            }
        }

        // Use 'click' instead of 'mousedown' to allow item selection
        document.addEventListener("click", handleClickOutside)
        document.addEventListener("keydown", handleEscape)

        return () => {
            document.removeEventListener("click", handleClickOutside)
            document.removeEventListener("keydown", handleEscape)
        }
    }, [context.open, context])

    if (!context.open) return null

    return (
        <div
            ref={contentRef}
            role="listbox"
            className={cn(
                "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
                className
            )}
            onMouseDown={(e) => e.stopPropagation()}
            {...props}
        >
            {children}
        </div>
    )
})
SelectContent.displayName = "SelectContent"

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    ({ className, children, value, ...props }, ref) => {
        const context = React.useContext(SelectContext)
        if (!context) throw new Error("SelectItem must be used within Select")

        const isSelected = context.value === value

        // Extract label from children (convert ReactNode to string)
        const getLabel = (): string => {
            if (typeof children === "string") return children
            if (typeof children === "number") return String(children)
            return value // fallback to value if can't extract
        }

        return (
            <div
                ref={ref}
                role="option"
                aria-selected={isSelected}
                className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    isSelected && "bg-accent text-accent-foreground",
                    className
                )}
                onClick={() => {
                    context.onValueChange(value, getLabel())
                    context.setOpen(false)
                }}
                {...props}
            >
                {children}
                {isSelected && (
                    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                )}
            </div>
        )
    }
)
SelectItem.displayName = "SelectItem"

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
