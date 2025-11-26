import { Prisma } from "../../generated/prisma";
import type { IProject } from "../models/Project";
import type { IDocument } from "../models/Document";
import type { IFile } from "../models/File";

export type User = Prisma.UserGetPayload<{}>;
export type Team = Prisma.TeamGetPayload<{}>;
export type TeamMember = Prisma.TeamMemberGetPayload<{}>;
export type Session = Prisma.SessionGetPayload<{}>;
export type Permission = Prisma.PermissionGetPayload<{}>;
export type UserPermission = Prisma.UserPermissionGetPayload<{}>;

export type Project = IProject;
export type File = IFile;
export type Document = IDocument;

export type CreateUserInput = Prisma.UserCreateInput;
export type UpdateUserInput = Prisma.UserUpdateInput;
export type CreateTeamInput = Prisma.TeamCreateInput;
export type UpdateTeamInput = Prisma.TeamUpdateInput;

export interface DatabaseHealth {
    postgres: boolean;
    mongodb: boolean;
    redis: boolean;
    vector: boolean;
}

export interface PubSubEvent {
    type: string;
    data: Record<string, unknown>;
    timestamp: Date;
    userId?: string;
}
