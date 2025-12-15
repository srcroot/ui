import * as React from "react"
import { cn } from "@/lib/utils"

interface CalendarContextValue {
    currentMonth: Date
    setCurrentMonth: (date: Date) => void
    selectedDates: Date[]
    onSelect: (date: Date) => void
    mode: "single" | "multiple" | "range"
    rangeStart: Date | null
}

const CalendarContext = React.createContext<CalendarContextValue | null>(null)

interface CalendarProps {
    /** Selection mode */
    mode?: "single" | "multiple" | "range"
    /** Selected date(s) */
    selected?: Date | Date[]
    /** Callback when date is selected */
    onSelect?: (date: Date | Date[] | undefined) => void
    /** Default month to display */
    defaultMonth?: Date
    /** Minimum selectable date */
    minDate?: Date
    /** Maximum selectable date */
    maxDate?: Date
    /** Whether calendar is disabled */
    disabled?: boolean
    className?: string
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

function getDaysInMonth(year: number, month: number): Date[] {
    const days: Date[] = []
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    // Add days from previous month to fill first week
    const startPadding = firstDay.getDay()
    for (let i = startPadding - 1; i >= 0; i--) {
        days.push(new Date(year, month, -i))
    }

    // Add days of current month
    for (let d = 1; d <= lastDay.getDate(); d++) {
        days.push(new Date(year, month, d))
    }

    // Add days from next month to fill last week
    const endPadding = 42 - days.length // 6 rows * 7 days
    for (let i = 1; i <= endPadding; i++) {
        days.push(new Date(year, month + 1, i))
    }

    return days
}

function isSameDay(d1: Date, d2: Date): boolean {
    return d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear()
}

function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
    if (!start || !end) return false
    const d = date.getTime()
    return d >= start.getTime() && d <= end.getTime()
}

/**
 * Calendar date picker component
 * 
 * @example
 * // Single date
 * const [date, setDate] = useState<Date>()
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 * 
 * @example
 * // Date range
 * const [range, setRange] = useState<Date[]>([])
 * <Calendar mode="range" selected={range} onSelect={setRange} />
 */
const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
    (
        {
            mode = "single",
            selected,
            onSelect,
            defaultMonth = new Date(),
            minDate,
            maxDate,
            disabled,
            className,
        },
        ref
    ) => {
        const [currentMonth, setCurrentMonth] = React.useState(defaultMonth)
        const [rangeStart, setRangeStart] = React.useState<Date | null>(null)

        const selectedDates = React.useMemo(() => {
            if (!selected) return []
            return Array.isArray(selected) ? selected : [selected]
        }, [selected])

        const handleSelect = (date: Date) => {
            if (disabled) return
            if (minDate && date < minDate) return
            if (maxDate && date > maxDate) return

            if (mode === "single") {
                onSelect?.(date)
            } else if (mode === "multiple") {
                const exists = selectedDates.some(d => isSameDay(d, date))
                if (exists) {
                    onSelect?.(selectedDates.filter(d => !isSameDay(d, date)))
                } else {
                    onSelect?.([...selectedDates, date])
                }
            } else if (mode === "range") {
                if (!rangeStart) {
                    setRangeStart(date)
                    onSelect?.([date])
                } else {
                    const start = rangeStart < date ? rangeStart : date
                    const end = rangeStart < date ? date : rangeStart
                    onSelect?.([start, end])
                    setRangeStart(null)
                }
            }
        }

        const navigatePrev = () => {
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
        }

        const navigateNext = () => {
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
        }

        const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth())
        const rangeEnd = mode === "range" && selectedDates.length === 2 ? selectedDates[1] : null

        return (
            <div
                ref={ref}
                className={cn("p-3 bg-background border rounded-lg shadow-md w-fit", className)}
                role="application"
                aria-label="Calendar"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        type="button"
                        onClick={navigatePrev}
                        className="p-1 rounded hover:bg-accent"
                        aria-label="Previous month"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <span className="font-semibold">
                        {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </span>
                    <button
                        type="button"
                        onClick={navigateNext}
                        className="p-1 rounded hover:bg-accent"
                        aria-label="Next month"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Day names */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                    {DAYS.map(day => (
                        <div key={day} className="text-center text-xs text-muted-foreground font-medium py-1">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1" role="grid">
                    {days.map((date, index) => {
                        const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
                        const isSelected = selectedDates.some(d => isSameDay(d, date))
                        const isRangeStart = rangeStart && isSameDay(date, rangeStart)
                        const isRangeEnd = rangeEnd && isSameDay(date, rangeEnd)
                        const inRange = isInRange(date, rangeStart || selectedDates[0], rangeEnd)
                        const isToday = isSameDay(date, new Date())
                        const isDisabled = disabled ||
                            (minDate && date < minDate) ||
                            (maxDate && date > maxDate)

                        return (
                            <button
                                key={index}
                                type="button"
                                role="gridcell"
                                aria-selected={isSelected}
                                aria-disabled={isDisabled}
                                disabled={isDisabled}
                                onClick={() => handleSelect(date)}
                                className={cn(
                                    "h-8 w-8 rounded text-sm font-medium transition-colors",
                                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                                    !isCurrentMonth && "text-muted-foreground/50",
                                    isCurrentMonth && "text-foreground",
                                    isToday && "border border-primary",
                                    isSelected && "bg-primary text-primary-foreground",
                                    (isRangeStart || isRangeEnd) && "bg-primary text-primary-foreground",
                                    inRange && !isSelected && "bg-accent",
                                    !isSelected && !inRange && "hover:bg-accent",
                                    isDisabled && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                {date.getDate()}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    }
)
Calendar.displayName = "Calendar"

export { Calendar }
