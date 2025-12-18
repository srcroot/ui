"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, CreditCard } from "lucide-react"

export default function PaymentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
                    <p className="text-muted-foreground">Manage your saved cards and payment options.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Method
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Visa ending in 4242</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold mt-2">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/28</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">Default</span>
                        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Mastercard ending in 8888</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold mt-2">•••• •••• •••• 8888</p>
                        <p className="text-xs text-muted-foreground">Expires 09/25</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="ghost" size="sm" className="px-0">Set as Default</Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
