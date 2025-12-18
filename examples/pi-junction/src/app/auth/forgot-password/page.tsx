"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
        }, 1500)
    }

    if (isSubmitted) {
        return (
            <div className="grid gap-6 text-center">
                <div className="flex justify-center">
                    <CheckCircle className="h-12 w-12 text-primary" />
                </div>
                <div className="flex flex-col space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
                    <p className="text-sm text-muted-foreground">
                        We have sent a password reset link to your email address.
                    </p>
                </div>
                <Button asChild variant="outline" className="mt-4">
                    <Link href="/auth/login">Back to Login</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="grid gap-6">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Reset Password</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email address to receive a password reset link.
                </p>
            </div>
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent" />
                        )}
                        Send Reset Link
                    </Button>
                </div>
            </form>
            <p className="px-8 text-center text-sm text-muted-foreground">
                <Link
                    href="/auth/login"
                    className="hover:text-brand underline underline-offset-4 flex items-center justify-center"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Link>
            </p>
        </div>
    )
}
