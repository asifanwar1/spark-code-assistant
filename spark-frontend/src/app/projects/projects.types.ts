export interface IDragAndDropZoneProps {
    onFilesSelected: (files: FileList) => void;
}

export interface IProjectDetailsFormProps {
    register: any;
    errors?: any;
}

export interface IUploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    status: "uploading" | "completed" | "error";
    progress: number;
    path?: string;
}

export interface IProjectUploadData {
    projectName: string;
    description: string;
    framework: string;
    visibility: "public" | "private";
}

export interface IProjectUploadFormData {
    projectName: string;
    description: string;
    selectedFramework: string;
}

export interface IGithubConnectionStatus {
    isConnected: boolean;
    username?: string;
    avatarUrl?: string;
}

export interface IGithubRepository {
    id: number;
    name: string;
    fullName: string;
    description: string | null;
    private: boolean;
    language: string | null;
    stars: number;
    forks: number;
    updatedAt: string;
    defaultBranch: string;
}

export interface IGithubRepositoriesResponse {
    success: boolean;
    message: string;
    data: {
        repositories: IGithubRepository[];
    };
    timestamp: string;
}

export interface IGithubConnectionResponse {
    success: boolean;
    message: string;
    data: {
        isConnected: boolean;
        username?: string;
        avatarUrl?: string;
        authUrl?: string;
    };
    timestamp: string;
}

export interface IImportGithubProjectRequest {
    repositoryId: number;
    repositoryName: string;
    repositoryFullName: string;
}
