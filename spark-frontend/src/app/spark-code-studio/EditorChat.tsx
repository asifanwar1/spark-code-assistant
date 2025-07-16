// src/components/CodeEditor/EditorChat.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { Button } from "@/components/Button";
import { InputField } from "@/components/Input";
import { IEditorChatProps } from "./editor.types";

const EditorChat: React.FC<IEditorChatProps> = ({ ydoc }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const yArrayRef = useRef<Y.Array<string>>(null);

    useEffect(() => {
        if (!ydoc) return;
        const yArray = ydoc.getArray<string>("chat");
        yArrayRef.current = yArray;
        const update = () => setMessages(yArray.toArray());
        yArray.observe(update);
        update();
        return () => yArray.unobserve(update);
    }, [ydoc]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && yArrayRef.current) {
            yArrayRef.current.push([input]);
            setInput("");
        }
    };

    return (
        <div className="w-80 bg-[rgba(255,255,255,0.03)] p-4 rounded-2xl flex flex-col h-full">
            <h3 className="text-white font-bold mb-4">Chat</h3>
            <div className="flex-1 overflow-y-auto mb-2 space-y-2">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className="bg-[#667eea] text-white rounded-xl px-3 py-2"
                    >
                        {msg}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} className="flex gap-2">
                <InputField
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                />
                <Button type="submit" disabled={!input.trim()}>
                    Send
                </Button>
            </form>
        </div>
    );
};

export default EditorChat;
