"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FiPlus, FiCalendar } from "react-icons/fi"

export default function RoadmapPage() {
    const quarters = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"]
    const epics = [
        {
            id: 1,
            title: "Authentication Overhaul",
            status: "In Progress",
            startQ: 0,
            duration: 1,
            color: "bg-blue-500",
            team: "Backend"
        },
        {
            id: 2,
            title: "Kanban 2.0 Features",
            status: "Planning",
            startQ: 0,
            duration: 2,
            color: "bg-purple-500",
            team: "Frontend"
        },
        {
            id: 3,
            title: "Mobile App Launch",
            status: "Not Started",
            startQ: 2,
            duration: 1,
            color: "bg-green-500",
            team: "Mobile"
        },
        {
            id: 4,
            title: "Analytics Dashboard",
            status: "In Progress",
            startQ: 1,
            duration: 2,
            color: "bg-orange-500",
            team: "Data"
        }
    ]

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-6 gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Roadmap</h1>
                    <p className="text-muted-foreground mt-1">Strategic timeline and project milestones.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="2024">
                        <SelectTrigger className="w-[120px]">
                            <FiCalendar className="mr-2 h-4 w-4" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button>
                        <FiPlus className="mr-2 h-4 w-4" /> New Epic
                    </Button>
                </div>
            </div>

            <div className="flex-1 border rounded-lg overflow-hidden bg-background shadow-sm flex flex-col">
                {/* Header */}
                <div className="grid grid-cols-4 border-b bg-muted/40 divide-x">
                    {quarters.map((q) => (
                        <div key={q} className="p-4 text-center font-medium text-sm text-muted-foreground">
                            {q}
                        </div>
                    ))}
                </div>

                {/* Timeline Body */}
                <div className="flex-1 p-4 space-y-8 overflow-y-auto bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">

                    {epics.map((epic, index) => (
                        <div key={epic.id} className="relative h-12">
                            <div
                                className={`absolute h-10 rounded-md shadow-md ${epic.color} opacity-90 hover:opacity-100 transition-opacity cursor-pointer text-white px-4 flex items-center justify-between`}
                                style={{
                                    left: `${epic.startQ * 25}%`,
                                    width: `${epic.duration * 25}%`,
                                    top: 0
                                }}
                            >
                                <span className="font-semibold truncate mr-2">{epic.title}</span>
                                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-mono uppercase">
                                    {epic.team}
                                </span>
                            </div>
                        </div>
                    ))}

                    <div className="border-t pt-8 mt-8">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground px-4">
                            <span className="font-medium">Legend:</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-sm"></span> Backend</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-purple-500 rounded-sm"></span> Frontend</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-sm"></span> Mobile</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-500 rounded-sm"></span> Data</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
