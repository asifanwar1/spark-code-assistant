export type TUser = {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};

export type TAuthResponse = {
    success: boolean;
    message: string;
    data: {
        user: TUser;
        token: string;
        refreshToken: string;
    };
    timestamp: string;
};

export type TRefreshResponse = {
    success: boolean;
    message: string;
    data: {
        user: TUser;
        token: string;
    };
    timestamp: string;
};

export type TProfileResponse = {
    success: boolean;
    message: string;
    data: {
        user: TUser;
    };
    timestamp: string;
};

export type TLogoutResponse = {
    success: boolean;
    message: string;
    timestamp: string;
};
