import { databaseManager } from "../../database/index";

export const initializeDatabases = async (): Promise<void> => {
    try {
        await databaseManager.connect();
    } catch (error) {
        console.error("Failed to initialize databases:", error);
        throw error;
    }
};

export const shutdownDatabases = async (): Promise<void> => {
    try {
        await databaseManager.disconnect();
    } catch (error) {
        console.error("Failed to shutdown databases:", error);
        throw error;
    }
};

export const getDatabaseHealth = async () => {
    return await databaseManager.getHealth();
};

export const isDatabaseConnected = (): boolean => {
    return databaseManager.isConnected();
};
