"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type CartItem = {
    id: string
    name: string
    price: string
    image: string
    quantity: number
}

type CartContextType = {
    items: CartItem[]
    addItem: (item: Omit<CartItem, "quantity">) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    cartCount: number
    cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isInitialized, setIsInitialized] = useState(false)

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("pi-junction-cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
        setIsInitialized(true)
    }, [])

    // Save to local storage on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("pi-junction-cart", JSON.stringify(items))
        }
    }, [items, isInitialized])

    const addItem = (product: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(id)
            return
        }
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

    const cartTotal = items.reduce((acc, item) => {
        const priceStr = item.price.replace(/[^0-9.]/g, "")
        const price = parseFloat(priceStr)
        return acc + price * item.quantity
    }, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
