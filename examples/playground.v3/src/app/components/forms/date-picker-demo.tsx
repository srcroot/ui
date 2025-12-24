"use client"

import * as React from "react"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function DatePickerDemo() {
    const [singleDate, setSingleDate] = React.useState<Date>()
    const [multipleDates, setMultipleDates] = React.useState<Date[]>([])
    const [rangeDate, setRangeDate] = React.useState<Date[]>([])
    const [dualRangeDate, setDualRangeDate] = React.useState<Date[]>([])

    // Format helpers for display
    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                <h3 className="font-semibold leading-none tracking-tight">Date Picker</h3>
                <p className="text-sm text-muted-foreground">Date pickers using the DatePicker component with various modes.</p>
            </div>
            <div className="p-6 space-y-6">

                {/* Single Date Picker */}
                <div className="grid gap-2">
                    <Label>Single Date</Label>
                    <DatePicker
                        mode="single"
                        selected={singleDate}
                        onSelect={setSingleDate}
                        placeholder="Pick a date"
                    />
                </div>

                <Separator />

                {/* Multiple Date Picker */}
                <div className="grid gap-2">
                    <Label>Multiple Dates</Label>
                    <DatePicker
                        mode="multiple"
                        selected={multipleDates}
                        onSelect={setMultipleDates}
                        placeholder="Pick dates"
                    />
                    {multipleDates.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                            {multipleDates.map(d => formatDate(d)).join(", ")}
                        </p>
                    )}
                </div>

                <Separator />

                {/* Range Date Picker */}
                <div className="grid gap-2">
                    <Label>Date Range</Label>
                    <DatePicker
                        mode="range"
                        selected={rangeDate}
                        onSelect={setRangeDate}
                        placeholder="Pick a date range"
                    />
                </div>

                <Separator />

                {/* Dual Month Range Picker */}
                <div className="grid gap-2">
                    <Label>Dual Month Range (Booking Style)</Label>
                    <DatePicker
                        mode="range"
                        numberOfMonths={2}
                        selected={dualRangeDate}
                        onSelect={setDualRangeDate}
                        placeholder="Select check-in → check-out"
                    />
                </div>

            </div>
        </div>
    )
}
