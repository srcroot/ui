"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type Task = {
    id: string
    columnId: string
    content: string
    priority: "low" | "medium" | "high"
}

interface Props {
    task: Task
}

export function KanbanCard({ task }: Props) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-primary bg-background p-4 opacity-50 relative"
            />
        )
    }

    const priorityColors = {
        low: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        medium: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        high: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors"
        >
            <CardHeader className="p-3 space-y-0 pb-2">
                <div className="flex items-start justify-between gap-2">
                    <Badge
                        variant="secondary"
                        className={`capitalize ${priorityColors[task.priority]}`}
                    >
                        {task.priority}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
                <p className="text-sm font-medium leading-normal mb-3">{task.content}</p>
                <div className="flex items-center justify-between">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src="/avatars/01.png" />
                        <AvatarFallback className="text-[10px]">CN</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                        {task.id}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
