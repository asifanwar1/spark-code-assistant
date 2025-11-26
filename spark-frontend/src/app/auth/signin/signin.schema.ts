import { z } from "zod";

export const signinSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .toLowerCase()
        .trim()
        .max(100, "Email too long"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password too long"),
    rememberMe: z.boolean().optional(),
});

export type TSigninFormData = z.infer<typeof signinSchema>;

export const SIGNIN_INITIAL_VALUES: TSigninFormData = {
    email: "",
    password: "",
    rememberMe: false,
};
