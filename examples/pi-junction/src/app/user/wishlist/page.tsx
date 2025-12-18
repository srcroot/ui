import { ProductCard } from "@/components/product-card"
import { ALL_PRODUCTS } from "@/lib/products"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WishlistPage() {
    // Mock wishlist items (just picking a few products)
    const wishlistItems = ALL_PRODUCTS.slice(0, 3)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Wishlist</h1>
                    <p className="text-muted-foreground">Products you've saved for later.</p>
                </div>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
                    <Button asChild>
                        <Link href="/products">Browse Products</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {wishlistItems.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}
