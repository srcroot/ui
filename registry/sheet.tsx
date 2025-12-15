import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

interface SheetContextValue {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

interface SheetProps {
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    defaultOpen?: boolean
}

/**
 * Sheet (slide-in panel) component
 * 
 * @example
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button>Open Sheet</Button>
 *   </SheetTrigger>
 *   <SheetContent side="right">
 *     <SheetHeader>
 *       <SheetTitle>Title</SheetTitle>
 *       <SheetDescription>Description</SheetDescription>
 *     </SheetHeader>
 *   </SheetContent>
 * </Sheet>
 */
function Sheet({ children, open: controlledOpen, onOpenChange, defaultOpen = false }: SheetProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)

    const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
    const setOpen = onOpenChange || setUncontrolledOpen

    return (
        <SheetContext.Provider value={{ open, onOpenChange: setOpen }}>
            {children}
        </SheetContext.Provider>
    )
}

interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
    ({ onClick, asChild, children, ...props }, ref) => {
        const context = React.useContext(SheetContext)
        if (!context) throw new Error("SheetTrigger must be used within Sheet")

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e)
            context.onOpenChange(true)
        }

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                onClick: handleClick,
                ref,
            })
        }

        return (
            <button ref={ref} onClick={handleClick} {...props}>
                {children}
            </button>
        )
    }
)
SheetTrigger.displayName = "SheetTrigger"

const sheetVariants = cva(
    "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
    {
        variants: {
            side: {
                top: "inset-x-0 top-0 border-b",
                bottom: "inset-x-0 bottom-0 border-t",
                left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
                right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
            },
        },
        defaultVariants: {
            side: "right",
        },
    }
)

interface SheetContentProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetVariants> { }

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
    ({ side = "right", className, children, ...props }, ref) => {
        const context = React.useContext(SheetContext)
        if (!context) throw new Error("SheetContent must be used within Sheet")

        React.useEffect(() => {
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    context.onOpenChange(false)
                }
            }

            if (context.open) {
                document.addEventListener("keydown", handleEscape)
                document.body.style.overflow = "hidden"
            }

            return () => {
                document.removeEventListener("keydown", handleEscape)
                document.body.style.overflow = ""
            }
        }, [context.open, context])

        if (!context.open) return null

        return (
            <>
                <div
                    className="fixed inset-0 z-50 bg-black/80"
                    onClick={() => context.onOpenChange(false)}
                />
                <div
                    ref={ref}
                    role="dialog"
                    aria-modal="true"
                    className={cn(sheetVariants({ side }), className)}
                    {...props}
                >
                    {children}
                    <button
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onClick={() => context.onOpenChange(false)}
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="sr-only">Close</span>
                    </button>
                </div>
            </>
        )
    }
)
SheetContent.displayName = "SheetContent"

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
))
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
SheetDescription.displayName = "SheetDescription"

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
