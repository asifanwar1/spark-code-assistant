"use client";
import React, { useRef, useState, useEffect } from "react";
import { InputField } from "@/components/Input";
import { Button } from "@/components/Button";

interface Message {
    id: number;
    sender: "user" | "ai";
    text: string;
}

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "ai",
            text: "Hello! I'm your AI coding assistant. How can I help you today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            sender: "user",
            text: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Simulate AI response (replace with real API call)
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    sender: "ai",
                    text: `You said: "${userMessage.text}"\n\n(Here would be the AI's helpful coding response!)`,
                },
            ]);
            setIsLoading(false);
        }, 1200);
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
            {/* Header */}
            <div className="p-4 border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)]">
                <h1 className="text-2xl font-bold bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                    AI Coding Assistant
                </h1>
                <p className="text-[#a0a0a0] text-sm">
                    Chat with your AI assistant for coding help and suggestions.
                </p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-2 md:px-8 py-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${
                            msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-[80%] md:max-w-[60%] px-4 py-3 rounded-2xl shadow ${
                                msg.sender === "user"
                                    ? "bg-[#667eea] text-white rounded-br-none"
                                    : "bg-[rgba(255,255,255,0.08)] text-[#e0e0e0] rounded-bl-none"
                            } whitespace-pre-line`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
                onSubmit={handleSend}
                className="w-full p-4 border-t border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] flex gap-2"
            >
                <div className="flex-1">
                    <InputField
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                handleSend(e);
                            }
                        }}
                        className="w-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-xl p-4 text-white text-base outline-none transition-all duration-300 focus:border-[#667eea] focus:bg-[rgba(255,255,255,0.15)]"
                        disabled={isLoading}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="h-14 mt-auto"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        "Send"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default ChatPage;
