import { PrismaClient } from "../../generated/prisma";
import { env } from "../config/config.env";

declare global {
    var __prisma: PrismaClient | undefined;
}

const prisma =
    globalThis.__prisma ||
    new PrismaClient({
        log:
            env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalThis.__prisma = prisma;
}

export default prisma;
