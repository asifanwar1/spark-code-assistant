export type TCheckGithubConnectionRequest = Record<string, never>;

export type TGetGithubRepositoriesRequest = Record<string, never>;

export type TConnectGithubRequest = Record<string, never>;

export type TImportGithubProjectRequest = {
    repositoryId: number;
    repositoryName: string;
    repositoryFullName: string;
};
