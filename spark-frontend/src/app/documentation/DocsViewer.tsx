// src/components/Documentation/DocsViewer.tsx
"use client";
import React from "react";
import ReactMarkdown from "react-markdown";

const docsContent: Record<string, string> = {
    intro: "# Welcome!\nThis is the **introduction** to your project documentation.",
    setup: "## Setup Guide\n1. Clone the repo\n2. Run `npm install`\n3. Start coding!",
    api: "### API Reference\n- `/api/users` - Get users\n- `/api/projects` - Get projects",
    faq: "#### FAQ\n**Q:** How do I use this?\n**A:** Just start typing!",
};

interface DocsViewerProps {
    docId: string;
}

const DocsViewer: React.FC<DocsViewerProps> = ({ docId }) => (
    <div className="prose prose-invert max-w-none text-[#e0e0e0]">
        <ReactMarkdown>
            {docsContent[docId] || "Select a document to view."}
        </ReactMarkdown>
    </div>
);

export default DocsViewer;
