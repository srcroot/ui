"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiDownload, FiFile, FiFolder, FiGrid, FiImage, FiList, FiMoreVertical, FiSearch, FiTrash, FiUpload } from "react-icons/fi"

const files = [
    { name: "Project Specs.pdf", type: "pdf", size: "2.4 MB", date: "Today" },
    { name: "Design Assets", type: "folder", size: "12 items", date: "Yesterday" },
    { name: "Presentation_v2.pptx", type: "ppt", size: "5.1 MB", date: "2 days ago" },
    { name: "Logo_Final.png", type: "image", size: "450 KB", date: "1 week ago" },
    { name: "Budget_2025.xlsx", type: "sheet", size: "1.2 MB", date: "1 week ago" },
    { name: "Meeting Notes.docx", type: "doc", size: "18 KB", date: "2 weeks ago" },
]

export default function FilesPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Files</h1>
                <div className="flex items-center gap-2">
                    <Button>
                        <FiUpload className="mr-2 h-4 w-4" /> Upload
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-between pb-4">
                <div className="relative w-96">
                    <FiSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search files..." className="pl-8" />
                </div>
                <Tabs defaultValue="grid" className="w-[200px] flex justify-end">
                    <TabsList>
                        <TabsTrigger value="grid"><FiGrid className="h-4 w-4" /></TabsTrigger>
                        <TabsTrigger value="list"><FiList className="h-4 w-4" /></TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {files.map((file, i) => (
                    <Card key={i} className="group overflow-hidden">
                        <CardHeader className="p-0 border-b bg-muted/20 aspect-video flex items-center justify-center relative">
                            {file.type === "folder" ? (
                                <FiFolder className="h-16 w-16 text-blue-500/50" />
                            ) : file.type === "image" ? (
                                <FiImage className="h-16 w-16 text-purple-500/50" />
                            ) : (
                                <FiFile className="h-16 w-16 text-muted-foreground/50" />
                            )}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-background/80">
                                            <FiMoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem><FiDownload className="mr-2 h-4 w-4" /> Download</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive"><FiTrash className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pb-2">
                            <h3 className="font-semibold truncate" title={file.name}>{file.name}</h3>
                            <p className="text-sm text-muted-foreground">{file.size}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
                            Modified {file.date}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
