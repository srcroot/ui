import * as React from "react"
import { cn } from "@/lib/utils"

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
    ({ children, className, ...props }, ref) => {
        if (React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                className: cn((children.props as any).className, className),
                ref: (node: any) => {
                    // Handle both function and object refs
                    if (typeof ref === "function") {
                        ref(node)
                    } else if (ref) {
                        (ref as React.MutableRefObject<any>).current = node
                    }

                    // Handle the child's existing ref
                    const childRef = (children as any).ref
                    if (typeof childRef === "function") {
                        childRef(node)
                    } else if (childRef) {
                        (childRef as React.MutableRefObject<any>).current = node
                    }
                },
                ...props,
                ...children.props,
                // Merge styles if implemented, but avoiding for now to keep it simple with Tailwind
            })
        }

        return null
    }
)

Slot.displayName = "Slot"

export { Slot }
