// spark-frontend/src/components/CodeAnalytics/QualityMetricsChart.tsx
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const data = [
    { name: "Complexity", value: 7 },
    { name: "Duplication", value: 2 },
    { name: "Test Coverage", value: 85 },
    { name: "Documentation", value: 60 },
];

const QualityMetricsChart: React.FC = () => (
    <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-white">Quality Metrics</h3>
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#a0a0a0" />
                <YAxis stroke="#a0a0a0" />
                <Tooltip />
                <Bar dataKey="value" fill="#667eea" radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default QualityMetricsChart;
