import type { ReactNode } from "react";

export type TLoadingSize = "sm" | "md" | "lg";

export type TLoadingDataProps = {
    text?: string;
    loader?: ReactNode;
    size?: TLoadingSize;
    containerClassName?: string;
    spinnerClassName?: string;
    textClassName?: string;
};
