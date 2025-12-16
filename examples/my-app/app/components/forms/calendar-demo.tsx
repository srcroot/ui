"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"

const sizes = ["xs", "default"] as const
const modes = ["single", "multiple", "range"] as const

export function CalendarDemo() {
    // State for each cell in the grid
    const [selections, setSelections] = React.useState<Record<string, Date | Date[] | undefined>>({})

    const getKey = (size: string, mode: string) => `${size}-${mode}`

    const handleSelect = (size: string, mode: string, value: any) => {
        setSelections(prev => ({ ...prev, [getKey(size, mode)]: value }))
    }

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                <h3 className="font-semibold leading-none tracking-tight">Calendar Grid</h3>
                <p className="text-sm text-muted-foreground">All size × mode combinations.</p>
            </div>
            <div className="p-6 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-2 text-left text-sm font-medium text-muted-foreground border-b">Size</th>
                            {modes.map(mode => (
                                <th key={mode} className="p-2 text-center text-sm font-medium text-muted-foreground border-b capitalize">
                                    {mode}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sizes.map(size => (
                            <tr key={size} className="border-b last:border-b-0">
                                <td className="p-4 align-top text-sm font-medium text-muted-foreground uppercase">
                                    {size}
                                </td>
                                {modes.map(mode => (
                                    <td key={mode} className="p-4 align-top">
                                        <Calendar
                                            mode={mode}
                                            size={size}
                                            selected={selections[getKey(size, mode)]}
                                            onSelect={(v: any) => handleSelect(size, mode, v)}
                                            className="border rounded-md shadow-sm mx-auto"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Separator />

            {/* Dual Month Grid */}
            <div className="p-6 space-y-4">
                <h4 className="text-sm font-medium leading-none">Dual Month View</h4>
                <p className="text-xs text-muted-foreground">Two months side-by-side for each mode.</p>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                {modes.map(mode => (
                                    <th key={mode} className="p-2 text-center text-sm font-medium text-muted-foreground border-b capitalize">
                                        {mode}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {modes.map(mode => (
                                    <td key={mode} className="p-4 align-top">
                                        <Calendar
                                            mode={mode}
                                            numberOfMonths={2}
                                            size="default"
                                            selected={selections[getKey("dual", mode)]}
                                            onSelect={(v: any) => handleSelect("dual", mode, v)}
                                            className="border rounded-md shadow-sm"
                                        />
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
