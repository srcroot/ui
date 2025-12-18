import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { PiLogo } from "@/components/pi-logo";
import Link from "next/link";
import { FloatingChatbot } from "@/components/floating-chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pi Junction | Future Tech Store",
  description: "The destination for premium tech components and futuristic gear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <SidebarProvider className="w-full">
          <CartProvider>
            <Sidebar collapsible="offcanvas" className="hidden md:hidden">
              <SidebarContent>
                <SidebarHeader>
                  <div className="flex items-center px-2 pt-2">
                    <PiLogo className="mr-2 h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Pi Junction</span>
                  </div>
                </SidebarHeader>
                <SidebarMenu className="px-2 py-4">
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild size="lg">
                      <Link href="/products" className="font-medium text-base">Products</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild size="lg">
                      <Link href="/components" className="font-medium text-base">Components</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild size="lg">
                      <Link href="/deals" className="font-medium text-base">Deals</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild size="lg">
                      <Link href="/about" className="font-medium text-base">About</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
            <div className="flex flex-1 flex-col min-h-screen w-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
          <FloatingChatbot />
        </SidebarProvider>
      </body>
    </html >
  );
}
