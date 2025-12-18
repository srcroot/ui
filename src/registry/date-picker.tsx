"use client"

import * as React from "react"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { cn } from "@/lib/utils"

// Calendar icon
const CalendarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4 opacity-50"
    >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
)

// Format helpers
const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

const formatRange = (dates: Date[]) => {
    if (dates.length === 0) return null
    if (dates.length === 1) return formatDate(dates[0])
    return `${formatDate(dates[0])} → ${formatDate(dates[1])}`
}

const formatMultiple = (dates: Date[]) => {
    if (dates.length === 0) return null
    return `${dates.length} date${dates.length > 1 ? 's' : ''} selected`
}

// DatePicker Props
interface DatePickerBaseProps {
    /** Placeholder text when no date selected */
    placeholder?: string
    /** Whether the picker is disabled */
    disabled?: boolean
    /** Custom class name for the trigger button */
    className?: string
    /** Number of months to display */
    numberOfMonths?: 1 | 2
    /** Calendar size */
    size?: "xs" | "sm" | "default" | "md" | "lg"
}

interface DatePickerSingleProps extends DatePickerBaseProps {
    mode?: "single"
    selected?: Date
    onSelect?: (date: Date | undefined) => void
}

interface DatePickerMultipleProps extends DatePickerBaseProps {
    mode: "multiple"
    selected?: Date[]
    onSelect?: (dates: Date[]) => void
}

interface DatePickerRangeProps extends DatePickerBaseProps {
    mode: "range"
    selected?: Date[]
    onSelect?: (dates: Date[]) => void
}

type DatePickerProps = DatePickerSingleProps | DatePickerMultipleProps | DatePickerRangeProps

/**
 * DatePicker - A complete date picker component
 * 
 * Combines Calendar + Popover for a ready-to-use date selection experience.
 * Supports single, multiple, and range selection modes.
 * 
 * @example
 * // Single date
 * <DatePicker selected={date} onSelect={setDate} />
 * 
 * // Multiple dates
 * <DatePicker mode="multiple" selected={dates} onSelect={setDates} />
 * 
 * // Date range with dual months
 * <DatePicker mode="range" numberOfMonths={2} selected={range} onSelect={setRange} />
 */
const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
    ({
        mode = "single",
        selected,
        onSelect,
        placeholder,
        disabled = false,
        className,
        numberOfMonths = 1,
        size = "default",
        ...props
    }, ref) => {
        const [open, setOpen] = React.useState(false)

        // Determine display text
        const getDisplayText = () => {
            if (mode === "single") {
                return selected ? formatDate(selected as Date) : null
            } else if (mode === "multiple") {
                const dates = (selected as Date[]) || []
                return dates.length > 0 ? formatMultiple(dates) : null
            } else {
                const dates = (selected as Date[]) || []
                return dates.length > 0 ? formatRange(dates) : null
            }
        }

        const displayText = getDisplayText()
        const defaultPlaceholder = mode === "single" ? "Pick a date"
            : mode === "multiple" ? "Pick dates"
                : "Pick a date range"

        // Handle selection
        const handleSelect = (value: any) => {
            if (mode === "single") {
                (onSelect as ((date: Date | undefined) => void))?.(value)
                setOpen(false) // Close on single selection
            } else if (mode === "multiple") {
                (onSelect as ((dates: Date[]) => void))?.(value || [])
            } else {
                const dates = value || []
                    ; (onSelect as ((dates: Date[]) => void))?.(dates)
                // Close when range is complete (2 dates)
                if (dates.length === 2) {
                    setOpen(false)
                }
            }
        }

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={ref}
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !displayText && "text-muted-foreground",
                            numberOfMonths === 2 && "w-[320px]",
                            className
                        )}
                    >
                        <CalendarIcon />
                        {displayText || <span>{placeholder || defaultPlaceholder}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode={mode}
                        numberOfMonths={numberOfMonths}
                        size={size}
                        selected={selected}
                        onSelect={handleSelect}
                        className="rounded-md border-0 shadow-none"
                    />
                </PopoverContent>
            </Popover>
        )
    }
)
DatePicker.displayName = "DatePicker"

export { DatePicker, type DatePickerProps }
