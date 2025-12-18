import { ProductCard } from "@/components/product-card"
import { ALL_PRODUCTS } from "@/lib/products"

export default function ComponentsPage() {
    const componentProducts = ALL_PRODUCTS.filter(p => p.category === "Components")

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Components</h1>
                <p className="text-muted-foreground">High-performance parts for your next build.</p>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {componentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {componentProducts.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No components found.</p>
            )}
        </div>
    )
}
