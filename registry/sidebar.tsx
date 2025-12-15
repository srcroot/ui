import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const SidebarContext = React.createContext<{
    mobileOpen: boolean
    setMobileOpen: (open: boolean) => void
    isMobile: boolean
} | null>(null)

function useSidebar() {
    const context = React.useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}

const SidebarProvider = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024) // lg breakpoint
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    return (
        <SidebarContext.Provider value={{ mobileOpen, setMobileOpen, isMobile }}>
            <div
                ref={ref}
                className={cn("flex min-h-screen w-full bg-background", className)}
                {...props}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    )
})
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { isMobile, mobileOpen, setMobileOpen } = useSidebar()

    if (isMobile) {
        return (
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetContent side="left" className="w-[280px] p-0">
                    <div className={cn("h-full py-6", className)} {...props}>
                        {children}
                    </div>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <aside
            ref={ref}
            className={cn(
                "hidden lg:flex w-[280px] flex-col border-r bg-muted/10",
                className
            )}
            {...props}
        >
            {children}
        </aside>
    )
})
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { setMobileOpen, mobileOpen } = useSidebar()

    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn("lg:hidden", className)}
            onClick={() => setMobileOpen(!mobileOpen)}
            ref={ref}
            {...props}
        >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex h-14 items-center border-b px-6 font-semibold", className)}
        {...props}
    />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex-1 overflow-auto py-4", className)}
        {...props}
    />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center border-t p-4", className)}
        {...props}
    />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarMenu = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("grid gap-1 px-2", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { active?: boolean }
>(({ className, active, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            active && "bg-muted text-primary",
            className
        )}
        {...props}
    />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarInset = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <main
        ref={ref}
        className={cn("flex-1 overflow-hidden", className)}
        {...props}
    />
))
SidebarInset.displayName = "SidebarInset"

export {
    SidebarProvider,
    Sidebar,
    SidebarTrigger,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarInset,
    useSidebar,
}
