"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function NotificationsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Notification Preferences</h1>
                <p className="text-muted-foreground">Manage how you receive updates and alerts.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Email Notifications</CardTitle>
                        <CardDescription>Choose what emails you want to receive.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="orders" className="flex flex-col space-y-1">
                                <span>Order Updates</span>
                                <span className="font-normal text-xs text-muted-foreground">Receive updates about your order status and delivery.</span>
                            </Label>
                            <Switch id="orders" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="promotions" className="flex flex-col space-y-1">
                                <span>Promotional Emails</span>
                                <span className="font-normal text-xs text-muted-foreground">Receive offers, deals, and new product announcements.</span>
                            </Label>
                            <Switch id="promotions" />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="security" className="flex flex-col space-y-1">
                                <span>Security Alerts</span>
                                <span className="font-normal text-xs text-muted-foreground">Get notified about suspicious activity or login attempts.</span>
                            </Label>
                            <Switch id="security" defaultChecked disabled />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>SMS Notifications</CardTitle>
                        <CardDescription>Manage text message alerts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="sms-orders" className="flex flex-col space-y-1">
                                <span>Order Updates via SMS</span>
                                <span className="font-normal text-xs text-muted-foreground">Get text messages for delivery updates.</span>
                            </Label>
                            <Switch id="sms-orders" />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button>Save Preferences</Button>
                </div>
            </div>
        </div>
    )
}
