import { ProductCard } from "@/components/product-card"
import { ALL_PRODUCTS } from "@/lib/products"
import { Badge } from "@/components/ui/badge"

export default function DealsPage() {
    // Mocking deals by taking every 3rd product
    const dealsProducts = ALL_PRODUCTS.filter((_, index) => index % 3 === 0)

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <header className="mb-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-8 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-3xl font-bold tracking-tight">Today's Deals</h1>
                    <Badge variant="destructive">Limited Time</Badge>
                </div>
                <p className="text-muted-foreground">Exclusive discounts on top-tier tech.</p>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {dealsProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
