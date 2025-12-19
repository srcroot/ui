export type Priority = "low" | "medium" | "high"

export type Section = {
    id: string
    title: string
}

export type Subtask = {
    id: string
    content: string
    completed: boolean
}

export type Comment = {
    id: string
    authorId: string
    content: string
    createdAt: string // ISO Date string
}

export type Attachment = {
    id: string
    name: string
    type: "image" | "file"
    url: string
    size?: string
}

export type Task = {
    id: string
    columnId: string
    content: string // Title
    description?: string // Markdown
    priority: Priority

    // Kanban 2.0 fields
    tags?: string[]
    assigneeIds?: string[]
    subtasks?: Subtask[]
    comments?: Comment[]
    attachments?: Attachment[]

    // Time Tracking
    estimatedTime?: number // in minutes
    spentTime?: number // in minutes

    createdAt: string
    updatedAt: string
}

export type Column = {
    id: string
    title: string
}
