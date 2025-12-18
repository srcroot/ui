import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4 px-4">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
            <Button asChild>
                <Link href="/">
                    Return Home
                </Link>
            </Button>
        </div>
    )
}
