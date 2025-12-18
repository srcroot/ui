import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function OrdersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
                <p className="text-muted-foreground">View and manage your past orders.</p>
            </div>

            <div className="grid gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
                            <div>
                                <CardTitle className="text-base">Order #PI-402{i}</CardTitle>
                                <CardDescription>Dec {18 - i}, 2024</CardDescription>
                            </div>
                            <div className="flex items-center gap-4 mt-2 md:mt-0">
                                <span className="text-sm font-medium">$1{i}9.99</span>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/user/orders/PI-402${i}`}>View Details</Link>
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}
