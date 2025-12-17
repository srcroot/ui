"use client"

import * as React from "react"
import { LuCalendar, LuUser, LuCreditCard, LuSettings, LuGlobe, LuPalette, LuCode, LuZap, LuShield, LuDatabase } from "react-icons/lu"

import { Combobox, ComboboxOption } from "@/components/ui/combobox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const frameworks: ComboboxOption[] = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "gatsby", label: "Gatsby" },
    { value: "solid-start", label: "SolidStart" },
    { value: "qwik", label: "Qwik City" },
]

const settingsOptions: ComboboxOption[] = [
    { value: "profile", label: "Profile", icon: LuUser },
    { value: "billing", label: "Billing", icon: LuCreditCard },
    { value: "settings", label: "LuSettings", icon: LuSettings },
    { value: "calendar", label: "LuCalendar", icon: LuCalendar },
]

const techStackOptions: ComboboxOption[] = [
    { value: "frontend", label: "Frontend", icon: LuGlobe },
    { value: "backend", label: "Backend", icon: LuDatabase },
    { value: "design", label: "Design System", icon: LuPalette },
    { value: "devops", label: "DevOps", icon: LuCode },
    { value: "security", label: "Security", icon: LuShield },
    { value: "performance", label: "Performance", icon: LuZap },
]

export function ComboboxDemo() {
    const [frameworkValue, setFrameworkValue] = React.useState<string | string[]>("")
    const [multiValue, setMultiValue] = React.useState<string | string[]>([])
    const [iconValue, setIconValue] = React.useState<string | string[]>("")
    const [multiIconValue, setMultiIconValue] = React.useState<string | string[]>([])

    return (
        <div className="flex flex-col gap-6">
            {/* Single Select */}
            <Card>
                <CardHeader>
                    <CardTitle>Single Select</CardTitle>
                    <CardDescription>
                        Basic combobox with search and single selection.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="framework">Framework</Label>
                        <Combobox
                            options={frameworks}
                            value={frameworkValue}
                            onValueChange={setFrameworkValue}
                            placeholder="Select framework..."
                            searchPlaceholder="Search frameworks..."
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Selected: <span className="font-medium text-foreground">{frameworkValue || "None"}</span>
                    </p>
                </CardContent>
            </Card>

            {/* Multi-Select */}
            <Card>
                <CardHeader>
                    <CardTitle>Multi-Select</CardTitle>
                    <CardDescription>
                        Select multiple options with tag-based display.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="multi-framework">Frameworks (select up to 5)</Label>
                        <Combobox
                            options={frameworks}
                            value={multiValue}
                            onValueChange={setMultiValue}
                            multiple
                            placeholder="Select frameworks..."
                            searchPlaceholder="Search frameworks..."
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Selected: <span className="font-medium text-foreground">{(multiValue as string[]).length > 0 ? (multiValue as string[]).join(", ") : "None"}</span>
                    </p>
                </CardContent>
            </Card>

            {/* With Icons - Single */}
            <Card>
                <CardHeader>
                    <CardTitle>With Icons</CardTitle>
                    <CardDescription>
                        Options and selected value display icons.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="settings">LuSettings Category</Label>
                        <Combobox
                            options={settingsOptions}
                            value={iconValue}
                            onValueChange={setIconValue}
                            placeholder="Select category..."
                            searchPlaceholder="Search categories..."
                        />
                    </div>
                </CardContent>
            </Card>

            {/* With Icons - Multi */}
            <Card>
                <CardHeader>
                    <CardTitle>Multi-Select with Icons</CardTitle>
                    <CardDescription>
                        Multiple selection with icons in tags and dropdown.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="tech-stack">Tech Stack Areas</Label>
                        <Combobox
                            options={techStackOptions}
                            value={multiIconValue}
                            onValueChange={setMultiIconValue}
                            multiple
                            placeholder="Select areas..."
                            searchPlaceholder="Search tech areas..."
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Disabled State */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Disabled State</CardTitle>
                    <CardDescription>
                        Combobox can be disabled to prevent interaction.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                        <Label className="text-muted-foreground">Disabled (empty)</Label>
                        <Combobox
                            options={frameworks}
                            placeholder="Select..."
                            disabled
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label className="text-muted-foreground">Disabled (with value)</Label>
                        <Combobox
                            options={frameworks}
                            value="next.js"
                            placeholder="Select..."
                            disabled
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
