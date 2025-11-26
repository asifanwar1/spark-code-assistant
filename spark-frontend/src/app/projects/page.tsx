"use client";

import React from "react";
import { Tabs } from "@/components/Tabs";
import NewProject from "./NewProject";
import LocalProject from "./LocalProject";
import GithubProject from "./GithubProject";

const Projects: React.FC = () => {
    const tabs = [
        {
            id: "tab1",
            label: "Import From GitHub",
            content: <GithubProject />,
            disabled: false,
        },
        {
            id: "tab2",
            label: "My Projects",
            content: <LocalProject />,
        },
    ];
    return (
        <>
            <div className="container mx-auto p-4">
                <Tabs
                    tabs={tabs}
                    defaultTab="tab1"
                    variant="pills"
                    tabListClassName="border-none !justify-center"
                />
            </div>
        </>
    );
};

export default Projects;
