export interface AuthUserType {
    id: string;
    email: string;
    name: string;
    avatar?: string | null;
    isActive: boolean;
    createdAt: string;
}

export interface AuthStateType {
    user?: AuthUserType;
    isAuthenticated?: boolean;
    token?: string;
    forgetVerificationToken?: string;
    notificationCount?: {
        total: number;
    };
    refreshToken?: string;
}

export const initialAuthState: AuthStateType = {
    user: undefined,
    token: "",
    isAuthenticated: false,
    forgetVerificationToken: "",
};
