import React from "react";
import Link from "next/link";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ActionCard } from "@/components/ActionCard";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCard } from "@/components/FeatureCard";

import { mainNavLinks, footerNavLinks, socialLinks } from "@/constants";
import dataTransfer from "@/assets/images/data-transfer.png";
import chat from "@/assets/images/chat.png";
import analysis from "@/assets/images/analysis.png";
import intelligence from "@/assets/images/intelligence.png";
import dataVisualization from "@/assets/images/data-visualization.png";
import context from "@/assets/images/context.png";
import compliant from "@/assets/images/compliant.png";
import avatar from "@/assets/images/user.png";
import team from "@/assets/images/link.png";
import document from "@/assets/images/document.png";
import textEditor from "@/assets/images/text-editor.png";

export const metadata = {
    title: "Spark - AI-Powered Code Assistant",
    description:
        "Spark is an AI-powered code assistant that helps you write better code faster",
};

export default function HomePage() {
    const profileInfo = {
        name: "John Doe",
        email: "john@example.com",
        avatar: avatar,
    };

    return (
        <div className="min-h-screen">
            <Navbar
                textLogo={{
                    text: "Spark",
                }}
                links={mainNavLinks}
                profile={profileInfo}
            />

            <main className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                <HeroSection
                    title="AI-Powered Code Assistant"
                    subtitle="Upload your entire codebase, analyze UI screenshots, and get intelligent solutions that match your coding standards"
                />

                <div className="flex flex-wrap gap-4 justify-center mt-10">
                    <ActionCard
                        title="Upload Project"
                        description="Drag & drop your entire codebase including images"
                        features={[
                            { text: "Whole project analysis" },
                            { text: "Multiple file formats" },
                            { text: "UI screenshot analysis" },
                        ]}
                        icon={dataTransfer}
                        href="/projects"
                    />
                    <ActionCard
                        title="Smart Chat"
                        description="Ask questions about your code and get contextual answers"
                        features={[
                            { text: "Context-aware responses" },
                            { text: "Your coding standards" },
                            { text: "Multi-image analysis" },
                        ]}
                        icon={chat}
                        href="/chat"
                    />
                    <ActionCard
                        title="Code Analytics"
                        description="Deep insights into your code qualtiy and patterns"
                        features={[
                            { text: "Quality metrics" },
                            { text: "Pattern detection" },
                            { text: "Improvement suggestions" },
                        ]}
                        icon={analysis}
                        href="/analytics"
                    />
                    <ActionCard
                        title="Teams"
                        description="Collaborate with your team on code reviews, discussions, and shared insights."
                        features={[
                            { text: "Real-time collaboration" },
                            { text: "Shared project workspaces" },
                            { text: "Team activity tracking" },
                        ]}
                        icon={team}
                        href="/analytics"
                    />
                    <ActionCard
                        title="Code Editor"
                        description="Write, edit, and refactor your code directly in the browser with AI-powered suggestions."
                        features={[
                            { text: "Syntax highlighting" },
                            { text: "AI code completion" },
                            { text: "Instant error detection" },
                        ]}
                        icon={textEditor}
                        href="/analytics"
                    />
                    <ActionCard
                        title="Documentation"
                        description="Generate, manage, and search project documentation with AI assistance"
                        features={[
                            { text: "Auto-generate docs from code" },
                            { text: "Smart search and navigation" },
                            { text: "Markdown and rich text support" },
                        ]}
                        icon={document}
                        href="/analytics"
                    />
                </div>

                <div className="flex flex-wrap gap-4 justify-center mt-10">
                    <FeatureCard
                        icon={intelligence}
                        title="Smart Learning"
                        description="AI learns your coding patterns and standards from your existing codebase"
                    />
                    <FeatureCard
                        icon={dataVisualization}
                        title="Visual Analysis"
                        description="Upload multiple UI screenshots and get specific solutions for visual bugs"
                    />
                    <FeatureCard
                        icon={context}
                        title="Context-Aware"
                        description="Solutions that fit your project structure and coding conventions"
                    />
                    <FeatureCard
                        icon={compliant}
                        title="Privacy First"
                        description="Your code stays secure with optional local processing capabilities"
                    />
                </div>
            </main>

            <Footer
                companyInfo={{
                    name: "Spark",
                    address: "123 Tech Street, Silicon Valley, CA 94043",
                    email: "contact@spark.com",
                }}
                links={footerNavLinks}
                socialLinks={socialLinks}
            />
        </div>
    );
}
