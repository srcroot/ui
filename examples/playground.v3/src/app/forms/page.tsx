"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/ui/form-field"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { InputGroup, InputAddon } from "@/components/ui/input-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function FormsPage() {
    return (
        <div className="grid gap-6 p-6 md:grid-cols-2">
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>All Input Types</CardTitle>
                    <CardDescription>
                        Rendering all HTML5 input types using the generic Input component.
                        <br />
                        <span className="text-xs text-muted-foreground">
                            Note: Some types like checkbox, radio, and range are better served by specific components,
                            but `Input` supports them natively as a fallback.
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            "text", "search", "password", "email", "url", "tel", "number",
                            "range", "date", "datetime-local", "month", "week", "time",
                            "checkbox", "radio", "color", "file",
                            "submit", "reset", "button",
                            "image", "hidden"
                        ].map((type) => (
                            <div key={type} className={type === "hidden" ? "hidden" : "space-y-2"}>
                                <Label className="capitalize">{type} Input</Label>
                                <Input
                                    type={type}
                                    placeholder={`type="${type}"`}
                                    defaultValue={
                                        type === "color" ? "#000000" :
                                            type === "date" ? new Date().toISOString().split('T')[0] :
                                                type === "number" ? "42" :
                                                    type === "submit" || type === "reset" || type === "button" ? `Click Me (${type})` :
                                                        undefined
                                    }
                                />
                                {type === "hidden" && <div className="text-xs text-muted-foreground italic">(Hidden input rendered here)</div>}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>FormField Component</CardTitle>
                    <CardDescription>Standardized wrapper for form controls.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                        label="Username"
                        description="This is your public display name."
                        required
                    >
                        <Input placeholder="johndoe" />
                    </FormField>

                    <FormField
                        label="Email"
                        error="Please enter a valid email address."
                        required
                    >
                        <Input placeholder="invalid-email" error />
                    </FormField>

                    <FormField
                        label="Password"
                        description="Must be at least 8 characters."
                    >
                        <Input type="password" placeholder="••••••••" />
                    </FormField>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Input with Addons</CardTitle>
                    <CardDescription>
                        Using "Input Groups" to add static prefixes or suffixes without modifying the component.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>URL Input</Label>
                        <InputGroup>
                            <InputAddon>https://</InputAddon>
                            <Input type="url" placeholder="example.com" />
                        </InputGroup>
                    </div>

                    <div className="space-y-2">
                        <Label>Phone Input</Label>
                        <InputGroup>
                            <InputAddon className="p-0 border-r-0">
                                <Select defaultValue="us">
                                    <SelectTrigger className="w-[85px] border-0 shadow-none focus:ring-0 h-full rounded-none bg-transparent">
                                        <SelectValue placeholder="Code" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="us">
                                            <div className="flex items-center gap-2">
                                                <span>🇺🇸</span>
                                                <span>+1</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="uk">
                                            <div className="flex items-center gap-2">
                                                <span>🇬🇧</span>
                                                <span>+44</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="in">
                                            <div className="flex items-center gap-2">
                                                <span>🇮🇳</span>
                                                <span>+91</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="fr">
                                            <div className="flex items-center gap-2">
                                                <span>🇫🇷</span>
                                                <span>+33</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </InputAddon>
                            <Input type="tel" placeholder="(555) 555-5555" />
                        </InputGroup>
                        <p className="text-xs text-muted-foreground">
                            Combines <code>InputGroup</code>, <code>Select</code>, and <code>Input</code>.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Price Input</Label>
                        <InputGroup>
                            <InputAddon>$</InputAddon>
                            <Input type="number" placeholder="0.00" />
                            <InputAddon>USD</InputAddon>
                        </InputGroup>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Job Application Form</CardTitle>
                    <CardDescription>
                        A complete "real-world" form example using <code>FormField</code> and <code>InputGroup</code>.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            label="First Name"
                            required
                        >
                            <Input placeholder="Jane" />
                        </FormField>
                        <FormField
                            label="Last Name"
                            required
                        >
                            <Input placeholder="Doe" />
                        </FormField>
                    </div>

                    <FormField
                        label="Portfolio Website"
                        description="Your personal or business website."
                    >
                        <InputGroup>
                            <InputAddon>https://</InputAddon>
                            <Input placeholder="example.com" />
                        </InputGroup>
                    </FormField>

                    <FormField
                        label="Salary Expectation"
                        error="Please enter a valid amount."
                        required
                    >
                        <InputGroup>
                            <InputAddon>$</InputAddon>
                            <Input type="number" placeholder="0.00" />
                            <InputAddon>USD</InputAddon>
                        </InputGroup>
                    </FormField>

                    <div className="flex justify-end pt-4">
                        <Button>Submit Application</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Register Account</CardTitle>
                    <CardDescription>
                        Common authentication form with validation and agreements.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            label="First Name"
                            required
                        >
                            <Input placeholder="Jane" />
                        </FormField>
                        <FormField
                            label="Last Name"
                            required
                        >
                            <Input placeholder="Doe" />
                        </FormField>
                    </div>

                    <FormField
                        label="Email Address"
                        required
                    >
                        <Input type="email" placeholder="john@example.com" />
                    </FormField>

                    <FormField
                        label="Phone Number"
                        description="Used for 2FA."
                    >
                        <InputGroup>
                            <InputAddon className="p-0 border-r-0">
                                <Select defaultValue="us">
                                    <SelectTrigger className="w-[85px] border-0 shadow-none focus:ring-0 h-full rounded-none bg-transparent">
                                        <SelectValue placeholder="Code" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="us">
                                            <div className="flex items-center gap-2">
                                                <span>🇺🇸</span>
                                                <span>+1</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="uk">
                                            <div className="flex items-center gap-2">
                                                <span>🇬🇧</span>
                                                <span>+44</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="in">
                                            <div className="flex items-center gap-2">
                                                <span>🇮🇳</span>
                                                <span>+91</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="fr">
                                            <div className="flex items-center gap-2">
                                                <span>🇫🇷</span>
                                                <span>+33</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </InputAddon>
                            <Input type="tel" placeholder="(555) 555-5555" />
                        </InputGroup>
                    </FormField>

                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            label="Password"
                            required
                        >
                            <Input type="password" placeholder="••••••••" />
                        </FormField>
                        <FormField
                            label="Confirm Password"
                            required
                        >
                            <Input type="password" placeholder="••••••••" />
                        </FormField>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" onCheckedChange={(e) => console.log(e)} />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree to the <a href="#" className="underline hover:text-primary">terms and conditions</a>
                        </label>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button className="w-full sm:w-auto">Create Account</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
