import type { ReactNode } from "react";

export type TTabItem = {
    id: string;
    label: string;
    content: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
};

export type TTabsProps = {
    tabs: readonly TTabItem[];
    defaultTab?: string;
    activeTab?: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
    tabListClassName?: string;
    tabContentClassName?: string;
    variant?: "default" | "pills";
};
