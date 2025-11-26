import type { StateCreator } from "zustand";
import type { AuthStateType } from "@/api/models/storage.model";
import { initialAuthState } from "@/api/models/storage.model";
import { sliceResetFns } from "./store";

export interface AuthSliceType extends AuthStateType {
    setAuth: (auth: Partial<AuthStateType>) => void;
    clearAuth: () => void;
}

const authSlice: StateCreator<AuthSliceType, [], [], AuthSliceType> = (set) => {
    sliceResetFns.add(() => set(initialAuthState));

    return {
        ...initialAuthState,
        setAuth: (auth) => set((state) => ({ ...state, ...auth })),
        clearAuth: () => set(() => ({ ...initialAuthState })),
    };
};
export default authSlice;
