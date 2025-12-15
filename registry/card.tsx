import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Card component - Container with header, content, and footer
 * 
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content goes here</CardContent>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 */

interface CardBaseProps {
    className?: string
    children?: React.ReactNode
}

const Card = React.forwardRef(
    <T extends React.ElementType = "div">(
        {
            as,
            className,
            ...props
        }: CardBaseProps & { as?: T } & Omit<React.ComponentPropsWithoutRef<T>, keyof CardBaseProps | "as">,
        ref: React.ForwardedRef<React.ElementRef<T>>
    ) => {
        const Comp = as || "div"

        return (
            <Comp
                ref={ref as any}
                className={cn(
                    "rounded-xl border bg-card text-card-foreground shadow",
                    className
                )}
                {...props}
            />
        )
    }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(
    <T extends React.ElementType = "h3">(
        {
            as,
            className,
            ...props
        }: CardBaseProps & { as?: T } & Omit<React.ComponentPropsWithoutRef<T>, keyof CardBaseProps | "as">,
        ref: React.ForwardedRef<React.ElementRef<T>>
    ) => {
        const Comp = as || "h3"

        return (
            <Comp
                ref={ref as any}
                className={cn("font-semibold leading-none tracking-tight", className)}
                {...props}
            />
        )
    }
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
