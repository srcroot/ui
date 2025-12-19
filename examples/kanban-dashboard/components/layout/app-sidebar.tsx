"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    FiChevronsUp,
    FiStar,
    FiCheckCircle,
    FiCreditCard,
    FiBell,
    FiSettings,
    FiLogOut,
    FiCommand,
} from "react-icons/fi"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { toast } from "sonner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"

import { data } from "@/lib/sidebar-data"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2 group-data-[collapsible=icon]:!p-2">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <FiCommand className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="truncate font-semibold">Acme Inc</span>
                        <span className="truncate text-xs">Enterprise</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenuItem className="px-2 pb-2 group-data-[collapsible=icon]:hidden">
                        <SidebarInput placeholder="Search..." />
                    </SidebarMenuItem>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                <React.Fragment key={item.title}>
                                    {item.items ? (
                                        <SidebarMenuItem>
                                            <SidebarMenuButton tooltip={item.title}>
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                                            <Link href={subItem.url}>
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </SidebarMenuItem>
                                    ) : (
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                                                <Link href={item.url}>
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                    {item.badge && (
                                                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground group-data-[collapsible=icon]:hidden">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )}
                                </React.Fragment>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu className="w-full">
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <img src={data.user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight text-sidebar-foreground">
                                        <span className="truncate font-semibold">{data.user.name}</span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            {data.user.email}
                                        </span>
                                    </div>
                                    <FiChevronsUp className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="top"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            <img src={data.user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">{data.user.name}</span>
                                            <span className="truncate text-xs text-muted-foreground">
                                                {data.user.email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => toast.info("Pro plan coming soon!")}>
                                        <FiStar className="mr-2 h-4 w-4" />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings?tab=account">
                                            <FiCheckCircle className="mr-2 h-4 w-4" />
                                            Account
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings?tab=general">
                                            <FiCreditCard className="mr-2 h-4 w-4" />
                                            Billing
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings?tab=notifications">
                                            <FiBell className="mr-2 h-4 w-4" />
                                            Notifications
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <ThemeSwitcher />
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/settings">
                                        <FiSettings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/login">
                                        <FiLogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
