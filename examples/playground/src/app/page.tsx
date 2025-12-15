"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// IMPORTS
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Text } from "@/components/ui/text"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio"
import { Switch } from "@/components/ui/switch"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@/components/ui/dropdown-menu"
import { Toast, ToastTitle, ToastDescription, ToastAction } from "@/components/ui/toast"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination"
import { LoadingSpinner, LoadingOverlay } from "@/components/ui/loading-spinner"
import { Image } from "@/components/ui/image"
import { ButtonGroup } from "@/components/ui/button-group"
import { OtpInput } from "@/components/ui/otp-input"
import { Search } from "@/components/ui/search"
import { Calendar } from "@/components/ui/calendar"
import { StarRating } from "@/components/ui/star-rating"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import SidebarDemo from "@/components/sidebar-demo"
import { User, Mail, Calendar as CalendarIcon, CreditCard, Settings, LogOut, Plus, ChevronRight, MoreHorizontal, Bell, Check } from "lucide-react"

// Helper for Sections
function ShowcaseSection({ id, title, children, className }: { id: string, title: string, children: React.ReactNode, className?: string }) {
    return (
        <section id={id} className={cn("scroll-mt-20 space-y-6", className)}>
            <div className="flex items-center gap-4 pb-2 border-b">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <a href={`#${id}`} className="text-muted-foreground hover:text-primary text-sm">#</a>
            </div>
            <div className="grid gap-6">
                {children}
            </div>
        </section>
    )
}

function ComponentBlock({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
            <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    )
}

