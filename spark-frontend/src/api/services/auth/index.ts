import { TApiArgs } from "@/api/types/common";
import {
    TSignupRequest,
    TSigninRequest,
    TRefreshTokenRequest,
    TLogoutRequest,
    TProfileRequest,
} from "./auth.request.types";
import {
    TAuthResponse,
    TRefreshResponse,
    TProfileResponse,
    TLogoutResponse,
} from "./auth.response.types";
import { request } from "@/api/client/request";

export const authService = {
    signup: (args: TApiArgs<TSignupRequest>) =>
        request<TAuthResponse>({
            method: "POST",
            url: "/auth/signup",
            body: args.body,
            skipAuth: true,
        }),

    signin: (args: TApiArgs<TSigninRequest>) =>
        request<TAuthResponse>({
            method: "POST",
            url: "/auth/signin",
            body: args.body,
            skipAuth: true,
        }),

    logout: (args: TApiArgs<TLogoutRequest>) =>
        request<TLogoutResponse>({
            method: "POST",
            url: "/auth/logout",
            body: args.body,
            skipAuth: false,
        }),

    refreshToken: (args: TApiArgs<TRefreshTokenRequest>) =>
        request<TRefreshResponse>({
            method: "POST",
            url: "/auth/refresh",
            body: args.body,
            skipAuth: true,
        }),

    getProfile: (args: TApiArgs<TProfileRequest>) =>
        request<TProfileResponse>({
            method: "GET",
            url: `/auth/profile/${args.id}`,
            skipAuth: false,
        }),
};
