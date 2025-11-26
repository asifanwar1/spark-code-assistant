import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { getDatabaseHealth } from "./services/databaseService/databaseService";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests from this IP, please try again later.",
        error: {
            code: "RATE_LIMIT_EXCEEDED",
        },
        timestamp: new Date(),
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(compression());

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

app.get("/health", async (_req, res) => {
    const dbHealth = await getDatabaseHealth();
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development",
        database: dbHealth,
    });
});

app.use("/api/v1", authRoutes);

// app.use("/*", (_req, res) => {
//     res.status(404).json({
//         success: false,
//         message: "Route not found",
//         error: {
//             code: "ROUTE_NOT_FOUND",
//         },
//         timestamp: new Date(),
//     });
// });

app.use(
    (
        error: Error,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        console.error("Error:", error);

        const statusCode = 500;
        const message = error.message || "Internal server error";
        const details =
            process.env.NODE_ENV === "development" ? error.stack : undefined;

        res.status(statusCode).json({
            success: false,
            message,
            error: {
                code: "INTERNAL_ERROR",
                details,
            },
            timestamp: new Date(),
        });
    }
);

export default app;
