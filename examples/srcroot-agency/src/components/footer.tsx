"use client"

import Link from "next/link"
import { LuGithub, LuTwitter, LuLinkedin } from "react-icons/lu"
import { SrcRootLogo } from "@/components/srcroot-logo"

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="w-fit flex justify-start items-center space-x-2">
                            <SrcRootLogo className="text-primary h-10 w-100" />
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Building robust digital solutions for forward-thinking companies.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">About</Link></li>
                            <li><Link href="#" className="hover:text-primary">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Services</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">Web Development</Link></li>
                            <li><Link href="#" className="hover:text-primary">Mobile Apps</Link></li>
                            <li><Link href="#" className="hover:text-primary">Cloud Solutions</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <LuGithub className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <LuTwitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <LuLinkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 py-4 border-t text-center text-sm text-muted-foreground">
                {new Date().getFullYear()} © SrcRoot Software Solution Ltd. All rights reserved.
            </div>
        </footer>
    )
}
