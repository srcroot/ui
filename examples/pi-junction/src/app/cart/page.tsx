"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
    const { items, removeItem, updateQuantity, cartTotal, clearCart } = useCart()

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

            {items.length === 0 ? (
                <div className="text-center py-12 md:py-24 space-y-4">
                    <p className="text-xl text-muted-foreground">Your cart is empty.</p>
                    <Button asChild>
                        <Link href="/products">Browse Products</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 border rounded-lg p-4 bg-card">
                                <div className="h-24 w-24 rounded-md bg-secondary flex items-center justify-center shrink-0">
                                    <span className="text-2xl font-bold opacity-20">{item.name.charAt(0)}</span>
                                </div>
                                <div className="flex flex-1 flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground">{item.price}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                            <span className="sr-only">Remove</span>
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex items-center border rounded-md">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-none"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-none"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <Button variant="outline" onClick={clearCart} className="text-destructive hover:bg-destructive/10 border-destructive/20">
                                Clear Cart
                            </Button>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4 rounded-lg border bg-card p-6 space-y-6">
                        <h2 className="text-xl font-semibold">Order Summary</h2>
                        <Separator />
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Tax</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium text-lg">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <Button className="w-full" size="lg" asChild>
                            <Link href="/checkout">
                                Checkout <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
