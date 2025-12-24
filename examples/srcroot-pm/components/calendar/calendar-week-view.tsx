"use client"

import {
    addDays,
    eachDayOfInterval,
    endOfWeek,
    format,
    isSameDay,
    isToday,
    startOfWeek,
    differenceInMinutes
} from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarEvent } from "./full-calendar"
import { useEffect, useRef, useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { FiClock, FiMapPin, FiAlignLeft, FiTag } from "react-icons/fi"

interface CalendarWeekViewProps {
    currentDate: Date
    events: CalendarEvent[]
    onEventClick: (event: CalendarEvent) => void
    onTimeSlotClick: (date: Date) => void
}

// Event Preview Card Content
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

const TIME_COLUMN_WIDTH = 56 // px - consistent width for time axis

export function CalendarWeekView({ currentDate, events, onEventClick, onTimeSlotClick }: CalendarWeekViewProps) {
    const startDate = startOfWeek(currentDate)
    const endDate = endOfWeek(currentDate)

    const daysOfWeek = eachDayOfInterval({
        start: startDate,
        end: endDate,
    })

    const hours = Array.from({ length: 24 }, (_, i) => i)

    return (
        <div className="flex flex-col h-full bg-background rounded-b-lg overflow-hidden border">
            {/* ScrollArea handling both header and body for perfect alignment */}
            <ScrollArea className="flex-1 h-full">
                {/* Header - Sticky Top */}
                <div className="flex border-b bg-background sticky top-0 z-30 shadow-sm">
                    {/* Time axis placeholder */}
                    <div
                        className="shrink-0 border-r bg-background/50"
                        style={{ width: TIME_COLUMN_WIDTH }}
                    />
                    {/* Day Headers */}
                    <div className="flex-1 grid grid-cols-7">
                        {daysOfWeek.map((day) => {
                            const isCurrentDay = isToday(day)
                            return (
                                <div
                                    key={day.toISOString()}
                                    className={cn(
                                        "p-3 text-center border-r last:border-r-0 flex flex-col gap-0.5 items-center bg-background",
                                        isCurrentDay && "bg-blue-50/50 dark:bg-blue-950/20"
                                    )}
                                >
                                    <span className={cn(
                                        "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
                                        isCurrentDay && "text-primary"
                                    )}>
                                        {format(day, "EEE")}
                                    </span>
                                    <span className={cn(
                                        "text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full transition-colors",
                                        isCurrentDay && "bg-primary text-primary-foreground"
                                    )}>
                                        {format(day, "d")}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Main Calendar Body */}
                <div className="flex relative">
                    {/* Time Axis - sticky left */}
                    <div
                        className="shrink-0 border-r bg-background flex flex-col sticky left-0 z-20"
                        style={{ width: TIME_COLUMN_WIDTH }}
                    >
                        {hours.map((hour) => (
                            <div
                                key={`time-${hour}`}
                                className="h-[60px] border-b text-xs text-muted-foreground text-right relative bg-background"
                            >
                                <span className="absolute top-0.5 right-0.5 px-1 text-[10px] font-medium text-muted-foreground/70 bg-background">
                                    {format(new Date().setHours(hour, 0), "h a")}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Days Columns */}
                    <div className="flex-1 grid grid-cols-7 relative">
                        {/* Background Grid Lines */}
                        <div className="absolute inset-0 grid grid-cols-7 pointer-events-none">
                            {daysOfWeek.map((day, i) => (
                                <div key={`grid-col-${i}`} className="border-r last:border-r-0 h-full relative">
                                    {hours.map(h => (
                                        <div
                                            key={`grid-hour-${h}`}
                                            className="h-[60px] border-b border-dashed border-muted/40 w-full"
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Day Columns with Events */}
                        {daysOfWeek.map((day) => {
                            const dayEvents = events.filter(event => isSameDay(event.start, day))
                            const isCurrentDay = isToday(day)

                            return (
                                <div
                                    key={day.toISOString()}
                                    className={cn(
                                        "relative",
                                        isCurrentDay && "bg-blue-50/30 dark:bg-blue-950/10"
                                    )}
                                    style={{ height: hours.length * 60 }}
                                    onClick={(e) => {
                                        const y = e.nativeEvent.offsetY
                                        const totalMinutes = Math.floor(y)
                                        const clickHours = Math.floor(totalMinutes / 60)
                                        const minutes = Math.floor((totalMinutes % 60) / 15) * 15

                                        const clickDate = new Date(day)
                                        clickDate.setHours(clickHours, minutes, 0)
                                        onTimeSlotClick(clickDate)
                                    }}
                                >
                                    {/* Current Time Indicator */}
                                    {isCurrentDay && (
                                        <div
                                            className="absolute w-full border-t-2 border-red-500 z-20 pointer-events-none"
                                            style={{
                                                top: `${(new Date().getHours() * 60) + new Date().getMinutes()}px`
                                            }}
                                        >
                                            <div className="w-2 h-2 bg-red-500 rounded-full -mt-[4px] -ml-1" />
                                        </div>
                                    )}

                                    {/* Events */}
                                    {dayEvents.map(event => {
                                        const startMinutes = (event.start.getHours() * 60) + event.start.getMinutes()
                                        const duration = differenceInMinutes(event.end, event.start)
                                        const height = Math.max(24, duration)

                                        return (
                                            <HoverCard key={event.id} openDelay={300} closeDelay={100}>
                                                <HoverCardTrigger asChild>
                                                    <div
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            onEventClick(event)
                                                        }}
                                                        className={cn(
                                                            "absolute left-1 right-1 rounded border px-1.5 py-1 text-xs cursor-pointer shadow-sm hover:z-30 hover:shadow-md transition-all overflow-hidden",
                                                            event.type === 'important' && "bg-red-100/95 text-red-700 border-red-200 dark:bg-red-900/60 dark:text-red-200 dark:border-red-700",
                                                            (event.type === 'work' || event.type === 'meeting') && "bg-blue-100/95 text-blue-700 border-blue-200 dark:bg-blue-900/60 dark:text-blue-200 dark:border-blue-700",
                                                            event.type === 'personal' && "bg-green-100/95 text-green-700 border-green-200 dark:bg-green-900/60 dark:text-green-200 dark:border-green-700",
                                                            event.type === 'task' && "bg-purple-100/95 text-purple-700 border-purple-200 dark:bg-purple-900/60 dark:text-purple-200 dark:border-purple-700",
                                                        )}
                                                        style={{
                                                            top: `${startMinutes}px`,
                                                            height: `${height}px`
                                                        }}
                                                    >
                                                        <div className="font-semibold truncate text-[11px] leading-tight flex items-center gap-1">
                                                            {event.type === 'task' && <div className="w-2 h-2 border rounded-sm border-current shrink-0" />}
                                                            {event.title}
                                                        </div>
                                                        {duration > 35 && (
                                                            <div className="text-[10px] opacity-75 truncate mt-0.5">
                                                                {format(event.start, "h:mm")} - {format(event.end, "h:mm a")}
                                                            </div>
                                                        )}
                                                    </div>
                                                </HoverCardTrigger>
                                                <HoverCardContent side="bottom" align="start" className="w-72">
                                                    <EventPreviewContent event={event} />
                                                </HoverCardContent>
                                            </HoverCard>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
