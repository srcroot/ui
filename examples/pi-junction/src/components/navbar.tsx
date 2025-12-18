'use client'
import Link from "next/link"
import { ShoppingCart, User, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PiLogo } from "@/components/pi-logo"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarTrigger } from "./ui/sidebar"
import { Search } from "./ui/search"

export function Navbar() {
    const { cartCount } = useCart()

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <SidebarTrigger className="md:hidden" />

                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <PiLogo className="h-8 w-8 text-primary" />
                        <span className="hidden font-bold sm:inline-block">
                            Pi Junction
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/products"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Products
                        </Link>
                        <Link
                            href="/components"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Components
                        </Link>
                        <Link
                            href="/deals"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Deals
                        </Link>
                        <Link
                            href="/about"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            About
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center justify-between space-x-2 md:justify-end">
                    <Search className="hidden md:block" />

                    <nav className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon" asChild className="relative">
                            <Link href="/cart">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Cart</span>
                                {cartCount > 0 && (
                                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full text-[10px]">
                                        {cartCount}
                                    </Badge>
                                )}
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Account</span>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
