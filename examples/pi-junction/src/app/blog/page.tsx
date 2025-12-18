import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const BLOG_POSTS = [
    {
        slug: "future-of-diy-electronics",
        title: "The Future of DIY Electronics",
        excerpt: "Exploring upcoming trends in the maker community and what new tech is on the horizon.",
        date: "Dec 15, 2024",
        category: "Tech Trends",
        image: "bg-blue-500/10"
    },
    {
        slug: "building-your-first-robot",
        title: "Building Your First Robot: A Beginner's Guide",
        excerpt: "Step-by-step instructions on how to select components and assemble your very first robotic companion.",
        date: "Dec 10, 2024",
        category: "Tutorials",
        image: "bg-purple-500/10"
    },
    {
        slug: "raspberry-pi-5-review",
        title: "Raspberry Pi 5: Is It Worth The Upgrade?",
        excerpt: "A deep dive into the performance benchmarks and new features of the latest Raspberry Pi model.",
        date: "Dec 05, 2024",
        category: "Reviews",
        image: "bg-green-500/10"
    }
]

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <h1 className="text-3xl font-bold tracking-tight">The Junction Log</h1>
                <p className="text-muted-foreground max-w-2xl">
                    News, tutorials, and insights for the tech enthusiast.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {BLOG_POSTS.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                        <Card className="h-full overflow-hidden transition-colors hover:border-primary/50">
                            <div className={`aspect-video w-full ${post.image} flex items-center justify-center text-muted-foreground/20`}>
                                <span className="text-4xl font-bold">IMG</span>
                            </div>
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="secondary">{post.category}</Badge>
                                    <span className="text-xs text-muted-foreground">{post.date}</span>
                                </div>
                                <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {post.excerpt}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
