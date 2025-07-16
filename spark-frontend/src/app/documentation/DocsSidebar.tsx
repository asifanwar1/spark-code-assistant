// src/components/Documentation/DocsSidebar.tsx
"use client";
import React, { useState } from "react";

const docsList = [
    { id: "intro", title: "Introduction" },
    { id: "setup", title: "Setup Guide" },
    { id: "api", title: "API Reference" },
    { id: "faq", title: "FAQ" },
];

interface DocsSidebarProps {
    selected: string;
    onSelect: (id: string) => void;
}

const DocsSidebar: React.FC<DocsSidebarProps> = ({ selected, onSelect }) => {
    const [search, setSearch] = useState("");

    const filteredDocs = docsList.filter((doc) =>
        doc.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <aside className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-4 md:p-6 shadow md:h-full">
            <input
                type="text"
                placeholder="Search docs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-4 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.08)] text-white border border-[rgba(255,255,255,0.15)] focus:outline-none"
            />
            <ul className="space-y-2">
                {filteredDocs.map((doc) => (
                    <li key={doc.id}>
                        <button
                            onClick={() => onSelect(doc.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                selected === doc.id
                                    ? "bg-[#667eea] text-white"
                                    : "text-[#e0e0e0] hover:bg-[rgba(255,255,255,0.08)]"
                            }`}
                        >
                            {doc.title}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default DocsSidebar;
