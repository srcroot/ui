"use client"

import { Separator } from "@/components/ui/separator"
import { Text } from "@/components/ui/text"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { LuPlus } from "react-icons/lu"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Image } from "@/components/ui/image"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { CodeBlock, InlineCode } from "@/components/ui/code-block"

const exampleCode = `import { Button } from "@/components/ui/button"

export function MyComponent() {
    return (
        <Button variant="default">
            Click me
        </Button>
    )
}`

const jsonExample = `{
    "name": "my-app",
    "version": "1.0.0",
    "dependencies": {
        "react": "^18.2.0",
        "next": "^14.0.0"
    }
}`

export default function DataDisplayPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Text as="h1" variant="h1">Data Display</Text>
                <Text variant="muted">Tables, lists, carousels, and visual indicators.</Text>
            </div>
            <Separator />
            <div className="grid gap-6">
                {/* Code Block Section */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Code Block</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label>With Language & Copy</Label>
                            <CodeBlock language="tsx">{exampleCode}</CodeBlock>
                        </div>
                        <div className="space-y-2">
                            <Label>With Line Numbers</Label>
                            <CodeBlock language="json" showLineNumbers>{jsonExample}</CodeBlock>
                        </div>
                        <div className="space-y-2">
                            <Label>Inline Code</Label>
                            <p className="text-sm text-muted-foreground">
                                Use <InlineCode>npm install</InlineCode> or <InlineCode>pnpm add</InlineCode> to install packages.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Table</h3>
                    </div>
                    <div className="p-6">
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
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                            <h3 className="font-semibold leading-none tracking-tight">Accordion</h3>
                        </div>
                        <div className="p-6">
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
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                            <h3 className="font-semibold leading-none tracking-tight">Collapsible</h3>
                        </div>
                        <div className="p-6">
                            <Collapsible>
                                <CollapsibleTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        Can I use this in my project?
                                        <LuPlus className="h-4 w-4" />
                                    </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="px-4 py-2 text-muted-foreground">
                                    Yes. Free to use for personal and commercial projects.
                                </CollapsibleContent>
                            </Collapsible>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Carousel</h3>
                    </div>
                    <div className="p-6">
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
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Image & Loading</h3>
                    </div>
                    <div className="p-6 flex gap-8 items-start">
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
                </div>
            </div>
        </div>
    )
}
