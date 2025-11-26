import { Response } from "express";
import { z } from "zod";
import { createErrorResponse } from "./responseHandler";

export const handleValidationError = (
    error: z.ZodError,
    res: Response
): void => {
    const errorResponse = createErrorResponse(
        "Validation failed",
        400,
        "VALIDATION_ERROR",
        {
            details: error.issues.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            })),
        }
    );
    res.status(400).json(errorResponse);
};

export const handleServerError = (
    error: any,
    res: Response,
    operation: string
): void => {
    console.error(`${operation} error:`, error);

    const errorResponse = createErrorResponse(
        "Internal server error",
        500,
        "INTERNAL_ERROR"
    );

    res.status(500).json(errorResponse);
};
