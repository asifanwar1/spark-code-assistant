"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { TNotFoundProps } from "./NotFound.types";

const NotFound: React.FC<TNotFoundProps> = ({
    headingText = "",
    subheadingText = "Page Not Found",
    description = "The page you’re looking for doesn’t exist or was moved.",
}) => {
    const router = useRouter();

    return (
        <section className="py-10 min-h-screen flex items-center justify-center">
            <div className="animate-fade-in w-full max-w-xl mx-4">
                <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-3xl p-10 relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#22c55e] animate-shimmer" />

                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                        {headingText}
                    </h1>

                    <h2 className="mt-4 text-2xl md:text-3xl font-bold bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                        {subheadingText}
                    </h2>

                    <p className="mt-3 text-[#a0a0a0]">{description}</p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button
                            type="button"
                            size="lg"
                            variant="outline"
                            onClick={() => router.back()}
                            className="w-full"
                        >
                            Go Back
                        </Button>

                        <Link href="/" className="w-full">
                            <Button type="button" size="lg" className="w-full">
                                Go Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
