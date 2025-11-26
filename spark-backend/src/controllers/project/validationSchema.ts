import { z } from "zod";

export const createProjectSchema = z.object({
    name: z
        .string()
        .min(1, "Project name is required")
        .max(100, "Project name must be less than 100 characters"),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional(),
    visibility: z.enum(["public", "private", "team"]).default("private"),
});
