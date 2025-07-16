// src/app/documentation/page.tsx
"use client";
import React, { useState } from "react";
import DocsSidebar from "./DocsSidebar";
import DocsViewer from "./DocsViewer";
import DocsAIGenerate from "./DocsAIGenerate";

const DocumentationPage: React.FC = () => {
    const [selectedDoc, setSelectedDoc] = useState("intro");

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] py-10">
            <div className="max-w-6xl mx-auto px-2 md:px-8 flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <div className="md:w-1/4">
                    <DocsSidebar
                        selected={selectedDoc}
                        onSelect={setSelectedDoc}
                    />
                </div>
                {/* Main Content */}
                <div className="flex-1 bg-[rgba(255,255,255,0.05)] rounded-2xl p-6 min-h-[60vh]">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                            Documentation
                        </h1>
                        <p className="text-[#a0a0a0] text-base md:text-lg">
                            Generate, manage and search project documentation
                            with AI assistance.
                        </p>
                    </div>
                    <DocsAIGenerate />
                    <DocsViewer docId={selectedDoc} />
                </div>
            </div>
        </div>
    );
};

export default DocumentationPage;
