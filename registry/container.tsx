import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const containerVariants = cva("mx-auto w-full px-4", {
    variants: {
        size: {
            sm: "max-w-screen-sm",
            md: "max-w-screen-md",
            lg: "max-w-screen-lg",
            xl: "max-w-screen-xl",
            "2xl": "max-w-screen-2xl",
            full: "max-w-full",
        },
    },
    defaultVariants: {
        size: "xl",
    },
})

type ContainerVariants = VariantProps<typeof containerVariants>

interface ContainerBaseProps extends ContainerVariants {
    className?: string
    children?: React.ReactNode
}

/**
 * Polymorphic Container for max-width layouts
 * 
 * @example
 * <Container size="lg">Content</Container>
 * 
 * @example
 * <Container as="section" size="md">Section content</Container>
 */
const Container = React.forwardRef(
    <T extends React.ElementType = "div">(
        {
            as,
            className,
            size,
            ...props
        }: ContainerBaseProps & { as?: T } & Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerBaseProps | "as">,
        ref: React.ForwardedRef<React.ElementRef<T>>
    ) => {
        const Comp = as || "div"

        return (
            <Comp
                ref={ref as any}
                className={cn(containerVariants({ size, className }))}
                {...props}
            />
        )
    }
)
Container.displayName = "Container"

export { Container, containerVariants }
