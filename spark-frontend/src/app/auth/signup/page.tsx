"use client";
import React from "react";
import { BrandingSection } from "@/components/Branding";
import { InputField } from "@/components/Input";
import { Button } from "@/components/Button";
import Link from "next/link";
import { signupFeatures } from "@/constants/Features";
import { signupStats } from "@/constants/Stats";
import { useSignupContainer } from "./signup.container";

const SignupSection: React.FC = () => {
    const {
        errors,
        isLoading,
        showPassword,
        showConfirmPassword,
        register,
        handleSubmit,
        onSubmit,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
    } = useSignupContainer();

    return (
        <div className="py-10 ">
            <div className="flex justify-center items-center content-center gap-10 m-auto">
                <BrandingSection
                    features={signupFeatures}
                    stats={signupStats}
                    heading="Transform Your Coding Experience"
                    text="Join thousands of developers who are revolutionizing
                        their workflow with AI-powered code assistance."
                    className="lg:w-1/3 md:w-full"
                />
                <div className="animate-fade-in ">
                    <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 md:p-12 relative overflow-hidden max-w-[480px] mx-auto">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#22c55e] animate-shimmer" />

                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                                Create Account
                            </h2>
                            <p className="text-[#a0a0a0] text-base md:text-lg">
                                Start your journey with AI-powered coding
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <InputField
                                        label="First Name"
                                        placeholder="John"
                                        type="text"
                                        registration={register("firstName")}
                                        error={errors.firstName?.message}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <InputField
                                        label="Last Name"
                                        placeholder="Doe"
                                        type="text"
                                        registration={register("lastName")}
                                        error={errors.lastName?.message}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <InputField
                                    label="Email Address"
                                    placeholder="john@example.com"
                                    type="email"
                                    registration={register("email")}
                                    error={errors.email?.message}
                                />
                            </div>

                            <div className="space-y-2">
                                <InputField
                                    label="Password"
                                    placeholder="Create a strong password"
                                    type={showPassword ? "text" : "password"}
                                    registration={register("password")}
                                    error={errors.password?.message}
                                    autoComplete="new-password"
                                >
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0a0a0] hover:text-[#667eea] transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </InputField>
                            </div>

                            <div className="space-y-2">
                                <InputField
                                    label="Confirm Password"
                                    placeholder="Confirm your password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    registration={register("confirmPassword")}
                                    error={errors.confirmPassword?.message}
                                    autoComplete="new-password"
                                >
                                    <button
                                        type="button"
                                        onClick={
                                            toggleConfirmPasswordVisibility
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0a0a0] hover:text-[#667eea] transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </button>
                                </InputField>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <InputField
                                        type="checkbox"
                                        registration={register("terms")}
                                        className="w-5 h-5 rounded border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] text-[#667eea] focus:ring-[#667eea]"
                                    />

                                    <label className="text-sm text-[#e0e0e0] mt-3">
                                        I agree to the{" "}
                                        <a
                                            href="#"
                                            className="text-[#667eea] hover:underline"
                                        >
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="#"
                                            className="text-[#667eea] hover:underline"
                                        >
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <InputField
                                        type="checkbox"
                                        registration={register("newsletter")}
                                        className="w-5 h-5 rounded border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] text-[#667eea] focus:ring-[#667eea]"
                                    />

                                    <label className="text-sm text-[#e0e0e0] mt-3">
                                        Send me product updates and coding tips
                                    </label>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                size="lg"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </form>

                        <div className="flex items-center gap-4 my-8">
                            <div className="flex-1 h-px bg-[rgba(255,255,255,0.2)]" />
                            <span className="text-[#a0a0a0] text-sm">
                                Or continue with
                            </span>
                            <div className="flex-1 h-px bg-[rgba(255,255,255,0.2)]" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Button
                                type="button"
                                disabled={isLoading}
                                size="lg"
                                variant="outline"
                            >
                                Google
                            </Button>
                            <Button
                                type="button"
                                disabled={isLoading}
                                size="lg"
                                variant="outline"
                            >
                                GitHub
                            </Button>
                        </div>

                        <div className="text-center mt-8 text-[#a0a0a0] text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/auth/signin"
                                className="text-[#667eea] font-medium hover:underline"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupSection;
