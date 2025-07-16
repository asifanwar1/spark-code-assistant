// src/components/CodeEditor/FileTree.tsx
"use client";
import React from "react";
import { IFileTreeProps } from "./editor.types";

const files = [
    { name: "index.js", id: "index.js" },
    { name: "App.js", id: "App.js" },
    { name: "utils.js", id: "utils.js" },
];

const FileTree: React.FC<IFileTreeProps> = ({ selectedFile, onSelect }) => (
    <aside className="w-48 bg-[rgba(255,255,255,0.03)] p-4 rounded-2xl mr-4 h-full">
        <h3 className="text-white font-bold mb-4">Files</h3>
        <ul>
            {files.map((file) => (
                <li key={file.id}>
                    <button
                        className={`w-full text-left px-2 py-1 rounded ${
                            selectedFile === file.id
                                ? "bg-[#667eea] text-white"
                                : "text-[#e0e0e0] hover:bg-[rgba(255,255,255,0.08)]"
                        }`}
                        onClick={() => onSelect(file.id)}
                    >
                        {file.name}
                    </button>
                </li>
            ))}
        </ul>
    </aside>
);

export default FileTree;
