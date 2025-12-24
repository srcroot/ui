"use client"

import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { Text } from "@/components/ui/text"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio"
import { Switch } from "@/components/ui/switch"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search } from "@/components/ui/search"
import { OtpInput } from "@/components/ui/otp-input"
import { StarRating } from "@/components/ui/star-rating"
import { Calendar } from "@/components/ui/calendar"
import { ComboboxDemo } from "./combobox-demo"
import { CalendarDemo } from "./calendar-demo"
import { SliderDemo } from "./slider-demo"
import { DatePickerDemo } from "./date-picker-demo"
import { FileUpload } from "@/components/ui/file-upload"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { NativeSelect } from "@/components/ui/native-select"
import { LuBold, LuItalic, LuUnderline, LuAlignLeft, LuAlignCenter, LuAlignRight } from "react-icons/lu"

export default function FormsPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [range, setRange] = React.useState<Date[]>([])
    const [volume, setVolume] = React.useState([50])
    const [rating, setRating] = React.useState(4)
    const [otp, setOtp] = React.useState("")
    const [notifications, setNotifications] = React.useState(false)
    const [acceptTerms, setAcceptTerms] = React.useState(false)

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Text as="h1" variant="h1">Forms & Controls</Text>
                <Text variant="muted">Inputs, switches, sliders, and other form elements.</Text>
            </div>
            <Separator />
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Text Inputs</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="name@example.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Disabled</Label>
                            <Input disabled placeholder="Cannot type here" />
                        </div>
                        <div className="grid gap-2">
                            <Label>File Upload</Label>
                            <FileUpload
                                accept="image/*,.pdf,.doc,.docx"
                                multiple
                                maxFiles={3}
                                maxSize={5 * 1024 * 1024}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Message</Label>
                            <Textarea placeholder="Type your message..." />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Specialized Inputs</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid gap-2">
                            <Label>Search</Label>
                            <Search placeholder="Search users..." showClear />
                        </div>
                        <div className="grid gap-2">
                            <Label>OTP Verification</Label>
                            <OtpInput value={otp} onChange={setOtp} length={6} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Star Rating ({rating})</Label>
                            <StarRating value={rating} onValueChange={setRating} />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                        <h3 className="font-semibold leading-none tracking-tight">Selection</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="notifications"
                                    checked={notifications}
                                    onCheckedChange={setNotifications}
                                />
                                <Label htmlFor="notifications">Notifications</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={acceptTerms}
                                    onCheckedChange={setAcceptTerms}
                                />
                                <Label htmlFor="terms">Accept terms</Label>
                            </div>
                        </div>
                        <Separator />
                        <RadioGroup defaultValue="card">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card">Card</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <Label htmlFor="paypal">Paypal</Label>
                            </div>
                        </RadioGroup>
                        <Separator />
                        <div className="grid gap-2">
                            <Label>Timezone</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a timezone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                                    <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                                    <SelectItem value="est">EST (Eastern Standard Time, UTC-5)</SelectItem>
                                    <SelectItem value="cst">CST (Central Standard Time, UTC-6)</SelectItem>
                                    <SelectItem value="mst">MST (Mountain Standard Time, UTC-7)</SelectItem>
                                    <SelectItem value="pst">PST (Pacific Standard Time, UTC-8)</SelectItem>
                                    <SelectItem value="ist">IST (India Standard Time, UTC+5:30)</SelectItem>
                                    <SelectItem value="jst">JST (Japan Standard Time, UTC+9)</SelectItem>
                                    <SelectItem value="aest">AEST (Australian Eastern, UTC+10)</SelectItem>
                                    <SelectItem value="bst">BST (British Summer Time, UTC+1)</SelectItem>
                                    <SelectItem value="cet">CET (Central European Time, UTC+1)</SelectItem>
                                    <SelectItem value="bdt">BDT (Bangladesh Time, UTC+6)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>



            <DatePickerDemo />
            <CalendarDemo />
            <SliderDemo />
            <ComboboxDemo />

            {/* Toggle & Toggle Group Demo */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                    <h3 className="font-semibold leading-none tracking-tight">Toggle & Toggle Group</h3>
                    <p className="text-sm text-muted-foreground">Toggle buttons for single or grouped selection.</p>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid gap-2">
                        <Label>Single Toggle</Label>
                        <div className="flex gap-2">
                            <Toggle variant="outline">
                                <LuBold className="h-4 w-4" />
                            </Toggle>
                            <Toggle variant="outline">
                                <LuItalic className="h-4 w-4" />
                            </Toggle>
                            <Toggle variant="outline">
                                <LuUnderline className="h-4 w-4" />
                            </Toggle>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Toggle Group (Single Select)</Label>
                        <ToggleGroup type="single" variant="outline">
                            <ToggleGroupItem value="left">
                                <LuAlignLeft className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="center">
                                <LuAlignCenter className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="right">
                                <LuAlignRight className="h-4 w-4" />
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
            </div>

            {/* Native Select Demo */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                    <h3 className="font-semibold leading-none tracking-tight">Native Select</h3>
                    <p className="text-sm text-muted-foreground">Browser-native select with custom styling.</p>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid gap-2">
                        <Label>Country</Label>
                        <NativeSelect>
                            <option value="">Select a country</option>
                            <option value="us">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="ca">Canada</option>
                            <option value="au">Australia</option>
                            <option value="bd">Bangladesh</option>
                        </NativeSelect>
                    </div>
                </div>
            </div>
        </div >

    )
}
