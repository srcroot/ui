import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function SliderDemo() {
    const [singleValue, setSingleValue] = React.useState([50])
    const [rangeValue, setRangeValue] = React.useState([25, 75])
    const [priceRange, setPriceRange] = React.useState([200, 800])

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                <h3 className="font-semibold leading-none tracking-tight">Slider Variants</h3>
                <p className="text-sm text-muted-foreground">Examples of single and multi-thumb range sliders.</p>
            </div>

            <div className="p-6 space-y-8">

                {/* Single Value */}
                <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                        <Label>Single Value</Label>
                        <span className="text-sm font-medium text-muted-foreground">{singleValue[0]}%</span>
                    </div>
                    <Slider
                        value={singleValue}
                        onValueChange={setSingleValue}
                        max={100}
                        step={1}
                    />
                </div>

                <Separator />

                {/* Range Value */}
                <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                        <Label>Range Selection</Label>
                        <span className="text-sm font-medium text-muted-foreground">{rangeValue[0]} - {rangeValue[1]}</span>
                    </div>
                    <Slider
                        value={rangeValue}
                        onValueChange={setRangeValue}
                        max={100}
                        step={1}
                    />
                </div>

                <Separator />

                {/* Price Range Example */}
                <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                        <Label>Price Range ($)</Label>
                        <span className="text-sm font-medium text-muted-foreground">${priceRange[0]} - ${priceRange[1]}</span>
                    </div>
                    <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={1000}
                        step={10}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$0</span>
                        <span>$500</span>
                        <span>$1000</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
