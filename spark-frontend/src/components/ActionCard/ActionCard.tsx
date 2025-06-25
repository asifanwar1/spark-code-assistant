"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";

interface Feature {
    text: string;
    icon?: React.ReactNode;
}

interface ActionCardProps {
    title: string;
    description: string;
    features: Feature[];
    icon: string | StaticImageData;
    href: string;
    className?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
    title,
    description,
    features,
    icon = "/icons/upload.svg",
    href,
    className = "",
}) => {
    return (
        <Link href={href} className="block">
            <div
                className={`
        bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px]
        border border-[rgba(255,255,255,0.1)]
        rounded-[20px] p-8
        w-[300px]
        h-[350px]
        cursor-pointer
        transition-all duration-300 ease-in-out
        relative overflow-hidden
        hover:-translate-y-2
        hover:bg-[rgba(255,255,255,0.08)]
        hover:border-[rgba(102,126,234,0.3)]
        group
        text-center
        ${className}
      `}
            >
                {/* Gradient line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                {/* Icon */}
                <div className="w-[70px] h-[70px] m-auto bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center mb-5">
                    <Image
                        src={icon}
                        alt="spark icon"
                        width={48}
                        height={48}
                        className="text-white"
                    />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>

                {/* Description */}
                <p className="text-[#a0a0a0] leading-relaxed mb-5">
                    {description}
                </p>

                {/* Features */}
                <ul className="space-y-2 ">
                    {features.map((feature, index) => (
                        <li
                            key={index}
                            className="text-[#22c55e] text-sm flex items-center gap-2"
                        >
                            {feature.text}
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
    );
};

export default ActionCard;
