"use client"

import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ComposedChart,
    Label,
    Line,
    LineChart,
    Pie,
    PieChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    RadialBar,
    RadialBarChart,
    Scatter,
    ScatterChart,
    Treemap,
    XAxis,
    YAxis,
    ZAxis,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", desktop: 186, mobile: 80, other: 45 },
    { month: "February", desktop: 305, mobile: 200, other: 100 },
    { month: "March", desktop: 237, mobile: 120, other: 150 },
    { month: "April", desktop: 73, mobile: 190, other: 50 },
    { month: "May", desktop: 209, mobile: 130, other: 80 },
    { month: "June", desktop: 214, mobile: 140, other: 160 },
]

const pieChartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const pieChartData01 = [
    { name: "Group A", value: 400, fill: "var(--color-desktop)" },
    { name: "Group B", value: 300, fill: "var(--color-mobile)" },
    { name: "Group C", value: 300, fill: "var(--color-chrome)" },
    { name: "Group D", value: 200, fill: "var(--color-safari)" },
]

const pieChartData02 = [
    { name: "A1", value: 100, fill: "var(--color-desktop)" },
    { name: "A2", value: 300, fill: "var(--color-desktop)" },
    { name: "B1", value: 100, fill: "var(--color-mobile)" },
    { name: "B2", value: 80, fill: "var(--color-mobile)" },
    { name: "B3", value: 40, fill: "var(--color-mobile)" },
    { name: "B4", value: 30, fill: "var(--color-mobile)" },
    { name: "B5", value: 50, fill: "var(--color-mobile)" },
    { name: "C1", value: 100, fill: "var(--color-chrome)" },
    { name: "C2", value: 200, fill: "var(--color-chrome)" },
    { name: "D1", value: 150, fill: "var(--color-safari)" },
    { name: "D2", value: 50, fill: "var(--color-safari)" },
]

const radarData = [
    { subject: "Math", A: 120, B: 110, fullMark: 150 },
    { subject: "Chinese", A: 98, B: 130, fullMark: 150 },
    { subject: "English", A: 86, B: 130, fullMark: 150 },
    { subject: "Geography", A: 99, B: 100, fullMark: 150 },
    { subject: "Physics", A: 85, B: 90, fullMark: 150 },
    { subject: "History", A: 65, B: 85, fullMark: 150 },
]

const radialData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const scatterData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
]

const treemapData = [
    {
        name: "axis",
        children: [
            { name: "Axes", size: 1302 },
            { name: "Axis", size: 24593 },
            { name: "AxisGridLine", size: 652 },
            { name: "AxisLabel", size: 636 },
            { name: "CartesianAxes", size: 6703 },
        ],
    },
    {
        name: "controls",
        children: [
            { name: "AnchorControl", size: 2138 },
            { name: "ClickControl", size: 3824 },
            { name: "Control", size: 1353 },
            { name: "ControlList", size: 4665 },
            { name: "DragControl", size: 2649 },
            { name: "ExpandControl", size: 2832 },
            { name: "HoverControl", size: 4896 },
            { name: "IControl", size: 763 },
            { name: "PanZoomControl", size: 5222 },
            { name: "SelectionControl", size: 7862 },
            { name: "TooltipControl", size: 8435 },
        ],
    },
    {
        name: "data",
        children: [
            { name: "Data", size: 20544 },
            { name: "DataList", size: 19788 },
            { name: "DataSprite", size: 10349 },
            { name: "EdgeSprite", size: 3301 },
            { name: "NodeSprite", size: 19382 },
            { name: "ScaleBinding", size: 11275 },
            { name: "Tree", size: 7147 },
            { name: "TreeBuilder", size: 9930 },
        ],
    },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
    chrome: {
        label: "Chrome",
        color: "#E63946",
    },
    safari: {
        label: "Safari",
        color: "#457B9D",
    },
    firefox: {
        label: "Firefox",
        color: "#D62828", // Deep Red
    },
    edge: {
        label: "Edge",
        color: "#FCBF49", // Yellow
    },
    other: {
        label: "Other",
        color: "#003049", // Navy
    },
} satisfies ChartConfig

