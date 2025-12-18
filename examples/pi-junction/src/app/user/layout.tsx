"use client"

import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ShoppingBag, Settings, Heart, LogOut, MapPin, CreditCard, Bell } from "lucide-react"

const sidebarItems = [
    {
        title: "Overview",
        href: "/user/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Orders",
        href: "/user/orders",
        icon: ShoppingBag,
    },
    {
        title: "Wishlist",
        href: "/user/wishlist",
        icon: Heart,
    },
    {
        title: "Addresses",
        href: "/user/addresses",
        icon: MapPin,
    },
    {
        title: "Payment Methods",
        href: "/user/payments",
        icon: CreditCard,
    },
    {
        title: "Notifications",
        href: "/user/notifications",
        icon: Bell,
    },
    {
        title: "Settings",
        href: "/user/settings",
        icon: Settings,
    },
]

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0 space-y-4">
                <div className="flex flex-col gap-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Button
                                key={item.href}
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn("justify-start", isActive && "font-semibold")}
                                asChild
                            >
                                <Link href={item.href}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.title}
                                </Link>
                            </Button>
                        )
                    })}
                    <Button variant="ghost" className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                    </Button>
                </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-h-[500px]">
                {children}
            </div>
        </div>
    )
}
