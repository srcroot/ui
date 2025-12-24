import { Separator } from "@/components/ui/separator"
import { Text } from "@/components/ui/text"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function LayoutPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Text as="h1" variant="h1">Layout & Structure</Text>
                <Text variant="muted">Containers, cards, and structural elements.</Text>
            </div>
            <Separator />
            <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Cards</h3>
                    </div>
                    <div className="p-6">
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
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Aspect Ratio</h3>
                    </div>
                    <div className="p-6">
                        <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                            16:9 Aspect Ratio
                        </AspectRatio>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-2">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Separators</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-1">
                            <div className="text-sm font-medium leading-none">Custom Components</div>
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
                    </div>
                </div>

                {/* Resizable Horizontal Demo */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-2">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Resizable Panels - Horizontal</h3>
                        <p className="text-sm text-muted-foreground">Drag the handle to resize panels horizontally.</p>
                    </div>
                    <div className="p-6">
                        <ResizablePanelGroup direction="horizontal" className="min-h-[150px] rounded-lg border">
                            <ResizablePanel defaultSize={30}>
                                <div className="flex h-full items-center justify-center p-4 bg-muted/30">
                                    <span className="font-semibold text-sm">Sidebar</span>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel defaultSize={70}>
                                <div className="flex h-full items-center justify-center p-4">
                                    <span className="font-semibold text-sm">Main Content</span>
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </div>
                </div>

                {/* Resizable Vertical Demo */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Resizable - Vertical</h3>
                        <p className="text-sm text-muted-foreground">Vertical panel layout.</p>
                    </div>
                    <div className="p-6">
                        <ResizablePanelGroup direction="vertical" className="min-h-[250px] rounded-lg border">
                            <ResizablePanel defaultSize={40}>
                                <div className="flex h-full items-center justify-center p-4 bg-muted/30">
                                    <span className="font-semibold text-sm">Header</span>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel defaultSize={60}>
                                <div className="flex h-full items-center justify-center p-4">
                                    <span className="font-semibold text-sm">Body</span>
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </div>
                </div>

                {/* Resizable Nested Demo */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Resizable - Nested</h3>
                        <p className="text-sm text-muted-foreground">Nested horizontal + vertical.</p>
                    </div>
                    <div className="p-6">
                        <ResizablePanelGroup direction="horizontal" className="min-h-[250px] rounded-lg border">
                            <ResizablePanel defaultSize={30}>
                                <div className="flex h-full items-center justify-center p-4 bg-muted/30">
                                    <span className="font-semibold text-xs">Left</span>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle />
                            <ResizablePanel defaultSize={70}>
                                <ResizablePanelGroup direction="vertical">
                                    <ResizablePanel defaultSize={50}>
                                        <div className="flex h-full items-center justify-center p-4">
                                            <span className="font-semibold text-xs">Top Right</span>
                                        </div>
                                    </ResizablePanel>
                                    <ResizableHandle />
                                    <ResizablePanel defaultSize={50}>
                                        <div className="flex h-full items-center justify-center p-4 bg-muted/20">
                                            <span className="font-semibold text-xs">Bottom Right</span>
                                        </div>
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </div>
                </div>

                {/* ScrollArea Vertical */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Scroll Area - Thin (Default)</h3>
                        <p className="text-sm text-muted-foreground">Vertical scrolling with thin scrollbar.</p>
                    </div>
                    <div className="p-6">
                        <ScrollArea scrollbarSize="thin" className="h-48 w-full rounded-md border p-4">
                            <div className="space-y-3">
                                {Array.from({ length: 15 }).map((_, i) => (
                                    <div key={i} className="p-2 border rounded text-sm">
                                        Item {i + 1}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>

                {/* ScrollArea Horizontal */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Scroll Area - Horizontal</h3>
                        <p className="text-sm text-muted-foreground">Horizontal with default scrollbar.</p>
                    </div>
                    <div className="p-6">
                        <ScrollArea orientation="horizontal" scrollbarSize="default" className="w-full rounded-md border p-4">
                            <div className="flex gap-3">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div key={i} className="flex-shrink-0 w-24 h-20 border rounded flex items-center justify-center text-sm bg-muted/30">
                                        Card {i + 1}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    )
}
