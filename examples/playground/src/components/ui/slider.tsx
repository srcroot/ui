import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: number[]
    onValueChange?: (value: number[]) => void
    defaultValue?: number[]
    min?: number
    max?: number
    step?: number
    disabled?: boolean
}

/**
 * Slider component with keyboard support
 * 
 * @example
 * const [value, setValue] = useState([50])
 * <Slider value={value} onValueChange={setValue} max={100} step={1} />
 */
const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
    ({
        className,
        value: controlledValue,
        onValueChange,
        defaultValue = [0],
        min = 0,
        max = 100,
        step = 1,
        disabled,
        ...props
    }, ref) => {
        const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)

        const value = controlledValue !== undefined ? controlledValue : uncontrolledValue
        const setValue = onValueChange || setUncontrolledValue
        const currentValue = value[0] || 0

        const percentage = ((currentValue - min) / (max - min)) * 100

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (disabled) return

            let newValue = currentValue

            switch (e.key) {
                case "ArrowRight":
                case "ArrowUp":
                    newValue = Math.min(currentValue + step, max)
                    break
                case "ArrowLeft":
                case "ArrowDown":
                    newValue = Math.max(currentValue - step, min)
                    break
                case "Home":
                    newValue = min
                    break
                case "End":
                    newValue = max
                    break
                default:
                    return
            }

            e.preventDefault()
            setValue([newValue])
        }

        const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (disabled) return

            const rect = e.currentTarget.getBoundingClientRect()
            const clickPosition = (e.clientX - rect.left) / rect.width
            const newValue = min + clickPosition * (max - min)
            const steppedValue = Math.round(newValue / step) * step
            setValue([Math.min(Math.max(steppedValue, min), max)])
        }

        return (
            <div
                ref={ref}
                role="slider"
                aria-valuenow={currentValue}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                className={cn(
                    "relative flex w-full touch-none select-none items-center",
                    disabled && "opacity-50 cursor-not-allowed",
                    className
                )}
                onKeyDown={handleKeyDown}
                {...props}
            >
                <div
                    className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20 cursor-pointer"
                    onClick={handleTrackClick}
                >
                    <div
                        className="absolute h-full bg-primary"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <div
                    className="absolute block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    style={{ left: `calc(${percentage}% - 8px)` }}
                />
            </div>
        )
    }
)
Slider.displayName = "Slider"

export { Slider }
