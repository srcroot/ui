"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LuArrowRight, LuBox, LuComponent } from "react-icons/lu"
import Link from "next/link"

export default function ComponentsPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Components</h1>
                <p className="text-muted-foreground">
                    Browse the collection of pre-built components available in the library.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/components/typography">
                    <Card className="hover:bg-muted/50 transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="p-2 rounded-md bg-blue-500/10 text-blue-500">
                                    <TypeIcon className="w-4 h-4" />
                                </span>
                                Typography
                            </CardTitle>
                            <CardDescription>
                                Headings, paragraphs, and text utility styles.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/components/buttons">
                    <Card className="hover:bg-muted/50 transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="p-2 rounded-md bg-green-500/10 text-green-500">
                                    <MousePointerIcon className="w-4 h-4" />
                                </span>
                                Buttons
                            </CardTitle>
                            <CardDescription>
                                Button variants, sizes, and interactive states.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/components/forms">
                    <Card className="hover:bg-muted/50 transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="p-2 rounded-md bg-purple-500/10 text-purple-500">
                                    <InboxIcon className="w-4 h-4" />
                                </span>
                                Forms
                            </CardTitle>
                            <CardDescription>
                                Inputs, selects, radio groups, and validation.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/components/layout">
                    <Card className="hover:bg-muted/50 transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="p-2 rounded-md bg-orange-500/10 text-orange-500">
                                    <LayoutIcon className="w-4 h-4" />
                                </span>
                                Layout
                            </CardTitle>
                            <CardDescription>
                                Containers, aspect ratios, and structural blocks.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/components/data-display">
                    <Card className="hover:bg-muted/50 transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="p-2 rounded-md bg-indigo-500/10 text-indigo-500">
                                    <DatabaseIcon className="w-4 h-4" />
                                </span>
                                Data Display
                            </CardTitle>
                            <CardDescription>
                                Tables, lists, carousels, and rich content.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/components/overlays">
                    <Card className="hover:bg-muted/50 transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="p-2 rounded-md bg-pink-500/10 text-pink-500">
                                    <LayersIcon className="w-4 h-4" />
                                </span>
                                Overlays
                            </CardTitle>
                            <CardDescription>
                                Dialogs, sheets, popovers, and notifications.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/components/navigation">
                    <Card className="hover:bg-muted/50 transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="p-2 rounded-md bg-red-500/10 text-red-500">
                                    <NavigationIcon className="w-4 h-4" />
                                </span>
                                Navigation
                            </CardTitle>
                            <CardDescription>
                                Breadcrumbs, tabs, and pagination helpers.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </div>
    )
}

function TypeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
    )
}

function MousePointerIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            <path d="m13 13 6 6" />
        </svg>
    )
}

function InboxIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
    )
}

function LayoutIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="3" x2="21" y1="9" y2="9" />
            <line x1="9" x2="9" y1="21" y2="9" />
        </svg>
    )
}

function DatabaseIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    )
}

function LayersIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
            <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
            <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
        </svg>
    )
}

function NavigationIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
    )
}
