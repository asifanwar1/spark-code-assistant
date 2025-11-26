import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import {
    initializeDatabases,
    shutdownDatabases,
} from "./services/databaseService/databaseService";

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async (): Promise<void> => {
    try {
        await initializeDatabases();

        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📝 Environment: ${NODE_ENV}`);
            console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
            console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
        });

        const gracefulShutdown = async (signal: string): Promise<void> => {
            console.log(`\n${signal} received. Shutting down gracefully...`);
            await shutdownDatabases();
            server.close(() => {
                console.log("Server closed successfully.");
                process.exit(0);
            });

            setTimeout(() => {
                console.log("Forcing server shutdown...");
                process.exit(1);
            }, 10000);
        };

        process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
        process.on("SIGINT", () => gracefulShutdown("SIGINT"));

        process.on("uncaughtException", (error: Error) => {
            console.error("Uncaught Exception:", error);
            gracefulShutdown("UNCAUGHT_EXCEPTION");
        });

        process.on(
            "unhandledRejection",
            (reason: unknown, promise: Promise<unknown>) => {
                console.error(
                    "Unhandled Rejection at:",
                    promise,
                    "reason:",
                    reason
                );
                gracefulShutdown("UNHANDLED_REJECTION");
            }
        );
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();
