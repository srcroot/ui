"use client"

import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { Text } from "@/components/ui/text"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarShortcut } from "@/components/ui/menubar"
import { Kbd } from "@/components/ui/kbd"

// Dummy data for pagination demo
const allUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Editor" },
    { id: 6, name: "Diana Lee", email: "diana@example.com", role: "User" },
    { id: 7, name: "Eve Davis", email: "eve@example.com", role: "Admin" },
    { id: 8, name: "Frank Miller", email: "frank@example.com", role: "User" },
    { id: 9, name: "Grace Taylor", email: "grace@example.com", role: "Editor" },
    { id: 10, name: "Henry Anderson", email: "henry@example.com", role: "User" },
    { id: 11, name: "Ivy Thomas", email: "ivy@example.com", role: "User" },
    { id: 12, name: "Jack White", email: "jack@example.com", role: "Admin" },
]

const ITEMS_PER_PAGE = 4

export default function NavigationPage() {
    const [currentPage, setCurrentPage] = React.useState(1)

    const totalPages = Math.ceil(allUsers.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentUsers = allUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Text as="h1" variant="h1">Navigation</Text>
                <Text variant="muted">Breadcrumbs, pagination, and tabs.</Text>
            </div>
            <Separator />
            <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Breadcrumbs</h3>
                    </div>
                    <div className="p-6">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Tabs</h3>
                    </div>
                    <div className="p-6">
                        <Tabs defaultValue="account" className="w-full">
                            <TabsList>
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="password">Password</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">Make changes to your account here.</TabsContent>
                            <TabsContent value="password">Change your password here.</TabsContent>
                        </Tabs>
                    </div>
                </div>

                {/* Pagination with Data Demo */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm md:col-span-2">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Pagination with Data</h3>
                        <p className="text-sm text-muted-foreground">
                            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, allUsers.length)} of {allUsers.length} users
                        </p>
                    </div>
                    <div className="p-6 space-y-4">
                        {/* User List */}
                        <div className="space-y-2">
                            {currentUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                                >
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                        {user.role}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e: React.MouseEvent) => {
                                            e.preventDefault()
                                            if (currentPage > 1) setCurrentPage(currentPage - 1)
                                        }}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            isActive={currentPage === page}
                                            onClick={(e: React.MouseEvent) => {
                                                e.preventDefault()
                                                setCurrentPage(page)
                                            }}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e: React.MouseEvent) => {
                                            e.preventDefault()
                                            if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                                        }}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>

                {/* Menubar Demo */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm md:col-span-2">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Menubar</h3>
                        <p className="text-sm text-muted-foreground">Horizontal menu with dropdown submenus.</p>
                    </div>
                    <div className="p-6">
                        <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger>File</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
                                    <MenubarItem>New Window <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Save <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Edit</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Cut</MenubarItem>
                                    <MenubarItem>Copy</MenubarItem>
                                    <MenubarItem>Paste</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>View</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>Zoom In</MenubarItem>
                                    <MenubarItem>Zoom Out</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>

                {/* Kbd Demo */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm md:col-span-2">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Keyboard Shortcuts (Kbd)</h3>
                        <p className="text-sm text-muted-foreground">Display keyboard shortcuts and hotkeys.</p>
                    </div>
                    <div className="p-6 flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Save:</span>
                            <Kbd keys={["Ctrl", "S"]} />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Copy:</span>
                            <Kbd keys={["Ctrl", "C"]} />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Paste:</span>
                            <Kbd keys={["Ctrl", "V"]} />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Search:</span>
                            <Kbd>⌘</Kbd><Kbd>K</Kbd>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Escape:</span>
                            <Kbd>Esc</Kbd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
