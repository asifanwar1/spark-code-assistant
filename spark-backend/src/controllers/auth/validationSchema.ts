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
        newsletter: z.boolean().optional().default(false),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const signinSchema = z.object({
    email: z.string().email("Invalid email address").toLowerCase().trim(),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional().default(false),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, "Refresh token is required"),
});

export const logoutSchema = z.object({}).optional();

export const profileSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
});
