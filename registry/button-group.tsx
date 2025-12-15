import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonGroupVariants = cva("inline-flex", {
    variants: {
        orientation: {
            horizontal: "flex-row",
            vertical: "flex-col",
        },
        attached: {
            true: "",
            false: "gap-2",
        },
    },
    compoundVariants: [
        {
            orientation: "horizontal",
            attached: true,
            className:
                "[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child)]:-ml-px",
        },
        {
            orientation: "vertical",
            attached: true,
            className:
                "[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none [&>*:not(:first-child)]:-mt-px",
        },
    ],
    defaultVariants: {
        orientation: "horizontal",
        attached: true,
    },
})

type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>

interface ButtonGroupBaseProps extends ButtonGroupVariants {
    className?: string
    children?: React.ReactNode
}

/**
 * Polymorphic ButtonGroup to group buttons together
 * 
 * @example
 * <ButtonGroup>
 *   <Button>Left</Button>
 *   <Button>Center</Button>
 *   <Button>Right</Button>
 * </ButtonGroup>
 * 
 * @example
 * <ButtonGroup attached={false}>
 *   <Button>Spaced</Button>
 *   <Button>Buttons</Button>
 * </ButtonGroup>
 */
const ButtonGroup = React.forwardRef(
    <T extends React.ElementType = "div">(
        {
            as,
            className,
            orientation,
            attached,
            ...props
        }: ButtonGroupBaseProps & { as?: T } & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonGroupBaseProps | "as">,
        ref: React.ForwardedRef<React.ElementRef<T>>
    ) => {
        const Comp = as || "div"

        return (
            <Comp
                ref={ref as any}
                role="group"
                className={cn(buttonGroupVariants({ orientation, attached, className }))}
                {...props}
            />
        )
    }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup, buttonGroupVariants }
