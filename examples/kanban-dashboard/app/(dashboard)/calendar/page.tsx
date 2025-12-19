"use client"

import * as React from "react"
import { FullCalendar, CalendarEvent } from "@/components/calendar/full-calendar"

export default function CalendarPage() {
    // Mock events
    const events: CalendarEvent[] = [
        {
            id: "1",
            date: new Date(),
            title: "Team Meeting",
            time: "10:00 AM",
            type: "work"
        },
        {
            id: "2",
            date: new Date(),
            title: "Project Review",
            time: "2:00 PM",
            type: "important"
        },
        {
            id: "3",
            date: new Date(new Date().setDate(new Date().getDate() + 1)),
            title: "Design Sync",
            time: "11:00 AM",
            type: "work"
        },
        {
            id: "4",
            date: new Date(new Date().setDate(new Date().getDate() + 3)),
            title: "Client Call",
            time: "4:00 PM",
            type: "work"
        },
        {
            id: "5",
            date: new Date(new Date().setDate(new Date().getDate() + 7)),
            title: "Doctor Appointment",
            time: "9:00 AM",
            type: "personal"
        },
        {
            id: "6",
            date: new Date(new Date().setDate(new Date().getDate() + 10)),
            title: "Quarterly Planning",
            time: "All Day",
            type: "important"
        }
    ]

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
            </div>
            <div className="flex-1 overflow-hidden">
                <FullCalendar events={events} />
            </div>
        </div>
    )
}
