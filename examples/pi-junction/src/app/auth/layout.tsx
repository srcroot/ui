import { PiLogo } from "@/components/pi-logo"
import Link from "next/link"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-sm space-y-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Link href="/">
                        <PiLogo className="h-10 w-10 text-primary" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Pi Junction</h1>
                </div>
                {children}
            </div>
        </div>
    )
}
