"use client"

import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek,
    differenceInMinutes
} from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarEvent } from "./full-calendar"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { FiClock, FiAlignLeft } from "react-icons/fi"

interface CalendarMonthViewProps {
    currentDate: Date
    events: CalendarEvent[]
    onEventClick: (event: CalendarEvent) => void
    onDateClick: (date: Date) => void
}

// Event Preview Card Content for Month View
function EventPreviewContent({ event }: { event: CalendarEvent }) {
    const duration = differenceInMinutes(event.end, event.start)
    const hours = Math.floor(duration / 60)
    const mins = duration % 60

    return (
        <div className="space-y-3">
            {/* Title */}
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "w-2 h-2 rounded-full",
                        event.type === 'important' && "bg-red-500",
                        (event.type === 'work' || event.type === 'meeting') && "bg-blue-500",
                        event.type === 'personal' && "bg-green-500",
                        event.type === 'task' && "bg-purple-500",
                    )} />
                    <span className="text-xs text-muted-foreground capitalize">{event.type}</span>
                </div>
                <h4 className="font-semibold text-sm">{event.title}</h4>
            </div>

            {/* Time */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FiClock className="h-3 w-3" />
                <span>
                    {format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}
                    <span className="ml-1 opacity-70">
                        ({hours > 0 ? `${hours}h ` : ''}{mins > 0 ? `${mins}m` : ''})
                    </span>
                </span>
            </div>

            {/* Description */}
            {event.description && (
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <FiAlignLeft className="h-3 w-3 mt-0.5 shrink-0" />
                    <span className="line-clamp-3">{event.description}</span>
                </div>
            )}

            {/* Click hint */}
            <div className="text-[10px] text-muted-foreground/60 pt-1 border-t">
                Click to edit
            </div>
        </div>
    )
}

export function CalendarMonthView({ currentDate, events, onEventClick, onDateClick }: CalendarMonthViewProps) {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const daysInMonth = eachDayOfInterval({
        start: startDate,
        end: endDate,
    })

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
        <div className="flex flex-col h-full bg-background rounded-b-lg">
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
                    const isCurrentDay = isToday(day)

                    // Filter events for this day
                    const dayEvents = events.filter(event => isSameDay(event.start, day))
                        .sort((a, b) => a.start.getTime() - b.start.getTime())

                    return (
                        <div
                            key={day.toISOString()}
                            className={cn(
                                "border-b border-r p-2 min-h-[80px] md:min-h-[100px] flex flex-col gap-1 transition-colors hover:bg-muted/30 relative group",
                                !isCurrentMonth && "bg-muted/10 text-muted-foreground",
                                isCurrentDay && "bg-blue-50/50 dark:bg-blue-950/20",
                                i % 7 === 6 && "border-r-0",
                            )}
                            onClick={() => onDateClick(day)}
                        >
                            <div className="flex items-center justify-between">
                                <span className={cn(
                                    "text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full",
                                    isCurrentDay && "bg-primary text-primary-foreground"
                                )}>
                                    {format(day, "d")}
                                </span>
                            </div>

                            <div className="flex-1 flex flex-col gap-1 overflow-y-auto max-h-[100px] no-scrollbar overflow-hidden">
                                {dayEvents.map(event => (
                                    <HoverCard key={event.id} openDelay={400} closeDelay={100}>
                                        <HoverCardTrigger asChild>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onEventClick(event)
                                                }}
                                                className={cn(
                                                    "text-[10px] px-1.5 py-1 rounded truncate border flex items-center gap-1 cursor-pointer shadow-sm hover:brightness-95 transition-all transform hover:scale-[1.02]",
                                                    event.type === 'important' && "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
                                                    (event.type === 'work' || event.type === 'meeting') && "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
                                                    event.type === 'personal' && "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
                                                    event.type === 'task' && "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
                                                    (!event.type || event.type === 'other') && "bg-muted text-foreground border-border"
                                                )}
                                                title={event.title}
                                            >
                                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${event.type === 'important' ? 'bg-red-500' :
                                                    event.type === 'work' ? 'bg-blue-500' :
                                                        event.type === 'personal' ? 'bg-green-500' :
                                                            event.type === 'task' ? 'bg-purple-500' :
                                                                'bg-gray-500'
                                                    }`} />
                                                <span className="opacity-70 text-[9px] hidden xl:inline-block">
                                                    {format(event.start, "HH:mm")}
                                                </span>
                                                <span className="truncate font-medium">{event.title}</span>
                                            </div>
                                        </HoverCardTrigger>
                                        <HoverCardContent side="bottom" align="start" className="w-72">
                                            <EventPreviewContent event={event} />
                                        </HoverCardContent>
                                    </HoverCard>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
