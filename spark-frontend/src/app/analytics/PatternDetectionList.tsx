// spark-frontend/src/components/CodeAnalytics/PatternDetectionList.tsx
import React from "react";

const patterns = [
    { type: "Good", description: "Consistent naming conventions" },
    { type: "Good", description: "Proper use of async/await" },
    { type: "Bad", description: "Nested loops detected" },
    { type: "Bad", description: "Large functions (>50 lines)" },
];

const PatternDetectionList: React.FC = () => (
    <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-white">Pattern Detection</h3>
        <ul className="space-y-2">
            {patterns.map((p, i) => (
                <li key={i} className="flex items-center gap-3">
                    <span
                        className={`inline-block w-2 h-2 rounded-full ${
                            p.type === "Good" ? "bg-green-400" : "bg-red-400"
                        }`}
                    />
                    <span className="text-[#e0e0e0]">{p.description}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default PatternDetectionList;
