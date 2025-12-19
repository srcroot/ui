import Image from "next/image"

export function PiLogo({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={`relative ${className}`} {...props}>
            <Image
                src="/assets/logo.png"
                alt="Pi Junction Logo"
                fill
                className="object-contain"
                priority
            />
        </div>
    )
}
