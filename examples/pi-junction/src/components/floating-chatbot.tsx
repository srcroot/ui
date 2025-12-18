"use client"

import * as React from "react"
import { Send, User, Bot, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Chatbot,
    ChatbotHeader,
    ChatbotContent,
    ChatbotMessage,
    ChatbotFooter,
} from "@/components/ui/chatbot"

interface Message {
    id: string
    role: "user" | "bot"
    content: string
}

export function FloatingChatbot() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [messages, setMessages] = React.useState<Message[]>([
        {
            id: "1",
            role: "bot",
            content: "Hello! Welcome to Pi Junction. How can I assist you with your tech needs today?",
        },
    ])
    const [inputValue, setInputValue] = React.useState("")
    const contentRef = React.useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom of messages
    React.useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight
        }
    }, [messages, isOpen])

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
        }

        setMessages((prev) => [...prev, newMessage])
        setInputValue("")

        // Simulate bot response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "bot",
                    content: "Thanks for your message! Our AI support agent is currently processing your request.",
                },
            ])
        }, 1000)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {isOpen && (
                <div className="w-[350px] rounded-lg shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-10 fade-in">
                    <Chatbot className="h-[500px] border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <ChatbotHeader className="justify-between bg-primary/5">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                                    <Bot className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm">Pi Assistant</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Online
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close chatbot</span>
                            </Button>
                        </ChatbotHeader>

                        <ChatbotContent ref={contentRef}>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div className={`flex items-end gap-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"
                                        }`}>
                                        {message.role === "bot" && (
                                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/10">
                                                <Bot className="h-3.5 w-3.5 text-primary" />
                                            </div>
                                        )}
                                        <ChatbotMessage variant={message.role} className="shadow-sm">
                                            {message.content}
                                        </ChatbotMessage>
                                    </div>
                                </div>
                            ))}
                        </ChatbotContent>

                        <ChatbotFooter className="bg-background/50">
                            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                                <Input
                                    placeholder="Ask about products..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="bg-background"
                                />
                                <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Send</span>
                                </Button>
                            </form>
                        </ChatbotFooter>
                    </Chatbot>
                </div>
            )}

            <Button
                size="lg"
                className="h-14 w-14 p-2 aspect-square rounded-full shadow-lg hover:scale-105 transition-transform duration-200 bg-primary text-primary-foreground"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <X className="h-12 w-12 aspect-square" />
                ) : (
                    <MessageCircle className="h-12 w-12 aspect-square" />
                )}
            </Button>
        </div>
    )
}
