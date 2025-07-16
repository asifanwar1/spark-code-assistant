"use client";
import React from "react";
import Image from "next/image";
import { IFeatureCardProps } from "./featureCard.types";

const FeatureCard: React.FC<IFeatureCardProps> = ({
    icon = "/icons/upload.svg",
    title,
    description,
    className = "",
}) => {
    return (
        <div
            className={`
            bg-[rgba(255,255,255,0.05)]
            p-6 rounded-2xl
            w-[250px]
            h-[200px]
            border border-[rgba(255,255,255,0.1)]
            transition-all duration-300 ease-in-out
            hover:bg-[rgba(255,255,255,0.08)]
            animate-fade-in
            text-center
            ${className}
        `}
        >
            <div
                className="
                w-12 h-12
                bg-gradient-to-br from-[#667eea] to-[#764ba2]
                rounded-xl
                flex items-center justify-center
                mb-4
                m-auto
            "
            >
                <Image
                    src={icon}
                    alt={title}
                    width={38}
                    height={38}
                    className="text-white"
                />
            </div>

            <h4
                className="
                text-lg font-semibold
                mb-2
            "
            >
                {title}
            </h4>

            <p
                className="
                text-[#a0a0a0]
                text-sm
                leading-relaxed
            "
            >
                {description}
            </p>
        </div>
    );
};

export default FeatureCard;
