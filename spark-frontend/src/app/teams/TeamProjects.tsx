// src/components/Team/TeamProjects.tsx
import React from "react";

const projects = [
    { name: "AI Chatbot", status: "Active" },
    { name: "Analytics Dashboard", status: "In Review" },
];

const TeamProjects: React.FC = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-white">Shared Projects</h2>
        <ul className="space-y-3">
            {projects.map((p, i) => (
                <li
                    key={i}
                    className="flex items-center justify-between bg-[rgba(255,255,255,0.05)] rounded-xl px-4 py-3"
                >
                    <span className="text-[#e0e0e0] font-medium">{p.name}</span>
                    <span className="text-xs px-2 py-1 rounded bg-[#667eea] text-white">
                        {p.status}
                    </span>
                </li>
            ))}
        </ul>
    </div>
);

export default TeamProjects;
