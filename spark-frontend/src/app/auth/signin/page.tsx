"use client";
import React, { useState } from "react";
import { BrandingSection } from "@/components/Branding";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/Input";
import { Button } from "@/components/Button";
import Link from "next/link";
import { signupStats } from "@/constants/Stats";
import { signinFeatures } from "@/constants/Features";

interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    newsletter: boolean;
}

const SignupSection: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SignupFormData>();

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        try {
            // Handle form submission
            console.log(data);
            // Add your API call here
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-10">
            <div className="flex justify-center items-center content-center gap-10 m-auto">
                <BrandingSection
                    features={signinFeatures}
                    stats={signupStats}
                    heading="Welcome Back"
                    text="Continue your journey with AI-powered coding assistance."
                    className="lg:w-1/3 md:w-full"
                />
                <div className="animate-fade-in">
                    <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 md:p-12 relative overflow-hidden max-w-[480px] mx-auto">
                        {/* Gradient line animation */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#22c55e] animate-shimmer" />

                        {/* Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                                Sign In
                            </h2>
                            <p className="text-[#a0a0a0] text-base md:text-lg">
                                Access your CodeAI workspace
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Email Field */}
                            <div className="space-y-2">
                                <InputField
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    type="email"
                                    registration={register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    error={errors.email?.message}
                                />
                            </div>

                            {/* Password Fields */}
                            <div className="space-y-2">
                                <InputField
                                    label="Password"
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    registration={register("password", {
                                        required: "Password is required",
                                    })}
                                    error={errors.password?.message}
                                    autoComplete="new-password"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0a0a0] hover:text-[#667eea] transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </InputField>
                            </div>

                            {/* Confirm Password Field */}

                            {/* Checkboxes */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <InputField
                                        type="checkbox"
                                        registration={register("newsletter")}
                                        className="w-5 h-5 rounded border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] text-[#667eea] focus:ring-[#667eea]"
                                    />

                                    <label className="text-sm text-[#e0e0e0] mt-4">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                size="lg"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Signing In...</span>
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-8">
                            <div className="flex-1 h-px bg-[rgba(255,255,255,0.2)]" />
                            <span className="text-[#a0a0a0] text-sm">
                                Or continue with
                            </span>
                            <div className="flex-1 h-px bg-[rgba(255,255,255,0.2)]" />
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                size="lg"
                                variant="outline"
                            >
                                Google
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                size="lg"
                                variant="outline"
                            >
                                GitHub
                            </Button>
                        </div>

                        {/* Login Link */}
                        <div className="text-center mt-8 text-[#a0a0a0] text-sm">
                            Don't have an account?{" "}
                            <Link
                                href="/auth/signup"
                                className="text-[#667eea] font-medium hover:underline"
                            >
                                Create One
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignupSection;
