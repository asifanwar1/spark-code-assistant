export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: {
        code: string;
        details?: any;
    };
    timestamp: Date;
}

export const createSuccessResponse = <T>(
    message: string,
    data?: T
): ApiResponse<T> => ({
    success: true,
    message,
    data,
    timestamp: new Date(),
});

export const createErrorResponse = (
    message: string,
    statusCode: number = 500,
    errorCode: string = "INTERNAL_ERROR",
    details?: any
): ApiResponse => ({
    success: false,
    message,
    error: {
        code: errorCode,
        details,
    },
    timestamp: new Date(),
});
