import * as Y from "yjs";

export interface IEditorChatProps {
    ydoc: Y.Doc | null;
}

export interface IFileTreeProps {
    selectedFile: string;
    onSelect: (id: string) => void;
}
