"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { FiMoreHorizontal, FiPlus } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanCard, Task } from "./kanban-card"
import { useMemo } from "react"

export type Column = {
    id: string
    title: string
}

interface Props {
    column: Column
    tasks: Task[]
    createTask: (columnId: string) => void
}

export function KanbanColumn({ column, tasks, createTask }: Props) {
    const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks])

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
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
                className="flex h-[500px] w-[350px] flex-col rounded-md border-2 border-primary/20 bg-muted/50 opacity-40"
            />
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex h-full w-[350px] flex-col rounded-md bg-muted/40"
        >
            <div
                {...attributes}
                {...listeners}
                className="flex items-center justify-between p-4 cursor-grab active:cursor-grabbing"
            >
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{column.title}</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {tasks.length}
                    </span>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                            <FiMoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-2 overflow-y-auto">
                <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <KanbanCard key={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>

            <div className="p-2">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                    onClick={() => createTask(column.id)}
                >
                    <FiPlus className="mr-2 h-4 w-4" />
                    Add Task
                </Button>
            </div>
        </div>
    )
}
