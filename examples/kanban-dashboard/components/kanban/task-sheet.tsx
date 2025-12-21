"use client"

import { useState, useEffect } from "react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetDescription,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Task } from "@/types/kanban"
import { format } from "date-fns"
import { FiCalendar, FiClock, FiTag, FiUser, FiCheckSquare, FiPaperclip, FiMessageSquare, FiTrash2 } from "react-icons/fi"
import {
    SrcrootEditor, HistoryPlugin, FormatPlugin, ListPlugin, LinkPlugin,
    ExportImportPlugin, ColorPlugin, HighlightPlugin, SpacingPlugin, TablePlugin,
    LayoutPlugin, InsertMenuPlugin, MediaPlugin, AlignPlugin,
    FontPlugin, HeadingPlugin, MarkdownShortcutPlugin, MarkdownPastePlugin, CodePlugin
} from '@srcroot/editor';
import '@srcroot/editor/dist/index.css';
import { Descendant } from 'slate';

const plugins = [
    HistoryPlugin,
    MarkdownShortcutPlugin,
    ExportImportPlugin,
    InsertMenuPlugin,
    HeadingPlugin,
    FontPlugin,
    FormatPlugin,
    ColorPlugin,
    HighlightPlugin,
    AlignPlugin,
    SpacingPlugin,
    ListPlugin,
    MediaPlugin,
    LinkPlugin,
    TablePlugin,
    LayoutPlugin,
    MarkdownPastePlugin,
    CodePlugin,
];

interface Props {
    task: Task | null
    isOpen: boolean
    onClose: () => void
    onUpdate: (task: Task) => void
    onDelete?: (taskId: string) => void
}

export function TaskSheet({ task, isOpen, onClose, onUpdate, onDelete }: Props) {
    if (!task) return null

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-[600px] w-full p-0 gap-0">
                <ScrollArea className="h-full">
                    <div className="p-6">
                        <SheetHeader className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="uppercase text-[10px] tracking-wider">
                                    {task.id}
                                </Badge>
                                <Badge variant="secondary" className="capitalize">
                                    {task.priority} Priority
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => {
                                    if (confirm("Are you sure you want to delete this task?")) {
                                        onDelete?.(task.id)
                                        onClose()
                                    }
                                }}>
                                    <FiTrash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                            <SheetTitle className="text-xl text-left font-bold leading-tight">
                                {task.content}
                            </SheetTitle>
                            <SheetDescription className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs w-full mt-2">
                                <span className="flex items-center gap-1.5">
                                    <FiCalendar className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="font-medium">Created</span>
                                    <span className="text-muted-foreground">{format(new Date(task.createdAt), "MMM d, yyyy")}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <FiClock className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="font-medium">Updated</span>
                                    <span className="text-muted-foreground">{format(new Date(task.updatedAt), "MMM d, yyyy")}</span>
                                </span>
                            </SheetDescription>
                        </SheetHeader>

                        <div className="space-y-6">
                            {/* Description */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold flex items-center gap-2">
                                    Description
                                </h3>
                                <div className="rounded-md overflow-hidden min-h-[150px]">
                                    <SrcrootEditor
                                        key={task.id}
                                        plugins={plugins}
                                        value={[{ type: 'paragraph', children: [{ text: task.description || 'No description' }] }] as any}
                                        placeholder="Add a description..."
                                        className="min-h-[150px]"
                                        readOnly={false} // Allow editing in theory, but state won't save yet without onChange
                                    />
                                </div>
                            </div>
                            {/* ... rest of content ... */}

                            {/* Subtasks */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold flex items-center gap-2">
                                    <FiCheckSquare className="h-4 w-4 text-muted-foreground" />
                                    Subtasks
                                </h3>
                                {task.subtasks && task.subtasks.length > 0 ? (
                                    <div className="space-y-2">
                                        {task.subtasks.map(subtask => (
                                            <div key={subtask.id} className="flex items-start gap-2">
                                                <div className={`mt-0.5 h-4 w-4 border rounded flex items-center justify-center ${subtask.completed ? "bg-primary border-primary" : "border-muted-foreground"}`}>
                                                    {subtask.completed && <div className="h-2 w-2 bg-background rounded-[1px]" />}
                                                </div>
                                                <span className={`text-sm ${subtask.completed ? "line-through text-muted-foreground" : ""}`}>
                                                    {subtask.content}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No subtasks.</p>
                                )}
                            </div>

                            <Separator />

                            {/* Metadata Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                {/* Assignees */}
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold flex items-center gap-2">
                                        <FiUser className="h-4 w-4 text-muted-foreground" />
                                        Assignees
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {task.assigneeIds && task.assigneeIds.length > 0 ? (
                                            task.assigneeIds.map(id => (
                                                <div key={id} className="flex items-center gap-2 bg-muted/50 rounded-full pr-3 pl-1 py-1">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={`/avatars/0${(parseInt(id.split('-')[1]) % 5) + 1}.png`} />
                                                        <AvatarFallback>U{id.split('-')[1]}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-xs font-medium">User {id.split('-')[1]}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <span className="text-sm text-muted-foreground">Unassigned</span>
                                        )}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold flex items-center gap-2">
                                        <FiTag className="h-4 w-4 text-muted-foreground" />
                                        Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {task.tags && task.tags.length > 0 ? (
                                            task.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                                                    {tag}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-sm text-muted-foreground">No tags</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Comments */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold flex items-center gap-2">
                                    <FiMessageSquare className="h-4 w-4 text-muted-foreground" />
                                    Activity
                                </h3>
                                {
                                    task.comments && task.comments.length > 0 ? (
                                        <div className="space-y-4">
                                            {task.comments.map(comment => (
                                                <div key={comment.id} className="flex gap-3 text-sm">
                                                    <Avatar className="h-8 w-8 mt-1">
                                                        <AvatarFallback>U</AvatarFallback>
                                                    </Avatar>
                                                    <div className="grid gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold">User {comment.authorId.split('-')[1]}</span>
                                                            <span className="text-xs text-muted-foreground">{format(new Date(comment.createdAt), "MMM d, h:mm a")}</span>
                                                        </div>
                                                        <p className="text-muted-foreground">{comment.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No comments yet.</p>
                                    )
                                }
                            </div>

                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
