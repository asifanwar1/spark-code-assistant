// src/components/Team/TeamOverview.tsx
import React from "react";
import { Button } from "@/components/Button";

const members = [
    { name: "Alice", role: "Lead" },
    { name: "Bob", role: "Developer" },
    { name: "Carol", role: "Reviewer" },
];

const TeamOverview: React.FC = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-white">Team Overview</h2>
        <p className="text-[#a0a0a0] mb-6">
            Collaborate with your team on code reviews, discussions, and shared
            thoughts.
        </p>
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Members</h3>
            <ul className="space-y-2">
                {members.map((m, i) => (
                    <li key={i} className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#667eea] flex items-center justify-center text-white font-bold">
                            {m.name[0]}
                        </span>
                        <span className="text-[#e0e0e0]">{m.name}</span>
                        <span className="text-xs text-[#a0a0a0] ml-2">
                            {m.role}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
        <form className="flex gap-2">
            <input
                type="email"
                placeholder="Invite by email"
                className="flex-1 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.08)] text-white border border-[rgba(255,255,255,0.15)] focus:outline-none"
            />
            <Button type="submit" size="md">
                Invite
            </Button>
        </form>
    </div>
);

export default TeamOverview;
