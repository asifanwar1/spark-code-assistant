import { ReactNode } from "react";

export type TDropdownItem = {
    id?: string | number;
    label: string;
    description?: string;
    icon?: ReactNode | string;
    badge?: string | number;
    disabled?: boolean;
    selected?: boolean;
    danger?: boolean;
    onClick?: () => void;
};

export type TDropdownProps = {
    trigger: ReactNode;
    items: TDropdownItem[];
    onItemClick?: (item: TDropdownItem) => void;
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
    className?: string;
    disabled?: boolean;
    closeOnClick?: boolean;
    showSearch?: boolean;
    searchPlaceholder?: string;
    emptyMessage?: string;
    maxHeight?: string;
    menuContainerClass?: string;
};
