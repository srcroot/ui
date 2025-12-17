"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { CircuitPattern, GridPattern, WavePattern } from "@/components/ui/patterns"
import { LuArrowRight, LuCheck, LuCode, LuSmartphone, LuCloud, LuZap } from "react-icons/lu"

export default function Home() {
  return (
    <ScrollArea orientation="vertical" scrollbarSize="thin" className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 py-24 md:py-32 lg:py-40 overflow-hidden">
          {/* Background Patterns */}
          <div className="absolute inset-0 -z-10 bg-background" />
          <WavePattern className="text-primary  opacity-20 top-auto bottom-0 h-64" />
          <GridPattern className="text-muted-foreground opacity-[0.05]" />
          {/* <CircuitPattern className="text-primary opacity-[0.05]" /> */}
          <div className="absolute -right-20 -top-20 h-[500px] w-[500px] bg-primary/20 blur-[100px] rounded-full mix-blend-screen opacity-50" />
          <div className="absolute -left-20 top-40 h-[300px] w-[300px] bg-blue-500/20 blur-[100px] rounded-full mix-blend-screen opacity-50" />
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm rounded-full">
              🚀 Transforming Ideas into Reality
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              Digital Excellence with <br className="hidden sm:block" />
              <span className="text-primary">SrcRoot Software.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
              We build scalable, high-performance software solutions tailored to your business needs.
              From enterprise web applications to next-gen mobile experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base rounded-full">
                Start Your Project
                <LuArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full">
                View Portfolio
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="px-6 py-24 bg-muted/40 relative overflow-hidden">
          <GridPattern className="text-muted-foreground opacity-[0.05]" />
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Expertise</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive software services designed to drive growth and efficiency.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Web Development",
                  description: "Modern, responsive websites and web applications built with Next.js and React.",
                  icon: LuCode
                },
                {
                  title: "Mobile Solutions",
                  description: "Native and cross-platform mobile apps that provide seamless user experiences.",
                  icon: LuSmartphone
                },
                {
                  title: "Cloud Infrastructure",
                  description: "Scalable cloud architecture and DevOps services to ensure reliability.",
                  icon: LuCloud
                }
              ].map((service, index) => (
                <Card key={index} className="border-border/50 bg-card/50 backdrop-blur hover:bg-card hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Preview (Feature Section) */}
        <section id="projects" className="px-6 py-24 relative overflow-hidden">
          <CircuitPattern className="text-primary opacity-[0.03]" />
          <div className="container mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="col-span-1 lg:col-span-2 text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  Building the Future,<br />One Line at a Time.
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Our team of expert engineers and designers work collaboratively to deliver
                  software that not only meets but exceeds expectations. We pride ourselves
                  on code quality, performance, and user-centric design.
                </p>

                <div className="space-y-4 flex flex-col items-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-left">
                    {[
                      "Enterprise-grade security",
                      "Scalable architecture",
                      "Continuous component integration",
                      "24/7 dedicated support"
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <LuCheck className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="mt-8" variant="secondary">
                    Learn More About Us
                  </Button>
                </div>
                <div className="relative col-span-1 lg:col-span-2 mt-12">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10" />
                  {/* <ScrollArea className="w-full whitespace-nowrap rounded-lg border bg-background/50 backdrop-blur" orientation="horizontal"> */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {[
                      {
                        title: "FinTech Dashboard",
                        description: "Real-time financial data visualization platform for enterprise banking clients.",
                        tags: ["Next.js", "TypeScript", "D3.js"]
                      },
                      {
                        title: "E-Commerce App",
                        description: "High-performance mobile application for a global fashion retailer.",
                        tags: ["React Native", "GraphQL", "Stripe"]
                      },
                      {
                        title: "Healthcare Portal",
                        description: "Secure patient management system compliant with HIPAA regulations.",
                        tags: ["React", "Node.js", "PostgreSQL"]
                      },
                      {
                        title: "AI Content Generator",
                        description: "SaaS platform leveraging LLMs to help marketers create content faster.",
                        tags: ["OpenAI API", "Python", "Redis"]
                      },
                    ].map((project, i) => (
                      <Card key={i} className="w-[clamp(250px, 350px, 450px)] shrink-0 border-primary/20 bg-card/40">
                        <div className="aspect-video w-full rounded-t-lg bg-muted/50 flex items-center justify-center border-b border-border/50">
                          <LuCode className="h-12 w-12 text-primary/40" />
                        </div>
                        <CardHeader>
                          <CardTitle>{project.title}</CardTitle>
                          <CardDescription className="whitespace-normal line-clamp-2">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-2 flex-wrap">
                            {project.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {/* <ScrollBar orientation="horizontal" /> */}
                  {/* </ScrollArea> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-6 py-24 bg-muted/40 relative overflow-hidden">
          <WavePattern className="text-primary opacity-[0.03] rotate-180 top-0 bottom-auto h-64" />
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Let's Work Together</h2>
              <p className="text-muted-foreground">
                Have a project in mind? We'd love to hear from you.
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form className="grid gap-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="Project Inquiry" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea id="message" placeholder="Tell us about your project..." className="min-h-[150px]" />
                  </div>
                  <Button size="lg" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollBar orientation="vertical" />
    </ScrollArea >
  )
}
