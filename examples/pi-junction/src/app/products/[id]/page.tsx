'use client'

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ALL_PRODUCTS } from "@/lib/products"
import { Check, ChevronLeft, ShoppingCart, Star, PlayCircle, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState, use } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from "@/lib/utils"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = ALL_PRODUCTS.find((p) => p.id === id)
    const { addItem } = useCart()
    const [isAdded, setIsAdded] = useState(false)
    const [activeMedia, setActiveMedia] = useState<'image' | 'video'>('image')

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
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Products
            </Link>

            <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Media Gallery (Sticky) */}
                <div className="lg:col-span-7 space-y-4 sticky top-24">
                    {/* Main Media View */}
                    <div className="aspect-square relative bg-secondary/20 rounded-xl overflow-hidden border">
                        {activeMedia === 'image' ? (
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black">
                                {product.video ? (
                                    <video
                                        src={product.video}
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="text-white text-center">
                                        <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                        <p>Video demo unavailable</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        <button
                            onClick={() => setActiveMedia('image')}
                            className={cn(
                                "relative w-24 h-24 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all",
                                activeMedia === 'image' ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={product.image}
                                alt="View Image"
                                fill
                                className="object-cover"
                            />
                        </button>

                        {product.video && (
                            <button
                                onClick={() => setActiveMedia('video')}
                                className={cn(
                                    "relative w-24 h-24 rounded-lg overflow-hidden border-2 flex-shrink-0 bg-black flex items-center justify-center transition-all",
                                    activeMedia === 'video' ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                                )}
                            >
                                <PlayCircle className="h-8 w-8 text-white" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Column: Product Info (Scrollable) */}
                <div className="lg:col-span-5 space-y-8">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full">
                                {product.category}
                            </span>
                            <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span className="text-sm font-medium">4.8</span>
                                <span className="text-sm text-muted-foreground">(42 reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
                        <p className="text-3xl font-semibold text-foreground">{product.price}</p>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row border-t border-b py-6">
                        <Button size="lg" className="flex-1 h-12 text-base" onClick={handleAddToCart} disabled={isAdded}>
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
                        <Button size="lg" variant="outline" className="h-12 w-12 p-0 flex-shrink-0">
                            <Star className="h-5 w-5" />
                            <span className="sr-only">Add to Wishlist</span>
                        </Button>
                    </div>

                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="w-full grid w-full grid-cols-2">
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="specs">Specifications</TabsTrigger>
                        </TabsList>
                        <TabsContent value="description" className="pt-4">
                            <div className="prose prose-zinc dark:prose-invert max-w-none">
                                {product.longDescription ? (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {product.longDescription}
                                    </ReactMarkdown>
                                ) : (
                                    <p>{product.details}</p>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="specs" className="pt-4">
                            <div className="rounded-lg border p-4 space-y-4">
                                <div className="flex justify-between py-2 border-b last:border-0">
                                    <span className="text-muted-foreground">SKU</span>
                                    <span className="font-medium">PI-{product.id.padStart(4, '0')}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b last:border-0">
                                    <span className="text-muted-foreground">Category</span>
                                    <span className="font-medium">{product.category}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b last:border-0">
                                    <span className="text-muted-foreground">Stock Status</span>
                                    <span className="font-medium text-green-500">In Stock</span>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
