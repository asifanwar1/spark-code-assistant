"use client";
import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { INavbarProps } from "./navbar.types";

const Navbar: React.FC<INavbarProps> = ({
    imageLogo,
    textLogo = { text: "Logo", className: "" },
    links,
    profile,
    onProfileClick,
    className = "",
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const mobileMenu = document.getElementById("mobile-menu");
            const mobileMenuButton =
                document.getElementById("mobile-menu-button");

            if (
                mobileMenu &&
                !mobileMenu.contains(event.target as Node) &&
                !mobileMenuButton?.contains(event.target as Node)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav
            className={`bg-[rgba(17,17,17,0.8)] backdrop-blur-[20px] border-b border-white/10 py-4 ${className} relative`}
        >
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        {imageLogo ? (
                            <Link href="/">
                                <Image
                                    src={imageLogo.src}
                                    alt={imageLogo.alt}
                                    width={imageLogo.width || 40}
                                    height={imageLogo.height || 40}
                                    className="h-8 w-auto"
                                />
                            </Link>
                        ) : (
                            <div
                                className={`text-2xl font-bold bg-gradient-to-br from-indigo-400 to-purple-600 bg-clip-text text-transparent transition-transform duration-200 ease-in-out hover:scale-110 ${textLogo.className}`}
                            >
                                <Link href="/">
                                    <h4>{textLogo.text}</h4>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-white hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                            >
                                {link.icon && (
                                    <span className="mr-2">{link.icon}</span>
                                )}
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Profile Section */}
                    {profile && (
                        <div className="hidden md:ml-6 md:flex md:items-center">
                            <button
                                onClick={onProfileClick}
                                className="flex items-center space-x-3 focus:outline-none"
                            >
                                {profile.avatar ? (
                                    <Image
                                        src={profile.avatar}
                                        alt={profile.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-600 text-sm">
                                            {profile.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div className="text-left">
                                    <p className="text-sm font-medium text-white">
                                        {profile.name}
                                    </p>
                                    {profile.email && (
                                        <p className="text-xs text-white">
                                            {profile.email}
                                        </p>
                                    )}
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            id="mobile-menu-button"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            <svg
                                className={`${
                                    isMobileMenuOpen ? "hidden" : "block"
                                } h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* Close icon */}
                            <svg
                                className={`${
                                    isMobileMenuOpen ? "block" : "hidden"
                                } h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                // className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}
                id="mobile-menu"
                className={`
                  fixed left-0 right-0  // Changed from absolute to fixed
                  transform transition-all duration-300 ease-in-out
                  ${
                      isMobileMenuOpen
                          ? "opacity-200 visible"
                          : "opacity-0 invisible"
                  }
                  md:hidden
                  bg-[rgba(17,17,17,0.95)] backdrop-blur-[20px]
                  border-b border-white/10
                  z-50
                  w-full  // Added explicit width
                  overflow-x-hidden  // Prevent horizontal scroll
              `}
            >
                <div className="pt-2 pb-3 px-4 space-y-2">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-white hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                        >
                            {link.icon && (
                                <span className="mr-2">{link.icon}</span>
                            )}
                            {link.label}
                        </Link>
                    ))}
                </div>
                {profile && (
                    <div className="pt-4 pb-3 px-3 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            {profile.avatar ? (
                                <Image
                                    src={profile.avatar}
                                    alt={profile.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-600">
                                        {profile.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="ml-3">
                                <p className="text-base font-medium text-white">
                                    {profile.name}
                                </p>
                                {profile.email && (
                                    <p className="text-sm font-medium text-white">
                                        {profile.email}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
