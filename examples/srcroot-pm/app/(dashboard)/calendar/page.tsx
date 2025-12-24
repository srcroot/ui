"use client"

import * as React from "react"
import { FullCalendar, CalendarEvent } from "@/components/calendar/full-calendar"

export default function CalendarPage() {
    // Generate dates relative to today to ensure the demo always looks populated
    const today = new Date();

    // Helper to create date with specific hour
    const getDate = (daysAdd: number, hour: number) => {
        const d = new Date(today);
        d.setDate(d.getDate() + daysAdd);
        d.setHours(hour, 0, 0, 0);
        return d;
    }

    // Mock events
    const events: CalendarEvent[] = [
        {
            id: "1",
            start: getDate(0, 10), // Today 10am
            end: getDate(0, 11),
            title: "Team Meeting",
            type: "work"
        },
        {
            id: "2",
            start: getDate(0, 14), // Today 2pm
            end: getDate(0, 15),
            title: "Project Review",
            type: "important"
        },
        {
            id: "3",
            start: getDate(1, 11), // Tomorrow 11am
            end: getDate(1, 12),
            title: "Design Sync",
            type: "work"
        },
        {
            id: "4",
            start: getDate(3, 16), // +3 days 4pm
            end: getDate(3, 17),
            title: "Client Call",
            type: "work"
        },
        {
            id: "5",
            start: getDate(7, 9), // +1 week
            end: getDate(7, 10),
            title: "Doctor Appointment",
            type: "personal"
        },
        {
            id: "6",
            start: getDate(10, 9), // +10 days
            end: getDate(10, 17),
            title: "Quarterly Planning",
            type: "important"
        }
    ]

    return (
        <div className="flex max-h-[calc(100vh-8rem)] w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
            </div>
            <div className="flex-1 overflow-hidden">
                <FullCalendar events={events} />
            </div>
        </div>
    )
}
