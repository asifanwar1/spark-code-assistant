// src/components/Team/TeamSidebar.tsx
"use client";
import React from "react";
import { ITeamSidebarProps } from "./teams.types";

const sections = [
    { key: "overview", label: "Overview" },
    { key: "projects", label: "Projects" },
    { key: "activity", label: "Activity" },
    { key: "chat", label: "Chat" },
];

const TeamSidebar: React.FC<ITeamSidebarProps> = ({ selected, onSelect }) => (
    <nav className="flex md:flex-col gap-2 md:gap-4 bg-[rgba(255,255,255,0.03)] md:min-w-[200px] p-2 md:p-6 rounded-2xl shadow md:h-full">
        {sections.map((s) => (
            <button
                key={s.key}
                onClick={() => onSelect(s.key)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selected === s.key
                        ? "bg-[#667eea] text-white"
                        : "text-[#e0e0e0] hover:bg-[rgba(255,255,255,0.08)]"
                }`}
            >
                {s.label}
            </button>
        ))}
    </nav>
);

export default TeamSidebar;
