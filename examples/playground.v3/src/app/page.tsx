"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    LuType,
    LuMousePointerClick,
    LuInbox,
    LuLayoutTemplate,
    LuDatabase,
    LuLayers,
    LuNavigation,
    LuSparkles,
    LuZap,
    LuShield,
    LuPalette,
    LuCode,
    LuPackage,
    LuArrowRight,
    LuGithub,
    LuExternalLink
} from "react-icons/lu"
import Link from "next/link"

const categories = [
    { title: "Typography", icon: LuType, href: "/components/typography", count: 6 },
    { title: "Buttons", icon: LuMousePointerClick, href: "/components/buttons", count: 8 },
    { title: "Forms", icon: LuInbox, href: "/components/forms", count: 15 },
    { title: "Layout", icon: LuLayoutTemplate, href: "/components/layout", count: 5 },
    { title: "Data Display", icon: LuDatabase, href: "/components/data-display", count: 10 },
    { title: "Overlays", icon: LuLayers, href: "/components/overlays", count: 7 },
    { title: "LuNavigation", icon: LuNavigation, href: "/components/navigation", count: 4 },
]

const features = [
    {
        icon: LuPalette,
        title: "Beautifully Designed",
        description: "Crafted with attention to detail and modern aesthetics.",
    },
    {
        icon: LuCode,
        title: "Developer Friendly",
        description: "Clean, readable code with TypeScript support.",
    },
    {
        icon: LuZap,
        title: "Blazing Fast",
        description: "Optimized for performance with minimal bundle size.",
    },
    {
        icon: LuShield,
        title: "Accessible",
        description: "WAI-ARIA compliant with keyboard navigation.",
    },
]

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                <div className="relative px-6 py-16 lg:py-24">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <Badge variant="secondary" className="px-4 py-1.5">
                            <LuSparkles className="h-3.5 w-3.5 mr-2" />
                            v1.0.0 — Production Ready
                        </Badge>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text">
                            Build faster with
                            <span className="block text-primary">@srcroot/ui</span>
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            A comprehensive collection of 50+ beautifully designed, accessible components
                            built with React and Tailwind CSS.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center pt-4">
                            <Link href="/components/buttons">
                                <Button size="lg" className="gap-2">
                                    Get Started
                                    <LuArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="gap-2">
                                <LuGithub className="h-4 w-4" />
                                View on GitHub
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Separator />

            {/* Stats Section */}
            <section className="px-6 py-12 bg-muted/30">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-primary">50+</div>
                            <div className="text-sm text-muted-foreground">Components</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">7</div>
                            <div className="text-sm text-muted-foreground">Categories</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">100%</div>
                            <div className="text-sm text-muted-foreground">TypeScript</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">A11y</div>
                            <div className="text-sm text-muted-foreground">Accessible</div>
                        </div>
                    </div>
                </div>
            </section>

            <Separator />

            {/* Features Grid */}
            <section className="px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold mb-2">Why @srcroot/ui?</h2>
                        <p className="text-muted-foreground">Everything you need to build modern interfaces.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow"
                            >
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <feature.icon className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-1">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Separator />

            {/* Component Categories */}
            <section className="px-6 py-16 bg-muted/20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold mb-2">Explore Components</h2>
                        <p className="text-muted-foreground">Browse our collection by category.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <Link key={category.title} href={category.href}>
                                <div className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 hover:border-primary/50 transition-all cursor-pointer group">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                        <category.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium">{category.title}</div>
                                        <div className="text-sm text-muted-foreground">{category.count} components</div>
                                    </div>
                                    <LuArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Install */}
            <section className="px-6 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <LuPackage className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Quick Install</span>
                    </div>
                    <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-sm mb-6">
                        <code>npx @srcroot/ui init</code>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Copy and paste components into your project. No dependencies, no lock-in.
                    </p>
                </div>
            </section>
        </div>
    )
}