"use client"

import * as React from "react"
import {
    addDays,
    addMonths,
    addWeeks,
    format,
    startOfWeek,
    startOfMonth,
    endOfWeek,
    endOfMonth,
    subDays,
    subMonths,
    subWeeks
} from "date-fns"
import { FiChevronLeft, FiChevronRight, FiCalendar, FiPlus, FiGrid, FiList } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarMonthView } from "./calendar-month-view"
import { CalendarWeekView } from "./calendar-week-view"
import { CalendarDayView } from "./calendar-day-view"
import { EventSheet } from "./event-sheet"

export type CalendarViewMode = 'month' | 'week' | 'day'

export type CalendarEvent = {
    id: string
    title: string
    description?: string
    start: Date
    end: Date
    allDay?: boolean
    type: "work" | "personal" | "important" | "meeting" | "task" | "other"
    taskId?: string
}

interface FullCalendarProps {
    events?: CalendarEvent[]
}

// Correct the dates for the mock events to be relative to today for better demo
const generateMockEvents = (): CalendarEvent[] => {
    const today = new Date()
    return [
        {
            id: "mock-1",
            title: "Team Sync",
            description: "Weekly sync with the engineering team",
            start: new Date(new Date().setHours(10, 0, 0, 0)),
            end: new Date(new Date().setHours(11, 0, 0, 0)),
            type: "work"
        },
        {
            id: "mock-2",
            title: "Product Review",
            start: new Date(new Date().setHours(14, 0, 0, 0)),
            end: new Date(new Date().setHours(15, 30, 0, 0)),
            type: "important"
        },
        {
            id: "mock-3",
            title: "Gym Session",
            start: new Date(new Date(today).setDate(today.getDate() + 1)),
            end: new Date(new Date(today).setDate(today.getDate() + 1)),
            type: "personal"
        }
    ].map(e => {
        // Fix for demo purposes often creating broken dates
        if (e.id === "mock-3") {
            const start = new Date(today)
            start.setDate(today.getDate() + 1)
            start.setHours(18, 0, 0)
            const end = new Date(start)
            end.setHours(19, 30, 0)
            e.start = start
            e.end = end
        }
        return e as CalendarEvent // Explicit cast to help TS
    })
}


export function FullCalendar({ events: initialEvents = [] }: FullCalendarProps) {
    const [date, setDate] = React.useState(new Date())
    const [view, setView] = React.useState<CalendarViewMode>("week") // Default to week for "Real App" feel
    // Only use mock events if no initial events are provided
    const [events, setEvents] = React.useState<CalendarEvent[]>(
        initialEvents.length > 0 ? initialEvents : generateMockEvents()
    )

    // Sheet State
    const [isSheetOpen, setIsSheetOpen] = React.useState(false)
    const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null)

    const navigate = (direction: 'prev' | 'next') => {
        if (view === 'month') {
            setDate(curr => direction === 'next' ? addMonths(curr, 1) : subMonths(curr, 1))
        } else if (view === 'week') {
            setDate(curr => direction === 'next' ? addWeeks(curr, 1) : subWeeks(curr, 1))
        } else {
            setDate(curr => direction === 'next' ? addDays(curr, 1) : subDays(curr, 1))
        }
    }

    const today = () => setDate(new Date())

    const handleEventClick = (event: CalendarEvent) => {
        setSelectedEvent(event)
        setIsSheetOpen(true)
    }

    const handleDateClick = (date: Date) => {
        const start = new Date(date)
        start.setHours(9, 0, 0)
        const end = new Date(date)
        end.setHours(10, 0, 0)

        setSelectedEvent(null)
        setIsSheetOpen(true)
    }

    const handleTimeSlotClick = (date: Date) => {
        const end = new Date(date)
        end.setMinutes(date.getMinutes() + 60)

        // Open sheet with this pre-filled
        setSelectedEvent({
            id: "", // Flag as new
            title: "",
            start: date,
            end: end,
            type: "work"
        })
        setIsSheetOpen(true)
    }

    const handleSaveEvent = (event: CalendarEvent) => {
        if (events.find(e => e.id === event.id)) {
            setEvents(events.map(e => e.id === event.id ? event : e))
        } else {
            setEvents([...events, event])
        }
        setIsSheetOpen(false)
    }

    const handleDeleteEvent = (id: string) => {
        setEvents(events.filter(e => e.id !== id))
        setIsSheetOpen(false)
    }

    return (
        <div className="flex flex-col h-full bg-background rounded-lg border shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b gap-4 bg-muted/10">
                <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
                    <div className="flex items-center rounded-md border border-input bg-background shadow-sm p-0.5">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('prev')}>
                            <FiChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('next')}>
                            <FiChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold tracking-tight min-w-[150px] text-center md:text-left">
                            {view === 'month' && format(date, "MMMM yyyy")}
                            {view === 'week' && format(date, "MMMM yyyy")}
                            {view === 'day' && format(date, "MMMM d, yyyy")}
                        </h2>
                        <Button variant="outline" size="sm" onClick={today} className="hidden sm:flex">
                            Today
                        </Button>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">

                    <Tabs value={view} onValueChange={(v) => setView(v as CalendarViewMode)}>
                        <TabsList className="grid w-[240px] grid-cols-3">
                            <TabsTrigger value="month">Month</TabsTrigger>
                            <TabsTrigger value="week">Week</TabsTrigger>
                            <TabsTrigger value="day">Day</TabsTrigger>
                        </TabsList>
                    </Tabs>


                    <Button onClick={() => {
                        setSelectedEvent(null)
                        setIsSheetOpen(true)
                    }}>
                        <FiPlus className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Add Event</span>
                        <span className="sm:hidden">Add</span>
                    </Button>
                </div>
            </div>

            {/* View Render */}
            <div className="flex-1 overflow-hidden relative">
                {view === 'month' && (
                    <CalendarMonthView
                        currentDate={date}
                        events={events}
                        onEventClick={handleEventClick}
                        onDateClick={(d) => {
                            setDate(d)
                            setView('day')
                        }}
                    />
                )}
                {view === 'week' && (
                    <CalendarWeekView
                        currentDate={date}
                        events={events}
                        onEventClick={handleEventClick}
                        onTimeSlotClick={handleTimeSlotClick}
                    />
                )}
                {view === 'day' && (
                    <CalendarDayView
                        currentDate={date}
                        events={events}
                        onEventClick={handleEventClick}
                        onTimeSlotClick={handleTimeSlotClick}
                        onDateChange={setDate}
                    />
                )}
            </div>

            <EventSheet
                event={selectedEvent && selectedEvent.id ? selectedEvent : (selectedEvent || null)}
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent}
            />
        </div>
    )
}
