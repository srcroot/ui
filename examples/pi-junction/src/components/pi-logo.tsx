import React from "react"

export function PiLogo({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Top bar */}
            <path d="M15 30H85" />

            {/* Left leg with curve */}
            <path d="M35 30V75C35 80 30 85 25 85" />

            {/* Right leg with curve at bottom */}
            <path d="M65 30V75C65 78 67 80 70 80H75" />

            {/* Decorative dot or tech accent */}
            <circle cx="85" cy="30" r="4" fill="currentColor" stroke="none" />
            <circle cx="15" cy="30" r="4" fill="currentColor" stroke="none" />
        </svg>
    )
}
