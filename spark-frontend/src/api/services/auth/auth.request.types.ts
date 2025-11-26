export type TSignupRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    newsletter?: boolean;
};

export type TSigninRequest = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

export type TRefreshTokenRequest = {
    refreshToken: string;
};

export type TLogoutRequest = {
    refreshToken?: string;
};

export type TProfileRequest = {
    userId: string;
};
