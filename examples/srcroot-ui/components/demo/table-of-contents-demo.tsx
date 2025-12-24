"use client"

import * as React from "react"
import { TableOfContents, type HeadingInfo } from "@/components/ui/table-of-contents"

const headings: HeadingInfo[] = [
    {
        id: "introduction",
        text: "Introduction",
        level: 1,
    },
    {
        id: "installation",
        text: "Installation",
        level: 1,
        children: [
            {
                id: "cli",
                text: "CLI",
                level: 2,
            },
            {
                id: "manual",
                text: "Manual",
                level: 2,
            },
        ],
    },
    {
        id: "usage",
        text: "Usage",
        level: 1,
    },
    {
        id: "api",
        text: "API Reference",
        level: 1,
        children: [
            {
                id: "props",
                text: "Props",
                level: 2,
            },
        ],
    },
]

export default function TableOfContentsDemo() {
    const [activeSection, setActiveSection] = React.useState<string>("introduction")

    React.useEffect(() => {
        const handleScroll = () => {
            const sections = headings.flatMap(h => [h, ...(h.children || [])])
            for (const section of sections) {
                const element = document.getElementById(section.id)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top >= 0 && rect.top <= 200) {
                        setActiveSection(section.id)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="flex gap-8 relative max-w-4xl mx-auto w-full">
            <div className="flex-1 space-y-12 pb-32">
                <section id="introduction" className="space-y-4">
                    <h1 className="text-3xl font-bold">Introduction</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        The Table of Contents component provides a navigation menu for long documents.
                        It automatically highlights the active section as you scroll.
                    </p>
                    <div className="h-64 bg-muted/30 rounded-lg p-6">
                        Placeholder content for Introduction...
                    </div>
                </section>

                <section id="installation" className="space-y-4">
                    <h1 className="text-3xl font-bold">Installation</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        You can install this component via the CLI or manually copy the code.
                    </p>

                    <div id="cli" className="space-y-2 pl-4 border-l-2">
                        <h2 className="text-xl font-semibold">CLI</h2>
                        <div className="bg-zinc-950 text-zinc-50 p-4 rounded-md font-mono text-sm">
                            npx @srcroot/ui add table-of-contents
                        </div>
                    </div>

                    <div id="manual" className="space-y-2 pl-4 border-l-2">
                        <h2 className="text-xl font-semibold">Manual</h2>
                        <p className="text-muted-foreground">
                            Copy the code from the documentation into your project.
                        </p>
                    </div>
                </section>

                <section id="usage" className="space-y-4">
                    <h1 className="text-3xl font-bold">Usage</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        Import the component and pass the headings data as props.
                    </p>
                    <div className="h-48 bg-muted/30 rounded-lg p-6">
                        Usage examples...
                    </div>
                </section>

                <section id="api" className="space-y-4">
                    <h1 className="text-3xl font-bold">API Reference</h1>

                    <div id="props" className="space-y-2 pl-4 border-l-2">
                        <h2 className="text-xl font-semibold">Props</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2">Prop</th>
                                        <th className="py-2">Type</th>
                                        <th className="py-2">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-2 font-mono">headings</td>
                                        <td className="py-2 font-mono">HeadingInfo[]</td>
                                        <td className="py-2">Array of heading objects</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 font-mono">activeSection</td>
                                        <td className="py-2 font-mono">string</td>
                                        <td className="py-2">ID of currently active section</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>

            <div className="w-64 hidden lg:block">
                <TableOfContents
                    headings={headings}
                    activeSection={activeSection}
                />
            </div>
        </div>
    )
}
