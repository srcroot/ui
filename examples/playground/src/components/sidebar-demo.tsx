import * as React from "react"
import { LayoutDashboard, Users, Settings, Mail } from "lucide-react"
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

export default function SidebarDemo() {
    return (
        <div className="h-[500px] border rounded-lg overflow-hidden flex">
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader>
                        Team srcRoot
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive>
                                    <LayoutDashboard className="h-4 w-4" />
                                    <span>Dashboard</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Users className="h-4 w-4" />
                                    <span>Team</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Mail className="h-4 w-4" />
                                    <span>Messages</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenuButton>
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset className="bg-background">
                    <header className="flex h-14 items-center gap-4 border-b px-6 bg-muted/20">
                        <SidebarTrigger />
                        <span className="font-semibold">Dashboard</span>
                    </header>
                    <div className="p-6">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="aspect-video rounded-xl bg-muted/50" />
                            <div className="aspect-video rounded-xl bg-muted/50" />
                            <div className="aspect-video rounded-xl bg-muted/50" />
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
