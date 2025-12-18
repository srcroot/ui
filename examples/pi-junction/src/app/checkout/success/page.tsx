import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function OrderSuccessPage() {
    return (
        <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center space-y-6">
            <div className="rounded-full bg-green-100 p-6 dark:bg-green-900/20">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-500" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground max-w-lg">
                Thank you for your purchase. We have received your order and will begin processing it right away.
            </p>
            <div className="pt-6 flex gap-4">
                <Button asChild size="lg">
                    <Link href="/">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="/products">View Order</Link>
                </Button>
            </div>
        </div>
    )
}
