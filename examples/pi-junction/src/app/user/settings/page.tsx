"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <div className="grid gap-6">
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue="john@example.com" disabled />
                        </div>
                    </div>
                    <Button>Save Changes</Button>
                </section>

                <Separator />

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Security</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border p-4 rounded-lg">
                            <div>
                                <p className="font-medium">Password</p>
                                <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                            </div>
                            <Button variant="outline">Change Password</Button>
                        </div>
                        <div className="flex items-center justify-between border p-4 rounded-lg">
                            <div>
                                <p className="font-medium">Two-Factor Authentication</p>
                                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                            </div>
                            <Badge variant="outline">Disabled</Badge>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
