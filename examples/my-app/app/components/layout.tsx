import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ComponentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-90 flex h-14 shrink-0 items-center gap-2 border-b bg-muted px-4">
                    <SidebarTrigger />
                    <div className="h-4 w-px bg-border mx-2" />
                    <span className="font-semibold">Kitchen Sink</span>
                    <div className="ml-auto">
                        <ThemeToggle />
                    </div>
                </header>
                <main className="p-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
