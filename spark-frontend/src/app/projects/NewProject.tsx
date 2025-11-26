"use client";

import React, { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { frameworks } from "@/constants/framworks";
import { InputField } from "@/components/Input";
import { SelectField } from "@/components/SelectField";
import { TextArea } from "@/components/TextArea";
import ProjectDetails from "./ProjectDetails";
import DragAndDropZone from "./DragAndDropZone";
import { Button } from "@/components/Button";
import {
    IUploadedFile,
    IProjectUploadData,
    IProjectUploadFormData,
} from "./projects.types";

const NewProject = () => {
    const [uploadedFiles, setUploadedFiles] = useState<IUploadedFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [projectData, setProjectData] = useState<IProjectUploadData>({
        projectName: "",
        description: "",
        framework: "react",
        visibility: "private",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IProjectUploadFormData>();

    const processFiles = (files: FileList) => {
        const newFiles: IUploadedFile[] = Array.from(files).map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
            status: "uploading",
            progress: 0,
            path: (file as any).webkitRelativePath || file.name,
        }));

        setUploadedFiles((prev) => [...prev, ...newFiles]);

        // Simulate upload progress
        newFiles.forEach((file) => {
            simulateUpload(file.id);
        });
    };

    const simulateUpload = (fileId: string) => {
        const interval = setInterval(() => {
            setUploadedFiles((prev) =>
                prev.map((file) => {
                    if (file.id === fileId) {
                        const newProgress = Math.min(
                            file.progress + Math.random() * 30,
                            100
                        );
                        const newStatus =
                            newProgress === 100 ? "completed" : "uploading";
                        return {
                            ...file,
                            progress: newProgress,
                            status: newStatus,
                        };
                    }
                    return file;
                })
            );
        }, 200);

        setTimeout(() => clearInterval(interval), 3000);
    };

    const removeFile = (fileId: string) => {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const totalFiles = uploadedFiles.length;
    const completedFiles = uploadedFiles.filter(
        (f) => f.status === "completed"
    ).length;
    const hasFiles = uploadedFiles.length > 0;

    return (
        <>
            <div className="min-h-screen bg-transparent py-10">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                            Upload Your Project
                        </h1>
                        <p className="text-[#a0a0a0] text-lg md:text-xl">
                            Share your code with AI-powered insights and
                            collaboration
                        </p>
                    </div>

                    <div className="space-y-8">
                        <ProjectDetails register={register} errors={errors} />

                        {/* File Upload Section */}
                        <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#22c55e] animate-pulse" />

                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                                Upload Files
                            </h2>

                            <DragAndDropZone onFilesSelected={processFiles} />

                            {/* Upload Progress */}
                            {hasFiles && (
                                <div className="mt-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white">
                                            Uploaded Files ({completedFiles}/
                                            {totalFiles})
                                        </h3>
                                        <span className="text-sm text-[#a0a0a0]">
                                            {(
                                                (completedFiles / totalFiles) *
                                                100
                                            ).toFixed(0)}
                                            % Complete
                                        </span>
                                    </div>

                                    <div className="space-y-3 max-h-60 overflow-y-auto">
                                        {uploadedFiles.map((file) => (
                                            <div
                                                key={file.id}
                                                className="flex items-center gap-4 p-4 bg-[rgba(255,255,255,0.05)] rounded-xl"
                                            >
                                                <div className="flex-shrink-0">
                                                    {file.status ===
                                                    "completed" ? (
                                                        // <CheckCircle
                                                        //     className="text-green-500"
                                                        //     size={20}
                                                        // />
                                                        <button>aa</button>
                                                    ) : file.status ===
                                                      "error" ? (
                                                        // <AlertCircle
                                                        //     className="text-red-500"
                                                        //     size={20}
                                                        // />
                                                        <button>bb</button>
                                                    ) : (
                                                        <div className="w-5 h-5 border-2 border-[#667eea] border-t-transparent rounded-full animate-spin" />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white font-medium truncate">
                                                        {file.name}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                                                        <span>
                                                            {formatFileSize(
                                                                file.size
                                                            )}
                                                        </span>
                                                        {file.path &&
                                                            file.path !==
                                                                file.name && (
                                                                <>
                                                                    <span>
                                                                        •
                                                                    </span>
                                                                    <span className="truncate">
                                                                        {
                                                                            file.path
                                                                        }
                                                                    </span>
                                                                </>
                                                            )}
                                                    </div>

                                                    {file.status ===
                                                        "uploading" && (
                                                        <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-2 mt-2">
                                                            <div
                                                                className="bg-gradient-to-r from-[#667eea] to-[#764ba2] h-2 rounded-full transition-all duration-300"
                                                                style={{
                                                                    width: `${file.progress}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFile(file.id)
                                                    }
                                                    className="flex-shrink-0 p-1 hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors"
                                                >
                                                    x
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <Button
                                type="submit"
                                disabled={
                                    isUploading ||
                                    !projectData.projectName.trim()
                                }
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#5a67d8] hover:to-[#6c5ce7] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isUploading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Creating Project...</span>
                                    </>
                                ) : (
                                    <>
                                        {/* <Plus size={20} /> */}
                                        <span>Create Project</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewProject;
