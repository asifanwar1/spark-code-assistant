import mongoose from "mongoose";
import { env } from "../config/config.env";

export const connectMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGODB_URI || "");
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        throw error;
    }
};

export const disconnectMongoDB = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log("✅ MongoDB disconnected successfully");
    } catch (error) {
        console.error("❌ MongoDB disconnection failed:", error);
        throw error;
    }
};

export const getMongoConnection = (): typeof mongoose => mongoose;
