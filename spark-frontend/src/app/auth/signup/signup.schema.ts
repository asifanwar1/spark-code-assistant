import { z } from "zod";

export const signupSchema = z
    .object({
        firstName: z
            .string()
            .min(1, "First name is required")
            .max(50, "First name too long")
            .trim(),
        lastName: z
            .string()
            .min(1, "Last name is required")
            .max(50, "Last name too long")
            .trim(),
        email: z
            .string()
            .email("Invalid email address")
            .toLowerCase()
            .trim()
            .max(100, "Email too long"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password too long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
        confirmPassword: z.string(),
        terms: z
            .boolean()
            .refine((val) => val === true, "You must accept the terms"),
        newsletter: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type TSignupFormData = z.infer<typeof signupSchema>;

export const SIGNUP_INITIAL_VALUES: TSignupFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    newsletter: false,
};
