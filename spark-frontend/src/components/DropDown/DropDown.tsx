"use client";
import React, { useState, useRef, useEffect } from "react";
import { TDropdownProps, TDropdownItem } from "./dropdown.types";

const Dropdown: React.FC<TDropdownProps> = ({
    trigger,
    items,
    onItemClick,
    position = "bottom-right",
    className = "",
    disabled = false,
    closeOnClick = true,
    showSearch = false,
    searchPlaceholder = "Search...",
    emptyMessage = "No items found",
    maxHeight = "200px",
    menuContainerClass = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const filteredItems = items.filter((item: TDropdownItem) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleItemClick = (item: TDropdownItem) => {
        if (item.disabled) return;

        item.onClick?.();

        onItemClick?.(item);

        if (closeOnClick) {
            setIsOpen(false);
            setSearchTerm("");
        }
    };

    const positionClasses = {
        "bottom-right": "top-full left-0 mt-1",
        "bottom-left": "top-full right-0 mt-1",
        "top-right": "bottom-full left-0 mb-1",
        "top-left": "bottom-full right-0 mb-1",
    };

    return (
        <div className={`relative inline-block ${className}`}>
            <div
                ref={triggerRef}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`cursor-pointer ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {trigger}
            </div>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    className={`absolute z-50 w-56 rounded-md shadow-lg ${menuContainerClass} ${positionClasses[position]}`}
                    style={{ maxHeight }}
                >
                    {showSearch && (
                        <div className="p-3 border-b border-gray-200">
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}

                    <div
                        className="py-1 overflow-y-auto "
                        style={{ maxHeight: "200px" }}
                    >
                        {filteredItems.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                {emptyMessage}
                            </div>
                        ) : (
                            filteredItems.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    onClick={() => handleItemClick(item)}
                                    className={`px-4 py-2 text-sm cursor-pointer transition-colors flex items-center ${
                                        item.disabled
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "text-white hover:bg-white/10"
                                    } ${
                                        item.danger
                                            ? "text-red-600 hover:bg-red-50"
                                            : ""
                                    }`}
                                >
                                    {item.icon && (
                                        <div className="mr-3 flex-shrink-0">
                                            {item.icon}
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium truncate">
                                            {item.label}
                                        </div>
                                        {item.description && (
                                            <div className="text-xs text-gray-500 truncate">
                                                {item.description}
                                            </div>
                                        )}
                                    </div>

                                    {item.badge && (
                                        <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                            {item.badge}
                                        </span>
                                    )}

                                    {item.selected && (
                                        <svg
                                            className="w-4 h-4 text-blue-600 ml-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
