import mongoose, { Schema, Document } from "mongoose";

export interface IFile extends Document {
    name: string;
    path: string;
    size: number;
    type: string;
    mimeType: string;
    projectId: string;
    content?: string;
    metadata: {
        encoding?: string;
        lastModified: Date;
        checksum: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const FileSchema = new Schema<IFile>(
    {
        name: { type: String, required: true },
        path: { type: String, required: true },
        size: { type: Number, required: true },
        type: { type: String, required: true },
        mimeType: { type: String, required: true },
        projectId: { type: String, required: true },
        content: { type: String },
        metadata: {
            encoding: { type: String },
            lastModified: { type: Date, default: Date.now },
            checksum: { type: String, required: true },
        },
    },
    {
        timestamps: true,
    }
);

export const File = mongoose.model<IFile>("File", FileSchema);
