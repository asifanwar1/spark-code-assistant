// src/components/BrandingSection/BrandingSection.tsx
"use client";
import React from "react";
import type { Feature } from "@/constants/Features";
import type { Stats } from "@/constants/Stats";

interface BrandingSectionProps {
    features: Feature[];
    stats: Stats[];
    heading: string;
    text: string;
    className?: string;
}

const BrandingSection: React.FC<BrandingSectionProps> = ({
    features = [],
    stats = [],
    heading = "",
    text = "",
    className = "",
}) => {
    // const stats: StatItem[] = [
    //     { number: "50K+", label: "Developers" },
    //     { number: "1M+", label: "Code Reviews" },
    //     { number: "99.9%", label: "Uptime" },
    // ];

    return (
        <div className={`${className}`}>
            <div>
                <div className="animate-fade-in">
                    {/* Logo */}
                    <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-6">
                        Spark Code Assistant
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent leading-tight">
                        {heading}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-[#a0a0a0] mb-10 leading-relaxed max-w-3xl">
                        {text}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-4 mb-10">
                        {features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-4 p-4 bg-[rgba(255,255,255,0.05)] rounded-xl border border-[rgba(255,255,255,0.1)] transition-all duration-300 hover:bg-[rgba(255,255,255,0.08)] hover:translate-x-2"
                            >
                                {/* {feature.icon} */}
                                <span className="text-[#e0e0e0] text-base md:text-lg">
                                    {feature.text}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* Stats Grid */}
                    {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-10"> */}
                    <div className="flex flex-wrap gap-5 mt-10">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-5 bg-[rgba(255,255,255,0.05)] rounded-2xl w-[150px] h-[120px] border border-[rgba(255,255,255,0.1)]"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-[#667eea] mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-xs md:text-sm text-[#a0a0a0] uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandingSection;
