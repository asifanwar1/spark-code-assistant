"use client";

import React from "react";

import type { TLoadingDataProps, TLoadingSize } from "./LoadingData.types";

const sizeMap: Record<TLoadingSize, string> = {
    sm: "w-5 h-5 border",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-2",
};

export const LoadingData: React.FC<TLoadingDataProps> = ({
    text = "Loading...",
    loader,
    size = "md",
    containerClassName = "",
    spinnerClassName = "",
    textClassName = "",
}) => {
    const defaultSpinner = (
        <div
            className={`
                ${sizeMap[size]}
                rounded-full animate-spin
                border-white border-t-transparent
                ${spinnerClassName}
            `}
            aria-label="loading"
            role="status"
        />
    );

    return (
        <div
            className={`
                flex flex-col items-center justify-center gap-3
                min-h-[140px]
                ${containerClassName}
            `}
        >
            {loader ?? defaultSpinner}
            <span className={`text-[#a0a0a0] text-sm ${textClassName}`}>
                {text}
            </span>
        </div>
    );
};

export default LoadingData;
