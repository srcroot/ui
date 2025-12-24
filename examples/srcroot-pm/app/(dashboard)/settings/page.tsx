"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function SettingsPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">Manage your account settings and preferences.</p>
                </div>
            </div>
            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="display">Display</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Store Name</CardTitle>
                            <CardDescription>
                                Used to identify your store in the marketplace.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <Input placeholder="Store Name" defaultValue="Acme Inc" />
                            </form>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button onClick={() => toast.success("Store name saved")}>Save</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="account" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>
                                Update your personal information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue="Shawn" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" defaultValue="@shawn" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" placeholder="Tell us about yourself" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => toast.success("Profile updated")}>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>
                                Configure how you receive notifications.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="functional" className="flex flex-col space-y-1">
                                    <span>Communication emails</span>
                                    <span className="font-normal text-muted-foreground">Receive emails about your account activity.</span>
                                </Label>
                                <Switch id="functional" />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="marketing" className="flex flex-col space-y-1">
                                    <span>Marketing emails</span>
                                    <span className="font-normal text-muted-foreground">Receive emails about new products, features, and more.</span>
                                </Label>
                                <Switch id="marketing" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="display" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Display</CardTitle>
                            <CardDescription>
                                Turn items on or off to control what's displayed in the app.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="sidebar" defaultChecked />
                                <Label htmlFor="sidebar">Show Sidebar</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="activity" />
                                <Label htmlFor="activity">Show Activity Feed</Label>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => toast.success("Display settings updated")}>Update Display</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
