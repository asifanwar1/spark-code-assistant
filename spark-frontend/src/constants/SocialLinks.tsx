import React from "react";
import Image from "next/image";
import facebook from "@/assets/images/facebook.png";
import linkedin from "@/assets/images/linkedin.png";
import github from "@/assets/images/github.png";

export interface SocialLink {
    platform: string;
    href: string;
    icon: React.ReactNode;
}

export const socialLinks: SocialLink[] = [
    {
        platform: "Twitter",
        href: "https://twitter.com",
        icon: (
            <Image
                src={facebook}
                alt="Facebook"
                width={24}
                height={24}
                className="h-6 w-6"
            />
        ),
    },
    {
        platform: "LinkedIn",
        href: "https://linkedin.com",
        icon: (
            <Image
                src={linkedin}
                alt="LinkedIn"
                width={24}
                height={24}
                className="h-6 w-6"
            />
        ),
    },
    {
        platform: "GitHub",
        href: "https://github.com",
        icon: (
            <Image
                src={github}
                alt="GitHub"
                width={24}
                height={24}
                className="h-6 w-6"
            />
        ),
    },
];
