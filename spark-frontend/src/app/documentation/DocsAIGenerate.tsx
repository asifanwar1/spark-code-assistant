// src/components/Documentation/DocsAIGenerate.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/Button";

const DocsAIGenerate: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleGenerate = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1200); // Simulate API call
    };

    return (
        <div className="mb-6 flex items-center gap-4">
            <Button onClick={handleGenerate} disabled={loading}>
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    "Auto-Generate Docs with AI"
                )}
            </Button>
            <span className="text-[#a0a0a0] text-sm">
                Generate, manage and search project documentation with AI
                assistance.
            </span>
        </div>
    );
};

export default DocsAIGenerate;
