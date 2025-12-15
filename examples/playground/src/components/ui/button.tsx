import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

type ButtonVariants = VariantProps<typeof buttonVariants>

interface ButtonBaseProps extends ButtonVariants {
    className?: string
    children?: React.ReactNode
}

/**
 * Polymorphic Button component
 * 
 * @example
 * // As a button (default)
 * <Button variant="outline">Click me</Button>
 * 
 * // As a link
 * <Button as="a" href="/home" variant="link">Go Home</Button>
 * 
 * // With loading state
 * <Button disabled>
 *   <LoadingSpinner /> Processing...
 * </Button>
 */
const Button = React.forwardRef(
    <T extends React.ElementType = "button">(
        {
            as,
            className,
            variant,
            size,
            ...props
        }: ButtonBaseProps & { as?: T } & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonBaseProps | "as">,
        ref: React.ForwardedRef<React.ElementRef<T>>
    ) => {
        const Comp = as || "button"

        // Ensure proper keyboard handling for non-button elements
        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (Comp !== "button" && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault()
                    ; (e.currentTarget as HTMLElement).click()
            }
            // Call original onKeyDown if provided
            const originalOnKeyDown = (props as any).onKeyDown
            if (originalOnKeyDown) {
                originalOnKeyDown(e)
            }
        }

        // Add role="button" for non-button elements
        const accessibilityProps = Comp !== "button" ? {
            role: "button",
            tabIndex: 0,
            onKeyDown: handleKeyDown,
        } : {}

        return (
            <Comp
                ref={ref as any}
                className={cn(buttonVariants({ variant, size, className }))}
                {...accessibilityProps}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
