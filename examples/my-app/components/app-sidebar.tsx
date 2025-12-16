"use client"

import { usePathname } from "next/navigation"
import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Type,
    MousePointerClick,
    Inbox,
    LayoutTemplate,
    Database,
    Layers,
    Navigation,
    Component,
    Settings,
    User
} from "lucide-react"
import { cn } from "@/lib/utils"

// Menu items.
const items = [
    {
        title: "Typography",
        url: "/components/typography",
        icon: Type,
    },
    {
        title: "Buttons & Actions",
        url: "/components/buttons",
        icon: MousePointerClick,
    },
    {
        title: "Forms & Controls",
        url: "/components/forms",
        icon: Inbox,
    },
    {
        title: "Layout & Structure",
        url: "/components/layout",
        icon: LayoutTemplate,
    },
    {
        title: "Data Display",
        url: "/components/data-display",
        icon: Database,
    },
    {
        title: "Overlays & Feedback",
        url: "/components/overlays",
        icon: Layers,
    },
    {
        title: "Navigation",
        url: "/components/navigation",
        icon: Navigation,
    },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const { state } = useSidebar()

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className={cn("flex items-center", state === "collapsed" ? "justify-center" : "gap-2 p-2")}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Component className="size-4" />
                    </div>
                    {state === "expanded" && (
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">@srcroot/ui</span>
                            <span className="truncate text-xs">Playground</span>
                        </div>
                    )}
                </div>
            </SidebarHeader>
            <Separator className="bg-sidebar-border" />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Components</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Settings />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <User />
                            <span>User Profile</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
