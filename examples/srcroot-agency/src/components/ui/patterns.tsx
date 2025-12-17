import React from "react"
import { cn } from "@/lib/utils"

export const CircuitPattern = ({ className }: { className?: string }) => {
    return (
        <div className={cn("absolute inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden", className)}>
            <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M10 10 H30 V30 H10 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="20" cy="20" r="2" fill="currentColor" />
                        <path d="M30 20 H50 V10 H70" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="70" cy="10" r="2" fill="currentColor" />
                        <path d="M50 50 V70 H30" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="30" cy="70" r="2" fill="currentColor" />
                        <path d="M80 80 H60 V60" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="60" cy="60" r="2" fill="currentColor" />
                        {/* Added complexity */}
                        <path d="M20 30 V50 H10" fill="none" stroke="currentColor" strokeWidth="1" />
                        <rect x="8" y="48" width="4" height="4" fill="currentColor" />
                        <path d="M70 10 V30 H80" fill="none" stroke="currentColor" strokeWidth="1" />
                        <path d="M60 60 V40 H80" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="80" cy="40" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
                        <path d="M10 90 H40 V80" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="40" cy="80" r="2" fill="currentColor" />
                    </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>
        </div>
    )
}

export const GridPattern = ({ className }: { className?: string }) => {
    return (
        <div className={cn("absolute inset-0 z-0 opacity-[0.05] pointer-events-none", className)}>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
        </div>
    )
}

export const WavePattern = ({ className }: { className?: string }) => {
    return (
        <div className={cn("absolute inset-0 z-0  bg-muted/40 opacity-10 pointer-events-none overflow-hidden", className)}>
            <svg className="w-full h-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path fill="currentColor" fillOpacity="0.2" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
            </svg>
        </div>
    )
}
