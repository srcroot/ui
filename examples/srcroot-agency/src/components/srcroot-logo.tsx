import { useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export const SrcRootLogo = ({ className }: { className?: string }) => {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Prevent hydration mismatch by rendering a placeholder or default until mounted
    if (!mounted) {
        return (
            <div className={cn("relative flex items-center justify-center select-none", className)}>
                <div style={{ width: 100, height: 100 }} /> {/* Layout placeholder */}
            </div>
        )
    }

    const isDark = theme === "dark" || resolvedTheme === "dark"
    const logoSrc = isDark ? "/srcroot-dark.png" : "/srcroot-light.png"

    return (
        <div className={cn("relative flex items-center justify-center select-none", className)}>
            <Image
                src={logoSrc}
                alt="SrcRoot Logo"
                width={100}
                height={100}
                className="object-contain"
                priority
            />
        </div>
    )
}