export default function ShowcasePage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [range, setRange] = React.useState<Date[]>([])
    const [volume, setVolume] = React.useState([50])
    const [showToast, setShowToast] = React.useState(false)
    const [rating, setRating] = React.useState(4)
    const [otp, setOtp] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const sections = [
        { id: "typography", title: "Typography" },
        { id: "buttons", title: "Buttons & Actions" },
        { id: "forms", title: "Forms & Controls" },
        { id: "layout", title: "Layout & Structure" },
        { id: "data", title: "Data Display" },
        { id: "overlays", title: "Overlays & Feedback" },
        { id: "navigation", title: "Navigation" },
    ]

    return (
        <TooltipProvider>
            <div className="flex min-h-screen bg-background">
                {/* SIDEBAR */}
                <aside className="hidden lg:block w-64 fixed top-0 left-0 h-screen overflow-y-auto border-r bg-muted/10 p-6 z-10">
                    <div className="mb-8">
                        <h1 className="text-xl font-bold">@srcroot/ui</h1>
                        <p className="text-sm text-muted-foreground">Kitchen Sink</p>
                    </div>
                    <nav className="space-y-1">
                        {sections.map(section => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                            >
                                {section.title}
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 lg:ml-64 p-8 md:p-12 max-w-7xl mx-auto space-y-20">

                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Component Showcase</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            A complete demonstration of all 40 polymorphic components, featuring all variants, states, and capabilities.
                        </p>
                        <div className="flex gap-4">
                            <Button onClick={() => window.open('https://github.com/srcroot/ui', '_blank')}>Documentation</Button>
                            <Button variant="outline">Install CLI</Button>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    {/* TYPOGRAPHY */}
                    <ShowcaseSection id="typography" title="Typography">
                        <ComponentBlock title="Headings & Text">
                            <div className="space-y-4">
                                <Text as="h1" variant="h1">Display Heading 1</Text>
                                <Text as="h2" variant="h2">Display Heading 2</Text>
                                <Text as="h3" variant="h3">Display Heading 3</Text>
                                <Text as="h4" variant="h4">Display Heading 4</Text>
                                <Separator />
                                <Text variant="lead">
                                    A modal dialog that interrupts the user with important content and expects a response.
                                </Text>
                                <Text>
                                    The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.
                                </Text>
                                <Text variant="muted">
                                    Enter your email address to subscribe to our newsletter.
                                </Text>
                                <Text variant="small">
                                    &copy; 2024 ReLab Inc. All rights reserved.
                                </Text>
                                <Text variant="code">
                                    npx @srcroot/ui add button
                                </Text>
                            </div>
                        </ComponentBlock>
                    </ShowcaseSection>

                    {/* BUTTONS */}
                    <ShowcaseSection id="buttons" title="Buttons & Actions">
                        <div className="grid md:grid-cols-2 gap-6">
                            <ComponentBlock title="Variants">
                                <div className="flex flex-wrap gap-4">
                                    <Button>Default</Button>
                                    <Button variant="secondary">Secondary</Button>
                                    <Button variant="destructive">Destructive</Button>
                                    <Button variant="outline">Outline</Button>
                                    <Button variant="ghost">Ghost</Button>
                                    <Button variant="link">Link</Button>
                                </div>
                            </ComponentBlock>

                            <ComponentBlock title="Button Group">
                                <div className="space-y-4">
                                    <ButtonGroup>
                                        <Button variant="outline">Edit</Button>
                                        <Button variant="outline">Save</Button>
                                        <Button variant="outline">Publish</Button>
                                    </ButtonGroup>
                                    <ButtonGroup attached={false}>
                                        <Button>Accept</Button>
                                        <Button variant="secondary">Decline</Button>
                                    </ButtonGroup>
                                </div>
                            </ComponentBlock>
                        </div>
                    </ShowcaseSection>

                    {/* FORMS */}
                    <ShowcaseSection id="forms" title="Forms & Controls">
                        <div className="grid lg:grid-cols-2 gap-6">
                            <ComponentBlock title="Text Inputs">
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" placeholder="name@example.com" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Disabled</Label>
                                        <Input disabled placeholder="Cannot type here" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>File Input</Label>
                                        <Input type="file" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Message</Label>
                                        <Textarea placeholder="Type your message..." />
                                    </div>
                                </div>
                            </ComponentBlock>

                            <ComponentBlock title="Specialized Inputs">
                                <div className="space-y-6">
                                    <div className="grid gap-2">
                                        <Label>Search</Label>
                                        <Search placeholder="Search users..." showClear />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>OTP Verification</Label>
                                        <OtpInput value={otp} onChange={setOtp} length={6} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Star Rating ({rating})</Label>
                                        <StarRating value={rating} onValueChange={setRating} />
                                    </div>
                                </div>
                            </ComponentBlock>

                            <ComponentBlock title="Selection">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="notifications" />
                                            <Label htmlFor="notifications">Notifications</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="terms" />
                                            <Label htmlFor="terms">Accept terms</Label>
                                        </div>
                                    </div>
                                    <Separator />
                                    <RadioGroup defaultValue="card">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="card" id="card" />
                                            <Label htmlFor="card">Card</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="paypal" id="paypal" />
                                            <Label htmlFor="paypal">Paypal</Label>
                                        </div>
                                    </RadioGroup>
                                    <Separator />
                                    <div className="grid gap-2">
                                        <Label>Select</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a timezone" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="utc">UTC</SelectItem>
                                                <SelectItem value="est">EST</SelectItem>
                                                <SelectItem value="pst">PST</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Slider ({volume}%)</Label>
                                        <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
                                    </div>
                                </div>
                            </ComponentBlock>

                            <ComponentBlock title="Calendar">
                                <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
                                    <div className="grid gap-2">
                                        <Label>Date Picker</Label>
                                        <Calendar mode="single" selected={date} onSelect={(d: any) => setDate(d)} className="border rounded-md shadow" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Range Picker</Label>
                                        <Calendar mode="range" selected={range} onSelect={(r: any) => setRange(r)} className="border rounded-md shadow" />
                                    </div>
                                </div>
                            </ComponentBlock>
                        </div>
                    </ShowcaseSection>

                    {/* LAYOUT */}
                    <ShowcaseSection id="layout" title="Layout & Structure">
                        <div className="grid md:grid-cols-2 gap-6">
                            <ComponentBlock title="Cards">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Create project</CardTitle>
                                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-2">
                                            <Label>Name</Label>
                                            <Input placeholder="Name of your project" />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="ghost">Cancel</Button>
                                        <Button>Deploy</Button>
                                    </CardFooter>
                                </Card>
                            </ComponentBlock>

                            <ComponentBlock title="Aspect Ratio">
                                <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                                    16:9 Aspect Ratio
                                </AspectRatio>
                            </ComponentBlock>

                            <ComponentBlock title="Separators" className="col-span-2">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium leading-none">Radix Primitives</div>
                                    <div className="text-sm text-muted-foreground">An open-source UI component library.</div>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex h-5 items-center space-x-4 text-sm">
                                    <span>Blog</span>
                                    <Separator orientation="vertical" />
                                    <span>Docs</span>
                                    <Separator orientation="vertical" />
                                    <span>Source</span>
                                </div>
                            </ComponentBlock>

                            <ComponentBlock title="Sidebar" className="col-span-2">
                                <SidebarDemo />
                            </ComponentBlock>
                        </div>
                    </ShowcaseSection>

                    {/* DATA DISPLAY */}
                    <ShowcaseSection id="data" title="Data Display">
                        <div className="grid gap-6">
                            <ComponentBlock title="Table">
                                <Table>
                                    <TableCaption>A list of your recent invoices.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Invoice</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Method</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">INV-001</TableCell>
                                            <TableCell><Badge variant="secondary">Paid</Badge></TableCell>
                                            <TableCell>Credit Card</TableCell>
                                            <TableCell className="text-right">$250.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">INV-002</TableCell>
                                            <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                                            <TableCell>PayPal</TableCell>
                                            <TableCell className="text-right">$150.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ComponentBlock>

                            <div className="grid md:grid-cols-2 gap-6">
                                <ComponentBlock title="Accordion">
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger>Is it styled?</AccordionTrigger>
                                            <AccordionContent>Yes. It comes with default styles that matches the other components.</AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </ComponentBlock>

                                <ComponentBlock title="Collapsible">
                                    <Collapsible>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="outline" className="w-full justify-between">
                                                Can I use this in my project?
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="px-4 py-2 text-muted-foreground">
                                            Yes. Free to use for personal and commercial projects.
                                        </CollapsibleContent>
                                    </Collapsible>
                                </ComponentBlock>
                            </div>

                            <ComponentBlock title="Carousel">
                                <Carousel className="w-full max-w-sm mx-auto">
                                    <CarouselContent>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                                            <span className="text-4xl font-semibold">{index + 1}</span>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </ComponentBlock>

                            <ComponentBlock title="Image & Loading">
                                <div className="flex gap-8 items-start">
                                    <div className="space-y-4">
                                        <Label>Enhanced Image</Label>
                                        <div className="w-40">
                                            <Image src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" aspectRatio={1} rounded="md" />
                                        </div>
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <Label>Progress & Skeletons</Label>
                                        <Progress value={33} />
                                        <div className="flex items-center space-x-4">
                                            <Skeleton className="h-12 w-12 rounded-full" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-[250px]" />
                                                <Skeleton className="h-4 w-[200px]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ComponentBlock>
                        </div>
                    </ShowcaseSection>

                    {/* OVERLAYS */}
                    <ShowcaseSection id="overlays" title="Overlays & Feedback">
                        <div className="grid md:grid-cols-3 gap-6">
                            <ComponentBlock title="Dialogs">
                                <div className="flex flex-col gap-4">
                                    <Dialog>
                                        <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit profile</DialogTitle>
                                                <DialogDescription>Make changes to your profile here.</DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">Name</Label>
                                                    <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Save changes</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild><Button variant="outline">Open Alert</Button></AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                    <Sheet>
                                        <SheetTrigger asChild><Button variant="outline">Open Sheet</Button></SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                                <SheetTitle>Sheet Overlay</SheetTitle>
                                                <SheetDescription>This is a side panel overlay.</SheetDescription>
                                            </SheetHeader>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </ComponentBlock>

                            <ComponentBlock title="Popovers & Tooltips">
                                <div className="flex flex-col gap-4">
                                    <Popover>
                                        <PopoverTrigger asChild><Button variant="outline">Open Popover</Button></PopoverTrigger>
                                        <PopoverContent>Place content for the popover here.</PopoverContent>
                                    </Popover>

                                    <Tooltip>
                                        <TooltipTrigger asChild><Button variant="outline">Hover Tooltip</Button></TooltipTrigger>
                                        <TooltipContent>Add to library</TooltipContent>
                                    </Tooltip>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">Open Menu</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                <span>Billing</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </ComponentBlock>

                            <ComponentBlock title="Feedback">
                                <div className="space-y-4">
                                    <Alert>
                                        <Bell className="h-4 w-4" />
                                        <AlertTitle>Heads up!</AlertTitle>
                                        <AlertDescription>You can add components using the CLI.</AlertDescription>
                                    </Alert>

                                    <div className="flex gap-4 items-center">
                                        <LoadingSpinner />
                                        <LoadingSpinner className="text-blue-500" />
                                        <Button onClick={() => setLoading(!loading)} size="sm" variant="secondary">
                                            Toggle Overlay
                                        </Button>
                                    </div>

                                    <div className="relative h-20 border rounded flex items-center justify-center overflow-hidden">
                                        Protected Content
                                        <LoadingOverlay loading={loading} />
                                    </div>

                                    <Button onClick={() => setShowToast(true)}>Trigger Toast</Button>
                                    {showToast && (
                                        <Toast onClose={() => setShowToast(false)}>
                                            <ToastTitle>Copied!</ToastTitle>
                                            <ToastDescription>Code copied to clipboard.</ToastDescription>
                                        </Toast>
                                    )}
                                </div>
                            </ComponentBlock>
                        </div>
                    </ShowcaseSection>

                    {/* NAVIGATION */}
                    <ShowcaseSection id="navigation" title="Navigation">
                        <div className="grid md:grid-cols-2 gap-6">
                            <ComponentBlock title="Breadcrumbs">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </ComponentBlock>

                            <ComponentBlock title="Pagination">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" isActive>
                                                2
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">3</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </ComponentBlock>

                            <ComponentBlock title="Tabs">
                                <Tabs defaultValue="account" className="w-[400px]">
                                    <TabsList>
                                        <TabsTrigger value="account">Account</TabsTrigger>
                                        <TabsTrigger value="password">Password</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="account">Make changes to your account here.</TabsContent>
                                    <TabsContent value="password">Change your password here.</TabsContent>
                                </Tabs>
                            </ComponentBlock>
                        </div>
                    </ShowcaseSection>

                    <footer className="text-center text-sm text-muted-foreground py-12">
                        Built with @srcroot/ui. All components are polymorphic, accessible, and themeable.
                    </footer>
                </main>
            </div>
        </TooltipProvider>
    )
}
