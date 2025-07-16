"use client";
import React from "react";
import { IHeroSectionProps } from "./heroSection.types";

const HeroSection: React.FC<IHeroSectionProps> = ({
    title = "AI-Powered Code Assistant",
    subtitle = "Upload your entire codebase, analyze UI screenshots, and get intelligent solutions that match your coding standards",
    className = "",
}) => {
    return (
        <div
            className={`
            py-[60px] text-center
            bg-[radial-gradient(ellipse_at_center,rgba(102,126,234,0.1)_0%,transparent_70%)]
            mt-10
            ${className}
        `}
        >
            <div className="container px-4">
                <h1
                    className="
                    text-[48px] font-extrabold mb-4
                    bg-gradient-to-br from-white to-[#a0a0a0]
                    bg-clip-text text-transparent
                    animate-fade-in
                "
                >
                    {title}
                </h1>
                <p
                    className="
                    text-[20px] text-[#a0a0a0]
                    mb-10 max-w-[600px] mx-auto
                    animate-fade-in
                "
                >
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

export default HeroSection;
