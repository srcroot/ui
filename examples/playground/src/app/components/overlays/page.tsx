"use client"

import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { Text } from "@/components/ui/text"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { User, CreditCard, Settings, Bell } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner, LoadingOverlay } from "@/components/ui/loading-spinner"
import { Toast, ToastTitle, ToastDescription } from "@/components/ui/toast"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from "@/components/ui/context-menu"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"

export default function OverlaysPage() {
    const [loading, setLoading] = React.useState(false)
    const [showToast, setShowToast] = React.useState(false)

    return (
        <TooltipProvider>
            <div className="space-y-6">
                <div className="space-y-2">
                    <Text as="h1" variant="h1">Overlays & Feedback</Text>
                    <Text variant="muted">Modals, popovers, alerts, and notifications.</Text>
                </div>
                <Separator />
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                            <h3 className="font-semibold leading-none tracking-tight">Dialogs</h3>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
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
                    </div>

                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                            <h3 className="font-semibold leading-none tracking-tight">Popovers & Tooltips</h3>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
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
                    </div>

                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                            <h3 className="font-semibold leading-none tracking-tight">Feedback</h3>
                        </div>
                        <div className="p-6 space-y-4">
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
                    </div>
                </div>

                {/* New Components Row */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Context Menu */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                            <h3 className="font-semibold leading-none tracking-tight">Context Menu</h3>
                        </div>
                        <div className="p-6">
                            <ContextMenu>
                                <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm">
                                    Right click here
                                </ContextMenuTrigger>
                                <ContextMenuContent>
                                    <ContextMenuLabel>Actions</ContextMenuLabel>
                                    <ContextMenuSeparator />
                                    <ContextMenuItem>Copy</ContextMenuItem>
                                    <ContextMenuItem>Paste</ContextMenuItem>
                                    <ContextMenuItem>Delete</ContextMenuItem>
                                </ContextMenuContent>
                            </ContextMenu>
                        </div>
                    </div>

                    {/* Drawer */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                            <h3 className="font-semibold leading-none tracking-tight">Drawer</h3>
                        </div>
                        <div className="p-6">
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="outline">Open Drawer</Button>
                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader>
                                        <DrawerTitle>Drawer Title</DrawerTitle>
                                        <DrawerDescription>This drawer slides from the bottom.</DrawerDescription>
                                    </DrawerHeader>
                                    <div className="p-4">
                                        <p className="text-sm text-muted-foreground">Drawer content goes here. Great for mobile menus or quick actions.</p>
                                    </div>
                                    <DrawerFooter>
                                        <DrawerClose>
                                            <Button variant="outline">Close</Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>

                    {/* Hover Card */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                            <h3 className="font-semibold leading-none tracking-tight">Hover Card</h3>
                        </div>
                        <div className="p-6">
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Button variant="link" className="p-0">@nextjs</Button>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold">Next.js</h4>
                                        <p className="text-sm text-muted-foreground">
                                            The React Framework – created and maintained by @vercel.
                                        </p>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
