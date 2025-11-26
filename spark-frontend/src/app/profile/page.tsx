"use client";
import React from "react";
import { useProfileContainer } from "./profile.container";
import { NotFound } from "@/components/NotFound";
import { LoadingData } from "@/components/LoadingData";

const ProfilePage = () => {
    const { isLoading, profileData } = useProfileContainer();

    if (isLoading) {
        return <LoadingData text="Loading profile..." />;
    }

    if (!profileData) {
        return (
            <NotFound
                headingText="Oops!"
                subheadingText="Data Not Found"
                description="There is no data available for this profile."
            />
        );
    }

    return (
        <section className="py-10 min-h-screen">
            <div className="flex justify-center items-center content-center m-auto max-w-4xl px-4">
                <div className="animate-fade-in w-full">
                    <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#22c55e] animate-shimmer" />

                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                                Profile
                            </h1>
                            <p className="text-[#a0a0a0] text-base md:text-lg">
                                Your account information
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex flex-col items-center justify-center mb-8">
                                {profileData.avatar ? (
                                    <img
                                        src={profileData.avatar}
                                        alt={profileData.name || "User"}
                                        width={120}
                                        height={120}
                                        className="rounded-full border-4 border-[rgba(255,255,255,0.2)]"
                                    />
                                ) : (
                                    <div className="h-30 w-30 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center border-4 border-[rgba(255,255,255,0.2)]">
                                        <span className="text-white text-4xl font-bold">
                                            {profileData.name
                                                ?.charAt(0)
                                                .toUpperCase() || "U"}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#e0e0e0] block">
                                        Name
                                    </label>
                                    <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl p-4">
                                        <p className="text-white text-base md:text-lg">
                                            {profileData.name || "Not provided"}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#e0e0e0] block">
                                        Email Address
                                    </label>
                                    <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl p-4">
                                        <p className="text-white text-base md:text-lg">
                                            {profileData.email ||
                                                "Not provided"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
