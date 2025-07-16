import React from "react";
import { ITextAreaFieldProps } from "./textarea.types";

const TextArea: React.FC<ITextAreaFieldProps> = ({
    label,
    error,
    registration,
    className,
    ...textareaProps
}) => {
    const defaultClassName: string = `w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.3)] rounded-xl text-white placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all resize-none`;
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-[#e0e0e0] ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <textarea
                    {...registration}
                    {...textareaProps}
                    className={`${defaultClassName || className} ${
                        error ? "border-red-500" : ""
                    }`}
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default TextArea;
