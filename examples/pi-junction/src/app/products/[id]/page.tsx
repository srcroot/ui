"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ALL_PRODUCTS } from "@/lib/products"
import { Check, ChevronLeft, ShoppingCart, Star } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState } from "react"
import { use } from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = ALL_PRODUCTS.find((p) => p.id === id)
    const { addItem } = useCart()
    const [isAdded, setIsAdded] = useState(false)

    if (!product) {
        notFound()
    }

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        })
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <Link
                href="/products"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 text-black dark:text-white"
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Product Image Placeholder */}
                <div className="aspect-square relative bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
                    <span className="text-9xl font-bold opacity-10">{product.name.charAt(0)}</span>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                        <p className="text-2xl font-semibold mt-2">{product.price}</p>
                    </div>

                    <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">(42 reviews)</span>
                    </div>

                    <p className="text-muted-foreground text-lg">
                        {product.description}
                    </p>

                    <div className="prose prose-sm dark:prose-invert">
                        <p>{product.details}</p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row pt-4">
                        <Button size="lg" className="w-full sm:w-auto" onClick={handleAddToCart} disabled={isAdded}>
                            {isAdded ? (
                                <>
                                    <Check className="mr-2 h-5 w-5" />
                                    Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Add to Cart
                                </>
                            )}
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto text-black dark:text-white border-input hover:bg-accent hover:text-accent-foreground">
                            Add to Wishlist
                        </Button>
                    </div>

                    <div className="border-t pt-6 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Category</span>
                            <span className="font-medium">{product.category}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">SKU</span>
                            <span className="font-medium">PI-{product.id.padStart(4, '0')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
