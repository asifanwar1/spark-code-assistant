import { createClient, RedisClientType } from "redis";
import { env } from "../config/config.env";

const REDIS_USERNAME = env.REDIS_USERNAME || "default";
const REDIS_PASSWORD = env.REDIS_PASSWORD;
const REDIS_HOST = env.REDIS_HOST;
const REDIS_PORT = env.REDIS_PORT ? parseInt(env.REDIS_PORT) : 6379;

let client: RedisClientType | null = null;
let isEnabled = false;

const initializeRedis = (): void => {
    if (REDIS_HOST && REDIS_PASSWORD) {
        client = createClient({
            username: REDIS_USERNAME,
            password: REDIS_PASSWORD,
            socket: {
                host: REDIS_HOST,
                port: REDIS_PORT,
            },
        });

        client.on("error", (err) => {
            console.log("Redis Client Error", err);
        });

        isEnabled = true;
    }
};

const connectRedis = async (): Promise<void> => {
    if (!isEnabled || !client) {
        console.log("⚠️ Redis not configured - skipping connection");
        return;
    }

    try {
        await client.connect();
        console.log("✅ Redis connected successfully");
    } catch (error) {
        console.error("❌ Redis connection failed:", error);
        throw error;
    }
};

const disconnectRedis = async (): Promise<void> => {
    if (!isEnabled || !client) {
        return;
    }

    try {
        await client.quit();
        console.log("✅ Redis disconnected successfully");
    } catch (error) {
        console.error("❌ Redis disconnection failed:", error);
        throw error;
    }
};

const pingRedis = async (): Promise<string> => {
    if (!isEnabled || !client) {
        throw new Error("Redis not enabled");
    }
    return client.ping();
};

const publishMessage = async (
    channel: string,
    message: string
): Promise<number> => {
    if (!isEnabled || !client) {
        throw new Error("Redis not enabled");
    }
    return client.publish(channel, message);
};

const subscribeToChannel = async (
    channel: string,
    callback: (message: string) => void
): Promise<void> => {
    if (!isEnabled || !client) {
        throw new Error("Redis not enabled");
    }

    const subscriber = client.duplicate();
    await subscriber.connect();
    await subscriber.subscribe(channel, (message) => {
        callback(message);
    });
};

const setValue = async (
    key: string,
    value: string,
    ttl?: number
): Promise<string | null> => {
    if (!isEnabled || !client) {
        throw new Error("Redis not enabled");
    }

    if (ttl) {
        return client.setEx(key, ttl, value);
    }
    return client.set(key, value);
};

const getValue = async (key: string): Promise<string | null> => {
    if (!isEnabled || !client) {
        throw new Error("Redis not enabled");
    }
    return client.get(key);
};

const deleteValue = async (key: string): Promise<number> => {
    if (!isEnabled || !client) {
        throw new Error("Redis not enabled");
    }
    return client.del(key);
};

// Initialize Redis on module load
initializeRedis();

export const redisService = {
    connect: connectRedis,
    disconnect: disconnectRedis,
    ping: pingRedis,
    publish: publishMessage,
    subscribe: subscribeToChannel,
    set: setValue,
    get: getValue,
    del: deleteValue,
};
