"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

const data = [
    {
        name: "Jan",
        total: 2400,
        completed: 1400,
    },
    {
        name: "Feb",
        total: 1398,
        completed: 1000,
    },
    {
        name: "Mar",
        total: 9800,
        completed: 8500,
    },
    {
        name: "Apr",
        total: 3908,
        completed: 2000,
    },
    {
        name: "May",
        total: 4800,
        completed: 3000,
    },
    {
        name: "Jun",
        total: 3800,
        completed: 3200,
    },
    {
        name: "Jul",
        total: 4300,
        completed: 4000,
    },
]

export default function ReportsPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold tracking-tight">Analytics & Reports</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 justify-between flex flex-col">
                    <CardHeader>
                        <CardTitle>Task Completion Velocity</CardTitle>
                        <CardDescription>
                            Comparing total tasks vs completed over time.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                        <div className="h-[300px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} /> {/* Cyan-500 */}
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} /> {/* Emerald-500 */}
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="total" stroke="#06b6d4" fillOpacity={1} fill="url(#colorTotal)" />
                                    <Area type="monotone" dataKey="completed" stroke="#10b981" fillOpacity={1} fill="url(#colorCompleted)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-4 lg:col-span-3 flex flex-col">
                    <CardHeader>
                        <CardTitle>Productivity by Month</CardTitle>
                        <CardDescription>
                            Monthly task throughput.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                        <div className="h-[300px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <BarChart data={data}>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "transparent" }}
                                        contentStyle={{ backgroundColor: "hsl(var(--popover))", borderColor: "hsl(var(--border))", color: "hsl(var(--popover-foreground))" }}
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="#f97316" // Orange-500
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
