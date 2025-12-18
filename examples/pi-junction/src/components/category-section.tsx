"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const CATEGORIES = [
    {
        id: "cat1",
        name: "Processors",
        href: "/products?category=processors",
        image: "https://placehold.co/400x400.png",
    },
    {
        id: "cat2",
        name: "Displays",
        href: "/products?category=displays",
        image: "https://placehold.co/400x400.png",
    },
    {
        id: "cat3",
        name: "Cybernetics",
        href: "/products?category=cybernetics",
        image: "https://placehold.co/400x400.png",
    },
    {
        id: "cat4",
        name: "Interfaces",
        href: "/products?category=interfaces",
        image: "https://placehold.co/400x400.png",
    },
    {
        id: "cat5",
        name: "Storage",
        href: "/products?category=storage",
        image: "https://placehold.co/400x400.png",
    },
    {
        id: "cat6",
        name: "Networking",
        href: "/products?category=networking",
        image: "https://placehold.co/400x400.png",
    },
    {
        id: "cat7",
        name: "Robotics",
        href: "/products?category=robotics",
        image: "https://placehold.co/400x400.png",
    },
    {
        id: "cat8",
        name: "AI Modules",
        href: "/products?category=ai-modules",
        image: "https://placehold.co/400x400.png",
    },
    {
        id: "cat9",
        name: "Sensors",
        href: "/products?category=sensors",
        image: "https://placehold.co/400x400.png",
    },
    {
        id: "cat10",
        name: "Energy",
        href: "/products?category=energy",
        image: "https://placehold.co/400x400.png",
    },
]

export function CategorySection() {
    const scrollRef = React.useRef<HTMLDivElement>(null)

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
        }
    }

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
        }
    }

    return (
        <section className="w-full overflow-hidden h-[12rem] bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm border-b">
            <div className="container mx-auto h-full w-screen px-4 md:px-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div className="flex flex-row md:flex-col p-4 gap-4 md:gap-8">
                    <div className="max-w-[200px] shrink-0 hidden md:block">
                        <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
                        <p className="text-sm text-muted-foreground mt-2">
                            Explore our cutting-edge components.
                        </p>
                    </div>
                    {/* Mobile Header (Compact) - Visible only on small screens */}
                    <div className="md:hidden w-full">
                        <h2 className="text-xl font-bold leading-tight">Shop Category</h2>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={scrollLeft}
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            aria-label="Scroll left"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={scrollRight}
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            aria-label="Scroll right"
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>



                <ScrollArea
                    ref={scrollRef}
                    className="flex-1 w-[clamp(100%,calc(100vw-200px),100vw)] flex items-center gap-4 h-full py-4 mask-fade-right"
                    orientation="horizontal"
                    hideScrollbar
                >
                    {CATEGORIES.map((category) => (
                        <Link
                            href={category.href}
                            key={category.id}
                            className="group relative shrink-0 w-[200px] h-full overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all border bg-background ml-4 first:ml-0 last:mr-4"
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                            <div className="absolute bottom-3 left-3 right-3 z-20">
                                <h3 className="font-semibold text-sm text-white leading-tight mb-1">{category.name}</h3>
                                <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300" />
                            </div>
                        </Link>
                    ))}
                </ScrollArea>
            </div>
        </section >
    )
}
