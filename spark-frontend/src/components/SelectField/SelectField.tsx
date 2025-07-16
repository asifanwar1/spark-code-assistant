import React from "react";
import { ISelectFieldProps } from "./selectField.types";

const SelectField: React.FC<ISelectFieldProps> = ({
    label,
    options,
    error,
    className,
    registration,
    ...selectProps
}) => {
    const defaultClassName: string = `w-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-xl p-4.5 text-white text-base outline-none transition-all duration-300 focus:border-[#667eea] focus:bg-[rgba(255,255,255,0.15)] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]`;
    return (
        <>
            <div className="space-y-2">
                <label className="text-sm font-medium text-[#e0e0e0] ml-1">
                    {label}
                </label>
                <div className="relative">
                    <select
                        {...registration}
                        {...selectProps}
                        className={`${defaultClassName || className} ${
                            error ? "border-red-500" : ""
                        }`}
                    >
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                className="bg-[#1a1a1a]"
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
        </>
    );
};

export default SelectField;
