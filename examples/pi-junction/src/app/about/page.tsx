import { PiLogo } from "@/components/pi-logo"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-24">
            <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
                <PiLogo className="h-24 w-24 text-primary" />
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">About Pi Junction</h1>
                <p className="text-xl text-muted-foreground">
                    Bridging the gap between biological potential and technological advancement.
                </p>
            </div>

            <Separator className="my-12" />

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                    <p className="text-muted-foreground text-lg">
                        At Pi Junction, we believe that the future of humanity lies in the seamless integration with technology.
                        We source the finest cybernetic enhancements, quantum computing modules, and next-gen interfaces to empower creators, explorers, and visionaries.
                    </p>
                    <p className="text-muted-foreground text-lg">
                        Founded in 2042, we started as a small electronics scrapyard and grew into the solar system's premier supplier of high-end consumer tech.
                    </p>
                </div>
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-gray-900 to-black"></div>
                    <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                    <span className="relative z-10 text-muted-foreground font-semibold">HQ Visualization</span>
                </div>
            </div>

            <div className="mt-24 grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6 rounded-lg bg-card border shadow-sm">
                    <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
                    <p className="text-muted-foreground">Every component is rigorously tested in our zero-g labs ensuring 99.9% reliability.</p>
                </div>
                <div className="p-6 rounded-lg bg-card border shadow-sm">
                    <h3 className="text-xl font-bold mb-2">Global Shipping</h3>
                    <p className="text-muted-foreground">From Neo-Tokyo to the Lunar Colonies, we deliver anywhere within 24 hours.</p>
                </div>
                <div className="p-6 rounded-lg bg-card border shadow-sm">
                    <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                    <p className="text-muted-foreground">Our AI assistants and human specialists are always ready to help with installation and troubleshooting.</p>
                </div>
            </div>
        </div>
    )
}
