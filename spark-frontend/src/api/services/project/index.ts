import type { TApiArgs } from "@/api/types/common";
import type {
    TCheckGithubConnectionRequest,
    TGetGithubRepositoriesRequest,
    TConnectGithubRequest,
    TImportGithubProjectRequest,
} from "./project.request.types";
import type {
    TCheckGithubConnectionResponse,
    TGetGithubRepositoriesResponse,
    TConnectGithubResponse,
    TImportGithubProjectResponse,
} from "./project.response.types";
import { request } from "@/api/client/request";

export const projectService = {
    checkConnection: (args?: TApiArgs<TCheckGithubConnectionRequest>) =>
        request<TCheckGithubConnectionResponse>({
            method: "GET",
            url: "/github/connection",
            skipAuth: false,
        }),

    connect: (args?: TApiArgs<TConnectGithubRequest>) =>
        request<TConnectGithubResponse>({
            method: "POST",
            url: "/github/connect",
            body: args?.body,
            skipAuth: false,
        }),

    getRepositories: (args?: TApiArgs<TGetGithubRepositoriesRequest>) =>
        request<TGetGithubRepositoriesResponse>({
            method: "GET",
            url: "/github/repositories",
            skipAuth: false,
        }),

    importProject: (args: TApiArgs<TImportGithubProjectRequest>) =>
        request<TImportGithubProjectResponse>({
            method: "POST",
            url: "/github/import",
            body: args.body,
            skipAuth: false,
        }),
};
