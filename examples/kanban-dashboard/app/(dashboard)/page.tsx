"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    FiActivity,
    FiCheckCircle,
    FiClock,
    FiTrendingUp,
    FiFileText,
} from "react-icons/fi"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { DatePicker } from "@/components/ui/date-picker"
import { Button } from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useState } from "react"
import { addDays } from "date-fns"

export default function DashboardPage() {
    const [date, setDate] = useState<Date[]>([
        new Date(2023, 0, 20),
        addDays(new Date(2023, 0, 20), 20),
    ])

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <div className="flex items-center space-x-2">
                    <DatePicker
                        mode="range"
                        numberOfMonths={2}
                        selected={date as any}
                        onSelect={setDate as any}
                        className="w-[260px]"
                    />
                    <Button>
                        <FiFileText className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <FiTrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Subscriptions
                        </CardTitle>
                        <FiActivity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <FiCheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Now
                        </CardTitle>
                        <FiClock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                        <CardDescription>
                            Your team's velocity over the last 30 days.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <OverviewChart />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="https://placehold.co/400x400/orange/white?text=OM" alt="Avatar" />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                    <p className="text-sm text-muted-foreground">
                                        olivia.martin@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+$1,999.00</div>
                            </div>
                            <div className="flex items-center">
                                {/* <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                                    <AvatarImage src="https://placehold.co/400x400/orange/white?text=JL" alt="Avatar" />
                                    <AvatarFallback>JL</AvatarFallback>
                                </Avatar> */}
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Jackson Lee</p>
                                    <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$39.00</div>
                            </div>
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="https://placehold.co/400x400/orange/white?text=IN" alt="Avatar" />
                                    <AvatarFallback>IN</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                                    <p className="text-sm text-muted-foreground">
                                        isabella.nguyen@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+$299.00</div>
                            </div>
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="https://placehold.co/400x400/orange/white?text=WK" alt="Avatar" />
                                    <AvatarFallback>WK</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">William Kim</p>
                                    <p className="text-sm text-muted-foreground">will@email.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$99.00</div>
                            </div>
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="https://placehold.co/400x400/orange/white?text=SD" alt="Avatar" />
                                    <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Sofia Davis</p>
                                    <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$39.00</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
