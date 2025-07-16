// src/components/Team/TeamActivity.tsx
import React from "react";

const activities = [
    { user: "Alice", action: "pushed new code", time: "2m ago" },
    { user: "Bob", action: "commented on PR", time: "10m ago" },
    { user: "Carol", action: "created a new project", time: "1h ago" },
];

const TeamActivity: React.FC = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-white">Team Activity</h2>
        <ul className="space-y-3">
            {activities.map((a, i) => (
                <li
                    key={i}
                    className="flex items-center gap-3 bg-[rgba(255,255,255,0.05)] rounded-xl px-4 py-3"
                >
                    <span className="w-8 h-8 rounded-full bg-[#764ba2] flex items-center justify-center text-white font-bold">
                        {a.user[0]}
                    </span>
                    <span className="text-[#e0e0e0]">{a.user}</span>
                    <span className="text-[#a0a0a0]">{a.action}</span>
                    <span className="ml-auto text-xs text-[#a0a0a0]">
                        {a.time}
                    </span>
                </li>
            ))}
        </ul>
    </div>
);

export default TeamActivity;
