import { Separator } from "@/components/ui/separator"
import { Text } from "@/components/ui/text"

export default function TypographyPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Text as="h1" variant="h1">Typography</Text>
                <Text variant="muted">Examples of text components and typography styles.</Text>
            </div>
            <Separator />
            <div className="grid gap-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Headings & Text</h3>
                    </div>
                    <div className="p-6 space-y-4">
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
                            &copy; 2024 srcRoot Inc. All rights reserved.
                        </Text>
                        <Text variant="code">
                            npx @srcroot/ui add button
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}
