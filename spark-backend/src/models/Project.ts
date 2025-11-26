import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
    name: string;
    description?: string;
    ownerId: string;
    teamId?: string;
    status: "active" | "archived" | "deleted";
    settings: {
        visibility: "public" | "private" | "team";
        allowCollaboration: boolean;
    };
    metadata: {
        fileCount: number;
        totalSize: number;
        lastModified: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        name: { type: String, required: true },
        description: { type: String },
        ownerId: { type: String, required: true },
        teamId: { type: String },
        status: {
            type: String,
            enum: ["active", "archived", "deleted"],
            default: "active",
        },
        settings: {
            visibility: {
                type: String,
                enum: ["public", "private", "team"],
                default: "private",
            },
            allowCollaboration: { type: Boolean, default: false },
        },
        metadata: {
            fileCount: { type: Number, default: 0 },
            totalSize: { type: Number, default: 0 },
            lastModified: { type: Date, default: Date.now },
        },
    },
    {
        timestamps: true,
    }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
