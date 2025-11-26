import type {
    IGithubConnectionStatus,
    IGithubRepository,
} from "@/app/projects/projects.types";

export type TCheckGithubConnectionResponse = {
    success: boolean;
    message: string;
    data: IGithubConnectionStatus & {
        authUrl?: string;
    };
    timestamp: string;
};

export type TGetGithubRepositoriesResponse = {
    success: boolean;
    message: string;
    data: {
        repositories: IGithubRepository[];
    };
    timestamp: string;
};

export type TConnectGithubResponse = {
    success: boolean;
    message: string;
    data: {
        authUrl: string;
    };
    timestamp: string;
};

export type TImportGithubProjectResponse = {
    success: boolean;
    message: string;
    data: {
        projectId: string;
        projectName: string;
    };
    timestamp: string;
};
