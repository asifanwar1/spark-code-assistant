"use client";

import React, { useState } from "react";
import type { TTabsProps } from "./Tabs.types";

const Tabs: React.FC<TTabsProps> = ({
    tabs,
    defaultTab,
    activeTab: controlledActiveTab,
    onTabChange,
    className = "",
    tabListClassName = "",
    tabContentClassName = "",
    variant = "default",
}) => {
    const [internalActiveTab, setInternalActiveTab] = useState<string>(
        defaultTab || tabs[0]?.id || ""
    );

    const activeTab = controlledActiveTab ?? internalActiveTab;

    const handleTabClick = (tabId: string) => {
        const tab = tabs.find((t) => t.id === tabId);
        if (tab?.disabled) {
            return;
        }

        if (controlledActiveTab === undefined) {
            setInternalActiveTab(tabId);
        }
        onTabChange?.(tabId);
    };

    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

    const isPillsVariant = variant === "pills";

    return (
        <div className={`w-full ${className}`}>
            <div
                className={`
                    flex flex-wrap gap-2
                    border-b border-[rgba(255,255,255,0.1)]
                    mb-6
                    overflow-x-auto
                    scrollbar-hide
                    ${tabListClassName}
                `}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const baseTabStyles = `
                        px-4 py-3
                        text-sm font-medium
                        transition-all duration-300
                        cursor-pointer
                        relative
                        flex items-center gap-2
                        whitespace-nowrap
                    `;

                    if (isPillsVariant) {
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                disabled={tab.disabled}
                                className={`
                                    ${baseTabStyles}
                                    rounded-full
                                    ${
                                        isActive
                                            ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white"
                                            : "bg-[rgba(255,255,255,0.05)] text-[#a0a0a0] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
                                    }
                                    ${
                                        tab.disabled
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }
                                `}
                            >
                                {tab.icon && <span>{tab.icon}</span>}
                                {tab.label}
                            </button>
                        );
                    }

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            disabled={tab.disabled}
                            className={`
                                ${baseTabStyles}
                                ${
                                    isActive
                                        ? "text-white"
                                        : "text-[#a0a0a0] hover:text-white"
                                }
                                ${
                                    tab.disabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }
                            `}
                        >
                            {tab.icon && <span>{tab.icon}</span>}
                            {tab.label}
                            {isActive && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div
                className={`
                    bg-transparent backdrop-blur-[20px]
                    rounded-3xl p-6 md:p-8
                    min-h-[300px]
                    ${tabContentClassName}
                `}
            >
                {activeTabContent ?? (
                    <div className="text-center text-[#a0a0a0]">
                        No content available
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tabs;
