import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    registration?: any; // react-hook-form's register
    children?: React.ReactNode;
    className?: string;
    type: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    error,
    registration,
    children,
    type,
    className,
    ...inputProps
}) => {
    const defaultClassName: string = `w-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-xl p-4 text-white text-base outline-none transition-all duration-300 focus:border-[#667eea] focus:bg-[rgba(255,255,255,0.15)] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]`;
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-[#e0e0e0] ml-1">
                {label}
            </label>
            <div className="relative">
                <input
                    type={type}
                    {...registration}
                    {...inputProps}
                    className={`${className || defaultClassName}  ${
                        error ? "border-red-500" : ""
                    }`}
                />
                {children}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
