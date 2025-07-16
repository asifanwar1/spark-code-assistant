import { Button } from "@/components/Button";
import { InputField } from "@/components/Input";
import React, { useState, useCallback, useRef } from "react";
import { IDragAndDropZoneProps } from "./projects.types";

const DragAndDropZone: React.FC<IDragAndDropZoneProps> = ({
    onFilesSelected,
}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                onFilesSelected(files);
            }
        },
        [onFilesSelected]
    );

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onFilesSelected(files);
        }
    };

    return (
        <>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    isDragOver
                        ? "border-[#667eea] bg-[rgba(102,126,234,0.1)]"
                        : "border-[rgba(255,255,255,0.3)] hover:border-[rgba(255,255,255,0.5)]"
                }`}
            >
                <h3 className="text-xl font-semibold text-white mb-2">
                    Drop your project files here
                </h3>
                <p className="text-[#a0a0a0] mb-6">
                    or click to browse your files
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        children="Select Files"
                        variant="secondary"
                    />
                    <Button
                        type="button"
                        onClick={() => folderInputRef.current?.click()}
                        children="Select Folder"
                        variant="outline"
                    />
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                accept=".js,.jsx,.ts,.tsx,.html,.css,.scss,.json,.md,.txt,.py,.java,.cpp,.c,.php,.rb,.go,.rs,.swift,.kt,.dart,.vue,.svelte"
            />
            <input
                ref={folderInputRef}
                type="file"
                multiple
                {...{ webkitdirectory: "" }}
                onChange={handleFileSelect}
                className="hidden"
            />
        </>
    );
};

export default DragAndDropZone;
