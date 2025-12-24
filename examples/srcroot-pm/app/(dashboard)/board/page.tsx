"use client"

import { useMemo, useState, useEffect } from "react"
import {
    DndContext,
    DragOverlay,
    useSensors,
    useSensor,
    PointerSensor,
    KeyboardSensor,
    closestCorners,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
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
import { KanbanColumn } from "@/components/kanban/kanban-column"
import { KanbanCard } from "@/components/kanban/kanban-card"
import { Task, Column } from "@/types/kanban"
import { defaultCols, defaultTasks } from "@/components/kanban/store"

import { TaskSheet } from "@/components/kanban/task-sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function KanbanBoardPage() {
    const [columns, setColumns] = useState<Column[]>(defaultCols)
    const [tasks, setTasks] = useState<Task[]>(defaultTasks)
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Task Sheet State
    const [sheetTask, setSheetTask] = useState<Task | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    function handleTaskClick(task: Task) {
        setSheetTask(task)
        setIsSheetOpen(true)
    }

    function handleTaskUpdate(updatedTask: Task) {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
        setSheetTask(updatedTask)
    }

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

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column)
            return
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task)
            return
        }
    }

    function onDragEnd(event: DragEndEvent) {
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

    function onDragOver(event: DragOverEvent) {
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
                    activeTask.columnId = overId as string
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
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: [],
            subtasks: [],
            comments: [],
            attachments: [],
            assigneeIds: [],
        }
        setTasks([...tasks, newTask])
        setSheetTask(newTask)
        setIsSheetOpen(true)
    }

    function handleColumnRename(columnId: string, newTitle: string) {
        setColumns(columns.map(col => col.id === columnId ? { ...col, title: newTitle } : col))
    }

    function handleColumnDelete(columnId: string) {
        setColumns(columns.filter(col => col.id !== columnId))
        setTasks(tasks.map(task => task.columnId === columnId ? { ...task, columnId: 'backlog' } : task))
    }

    function handleTaskDelete(taskId: string) {
        setTasks(tasks.filter(t => t.id !== taskId))
        setIsSheetOpen(false)
        setSheetTask(null)
    }

    // Prevent hydration mismatch by defining valid render output or null
    // But returning null might break the layout if parent expects content
    // We return a loading state or a skeleton that matches the structure
    if (!isMounted) {
        return (
            <div className="flex flex-col gap-4 p-4 h-full w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Kanban Board</h1>
                    <div className="flex items-center gap-2">
                        <div className="w-[200px] h-9 bg-muted animate-pulse rounded-md" />
                        <div className="w-24 h-9 bg-muted animate-pulse rounded-md" />
                    </div>
                </div>
                <div className="flex h-full gap-4 overflow-x-auto pb-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="min-w-[350px] h-full rounded-md bg-muted/40 p-4 animate-pulse">
                            <div className="h-6 w-1/2 bg-muted rounded mb-4" />
                            <div className="h-24 w-full bg-muted rounded mb-2" />
                            <div className="h-24 w-full bg-muted rounded" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex max-h-[calc(100vh-8rem)] w-full flex-col gap-4">

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <h1 className="text-2xl font-bold tracking-tight text-nowrap">Kanban Board</h1>
                <div className="flex w-full md:w-fit gap-2">
                    <Input placeholder="Filter tasks..." className="w-full md:w-[200px]" />
                    <Button onClick={() => {
                        const newColId = `col-${Math.floor(Math.random() * 1000)}`
                        setColumns([...columns, { id: newColId, title: "New Column" }])
                    }}>
                        <FiPlus className="mr-2 h-4 w-4" /> Add Column
                    </Button>
                </div>
            </div>

            {/* <div className="flex h-full min-h-0 w-full overflow-x-auto pb-4"> */}
            <ScrollArea orientation="horizontal" hideScrollbar className="flex h-full min-h-0 w-full md:max-w-[calc(100svw-23rem)] lg:w-full py-2">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                >
                    <div className="flex gap-4 min-h-0">
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
                                    onTaskClick={handleTaskClick}
                                    onRename={handleColumnRename}
                                    onDelete={handleColumnDelete}
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
            </ScrollArea>
            {/* </div> */}

            <TaskSheet
                task={sheetTask}
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                onUpdate={handleTaskUpdate}
                onDelete={handleTaskDelete}
            />

        </div >
    )
}
