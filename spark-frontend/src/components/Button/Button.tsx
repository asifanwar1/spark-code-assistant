"use client";
import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    onClick,
    disabled = false,
    className = "",
    type = "button",
}) => {
    const baseStyles =
        "font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
        primary:
            "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed",
        secondary:
            "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
        outline:
            "flex items-center justify-center gap-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-xl p-3 text-white text-sm transition-all duration-300 hover:bg-[rgba(255,255,255,0.15)]",
    };

    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "w-full py-4 px-6 rounded-xl",
    };

    const disabledStyles = disabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                ${baseStyles}
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${disabledStyles}
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default Button;
