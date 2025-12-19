"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { FiCheckCircle, FiCircle } from "react-icons/fi"

const quarters = [
    {
        name: "Q1 2025",
        status: "current",
        goals: [
            { title: "Core Platform Launch", progress: 75, status: "In Progress" },
            { title: "Mobile App Beta", progress: 40, status: "At Risk" },
            { title: "Marketing Campaign", progress: 90, status: "On Track" },
        ]
    },
    {
        name: "Q2 2025",
        status: "upcoming",
        goals: [
            { title: "Enterprise Features", progress: 0, status: "Planned" },
            { title: "API Documentation", progress: 10, status: "Started" },
            { title: "Partner Integration", progress: 0, status: "Planned" },
        ]
    },
    {
        name: "Q3 2025",
        status: "upcoming",
        goals: [
            { title: "Global Expansion", progress: 0, status: "Planned" },
            { title: "AI Assistant", progress: 0, status: "Research" },
        ]
    }
]

export default function RoadmapPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold tracking-tight">Product Roadmap</h1>
            <div className="space-y-6">
                {quarters.map((quarter, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-border/50 last:border-0">
                        <div className="absolute -left-[9px] top-0 flex items-center justify-center w-4 h-4 rounded-full bg-background border-2 border-primary">
                            {quarter.status === 'completed' ? <FiCheckCircle className="w-3 h-3 text-primary" /> : <FiCircle className="w-3 h-3 text-primary/50" />}
                        </div>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                {quarter.name}
                                {quarter.status === 'current' && <Badge>Current</Badge>}
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {quarter.goals.map((goal, gIndex) => (
                                    <Card key={gIndex}>
                                        <CardHeader className="p-4 pb-2">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-base">{goal.title}</CardTitle>
                                                <Badge variant={goal.status === 'At Risk' ? 'destructive' : goal.status === 'On Track' ? 'default' : 'secondary'}>
                                                    {goal.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-2">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs text-muted-foreground">
                                                    <span>Progress</span>
                                                    <span>{goal.progress}%</span>
                                                </div>
                                                <Progress value={goal.progress} className="h-2" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
