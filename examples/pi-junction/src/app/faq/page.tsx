import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">Frequently Asked Questions</h1>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Returns & Exchanges</AccordionTrigger>
                    <AccordionContent>
                        We offer a 30-day return policy for all unused items in their original packaging.
                        To initiate a return, please visit your orders page and select the item you wish to return.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Shipping Information</AccordionTrigger>
                    <AccordionContent>
                        We ship worldwide! Standard shipping takes 3-5 business days within the US, and 7-14 days internationally.
                        Expedited shipping options are available at checkout.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Warranty Policy</AccordionTrigger>
                    <AccordionContent>
                        All our products come with a standard 1-year manufacturer warranty covering defects in materials and workmanship.
                        Extended warranties are available for select products.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Payment Methods</AccordionTrigger>
                    <AccordionContent>
                        We accept all major credit cards (Visa, MasterCard, Amex), PayPal, and Apple Pay.
                        Crypto payments are coming soon!
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
