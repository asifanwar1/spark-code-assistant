"use client";
import React from "react";
import Image from "next/image";

interface FooterLink {
    label: string;
    href: string;
}

interface SocialLink {
    platform: string;
    href: string;
    icon: React.ReactNode;
}

interface FooterProps {
    companyInfo: {
        name: string;
        address?: string;
        email?: string;
    };
    links: {
        title: string;
        links: FooterLink[];
    }[];
    socialLinks: SocialLink[];
    className?: string;
}

const Footer: React.FC<FooterProps> = ({
    companyInfo,
    links,
    socialLinks,
    className = "",
}) => {
    return (
        <footer
            className={`bg-[rgba(17,17,17,0.8)] backdrop-blur-[20px] border-t border-white/10 py-4 mt-10 ${className}`}
        >
            <div className="flex flex-col px-10 py-5 md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-sm">
                    © {new Date().getFullYear()} {companyInfo.name}. All rights
                    reserved.
                </p>
                <div className="flex space-x-6">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.href}
                            className="text-gray-400 hover:text-white transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
