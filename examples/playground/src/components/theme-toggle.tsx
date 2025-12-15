"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Toggle size="sm" aria-label="Toggle theme">
                <Sun className="h-4 w-4" />
            </Toggle>
        )
    }

    const isDark = theme === "dark"

    return (
        <Toggle
            size="sm"
            pressed={isDark}
            onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </Toggle>
    )
}

