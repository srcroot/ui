import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HERO_SLIDES = [
    {
        id: 1,
        gradient: "from-purple-900 via-gray-900 to-black",
        title: "The Future of Tech is Here",
        description: "Discover the latest in quantum computing, cybernetics, and advanced interface devices.",
        buttons: [
            {
                text: "Shop Now",
                href: "/products",
                variant: "default" as const,
                className: "h-11 px-8",
                icon: true
            },
            {
                text: "Learn More",
                href: "/about",
                variant: "outline" as const,
                className: "h-11 px-8 text-white border-white hover:bg-white hover:text-black hover:border-white bg-transparent",
                icon: false
            }
        ]
    },
    {
        id: 2,
        gradient: "from-blue-900 via-gray-900 to-black",
        title: "Neural Link Interfaces",
        description: "Seamlessly connect with the digital world. Experience zero-latency control.",
        buttons: [
            {
                text: "View Product",
                href: "/products",
                variant: "secondary" as const,
                className: "h-11 px-8",
                icon: false
            }
        ]
    },
    {
        id: 3,
        gradient: "from-cyan-900 via-gray-900 to-black",
        title: "Holographic Displays",
        description: "Bring your designs to life in true 3D. The ultimate tool for creators.",
        buttons: [
            {
                text: "Explore",
                href: "/products",
                variant: "default" as const,
                className: "h-11 px-8 bg-cyan-600 hover:bg-cyan-700 text-white",
                icon: false
            }
        ]
    }
];

export function HeroSection() {
    return (
        <section className="relative w-full h-[clamp(100vh-16rem,100vh,calc(100vh-24rem))] bg-black overflow-hidden">
            <Carousel className="h-full" autoPlay={5000} loop>
                <CarouselContent className="h-full flex items-center">
                    {HERO_SLIDES.map((slide, index) => (
                        <CarouselItem key={slide.id}>
                            <div className="relative w-full h-full flex items-center justify-center">
                                <div className={`absolute h-full inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${slide.gradient}`}></div>
                                <div className="absolute h-full inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                                <div className="container mx-auto relative z-10 px-4 md:px-6 text-center">
                                    <div className="space-y-4">
                                        <h1 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white ${index === 0 ? "animate-in fade-in slide-in-from-bottom-4 duration-1000" : ""}`}>
                                            {slide.title}
                                        </h1>
                                        <p className={`mx-auto max-w-[700px] text-gray-400 md:text-xl ${index === 0 ? "animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200" : ""}`}>
                                            {slide.description}
                                        </p>
                                        <div className={`flex flex-col md:flex-row justify-center items-center gap-4 ${index === 0 ? "animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300" : ""}`}>
                                            {slide.buttons.map((btn, btnIndex) => (
                                                <Button key={btnIndex} asChild size="lg" variant={btn.variant} className={btn.className}>
                                                    <Link href={btn.href}>
                                                        {btn.text} {btn.icon && <ArrowRight className="ml-2 h-4 w-4" />}
                                                    </Link>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-transparent border-white/20 text-white hover:bg-white/10 hidden md:flex" />
                <CarouselNext className="right-4 bg-transparent border-white/20 text-white hover:bg-white/10 hidden md:flex" />
            </Carousel>
        </section>
    );
}