import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { authService } from "@/api/services/auth";
import { TSignupRequest } from "@/api/services/auth/auth.request.types";
import { useApiMutation } from "@/hooks/useApiMutation";

import {
    signupSchema,
    SIGNUP_INITIAL_VALUES,
    type TSignupFormData,
} from "./signup.schema";
import { APP_ROUTES } from "@/constants/Routes";

export const useSignupContainer = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm<TSignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: SIGNUP_INITIAL_VALUES,
        mode: "onSubmit",
    });

    const signupMutation = useApiMutation({
        mutationFn: (data: TSignupRequest) =>
            authService.signup({ body: data }),
        successMessage: "Account created successfully!",
        errorMessage: "Failed to create account. Please try again.",
        onSuccess: () => {
            reset();
            router.push(APP_ROUTES.SIGNIN);
        },
    });

    const onSubmit = async (data: TSignupFormData) => {
        const signupData: TSignupRequest = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            terms: data.terms,
            newsletter: data.newsletter,
        };

        signupMutation.mutate(signupData);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const isLoading = signupMutation.isPending;

    return {
        errors,
        isLoading,
        showPassword,
        showConfirmPassword,
        register,
        handleSubmit,
        watch,
        onSubmit,
        reset,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
    };
};
