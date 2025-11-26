import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

export interface IDocument extends MongooseDocument {
    title: string;
    content: string;
    projectId: string;
    fileId?: string;
    authorId: string;
    version: number;
    status: "draft" | "published" | "archived";
    tags: string[];
    metadata: {
        wordCount: number;
        readingTime: number;
        lastEditedBy: string;
        lastEditedAt: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        projectId: { type: String, required: true },
        fileId: { type: String },
        authorId: { type: String, required: true },
        version: { type: Number, default: 1 },
        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft",
        },
        tags: [{ type: String }],
        metadata: {
            wordCount: { type: Number, default: 0 },
            readingTime: { type: Number, default: 0 },
            lastEditedBy: { type: String, required: true },
            lastEditedAt: { type: Date, default: Date.now },
        },
    },
    {
        timestamps: true,
    }
);

export const Document = mongoose.model<IDocument>("Document", DocumentSchema);
