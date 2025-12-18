"use client"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { ALL_PRODUCTS } from "@/lib/products"

export default function ProductsPage() {
    const [priceRange, setPriceRange] = useState([0, 3000])

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
                {/* Sidebar Filters */}
                <div className="w-full md:w-64 shrink-0 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Filters</h3>
                        <Separator className="mb-4" />
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium mb-2">Category</h4>
                                <div className="space-y-2">
                                    {["Components", "Wearables", "Displays", "Augmentation", "Robotics", "Health"].map((category) => (
                                        <div key={category} className="flex items-center space-x-2">
                                            <Checkbox id={category} />
                                            <Label htmlFor={category}>{category}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <h4 className="text-sm font-medium mb-2">Price Range</h4>
                                <Slider
                                    defaultValue={[0, 3000]}
                                    max={3000}
                                    step={100}
                                    className="mb-2"
                                    onValueChange={setPriceRange}
                                />
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
                        <span className="text-muted-foreground">{ALL_PRODUCTS.length} results</span>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {ALL_PRODUCTS.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
