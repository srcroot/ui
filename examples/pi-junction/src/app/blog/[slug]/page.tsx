import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { use } from "react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    return (
        <article className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-3xl">
            <Button variant="ghost" size="sm" asChild className="mb-8">
                <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Link>
            </Button>

            <header className="mb-8 space-y-4">
                <div className="flex items-center gap-2">
                    <Badge>Tech Trends</Badge>
                    <span className="text-sm text-muted-foreground">Dec 15, 2024</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight capitalize">{slug.replace(/-/g, ' ')}</h1>
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-secondary" />
                    <div>
                        <p className="font-medium">Alex Chen</p>
                        <p className="text-xs text-muted-foreground">Hardware Editor</p>
                    </div>
                </div>
            </header>

            <div className="aspect-video w-full bg-secondary/30 rounded-lg mb-12 flex items-center justify-center">
                <span className="text-muted-foreground">Featured Image Placeholder</span>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="lead">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2>The Rise of Microcontrollers</h2>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <blockquote>
                    "The only limit to what you can build is your imagination (and your budget)."
                </blockquote>

                <h3>What This Means for Makers</h3>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                    eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <ul>
                    <li>More accessible hardware</li>
                    <li>Better open-source tools</li>
                    <li>Community-driven innovation</li>
                </ul>
            </div>
        </article>
    )
}
