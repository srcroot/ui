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
    LuType,
    LuMousePointerClick,
    LuInbox,
    LuLayoutTemplate,
    LuDatabase,
    LuLayers,
    LuNavigation,
    LuComponent,
    LuSettings,
    LuUser
} from "react-icons/lu"
import { cn } from "@/lib/utils"

// Menu items.
const items = [
    {
        title: "Typography",
        url: "/components/typography",
        icon: LuType,
    },
    {
        title: "Buttons & Actions",
        url: "/components/buttons",
        icon: LuMousePointerClick,
    },
    {
        title: "Forms & Controls",
        url: "/components/forms",
        icon: LuInbox,
    },
    {
        title: "Layout & Structure",
        url: "/components/layout",
        icon: LuLayoutTemplate,
    },
    {
        title: "Data Display",
        url: "/components/data-display",
        icon: LuDatabase,
    },
    {
        title: "Overlays & Feedback",
        url: "/components/overlays",
        icon: LuLayers,
    },
    {
        title: "LuNavigation",
        url: "/components/navigation",
        icon: LuNavigation,
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
                        <LuComponent className="size-4" />
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
                            <LuSettings />
                            <span>LuSettings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <LuUser />
                            <span>LuUser Profile</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
