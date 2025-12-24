import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">Component Playground</h1>
            <div className="flex flex-col gap-4">
                <Link href="/button">
                    <Button>Button Demo</Button>
                </Link>
                <Link href="/table-of-contents">
                    <Button variant="outline">Table of Contents Demo</Button>
                </Link>
                {/* Add more component links here */}
            </div>
        </div>
    );
}
