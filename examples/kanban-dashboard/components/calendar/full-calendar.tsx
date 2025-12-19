"use client"

import * as React from "react"
import {
    addDays,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    startOfMonth,
    startOfWeek,
    addMonths,
    subMonths
} from "date-fns"
import { FiChevronLeft, FiChevronRight, FiClock } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export type CalendarEvent = {
    id: string
    title: string
    date: Date
    type: "work" | "personal" | "important" | "other"
    time?: string
}

interface FullCalendarProps {
    events?: CalendarEvent[]
}

export function FullCalendar({ events = [] }: FullCalendarProps) {
    const [currentMonth, setCurrentMonth] = React.useState(new Date())
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
    const today = () => setCurrentMonth(new Date())

    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const dateFormat = "d"
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ""

    const daysInMonth = eachDayOfInterval({
        start: startDate,
        end: endDate,
    })

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
        <div className="flex flex-col h-full bg-background rounded-lg border shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">
                        {format(currentMonth, "MMMM yyyy")}
                    </h2>
                    <div className="flex items-center rounded-md border bg-muted/50 p-0.5">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={prevMonth}>
                            <FiChevronLeft className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={nextMonth}>
                            <FiChevronRight className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
                <Button variant="outline" size="sm" onClick={today}>
                    Today
                </Button>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 border-b bg-muted/40">
                {weekdays.map((day) => (
                    <div key={day} className="p-2 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 grid grid-cols-7 grid-rows-5 md:grid-rows-6">
                {daysInMonth.map((day, i) => {
                    const isCurrentMonth = isSameMonth(day, monthStart)
                    const isSelected = selectedDate && isSameDay(day, selectedDate)
                    const isCurrentDay = isToday(day)

                    // Filter events for this day
                    const dayEvents = events.filter(event => isSameDay(event.date, day))

                    return (
                        <div
                            key={day.toISOString()}
                            className={cn(
                                "border-b border-r p-2 min-h-[80px] md:min-h-[100px] flex flex-col gap-1 transition-colors hover:bg-muted/30 relative",
                                !isCurrentMonth && "bg-muted/10 text-muted-foreground",
                                isCurrentDay && "bg-blue-50/50 dark:bg-blue-950/20",
                                i % 7 === 6 && "border-r-0", // Remove right border for last column
                                // Bottom borders handling could be cleaner but grid-rows usually handles it if container has border
                            )}
                            onClick={() => setSelectedDate(day)}
                        >
                            <div className="flex items-center justify-between">
                                <span className={cn(
                                    "text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full",
                                    isCurrentDay && "bg-primary text-primary-foreground"
                                )}>
                                    {format(day, dateFormat)}
                                </span>
                            </div>

                            <div className="flex-1 flex flex-col gap-1 overflow-y-auto max-h-[100px]">
                                {dayEvents.map(event => (
                                    <div
                                        key={event.id}
                                        className={cn(
                                            "text-[10px] px-1.5 py-1 rounded truncate border flex items-center gap-1 cursor-pointer",
                                            event.type === 'important' && "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
                                            event.type === 'work' && "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
                                            event.type === 'personal' && "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
                                            (!event.type || event.type === 'other') && "bg-muted text-foreground border-border"
                                        )}
                                        title={event.title}
                                    >
                                        {event.time && <span className="opacity-70 text-[9px]">{event.time}</span>}
                                        <span className="truncate">{event.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
