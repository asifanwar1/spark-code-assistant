"use client";
import React from "react";
import QualityMetricsChart from "./QualityMetricsChart";
import PatternDetectionList from "./PatternDetectionList";
import ImprovementSuggestions from "./ImprovementSuggestions";

const AnalyticsPage: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] py-10">
        <div className="max-w-3xl mx-auto px-4">
            <div className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                    Code Analytics
                </h1>
                <p className="text-[#a0a0a0] text-lg md:text-xl">
                    Deep insights into your code quality and patterns
                </p>
            </div>
            <QualityMetricsChart />
            <PatternDetectionList />
            <ImprovementSuggestions />
        </div>
    </div>
);

export default AnalyticsPage;
