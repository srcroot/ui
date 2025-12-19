"use client"

import { useMemo, useState } from "react"
import {
    DndContext,
    DragOverlay,
    useSensors,
    useSensor,
    PointerSensor,
    KeyboardSensor,
    closestCorners,
} from "@dnd-kit/core"
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import { FiPlus } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KanbanColumn, Column } from "@/components/kanban/kanban-column"
import { KanbanCard, Task } from "@/components/kanban/kanban-card"

const defaultCols: Column[] = [
    {
        id: "todo",
        title: "To Do",
    },
    {
        id: "in-progress",
        title: "In Progress",
    },
    {
        id: "done",
        title: "Done",
    },
]

const defaultTasks: Task[] = [
    {
        id: "1",
        columnId: "todo",
        content: "Research competitor analysis",
        priority: "high",
    },
    {
        id: "2",
        columnId: "todo",
        content: "Draft product requirements",
        priority: "medium",
    },
    {
        id: "3",
        columnId: "in-progress",
        content: "Design system architecture",
        priority: "high",
    },
    {
        id: "4",
        columnId: "done",
        content: "Setup project repository",
        priority: "low",
    },
]

export default function KanbanBoardPage() {
    const [columns, setColumns] = useState<Column[]>(defaultCols)
    const [tasks, setTasks] = useState<Task[]>(defaultTasks)
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns])

    function onDragStart(event: any) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column)
            return
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task)
            return
        }
    }

    function onDragEnd(event: any) {
        setActiveColumn(null)
        setActiveTask(null)

        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveColumn = active.data.current?.type === "Column"
        if (!isActiveColumn) return

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === activeId)
            const overColumnIndex = columns.findIndex((col) => col.id === overId)

            return arrayMove(columns, activeColumnIndex, overColumnIndex)
        })
    }

    function onDragOver(event: any) {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveTask = active.data.current?.type === "Task"
        const isOverTask = over.data.current?.type === "Task"

        if (!isActiveTask) return

        // Dropping a Task over another Task
        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId)
                const overIndex = tasks.findIndex((t) => t.id === overId)
                const activeTask = tasks[activeIndex]
                const overTask = tasks[overIndex]

                if (activeTask.columnId !== overTask.columnId) {
                    activeTask.columnId = overTask.columnId
                    return arrayMove(tasks, activeIndex, overIndex - 1)
                }

                return arrayMove(tasks, activeIndex, overIndex)
            })
        }

        const isOverColumn = over.data.current?.type === "Column"

        // Dropping a Task over a Column
        if (isActiveTask && isOverColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId)
                const activeTask = tasks[activeIndex]
                if (activeTask.columnId !== overId) {
                    activeTask.columnId = overId
                    return arrayMove(tasks, activeIndex, activeIndex)
                }
                return tasks
            })
        }
    }

    function createTask(columnId: string) {
        const newTask: Task = {
            id: Math.floor(Math.random() * 10001).toString(),
            columnId,
            content: `New Task ${tasks.length + 1}`,
            priority: "medium",
        }
        setTasks([...tasks, newTask])
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Kanban Board</h1>
                <div className="flex items-center gap-2">
                    <Input placeholder="Filter tasks..." className="w-[200px]" />
                    <Button>
                        <FiPlus className="mr-2 h-4 w-4" /> Add Column
                    </Button>
                </div>
            </div>
            <div className="flex h-full overflow-x-auto pb-4">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                >
                    <div className="flex gap-4">
                        <SortableContext
                            items={columnsId}
                            strategy={horizontalListSortingStrategy}
                        >
                            {columns.map((col) => (
                                <KanbanColumn
                                    key={col.id}
                                    column={col}
                                    tasks={tasks.filter((task) => task.columnId === col.id)}
                                    createTask={createTask}
                                />
                            ))}
                        </SortableContext>
                    </div>

                    {typeof document !== "undefined" && (
                        <DragOverlay>
                            {activeColumn && (
                                <KanbanColumn
                                    column={activeColumn}
                                    tasks={tasks.filter(
                                        (task) => task.columnId === activeColumn.id
                                    )}
                                    createTask={createTask}
                                />
                            )}
                            {activeTask && <KanbanCard task={activeTask} />}
                        </DragOverlay>
                    )}
                </DndContext>
            </div>
        </div>
    )
}
