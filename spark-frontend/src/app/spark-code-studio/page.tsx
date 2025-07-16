// src/app/code-editor/page.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import FileTree from "./FileTree";
import EditorChat from "./EditorChat";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
    ssr: false,
});

const WS_SERVER = "wss://demos.yjs.dev";
const ROOM_NAME = "my-collab-room";

const CodeEditorPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState("index.js");
    const [editorValue, setEditorValue] = useState(
        "// Start coding collaboratively!\n"
    );
    const editorRef = useRef<any>(null);
    const ydocRef = useRef<Y.Doc>(null);
    const providerRef = useRef<WebsocketProvider>(null);
    const yTextRef = useRef<Y.Text>(null);
    const awarenessRef = useRef<any>(null);

    // Setup Yjs, provider, and awareness
    useEffect(() => {
        const ydoc = new Y.Doc();
        ydocRef.current = ydoc;

        const provider = new WebsocketProvider(WS_SERVER, ROOM_NAME, ydoc);
        providerRef.current = provider;

        // Awareness (for multi-cursor)
        const awareness = provider.awareness;
        awarenessRef.current = awareness;
        awareness.setLocalStateField("user", {
            name: "User-" + Math.floor(Math.random() * 1000),
            color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        });

        // Set up Monaco binding for the selected file
        let yText = ydoc.getText(selectedFile);
        yTextRef.current = yText;

        const updateValue = () => setEditorValue(yText.toString());
        yText.observe(updateValue);
        setEditorValue(yText.toString());

        return () => {
            yText.unobserve(updateValue);
            provider.destroy();
            ydoc.destroy();
        };
        // Re-run when selectedFile changes
    }, [selectedFile]);

    // Monaco binding for multi-cursor
    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;
        if (yTextRef.current && providerRef.current) {
            new MonacoBinding(
                yTextRef.current,
                editor.getModel(),
                new Set([editor]),
                providerRef.current.awareness
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] flex flex-col">
            <div className="p-4 border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)]">
                <h1 className="text-2xl font-bold bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                    Real-Time Code Editor
                </h1>
                <p className="text-[#a0a0a0] text-sm">
                    Collaborate with your team in real time. Multi-cursor, file
                    tree, and chat enabled!
                </p>
            </div>
            <div className="flex-1 min-h-0 flex flex-row">
                <FileTree
                    selectedFile={selectedFile}
                    onSelect={setSelectedFile}
                />
                <div className="flex-1">
                    <MonacoEditor
                        height="80vh"
                        theme="vs-dark"
                        language="javascript"
                        value={editorValue}
                        onChange={() => {}} // MonacoBinding handles changes
                        onMount={handleEditorDidMount}
                        options={{
                            fontSize: 16,
                            minimap: { enabled: false },
                            wordWrap: "on",
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                    />
                </div>
                <EditorChat ydoc={ydocRef.current} />
            </div>
        </div>
    );
};

export default CodeEditorPage;
