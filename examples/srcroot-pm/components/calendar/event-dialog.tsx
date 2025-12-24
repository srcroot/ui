"use client"

import { useEffect, useState } from "react"
import { CalendarEvent } from "./full-calendar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
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
import { FiTrash2 } from "react-icons/fi"

interface EventDialogProps {
    event: CalendarEvent | null
    isOpen: boolean
    onClose: () => void
    onSave: (event: CalendarEvent) => void
    onDelete?: (eventId: string) => void
}

export function EventDialog({ event, isOpen, onClose, onSave, onDelete }: EventDialogProps) {
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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{event ? "Edit Event" : "Create Event"}</DialogTitle>
                    <DialogDescription>
                        {event ? "Make changes to your event here." : "Add a new event to your details."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                            placeholder="Meeting with Team"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Type
                        </Label>
                        <Select value={type} onValueChange={(v: any) => setType(v)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="work">Work</SelectItem>
                                <SelectItem value="personal">Personal</SelectItem>
                                <SelectItem value="important">Important</SelectItem>
                                <SelectItem value="task">Task</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Start</Label>
                        <div className="col-span-3 flex gap-2">
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <Input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-24"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">End</Label>
                        <div className="col-span-3 flex gap-2">
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            <Input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-24"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            Details
                        </Label>
                        <Textarea
                            id="desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-span-3"
                            placeholder="Add details..."
                        />
                    </div>
                </div>
                <DialogFooter className="flex items-center justify-between w-full sm:justify-between">
                    {event && onDelete ? (
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                                onDelete(event.id)
                                onClose()
                            }}
                        >
                            <FiTrash2 className="h-4 w-4" />
                        </Button>
                    ) : <div />}
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save changes</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
