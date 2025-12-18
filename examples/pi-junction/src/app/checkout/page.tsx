"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/lib/cart-context"
import { ArrowRight, CreditCard, Truck, UserCircle2, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart()
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState(false)
    const [sameAsShipping, setSameAsShipping] = useState(true)
    const [paymentMethod, setPaymentMethod] = useState("card")

    // Mock state for authentication "detection"
    const [isGuest, setIsGuest] = useState(true)

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        clearCart()
        router.push("/checkout/success")
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <ShoppingBagIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Your cart is empty</h1>
                    <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                    <Button asChild size="lg" className="w-full">
                        <Link href="/products">Start Shopping</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-7xl">
            <h1 className="text-4xl font-extrabold tracking-tight mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Checkout Form */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Guest / Auth Banner */}
                    {isGuest && (
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex gap-4">
                                <div className="p-2 bg-primary/10 rounded-full h-fit">
                                    <UserCircle2 className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Have an account?</h3>
                                    <p className="text-muted-foreground text-sm">Sign in for a faster checkout experience.</p>
                                </div>
                            </div>
                            <Button variant="outline" asChild>
                                <Link href="/auth/login">Sign In</Link>
                            </Button>
                        </div>
                    )}

                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">

                        {/* Contact Information */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">1</span>
                                Contact Information
                            </h2>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" placeholder="you@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" placeholder="(555) 555-5555" required />
                                </div>
                            </div>
                        </section>

                        <Separator />

                        {/* Shipping Information */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">2</span>
                                Shipping Address
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input id="firstName" placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input id="lastName" placeholder="Doe" required />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" placeholder="1234 Main St" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" placeholder="New York" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State / Province</Label>
                                    <Input id="state" placeholder="NY" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">Postal Code</Label>
                                    <Input id="zip" placeholder="10001" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="us">United States</SelectItem>
                                            <SelectItem value="ca">Canada</SelectItem>
                                            <SelectItem value="uk">United Kingdom</SelectItem>
                                            <SelectItem value="au">Australia</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {!isGuest && (
                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox id="save-address" />
                                    <Label htmlFor="save-address" className="font-normal cursor-pointer text-muted-foreground">
                                        Save this address to my address book
                                    </Label>
                                </div>
                            )}
                        </section>

                        <Separator />

                        {/* Payment Method */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">3</span>
                                Payment Method
                            </h2>

                            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-4 sm:grid-cols-2">
                                <Label
                                    htmlFor="card"
                                    className={cn(
                                        "flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer",
                                        paymentMethod === "card" && "border-primary bg-primary/5"
                                    )}
                                >
                                    <RadioGroupItem value="card" id="card" className="sr-only" />
                                    <CreditCard className="mb-3 h-6 w-6" />
                                    <span className="font-semibold">Credit Card</span>
                                </Label>

                                <Label
                                    htmlFor="cod"
                                    className={cn(
                                        "flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer",
                                        paymentMethod === "cod" && "border-primary bg-primary/5"
                                    )}
                                >
                                    <RadioGroupItem value="cod" id="cod" className="sr-only" />
                                    <Truck className="mb-3 h-6 w-6" />
                                    <span className="font-semibold">Cash on Delivery</span>
                                </Label>
                            </RadioGroup>

                            <div className="mt-6 p-6 border rounded-lg bg-card/50 transition-all duration-300">
                                {paymentMethod === "card" ? (
                                    <div className="grid gap-4 sm:grid-cols-2 animate-in fade-in slide-in-from-top-2">
                                        <div className="space-y-2 sm:col-span-2">
                                            <Label htmlFor="number">Card number</Label>
                                            <div className="relative">
                                                <Input id="number" placeholder="0000 0000 0000 0000" className="pl-10" />
                                                <div className="absolute left-3 top-2.5 text-muted-foreground pointer-events-none">
                                                    <CreditCard className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry">Expiry Date</Label>
                                            <Input id="expiry" placeholder="MM/YY" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvc">CVC</Label>
                                            <Input id="cvc" placeholder="123" />
                                        </div>
                                        <div className="space-y-2 sm:col-span-2">
                                            <Label htmlFor="nameOnCard">Name on Card</Label>
                                            <Input id="nameOnCard" placeholder="John Doe" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <Truck className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                                        <h3 className="font-semibold text-lg">Cash on Delivery Selected</h3>
                                        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                                            Pay in cash upon delivery. Ensure you have the exact amount ready.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Billing Address Toggle */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="same-as-shipping"
                                    checked={sameAsShipping}
                                    onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                                />
                                <Label htmlFor="same-as-shipping" className="text-base font-medium cursor-pointer">
                                    Billing address is the same as shipping
                                </Label>
                            </div>

                            {!sameAsShipping && (
                                <div className="grid gap-4 sm:grid-cols-2 pl-6 border-l-2 pt-2 animate-in slide-in-from-top-2 fade-in duration-300">
                                    <div className="space-y-2 sm:col-span-2">
                                        <Label htmlFor="billing-address">Billing Address</Label>
                                        <Input id="billing-address" placeholder="1234 Main St" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="billing-city">City</Label>
                                        <Input id="billing-city" placeholder="New York" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="billing-zip">Postal Code</Label>
                                        <Input id="billing-zip" placeholder="10001" />
                                    </div>
                                </div>
                            )}
                        </div>

                    </form>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <Card className="shadow-lg border-muted/60">
                            <CardHeader className="bg-muted/30 pb-4">
                                <CardTitle>Order Summary</CardTitle>
                                <CardDescription>Review your items before payment.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 pt-6">
                                <div className="max-h-[300px] overflow-auto space-y-4 pr-2">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-md bg-secondary flex items-center justify-center shrink-0 border">
                                                    <span className="text-xs font-bold opacity-30">{item.name.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium">{item.price}</p>
                                        </div>
                                    ))}
                                </div>
                                <Separator />
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Taxes</span>
                                        <span>$0.00</span>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-4 bg-muted/30 pt-6">
                                <Button
                                    className="w-full h-12 text-base shadow-md hover:shadow-lg transition-all"
                                    size="lg"
                                    disabled={isProcessing}
                                    onClick={(e) => {
                                        const form = document.getElementById("checkout-form") as HTMLFormElement
                                        if (form) form.requestSubmit()
                                    }}
                                >
                                    {isProcessing ? (
                                        <>Processing Order...</>
                                    ) : (
                                        <>Pay ${cartTotal.toFixed(2)}</>
                                    )}
                                </Button>
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                                    <span>Secure SSL Encryption</span>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ShoppingBagIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
}

