"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";
import Link from "next/link";
import Modal from "@/components/Modal/Modal";
import { APP_ROUTES } from "@/constants/Routes";
import { IActionCardProps } from "./actionCard.types";

const ActionCard: React.FC<IActionCardProps> = ({
    title,
    description,
    features,
    icon = "/icons/upload.svg",
    href,
    className = "",
}) => {
    const router = useRouter();
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (isAuthenticated) {
            router.push(href);
        } else {
            setIsModalOpen(true);
        }
    };

    const handleSignIn = () => {
        setIsModalOpen(false);
        router.push(APP_ROUTES.SIGNIN);
    };

    return (
        <>
            <Link href={href} onClick={handleClick} className="block">
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
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                    <div className="w-[70px] h-[70px] m-auto bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center mb-5">
                        <Image
                            src={icon}
                            alt="spark icon"
                            width={48}
                            height={48}
                            className="text-white"
                        />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-white">
                        {title}
                    </h3>

                    <p className="text-[#a0a0a0] leading-relaxed mb-5">
                        {description}
                    </p>

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

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Sign In Required"
                description="Please sign in to access this feature."
                size="sm"
                mainContainerClass="border border-gradient-to-r from-[#667eea] to-[#764ba2]"
                primaryButton={{
                    label: "Sign In",
                    onClick: handleSignIn,
                }}
                secondaryButton={{
                    label: "Cancel",
                    onClick: () => setIsModalOpen(false),
                }}
            />
        </>
    );
};

export default ActionCard;
