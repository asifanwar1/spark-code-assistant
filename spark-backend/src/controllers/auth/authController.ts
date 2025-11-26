import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import prisma from "../../database/postgres";
import { env } from "../../config/config.env";
import {
    signupSchema,
    signinSchema,
    refreshTokenSchema,
    logoutSchema,
    profileSchema,
} from "./validationSchema";
import {
    handleValidationError,
    handleServerError,
} from "../shared/errorHandler";
import {
    createSuccessResponse,
    createErrorResponse,
} from "../shared/responseHandler";

declare global {
    namespace Express {
        interface Request {
            user?: TJwtPayload;
        }
    }
}

export type TJwtPayload = {
    userId: string;
    email: string;
    type: "access" | "refresh";
};

const generateTokens = async (
    userId: string,
    email: string,
    rememberMe?: boolean
): Promise<{ token: string; refreshToken: string }> => {
    const accessTokenExpiry = rememberMe ? "30d" : "7d";
    const refreshTokenExpiry = rememberMe ? "90d" : "30d";

    const token = jwt.sign(
        {
            userId,
            email,
            type: "access",
        },
        env.JWT_SECRET!,
        { expiresIn: accessTokenExpiry }
    );

    const refreshToken = jwt.sign(
        {
            userId,
            email,
            type: "refresh",
        },
        env.JWT_SECRET!,
        { expiresIn: refreshTokenExpiry }
    );

    const sessionExpiry = rememberMe
        ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.session.create({
        data: {
            token: refreshToken,
            expiresAt: sessionExpiry,
            userId,
        },
    });

    return { token, refreshToken };
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = signupSchema.parse(req.body);
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });
        if (existingUser) {
            const errorResponse = createErrorResponse(
                "User with this email already exists",
                400,
                "USER_ALREADY_EXISTS",
                { field: "email" }
            );
            res.status(400).json(errorResponse);
            return;
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 12);

        const user = await prisma.user.create({
            data: {
                email: validatedData.email,
                name: `${validatedData.firstName} ${validatedData.lastName}`,
                password: hashedPassword,
                avatar: `https://ui-avatars.com/api/?name=${validatedData.firstName}+${validatedData.lastName}&background=667eea&color=fff`,
            },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        const { token, refreshToken } = await generateTokens(
            user.id,
            user.email
        );

        const response = createSuccessResponse("User registered successfully", {
            user,
            token,
            refreshToken,
        });

        res.status(201).json(response);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log("error", error);
            handleValidationError(error, res);
            return;
        }
        handleServerError(error, res, "Signup");
    }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = signinSchema.parse(req.body);
        const user = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });
        if (!user || !user.isActive) {
            const errorResponse = createErrorResponse(
                "Invalid email or password",
                401,
                "INVALID_CREDENTIALS"
            );
            res.status(401).json(errorResponse);
            return;
        }

        const isPasswordValid = await bcrypt.compare(
            validatedData.password,
            user.password
        );
        if (!isPasswordValid) {
            const errorResponse = createErrorResponse(
                "Invalid email or password",
                401,
                "INVALID_CREDENTIALS"
            );
            res.status(401).json(errorResponse);
            return;
        }

        const { token, refreshToken } = await generateTokens(
            user.id,
            user.email,
            validatedData.rememberMe || false
        );

        const response = createSuccessResponse("Login successful", {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                isActive: user.isActive,
                createdAt: user.createdAt,
            },
            token,
            refreshToken,
        });

        res.status(200).json(response);
    } catch (error) {
        if (error instanceof z.ZodError) {
            handleValidationError(error, res);
            return;
        }
        handleServerError(error, res, "Signin");
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (userId) {
            await prisma.session.deleteMany({
                where: { userId },
            });
        }

        const response = createSuccessResponse("Logged out successfully");
        res.status(200).json(response);
    } catch (error) {
        handleServerError(error, res, "Logout");
    }
};

export const refreshToken = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { refreshToken } = refreshTokenSchema.parse(req.body);

        const decoded = jwt.verify(refreshToken, env.JWT_SECRET!) as any;

        if (decoded.type !== "refresh") {
            const errorResponse = createErrorResponse(
                "Invalid token type",
                401,
                "INVALID_TOKEN_TYPE"
            );
            res.status(401).json(errorResponse);
            return;
        }

        const session = await prisma.session.findFirst({
            where: {
                token: refreshToken,
                expiresAt: { gt: new Date() },
                userId: decoded.userId,
            },
        });

        if (!session) {
            const errorResponse = createErrorResponse(
                "Invalid or expired refresh token",
                401,
                "INVALID_REFRESH_TOKEN"
            );
            res.status(401).json(errorResponse);
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                isActive: true,
                createdAt: true,
            },
        });

        if (!user || !user.isActive) {
            const errorResponse = createErrorResponse(
                "User not found or inactive",
                401,
                "USER_NOT_FOUND"
            );
            res.status(401).json(errorResponse);
            return;
        }

        const newToken = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                type: "access",
            },
            env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        const response = createSuccessResponse("Token refreshed successfully", {
            user,
            token: newToken,
        });

        res.status(200).json(response);
    } catch (error) {
        if (error instanceof z.ZodError) {
            handleValidationError(error, res);
            return;
        }
        if (error instanceof jwt.JsonWebTokenError) {
            const errorResponse = createErrorResponse(
                "Invalid refresh token",
                401,
                "INVALID_REFRESH_TOKEN"
            );
            res.status(401).json(errorResponse);
            return;
        }
        handleServerError(error, res, "Refresh token");
    }
};

export const getProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { userId } = profileSchema.parse(req.params);

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            const errorResponse = createErrorResponse(
                "User not found",
                404,
                "USER_NOT_FOUND"
            );
            res.status(404).json(errorResponse);
            return;
        }

        const response = createSuccessResponse(
            "Profile retrieved successfully",
            { user }
        );

        res.status(200).json(response);
    } catch (error) {
        if (error instanceof z.ZodError) {
            handleValidationError(error, res);
            return;
        }
        handleServerError(error, res, "Get profile");
    }
};
