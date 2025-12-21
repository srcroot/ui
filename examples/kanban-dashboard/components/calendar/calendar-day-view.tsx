"use client"

import {
    format,
    isSameDay,
    isToday,
    differenceInMinutes,
    addDays,
    subDays
} from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarEvent } from "./full-calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

interface CalendarDayViewProps {
    currentDate: Date
    events: CalendarEvent[]
    onEventClick: (event: CalendarEvent) => void
    onTimeSlotClick: (date: Date) => void
    onDateChange?: (date: Date) => void
}

export function CalendarDayView({ currentDate, events, onEventClick, onTimeSlotClick, onDateChange }: CalendarDayViewProps) {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const isCurrentDay = isToday(currentDate)

    // Filter events for the current day
    const dayEvents = events.filter(event => isSameDay(event.start, currentDate))
        .sort((a, b) => a.start.getTime() - b.start.getTime())

    return (
        <div className="flex flex-col h-full bg-background rounded-b-lg overflow-hidden">
            <ScrollArea className="flex-1 h-full">
                <div className="flex relative">
                    {/* Time Axis */}
                    <div className="w-[70px] shrink-0 border-r bg-background flex flex-col sticky left-0 z-10">
                        {hours.map((hour) => (
                            <div key={hour} className="h-[60px] border-b text-xs text-muted-foreground p-1 text-right relative bg-background">
                                <span className="absolute top-0.5 right-0.5 px-1 text-[11px] font-medium text-muted-foreground/80">
                                    {format(new Date().setHours(hour, 0), "h a")}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Main Day Column */}
                    <div className="flex-1 relative min-w-[300px]">
                        {/* Background Grid */}
                        <div className="absolute inset-0 pointer-events-none">
                            {hours.map(h => (
                                <div key={h} className="h-[60px] border-b border-dashed border-muted/30 w-full" />
                            ))}
                        </div>

                        {/* Current Time Indicator */}
                        {isCurrentDay && (
                            <div
                                className="absolute w-full border-t-2 border-red-500 z-20 pointer-events-none"
                                style={{
                                    top: `${(new Date().getHours() * 60) + new Date().getMinutes()}px`
                                }}
                            >
                                <div className="w-2.5 h-2.5 bg-red-500 rounded-full -mt-[5px] -ml-[5px]" />
                            </div>
                        )}

                        {/* Clickable Time Slots */}
                        <div
                            className="absolute inset-0 cursor-pointer"
                            onClick={(e) => {
                                const y = e.nativeEvent.offsetY
                                const totalMinutes = Math.floor(y)
                                const hours = Math.floor(totalMinutes / 60)
                                const minutes = Math.floor((totalMinutes % 60) / 15) * 15

                                const clickDate = new Date(currentDate)
                                clickDate.setHours(hours, minutes, 0)
                                onTimeSlotClick(clickDate)
                            }}
                        />

                        {/* Events */}
                        {dayEvents.map(event => {
                            const startMinutes = (event.start.getHours() * 60) + event.start.getMinutes()
                            const duration = differenceInMinutes(event.end, event.start)
                            const height = Math.max(30, duration)

                            return (
                                <div
                                    key={event.id}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onEventClick(event)
                                    }}
                                    className={cn(
                                        "absolute w-[96%] left-[2%] rounded-lg border px-3 py-2 cursor-pointer shadow-sm hover:z-30 hover:shadow-lg transition-all overflow-hidden",
                                        event.type === 'important' && "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/60 dark:text-red-100 dark:border-red-700",
                                        (event.type === 'work' || event.type === 'meeting') && "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/60 dark:text-blue-100 dark:border-blue-700",
                                        event.type === 'personal' && "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/60 dark:text-green-100 dark:border-green-700",
                                        event.type === 'task' && "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/60 dark:text-purple-100 dark:border-purple-700",
                                    )}
                                    style={{
                                        top: `${startMinutes}px`,
                                        height: `${height}px`
                                    }}
                                >
                                    <div className="font-semibold truncate text-sm flex items-center gap-2">
                                        {event.type === 'task' && <div className="w-3 h-3 border-2 rounded border-current" />}
                                        {event.title}
                                    </div>
                                    {duration > 45 && (
                                        <div className="text-xs opacity-80 mt-0.5">
                                            {format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}
                                        </div>
                                    )}
                                    {duration > 75 && event.description && (
                                        <div className="text-xs opacity-70 mt-1 line-clamp-2">
                                            {event.description}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Sidebar - Upcoming events or empty state */}
                    <div className="w-[280px] shrink-0 border-l bg-muted/20 p-4 hidden lg:block">
                        <h3 className="text-sm font-semibold mb-4">Schedule</h3>
                        {dayEvents.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No events scheduled for this day.</p>
                        ) : (
                            <div className="space-y-3">
                                {dayEvents.map(event => (
                                    <div
                                        key={event.id}
                                        className="p-3 rounded-lg bg-background border cursor-pointer hover:shadow-md transition-shadow"
                                        onClick={() => onEventClick(event)}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full",
                                                event.type === 'important' && "bg-red-500",
                                                (event.type === 'work' || event.type === 'meeting') && "bg-blue-500",
                                                event.type === 'personal' && "bg-green-500",
                                                event.type === 'task' && "bg-purple-500",
                                            )} />
                                            <span className="text-xs text-muted-foreground">
                                                {format(event.start, "h:mm a")}
                                            </span>
                                        </div>
                                        <div className="font-medium text-sm truncate">{event.title}</div>
                                        {event.description && (
                                            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
