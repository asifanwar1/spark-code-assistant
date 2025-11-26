import { connectMongoDB, disconnectMongoDB } from "./mongodb";
import { redisService } from "./redis";
import { connectVectorDB } from "./vector";
import prisma from "./postgres";
import type { DatabaseHealth } from "./database.types";

export interface DatabaseConnectionStatus {
    postgres: boolean;
    mongodb: boolean;
    redis: boolean;
    vector: boolean;
}

export interface DatabaseManager {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getHealth(): Promise<DatabaseConnectionStatus>;
    isConnected(): boolean;
}

class DatabaseManagerImpl implements DatabaseManager {
    private connectionStatus: DatabaseConnectionStatus = {
        postgres: false,
        mongodb: false,
        redis: false,
        vector: false,
    };

    private isInitialized = false;

    async connect(): Promise<void> {
        try {
            console.log("🚀 Initializing all database connections...");

            const connectionPromises = [
                this.connectPostgres(),
                this.connectMongoDB(),
                this.connectRedis(),
                this.connectVectorDB(),
            ];

            await Promise.all(connectionPromises);

            this.isInitialized = true;
            console.log("✅ All database connections established successfully");
        } catch (error) {
            console.error(
                "❌ Failed to initialize database connections:",
                error
            );
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        try {
            console.log("�� Disconnecting from all databases...");

            const disconnectionPromises = [
                this.disconnectPostgres(),
                this.disconnectMongoDB(),
                this.disconnectRedis(),
            ];

            await Promise.all(disconnectionPromises);

            this.connectionStatus = {
                postgres: false,
                mongodb: false,
                redis: false,
                vector: false,
            };

            this.isInitialized = false;
            console.log("✅ All database connections closed successfully");
        } catch (error) {
            console.error("❌ Failed to disconnect from databases:", error);
            throw error;
        }
    }

    async getHealth(): Promise<DatabaseConnectionStatus> {
        try {
            try {
                await prisma.$queryRaw`SELECT 1`;
                this.connectionStatus.postgres = true;
            } catch {
                this.connectionStatus.postgres = false;
            }

            try {
                const mongoose = await import("mongoose");
                this.connectionStatus.mongodb =
                    mongoose.connection.readyState === 1;
            } catch {
                this.connectionStatus.mongodb = false;
            }

            try {
                await redisService.ping();
                this.connectionStatus.redis = true;
            } catch {
                this.connectionStatus.redis = false;
            }

            try {
                await import("./vector").then(({ vectorIndex }) =>
                    vectorIndex.describeIndexStats()
                );
                this.connectionStatus.vector = true;
            } catch {
                this.connectionStatus.vector = false;
            }

            return { ...this.connectionStatus };
        } catch (error) {
            console.error("❌ Health check failed:", error);
            return this.connectionStatus;
        }
    }

    isConnected(): boolean {
        return this.isInitialized;
    }

    private async connectPostgres(): Promise<void> {
        try {
            await prisma.$connect();
            this.connectionStatus.postgres = true;
        } catch (error) {
            throw error;
        }
    }

    private async connectMongoDB(): Promise<void> {
        try {
            await connectMongoDB();
            this.connectionStatus.mongodb = true;
        } catch (error) {
            throw error;
        }
    }

    private async connectRedis(): Promise<void> {
        try {
            await redisService.connect();
            this.connectionStatus.redis = true;
        } catch (error) {
            throw error;
        }
    }

    private async connectVectorDB(): Promise<void> {
        try {
            await connectVectorDB();
            this.connectionStatus.vector = true;
        } catch (error) {
            throw error;
        }
    }

    private async disconnectPostgres(): Promise<void> {
        try {
            await prisma.$disconnect();
            this.connectionStatus.postgres = false;
            console.log("✅ PostgreSQL disconnected");
        } catch (error) {
            console.error("❌ PostgreSQL disconnection failed:", error);
        }
    }

    private async disconnectMongoDB(): Promise<void> {
        try {
            await disconnectMongoDB();
            this.connectionStatus.mongodb = false;
            console.log("✅ MongoDB disconnected");
        } catch (error) {
            console.error("❌ MongoDB disconnection failed:", error);
        }
    }

    private async disconnectRedis(): Promise<void> {
        try {
            await redisService.disconnect();
            this.connectionStatus.redis = false;
            console.log("✅ Redis disconnected");
        } catch (error) {
            console.error("❌ Redis disconnection failed:", error);
        }
    }
}

export const databaseManager = new DatabaseManagerImpl();

export { default as prisma } from "./postgres";
export { redisService } from "./redis";
export { vectorIndex } from "./vector";
export { getMongoConnection } from "./mongodb";

export { connectMongoDB, disconnectMongoDB } from "./mongodb";
export { connectVectorDB } from "./vector";
