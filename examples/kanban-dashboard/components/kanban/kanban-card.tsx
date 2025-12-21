"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Task } from "@/types/kanban"
import { FiMessageSquare, FiPaperclip, FiCheckSquare } from "react-icons/fi"

interface Props {
    task: Task
    onClick?: (task: Task) => void
}

export function KanbanCard({ task, onClick }: Props) {
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
                className="h-[140px] min-h-[140px] cursor-grab items-center rounded-xl border-2 border-primary bg-background p-4 opacity-50 relative"
            />
        )
    }

    const priorityColors = {
        low: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        medium: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        high: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    }

    const completedSubtasks = task.subtasks?.filter(s => s.completed).length || 0;
    const totalSubtasks = task.subtasks?.length || 0;

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => onClick?.(task)}
            className="cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors"
        >
            <CardHeader className="p-3 space-y-0 pb-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <Badge
                        variant="secondary"
                        className={`capitalize ${priorityColors[task.priority]}`}
                    >
                        {task.priority}
                    </Badge>
                    {task.tags && task.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                            {task.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-medium">
                                    {tag}
                                </span>
                            ))}
                            {task.tags.length > 2 && <span className="text-[10px] text-muted-foreground">+</span>}
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
                <p className="text-sm font-medium leading-normal mb-3">{task.content}</p>

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 text-muted-foreground">
                        {totalSubtasks > 0 && (
                            <div className="flex items-center gap-1 text-xs">
                                <FiCheckSquare className="h-3 w-3" />
                                <span>{completedSubtasks}/{totalSubtasks}</span>
                            </div>
                        )}
                        {task.comments && task.comments.length > 0 && (
                            <div className="flex items-center gap-1 text-xs">
                                <FiMessageSquare className="h-3 w-3" />
                                <span>{task.comments.length}</span>
                            </div>
                        )}
                        {task.attachments && task.attachments.length > 0 && (
                            <div className="flex items-center gap-1 text-xs">
                                <FiPaperclip className="h-3 w-3" />
                                <span>{task.attachments.length}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex -space-x-2">
                        {task.assigneeIds?.map((id, i) => (
                            <Avatar key={id} className={`h-6 w-6 border-2 border-background ${i > 0 ? '-ml-2' : ''}`}>
                                <AvatarImage src={`/avatars/0${(parseInt(id.split('-')[1]) % 5) + 1}.png`} />
                                <AvatarFallback className="text-[9px]">U{id.split('-')[1]}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
