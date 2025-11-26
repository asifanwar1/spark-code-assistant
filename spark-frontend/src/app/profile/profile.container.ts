import { useEffect } from "react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useStore } from "@/store/store";
import { authService } from "@/api/services/auth";

export const useProfileContainer = () => {
    const currentUser = useStore((state) => state.user);
    const setAuth = useStore((s) => s.setAuth);

    const profileMutation = useApiMutation({
        mutationFn: (userId: string) => authService.getProfile({ id: userId }),
        successMessage: "Profile retrieved successfully!",
        errorMessage: "Failed to retrieve profile. Please try again.",
        onSuccess: (res) => {
            const fetched = res?.data?.user;
            if (fetched) {
                setAuth({ user: fetched });
            }
        },
    });

    useEffect(() => {
        if (currentUser?.id) {
            profileMutation.mutate(currentUser.id);
        }
    }, [currentUser?.id]);

    const profileData = useStore((state) => state.user);
    const isLoading = profileMutation.isPending;
    return {
        isLoading,
        profileData,
        currentUser,
    };
};
