import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { CategorySection } from "@/components/category-section"
import { HeroSection } from "@/components/hero-section"

// Mock Data
const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Quantum Processor X1",
    description: "Next-gen computing power for the AI era. Unmatched speed and efficiency.",
    price: "$1,299",
    image: "/assets/products/processor.png",
  },
  {
    id: "2",
    name: "Neural Link Headset",
    description: "Immersive interface for direct neural control. Experience the metaverse like never before.",
    price: "$599",
    image: "/assets/products/headset.png",
  },
  {
    id: "3",
    name: "Holographic Display Module",
    description: "3D volumetric display for engineering and design applications. Crystal clear resolution.",
    price: "$899",
    image: "/assets/products/hologram.png",
  },
  {
    id: "4",
    name: "Cybernetic Arm v3",
    description: "Enhance your capabilities with this durable, responsive cybernetic limb.",
    price: "$2,499",
    image: "/assets/products/arm.png",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategorySection />

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Top-rated components curated for the ultimate build.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join the Junction</h2>
              <p className="text-muted-foreground">Sign up for our newsletter to get the latest tech news and exclusive deals.</p>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              {/* Input not available in global scope but we have it from ui/input */}
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Enter your email" type="email" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div >
  )
}
