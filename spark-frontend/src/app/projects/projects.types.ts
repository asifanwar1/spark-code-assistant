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
