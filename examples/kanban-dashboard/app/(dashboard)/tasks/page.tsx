"use client"

import * as React from "react"
import { FiChevronDown, FiMoreHorizontal, FiArrowDown, FiArrowUp, FiSearch } from "react-icons/fi"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type Task = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
    title: string
    priority: "low" | "medium" | "high"
}

const initialData: Task[] = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@yahoo.com",
        title: "Fix login page bug",
        priority: "high",
    },
    {
        id: "3u1reoj4",
        amount: 242,
        status: "success",
        email: "Abe45@gmail.com",
        title: "Update documentation",
        priority: "medium",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@gmail.com",
        title: "Implement payment gateway",
        priority: "high",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@gmail.com",
        title: "Design new landing page",
        priority: "low",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
        title: "Refactor API endpoints",
        priority: "medium",
    },
    {
        id: "c2w1s3e4",
        amount: 432,
        status: "pending",
        email: "jane.doe@example.com",
        title: "Setup CI/CD pipeline",
        priority: "high",
    },
    {
        id: "x9z8y7v6",
        amount: 125,
        status: "success",
        email: "john.smith@example.com",
        title: "Write unit tests",
        priority: "low",
    },
]

export default function TasksPage() {
    const [data, setData] = React.useState<Task[]>(initialData)
    const [filter, setFilter] = React.useState("")
    const [sortConfig, setSortConfig] = React.useState<{ key: keyof Task; direction: 'asc' | 'desc' } | null>(null)
    const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())

    // Filter
    const filteredData = React.useMemo(() => {
        return data.filter(task =>
            task.title.toLowerCase().includes(filter.toLowerCase()) ||
            task.email.toLowerCase().includes(filter.toLowerCase())
        )
    }, [data, filter])

    // Sort
    const sortedData = React.useMemo(() => {
        if (!sortConfig) return filteredData
        return [...filteredData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
            return 0
        })
    }, [filteredData, sortConfig])

    const handleSort = (key: keyof Task) => {
        setSortConfig(current => {
            if (current?.key === key) {
                return current.direction === 'asc' ? { key, direction: 'desc' } : null
            }
            return { key, direction: 'asc' }
        })
    }

    const toggleSelectAll = () => {
        if (selectedRows.size === sortedData.length) {
            setSelectedRows(new Set())
        } else {
            setSelectedRows(new Set(sortedData.map(task => task.id)))
        }
    }

    const toggleSelectRow = (id: string) => {
        const newSelected = new Set(selectedRows)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedRows(newSelected)
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold tracking-tight">All Tasks</h1>
            <div className="flex items-center justify-between py-4">
                <div className="relative max-w-sm w-full">
                    <Input
                        type="search"
                        placeholder="Filter tasks..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={selectedRows.size === sortedData.length && sortedData.length > 0}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort('title')}>
                                <div className="flex items-center gap-1">
                                    Title
                                    {sortConfig?.key === 'title' && (sortConfig.direction === 'asc' ? <FiArrowUp className="h-3 w-3" /> : <FiArrowDown className="h-3 w-3" />)}
                                </div>
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                                <div className="flex items-center gap-1">
                                    Status
                                    {sortConfig?.key === 'status' && (sortConfig.direction === 'asc' ? <FiArrowUp className="h-3 w-3" /> : <FiArrowDown className="h-3 w-3" />)}
                                </div>
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort('priority')}>
                                <div className="flex items-center gap-1">
                                    Priority
                                    {sortConfig?.key === 'priority' && (sortConfig.direction === 'asc' ? <FiArrowUp className="h-3 w-3" /> : <FiArrowDown className="h-3 w-3" />)}
                                </div>
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort('email')}>
                                <div className="flex items-center gap-1">
                                    Assignee
                                    {sortConfig?.key === 'email' && (sortConfig.direction === 'asc' ? <FiArrowUp className="h-3 w-3" /> : <FiArrowDown className="h-3 w-3" />)}
                                </div>
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedData.length > 0 ? (
                            sortedData.map((task) => (
                                <TableRow key={task.id} data-state={selectedRows.has(task.id) ? "selected" : undefined}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.has(task.id)}
                                            onCheckedChange={() => toggleSelectRow(task.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-nowrap">{task.title}</TableCell>
                                    <TableCell>
                                        <div className="capitalize">{task.status}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "secondary" : "outline"}>
                                            {task.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="lowercase">{task.email}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <FiMoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.id)}>
                                                    Copy task ID
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>View details</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Delete task</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {selectedRows.size} of {sortedData.length} row(s) selected.
                </div>
            </div>
        </div>
    )
}
