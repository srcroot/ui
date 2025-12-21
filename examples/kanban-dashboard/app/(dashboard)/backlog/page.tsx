"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { defaultTasks } from "@/components/kanban/store"
import { FiPlus, FiSearch } from "react-icons/fi"
import { Task } from "@/types/kanban"

export default function BacklogPage() {
    const [backlogTasks, setBacklogTasks] = useState<Task[]>([
        ...defaultTasks.filter(t => t.columnId === 'todo'),
        {
            id: "TASK-9001",
            columnId: "backlog",
            content: "Refactor Authentication Middleware",
            priority: "low",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: ["Tech Debt"],
            subtasks: [], comments: [], attachments: [], assigneeIds: []
        },
        {
            id: "TASK-9002",
            columnId: "backlog",
            content: "Update Documentation",
            priority: "low",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: ["Docs"],
            subtasks: [], comments: [], attachments: [], assigneeIds: []
        }
    ])

    return (
        <div className="flex flex-col gap-4 p-4 mx-auto w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Backlog</h1>
                    <p className="text-muted-foreground mt-1">Manage and prioritize upcoming work.</p>
                </div>
                <Button>
                    <FiPlus className="mr-2 h-4 w-4" /> Create Issue
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search backlog..." className="pl-9" />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Epic</Button>
                    <Button variant="outline">Type</Button>
                    <Button variant="outline">Label</Button>
                </div>
            </div>

            <div className="space-y-2">
                {backlogTasks.map(task => (
                    <Card key={task.id} className="hover:bg-muted/50 transition-colors cursor-pointer group">
                        <CardContent className="p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                                <Badge variant="outline" className="text-muted-foreground font-mono text-xs">
                                    {task.id}
                                </Badge>
                                <div className="flex flex-col gap-1">
                                    <span className="font-medium group-hover:text-primary transition-colors">
                                        {task.content}
                                    </span>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        {task.tags && task.tags.map(tag => (
                                            <span key={tag} className="flex items-center gap-1">
                                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <Button size="sm" variant="ghost" className="h-8 text-xs hover:bg-primary/10 hover:text-primary" onClick={(e) => {
                                    e.stopPropagation()
                                    setBacklogTasks(backlogTasks.filter(t => t.id !== task.id))
                                    alert(`Moved ${task.id} to Kanban Board`)
                                }}>
                                    Move to Board
                                </Button>
                                <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'} className="capitalize w-20 justify-center">
                                    {task.priority}
                                </Badge>
                                <div className="flex items-center gap-2 w-24">
                                    {task.assigneeIds && task.assigneeIds.length > 0 ? (
                                        <div className="flex -space-x-2">
                                            {task.assigneeIds.map(id => (
                                                <Avatar key={id} className="h-6 w-6 border-2 border-background">
                                                    <AvatarImage src={`/avatars/0${(parseInt(id.split('-')[1]) % 5) + 1}.png`} />
                                                    <AvatarFallback>U</AvatarFallback>
                                                </Avatar>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="h-6 w-6 rounded-full border border-dashed flex items-center justify-center text-[10px] text-muted-foreground">
                                            <FiPlus />
                                        </div>
                                    )}
                                </div>
                                <span className="text-xs text-muted-foreground w-24 text-right">
                                    {new Date(task.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
