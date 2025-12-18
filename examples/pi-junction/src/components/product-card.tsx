"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Check } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"

interface Product {
    id: string
    name: string
    description: string
    price: string
    image: string
}

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart()
    const [isAdded, setIsAdded] = useState(false)

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
        <Card className="flex flex-col overflow-hidden h-full group border-none">
            <CardHeader className="p-0 w-full">
                <Link href={`/products/${product.id}`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={500}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
                    />
                </Link>
            </CardHeader>
            <CardContent className="grid gap-2.5 p-4 md:p-6">
                <Link href={`/products/${product.id}`}>
                    <CardTitle className="line-clamp-1 hover:underline cursor-pointer">{product.name}</CardTitle>
                </Link>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                <div className="flex items-center text-lg font-bold">
                    {product.price}
                </div>
            </CardContent>
            <CardFooter className="p-4 md:p-6 pt-0 mt-auto">
                <Button className="w-full" onClick={handleAddToCart} disabled={isAdded}>
                    {isAdded ? (
                        <>
                            <Check className="mr-2 h-4 w-4" />
                            Added
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
