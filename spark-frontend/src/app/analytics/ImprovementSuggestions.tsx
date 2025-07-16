// spark-frontend/src/components/CodeAnalytics/ImprovementSuggestions.tsx
import React from "react";

const suggestions = [
    "Refactor large functions into smaller, reusable components.",
    "Increase test coverage for critical modules.",
    "Reduce code duplication by extracting common logic.",
    "Add more inline documentation for complex logic.",
];

const ImprovementSuggestions: React.FC = () => (
    <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4 text-white">
            Improvement Suggestions
        </h3>
        <ul className="list-disc pl-6 space-y-2">
            {suggestions.map((s, i) => (
                <li key={i} className="text-[#e0e0e0]">
                    {s}
                </li>
            ))}
        </ul>
    </div>
);

export default ImprovementSuggestions;
