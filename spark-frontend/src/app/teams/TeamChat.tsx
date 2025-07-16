// src/components/Team/TeamChat.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { InputField } from "@/components/Input";
import { Button } from "@/components/Button";
import { IMessage } from "./teams.types";

const TeamChat: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), sender: "You", text: input },
        ]);
        setInput("");
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className="flex justify-end">
                        <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-[#667eea] text-white rounded-br-none whitespace-pre-line">
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form
                onSubmit={handleSend}
                className="w-full p-2 border-t border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] flex gap-2"
            >
                <div className="flex-1">
                    <InputField
                        type="text"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-xl p-4 text-white text-base outline-none transition-all duration-300 focus:border-[#667eea] focus:bg-[rgba(255,255,255,0.15)]"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={!input.trim()}
                    className="px-6 py-3"
                >
                    Send
                </Button>
            </form>
        </div>
    );
};

export default TeamChat;
