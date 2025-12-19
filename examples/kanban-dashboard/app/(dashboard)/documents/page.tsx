"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { FiFileText, FiFolder, FiPlus, FiSearch } from "react-icons/fi"

const docs = [
    {
        category: "Getting Started",
        items: [
            { title: "Introduction", active: true },
            { title: "Installation", active: false },
            { title: "Configuration", active: false },
        ]
    },
    {
        category: "Features",
        items: [
            { title: "Authentication", active: false },
            { title: "Database", active: false },
            { title: "API Reference", active: false },
        ]
    }
]

export default function DocumentsPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-[calc(100vh-4rem)]">
            <h1 className="text-2xl font-bold tracking-tight">Documentation</h1>
            <div className="flex h-full gap-4">
                <Card className="w-64 flex flex-col">
                    <CardHeader className="p-4">
                        <div className="relative">
                            <FiSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search docs..." className="pl-8" />
                        </div>
                    </CardHeader>
                    <Separator />
                    <ScrollArea className="flex-1">
                        <CardContent className="p-4">
                            <div className="space-y-4">
                                {docs.map((section, i) => (
                                    <div key={i}>
                                        <h3 className="mb-2 text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                            <FiFolder className="h-3 w-3" />
                                            {section.category}
                                        </h3>
                                        <div className="space-y-1">
                                            {section.items.map((item, j) => (
                                                <Button
                                                    key={j}
                                                    variant={item.active ? "secondary" : "ghost"}
                                                    className="w-full justify-start h-8 text-sm font-normal"
                                                >
                                                    <FiFileText className="mr-2 h-3 w-3" />
                                                    {item.title}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </ScrollArea>
                    <Separator />
                    <div className="p-4">
                        <Button className="w-full" size="sm">
                            <FiPlus className="mr-2 h-4 w-4" /> New Page
                        </Button>
                    </div>
                </Card>
                <Card className="flex-1 flex flex-col">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl">Introduction</CardTitle>
                                <CardDescription>Last updated 2 hours ago by @shifaul</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm">Share</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <Separator />
                    <ScrollArea className="flex-1">
                        <CardContent className="p-6 max-w-3xl">
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <p className="leading-7">
                                    Welcome to the project documentation. This wiki serves as the central knowledge base for the entire engineering team.
                                </p>
                                <h3 className="text-lg font-semibold mt-6 mb-2">Getting Started</h3>
                                <p className="leading-7">
                                    To get started with the project, make sure you have the latest version of Node.js installed. Clone the repository and run <code>npm install</code> to install dependencies.
                                </p>
                                <pre className="bg-muted p-4 rounded-md my-4">
                                    <code>
                                        git clone https://github.com/acme/project.git{'\n'}
                                        cd project{'\n'}
                                        npm install{'\n'}
                                        npm run dev
                                    </code>
                                </pre>
                                <h3 className="text-lg font-semibold mt-6 mb-2">Project Structure</h3>
                                <p className="leading-7">
                                    The project follows a standard Next.js application structure with App Router.
                                </p>
                            </div>
                        </CardContent>
                    </ScrollArea>
                </Card>
            </div>
        </div>
    )
}
