"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiArchive, FiCheck, FiInbox, FiMessageSquare, FiStar, FiTrash } from "react-icons/fi"

const notifications = [
    {
        id: 1,
        title: "New Team Member",
        description: "Sarah joined the 'Marketing' team.",
        time: "10 min ago",
        read: false,
    },
    {
        id: 2,
        title: "Task Assigned",
        description: "You were assigned to 'Update Homepage Hero'.",
        time: "1 hour ago",
        read: false,
    },
    {
        id: 3,
        title: "Project Deadline Updated",
        description: "Q3 Roadmap deadline has been moved to Oct 15th.",
        time: "2 hours ago",
        read: true,
    },
    {
        id: 4,
        title: "Comment Mention",
        description: "Alex commented on 'API Documentation'.",
        time: "Yesterday",
        read: true,
    },
    {
        id: 5,
        title: "System Update",
        description: "Maintenance scheduled for this weekend.",
        time: "2 days ago",
        read: true,
    },
]

export default function InboxPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-[calc(100vh-4rem)]">
            <h1 className="text-2xl font-bold tracking-tight">Inbox</h1>
            <div className="flex h-full gap-4">
                <Card className="w-64 flex flex-col">
                    <CardHeader className="p-4">
                        <Button className="w-full justify-start" variant="secondary">
                            <FiInbox className="mr-2 h-4 w-4" /> Inbox
                            <span className="ml-auto text-xs font-bold">2</span>
                        </Button>
                    </CardHeader>
                    <div className="px-4 space-y-1">
                        <Button variant="ghost" className="w-full justify-start h-9">
                            <FiStar className="mr-2 h-4 w-4" /> Starred
                        </Button>
                        <Button variant="ghost" className="w-full justify-start h-9">
                            <FiArchive className="mr-2 h-4 w-4" /> Archive
                        </Button>
                        <Button variant="ghost" className="w-full justify-start h-9">
                            <FiTrash className="mr-2 h-4 w-4" /> Trash
                        </Button>
                    </div>
                </Card>
                <Card className="flex-1 flex flex-col">
                    <CardHeader className="p-4 py-2 border-b flex flex-row items-center justify-between space-y-0">
                        <Tabs defaultValue="all">
                            <TabsList className="h-8">
                                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                                <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FiCheck className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FiArchive className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <ScrollArea className="flex-1">
                        <CardContent className="p-0">
                            {notifications.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex items-start gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors border-b last:border-0 ${!item.read ? 'bg-muted/20' : ''}`}
                                >
                                    <div className={`mt-1 h-2 w-2 rounded-full ${!item.read ? 'bg-blue-500' : 'bg-transparent'}`} />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className={`text-sm ${!item.read ? 'font-semibold' : 'font-medium'}`}>
                                                {item.title}
                                            </p>
                                            <span className="text-xs text-muted-foreground">{item.time}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </ScrollArea>
                </Card>
            </div>
        </div>
    )
}
