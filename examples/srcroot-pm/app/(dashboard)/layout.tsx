"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Separator } from "@/components/ui/separator"
import { DynamicBreadcrumb } from "@/components/layout/dynamic-breadcrumb"
import { LoadingSpinner } from "@/components/ui/loading-spinner"


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // Give time for screen size detection and initial render
        const timer = setTimeout(() => {
            setMounted(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    if (!mounted) {
        return (
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <div className="flex h-screen w-screen items-center justify-center bg-background">
                    <LoadingSpinner />
                </div>
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider>
                <AppSidebar collapsible="icon" variant="inset" />
                <SidebarInset>
                    <header className="bg-background flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <DynamicBreadcrumb />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-h-screen">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    )
}
