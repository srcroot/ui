"use client"

import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { data } from "@/lib/sidebar-data"
import React from "react"

export function DynamicBreadcrumb() {
    const pathname = usePathname()

    // Helper to find breadcrumb titles based on path
    const getBreadcrumbs = (path: string) => {
        const segments = path.split('/').filter(Boolean)
        const crumbs: { title: string; href?: string }[] = [
            { title: "Dashboard", href: "/" }
        ]

        if (segments.length === 0) return crumbs

        let currentPath = ""

        // Find matching navigation items
        for (const segment of segments) {
            currentPath += `/${segment}`

            // Search in navMain
            let found = false
            for (const item of data.navMain) {
                // Check top level items
                if (item.url === currentPath) {
                    crumbs.push({ title: item.title, href: item.url })
                    found = true
                    break
                }
                // Check nested items
                if (item.items) {
                    const subItem = item.items.find(sub => sub.url === currentPath)
                    if (subItem) {
                        // Add parent if not already added (though logic implies it might be skipped if we just jumped to subitem)
                        // In this specific nav structure, "Projects" is '#' so we can't really link to it, 
                        // but we should probably show it as text.
                        if (!crumbs.some(c => c.title === item.title)) {
                            crumbs.push({ title: item.title, href: item.url === '#' ? undefined : item.url })
                        }
                        crumbs.push({ title: subItem.title, href: subItem.url })
                        found = true
                        break
                    }
                }
            }

            // If not found in sidebar (e.g. details page), just capitalize segment
            if (!found) {
                const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
                crumbs.push({ title, href: currentPath })
            }
        }

        return crumbs
    }

    const breadcrumbs = getBreadcrumbs(pathname)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1

                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                                {isLast ? (
                                    <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                                ) : (
                                    crumb.href ? (
                                        <BreadcrumbLink href={crumb.href}>
                                            {crumb.title}
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                                    )
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator className={index === 0 ? "hidden md:block" : ""} />}
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
