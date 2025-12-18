"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="grid md:grid-cols-2 gap-12">

                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-4">Contact Us</h1>
                        <p className="text-muted-foreground text-lg">
                            Have questions or need assistance? Our team is here to help with anything related to Pi Junction.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Visit Us</h3>
                                <p className="text-muted-foreground">
                                    123 Innovation Drive<br />
                                    Tech City, TC 90210
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Email Us</h3>
                                <p className="text-muted-foreground">support@pijunction.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Call Us</h3>
                                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-card p-6 md:p-8 rounded-lg border shadow-sm">
                    <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" />
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
