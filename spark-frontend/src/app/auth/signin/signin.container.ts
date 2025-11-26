import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { authService } from "@/api/services/auth";
import { TSigninRequest } from "@/api/services/auth/auth.request.types";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useStore } from "@/store/store";
import {
    signinSchema,
    SIGNIN_INITIAL_VALUES,
    type TSigninFormData,
} from "./signin.schema";
import { APP_ROUTES } from "@/constants/Routes";

export const useSigninContainer = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const setAuth = useStore((state) => state.setAuth);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm<TSigninFormData>({
        resolver: zodResolver(signinSchema),
        defaultValues: SIGNIN_INITIAL_VALUES,
        mode: "onSubmit",
    });

    const signinMutation = useApiMutation({
        mutationFn: (data: TSigninRequest) =>
            authService.signin({ body: data }),
        successMessage: "Signed in successfully!",
        errorMessage: "Failed to sign in. Please try again.",
        onSuccess: (data) => {
            setAuth({
                user: data.data.user,
                token: data.data.token,
                refreshToken: data.data.refreshToken,
                isAuthenticated: true,
            });

            router.push(APP_ROUTES.HOME);
        },
        onError: (error) => {
            console.log("Error:", error);
        },
    });

    const onSubmit = async (data: TSigninFormData) => {
        const signinData: TSigninRequest = {
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe,
        };
        signinMutation.mutate(signinData);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const isLoading = signinMutation.isPending;

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
