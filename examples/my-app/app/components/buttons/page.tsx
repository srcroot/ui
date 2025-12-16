import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Text } from "@/components/ui/text"
import { Separator } from "@/components/ui/separator"

export default function ButtonsPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Text as="h1" variant="h1">Buttons & Actions</Text>
                <Text variant="muted">Button variants and groupings.</Text>
            </div>
            <Separator />
            <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Variants</h3>
                    </div>
                    <div className="p-6 flex flex-wrap gap-4">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Button Group</h3>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
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
                </div>
            </div>
        </div>
    )
}
