import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "../config/config.env";

const pinecone = new Pinecone({
    apiKey: env.PINECONE_API_KEY || "",
});

export const vectorIndex = pinecone.index(env.PINECONE_INDEX_NAME || "");

export const connectVectorDB = async (): Promise<void> => {
    try {
        await vectorIndex.describeIndexStats();
        console.log("✅ Vector DB connected successfully");
    } catch (error) {
        console.error("❌ Vector DB connection failed:", error);
        throw error;
    }
};
