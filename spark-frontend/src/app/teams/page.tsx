// src/app/teams/page.tsx
"use client";
import React, { useState } from "react";
import TeamSidebar from "./TeamSidebar";
import TeamOverview from "./TeamOverview";
import TeamProjects from "./TeamProjects";
import TeamActivity from "./TeamActivity";
import TeamChat from "./TeamChat";

const Teams: React.FC = () => {
    const [section, setSection] = useState("overview");

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] py-10">
            <div className="max-w-6xl mx-auto px-2 md:px-8 flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <div className="md:w-1/4">
                    <TeamSidebar selected={section} onSelect={setSection} />
                </div>
                {/* Main Content */}
                <div className="flex-1 bg-[rgba(255,255,255,0.05)] rounded-2xl p-6 min-h-[60vh]">
                    {section === "overview" && <TeamOverview />}
                    {section === "projects" && <TeamProjects />}
                    {section === "activity" && <TeamActivity />}
                    {section === "chat" && <TeamChat />}
                </div>
            </div>
        </div>
    );
};

export default Teams;
