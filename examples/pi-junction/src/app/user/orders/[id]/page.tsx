"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { use } from "react";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/user/orders">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Order #{id}</h1>
                    <p className="text-muted-foreground">Placed on Dec 16, 2024</p>
                </div>
            </div>

            <Separator />

            <div className="grid gap-6">
                <div>
                    <h2 className="text-lg font-semibold mb-4">Items</h2>
                    <div className="space-y-4">
                        {[1, 2].map(i => (
                            <div key={i} className="flex justify-between items-center bg-card p-4 rounded-lg border">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center">
                                        <span className="text-xs font-bold opacity-30">IMG</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Product Item {i}</p>
                                        <p className="text-sm text-muted-foreground">Qty: 1</p>
                                    </div>
                                </div>
                                <span className="font-medium">$99.00</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
                        <address className="not-italic text-sm text-muted-foreground">
                            John Doe<br />
                            1234 Tech Blvd<br />
                            Silicon Valley, CA 94000<br />
                            United States
                        </address>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>$198.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>$12.00</span>
                            </div>
                            <div className="flex justify-between font-medium text-lg pt-2 border-t">
                                <span>Total</span>
                                <span>$210.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
