'use client'
import * as React from "react"
import { cn } from "@/lib/utils"

interface CarouselContextValue {
    currentIndex: number
    setCurrentIndex: (index: number) => void
    itemsCount: number
    setItemsCount: (count: number) => void
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Auto-play interval in ms (0 to disable) */
    autoPlay?: number
    /** Loop back to start */
    loop?: boolean
}

/**
 * Carousel/Slider component
 * 
 * @example
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 */
const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
    ({ className, children, autoPlay = 0, loop = true, ...props }, ref) => {
        const [currentIndex, setCurrentIndex] = React.useState(0)
        const [itemsCount, setItemsCount] = React.useState(0)

        React.useEffect(() => {
            if (autoPlay > 0 && itemsCount > 0) {
                const interval = setInterval(() => {
                    setCurrentIndex((prev) => {
                        if (prev >= itemsCount - 1) {
                            return loop ? 0 : prev
                        }
                        return prev + 1
                    })
                }, autoPlay)
                return () => clearInterval(interval)
            }
        }, [autoPlay, itemsCount, loop])

        return (
            <CarouselContext.Provider value={{ currentIndex, setCurrentIndex, itemsCount, setItemsCount }}>
                <div
                    ref={ref}
                    className={cn("relative", className)}
                    role="region"
                    aria-roledescription="carousel"
                    {...props}
                >
                    {children}
                </div>
            </CarouselContext.Provider>
        )
    }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        const context = React.useContext(CarouselContext)
        if (!context) throw new Error("CarouselContent must be used within Carousel")

        const childrenArray = React.Children.toArray(children)

        React.useEffect(() => {
            context.setItemsCount(childrenArray.length)
        }, [childrenArray.length, context])

        return (
            <div ref={ref} className={cn("overflow-hidden", className)} {...props}>
                <div
                    className="w-full h-full flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${context.currentIndex * 100}%)` }}
                >
                    {children}
                </div>
            </div>
        )
    }
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            className={cn("min-w-0 h-full shrink-0 grow-0 basis-full", className)}
            {...props}
        />
    )
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const context = React.useContext(CarouselContext)
    if (!context) throw new Error("CarouselPrevious must be used within Carousel")

    const canGoPrev = context.currentIndex > 0

    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border bg-background shadow-md flex items-center justify-center cursor-pointer",
                "hover:bg-accent disabled:opacity-50",
                className
            )}
            disabled={!canGoPrev}
            onClick={() => context.setCurrentIndex(context.currentIndex - 1)}
            aria-label="Previous slide"
            {...props}
        >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const context = React.useContext(CarouselContext)
    if (!context) throw new Error("CarouselNext must be used within Carousel")

    const canGoNext = context.currentIndex < context.itemsCount - 1

    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border bg-background shadow-md flex items-center justify-center cursor-pointer",
                "hover:bg-accent disabled:opacity-50",
                className
            )}
            disabled={!canGoNext}
            onClick={() => context.setCurrentIndex(context.currentIndex + 1)}
            aria-label="Next slide"
            {...props}
        >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    )
})
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