export default function ChartsPage() {
    return (
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {/* --- Bar Charts --- */}
            <Card>
                <CardHeader>
                    <CardTitle>Bar Chart - Default</CardTitle>
                    <CardDescription>Multiple entries</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Bar Chart - Stacked</CardTitle>
                    <CardDescription>Stacked entries</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Bar Chart - Horizontal</CardTitle>
                    <CardDescription>Horizontal layout</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: -20 }}>
                            <XAxis type="number" dataKey="desktop" hide />
                            <YAxis
                                dataKey="month"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* --- Line Charts --- */}
            <Card>
                <CardHeader>
                    <CardTitle>Line Chart - Natural</CardTitle>
                    <CardDescription>Natural curve</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                            <Line dataKey="mobile" type="natural" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Line Chart - Linear</CardTitle>
                    <CardDescription>Linear interpolation</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Line dataKey="desktop" type="linear" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                            <Line dataKey="mobile" type="linear" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Line Chart - Step</CardTitle>
                    <CardDescription>Step interpolation</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Line dataKey="desktop" type="step" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                            <Line dataKey="mobile" type="step" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>


            {/* --- Area Charts --- */}
            <Card>
                <CardHeader>
                    <CardTitle>Area Chart - Stacked</CardTitle>
                    <CardDescription>Stacked areas</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Area dataKey="mobile" type="natural" fill="var(--color-mobile)" fillOpacity={0.4} stroke="var(--color-mobile)" stackId="a" />
                            <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" stackId="a" />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Area Chart - Gradient</CardTitle>
                    <CardDescription>Gradient fill</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <defs>
                                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Area
                                dataKey="desktop"
                                type="natural"
                                fill="url(#fillDesktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Area Chart - Percent</CardTitle>
                    <CardDescription>Percent stacked</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                            stackOffset="expand"
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Area
                                dataKey="mobile"
                                type="natural"
                                fill="var(--color-mobile)"
                                fillOpacity={0.4}
                                stroke="var(--color-mobile)"
                                stackId="a"
                            />
                            <Area
                                dataKey="desktop"
                                type="natural"
                                fill="var(--color-desktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* --- Pie Charts --- */}
            <Card>
                <CardHeader>
                    <CardTitle>Pie Chart - Donut</CardTitle>
                    <CardDescription>Donut variant</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie data={pieChartData} dataKey="visitors" nameKey="browser" innerRadius={60}>
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {pieChartData.reduce((acc, curr) => acc + curr.visitors, 0).toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground text-xs"
                                                    >
                                                        Visitors
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                            <ChartLegend content={<ChartLegendContent />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center" />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Pie Chart - Label</CardTitle>
                    <CardDescription>Custom labels</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <Pie data={pieChartData} dataKey="visitors" label nameKey="browser" />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Pie Chart - Two Level</CardTitle>
                    <CardDescription>Two levels variant</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                        <PieChart>
                            <Pie data={pieChartData01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="var(--color-desktop)" />
                            <Pie data={pieChartData02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="var(--color-mobile)" label />
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>


            {/* --- Other Charts --- */}
            <Card>
                <CardHeader>
                    <CardTitle>Radar Chart</CardTitle>
                    <CardDescription>Multiple variables</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                        <RadarChart data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} />
                            <Radar name="A" dataKey="A" stroke="var(--color-desktop)" fill="var(--color-desktop)" fillOpacity={0.6} />
                            <Radar name="B" dataKey="B" stroke="var(--color-mobile)" fill="var(--color-mobile)" fillOpacity={0.6} />
                            <ChartLegend content={<ChartLegendContent />} />
                        </RadarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Radial Bar Chart</CardTitle>
                    <CardDescription>Browser Usage</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                        <RadialBarChart innerRadius="10%" outerRadius="80%" barSize={10} data={radialData}>
                            <RadialBar
                                label={{ position: 'insideStart', fill: '#fff' }}
                                background
                                dataKey="visitors"
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        </RadialBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Scatter Chart</CardTitle>
                    <CardDescription>Distribution with Z-Axis size</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <ScatterChart margin={{ left: 12, right: 12 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                            <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                            <ZAxis type="number" dataKey="z" range={[50, 400]} name="score" unit="km" />
                            <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                            <Scatter name="A school" data={scatterData} fill="var(--color-desktop)" />
                        </ScatterChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Composed Chart</CardTitle>
                    <CardDescription>Bar & Line</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <ComposedChart data={chartData} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} barSize={20} />
                            <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} />
                        </ComposedChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Composed - All</CardTitle>
                    <CardDescription>Line + Bar + Area</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <ComposedChart data={chartData} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Area type="natural" dataKey="mobile" fill="var(--color-mobile)" fillOpacity={0.2} stroke="var(--color-mobile)" />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} barSize={20} />
                            <Line type="monotone" dataKey="visitors" stroke="var(--color-chrome)" strokeWidth={2} dot={{ r: 4 }} />
                        </ComposedChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Composed - Scatter</CardTitle>
                    <CardDescription>Bar + Line + Scatter</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <ComposedChart data={chartData} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} barSize={20} />
                            <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} />
                            <Scatter dataKey="other" fill="var(--color-chrome)" />
                        </ComposedChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader>
                    <CardTitle>Treemap</CardTitle>
                    <CardDescription>Hierarchical data</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="w-full h-[400px]">
                        <Treemap
                            data={treemapData}
                            dataKey="size"
                            aspectRatio={4 / 3}
                            stroke="#fff"
                            fill="var(--color-desktop)"
                        >
                            <ChartTooltip content={<ChartTooltipContent />} />
                        </Treemap>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
