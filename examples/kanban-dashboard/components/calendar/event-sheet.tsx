"use client"

import { useEffect, useState } from "react"
import { CalendarEvent } from "./full-calendar"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { FiTrash2, FiClock, FiCalendar, FiAlignLeft, FiType } from "react-icons/fi"
import { Separator } from "@/components/ui/separator"

interface EventSheetProps {
    event: CalendarEvent | null
    isOpen: boolean
    onClose: () => void
    onSave: (event: CalendarEvent) => void
    onDelete?: (eventId: string) => void
}

export function EventSheet({ event, isOpen, onClose, onSave, onDelete }: EventSheetProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState<CalendarEvent["type"]>("work")
    const [startDate, setStartDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endDate, setEndDate] = useState("")
    const [endTime, setEndTime] = useState("")

    useEffect(() => {
        if (event) {
            setTitle(event.title)
            setDescription(event.description || "")
            setType(event.type)
            setStartDate(format(event.start, "yyyy-MM-dd"))
            setStartTime(format(event.start, "HH:mm"))
            setEndDate(format(event.end, "yyyy-MM-dd"))
            setEndTime(format(event.end, "HH:mm"))
        } else {
            // Default to next hour slot if creating new
            const now = new Date()
            now.setMinutes(0, 0, 0)
            const nextHour = new Date(now.getTime() + 60 * 60 * 1000)

            setTitle("")
            setDescription("")
            setType("work")
            setStartDate(format(now, "yyyy-MM-dd"))
            setStartTime(format(now, "HH:mm"))
            setEndDate(format(nextHour, "yyyy-MM-dd"))
            setEndTime(format(nextHour, "HH:mm"))
        }
    }, [event, isOpen])

    const handleSave = () => {
        const start = new Date(`${startDate}T${startTime}`)
        const end = new Date(`${endDate}T${endTime}`)

        onSave({
            id: event?.id || crypto.randomUUID(),
            title,
            description,
            type,
            start,
            end,
            allDay: false // Simplified for now
        })
        onClose()
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader className="mb-6">
                    <SheetTitle>{event ? "Edit Event" : "Create Event"}</SheetTitle>
                    <SheetDescription>
                        {event ? "Make changes to your event details below." : "Add a new event to your schedule."}
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-6">
                    {/* Title Section */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-xs font-medium uppercase text-muted-foreground">Event Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add title"
                            className="text-lg font-semibold"
                        />
                    </div>

                    <Separator />

                    {/* Date & Time Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <FiClock className="h-4 w-4" />
                            <span>Date & Time</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs">Start</Label>
                                <div className="flex flex-col gap-2">
                                    <Input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="h-9"
                                    />
                                    <Input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="h-9"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs">End</Label>
                                <div className="flex flex-col gap-2">
                                    <Input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="h-9"
                                    />
                                    <Input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="h-9"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Type Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <FiType className="h-4 w-4" />
                            <span>Category</span>
                        </div>
                        <Select value={type} onValueChange={(v: any) => setType(v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="work">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-500" /> Work
                                    </span>
                                </SelectItem>
                                <SelectItem value="personal">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500" /> Personal
                                    </span>
                                </SelectItem>
                                <SelectItem value="important">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500" /> Important
                                    </span>
                                </SelectItem>
                                <SelectItem value="task">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-purple-500" /> Task
                                    </span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    {/* Description Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <FiAlignLeft className="h-4 w-4" />
                            <span>Description</span>
                        </div>
                        <Textarea
                            id="desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add details, agenda, or links..."
                            className="min-h-[120px] resize-none"
                        />
                    </div>
                </div>

                <SheetFooter className="mt-8 flex-col sm:flex-row gap-2">
                    {event && onDelete && (
                        <Button
                            variant="destructive"
                            className="w-full sm:w-auto mr-auto"
                            onClick={() => {
                                if (confirm("Delete this event?")) {
                                    onDelete(event.id)
                                    onClose()
                                }
                            }}
                        >
                            <FiTrash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    )}
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto" onClick={onClose}>Cancel</Button>
                        <Button className="w-full sm:w-auto" onClick={handleSave}>Save Event</Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
