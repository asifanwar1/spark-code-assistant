import { useMutation } from "@tanstack/react-query";
import { showToast } from "@/lib/toast";

type TUseApiMutationOptions<TData, TVariables> = {
    mutationFn: (variables: TVariables) => Promise<TData>;
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: unknown, variables: TVariables) => void;
};

export const useApiMutation = <TData, TVariables>({
    mutationFn,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
}: TUseApiMutationOptions<TData, TVariables>) => {
    return useMutation({
        mutationFn,
        onSuccess: (data, variables) => {
            if (successMessage) {
                showToast.success(successMessage);
            }
            onSuccess?.(data, variables);
        },
        onError: (error, variables) => {
            if (errorMessage) {
                showToast.error(errorMessage);
            } else {
                showToast.error("An error occurred. Please try again.");
            }
            onError?.(error, variables);
        },
    });
};
