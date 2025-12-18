"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Edit2 } from "lucide-react"

export default function AddressesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Address Book</h1>
                    <p className="text-muted-foreground">Manage your shipping and delivery addresses.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Address
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            Home
                            <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-1 rounded">Default</span>
                        </CardTitle>
                        <CardDescription>John Doe</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            1234 Tech Blvd<br />
                            Apt 4B<br />
                            Silicon Valley, CA 94000<br />
                            United States
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                            <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Office</CardTitle>
                        <CardDescription>John Doe</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            987 Innovation Way<br />
                            Suite 300<br />
                            Austin, TX 78000<br />
                            United States
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                            <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Set as Default</Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
