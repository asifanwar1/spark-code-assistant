"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/Button";
import { projectService } from "@/api/services/project";
import type {
    IGithubConnectionStatus,
    IGithubRepository,
} from "./projects.types";
import { useApiMutation } from "@/hooks/useApiMutation";

const GithubProject: React.FC = () => {
    const [connectionStatus, setConnectionStatus] =
        useState<IGithubConnectionStatus | null>(null);

    // Check GitHub connection status
    const {
        data: connectionData,
        isLoading: isCheckingConnection,
        refetch: refetchConnection,
    } = useQuery({
        queryKey: ["github-connection"],
        queryFn: async () => {
            const response = await projectService.checkConnection();
            return response.data;
        },
    });

    // Fetch repositories if connected
    const {
        data: repositoriesData,
        isLoading: isLoadingRepositories,
        refetch: refetchRepositories,
    } = useQuery({
        queryKey: ["github-repositories"],
        queryFn: async () => {
            const response = await projectService.getRepositories();
            return response.data;
        },
        enabled: connectionStatus?.isConnected ?? false,
    });

    // Connect GitHub mutation
    const connectMutation = useApiMutation({
        mutationFn: async () => {
            const response = await projectService.connect();
            return response.data;
        },
        successMessage: "Redirecting to GitHub...",
        errorMessage: "Failed to initiate GitHub connection",
        onSuccess: (data) => {
            if (data.authUrl) {
                window.location.href = data.authUrl;
            }
        },
    });

    // Import project mutation
    const importMutation = useApiMutation({
        mutationFn: async (repo: IGithubRepository) => {
            const response = await projectService.importProject({
                body: {
                    repositoryId: repo.id,
                    repositoryName: repo.name,
                    repositoryFullName: repo.fullName,
                },
            });
            return response.data;
        },
        successMessage: "Project imported successfully!",
        errorMessage: "Failed to import project",
        onSuccess: () => {
            // Optionally refetch repositories or navigate
        },
    });

    useEffect(() => {
        if (connectionData) {
            setConnectionStatus({
                isConnected: connectionData.isConnected,
                username: connectionData.username,
                avatarUrl: connectionData.avatarUrl,
            });
        }
    }, [connectionData]);

    const handleConnect = () => {
        connectMutation.mutate(undefined);
    };

    const handleImport = (repository: IGithubRepository) => {
        importMutation.mutate(repository);
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (isCheckingConnection) {
        return (
            <div className="min-h-screen bg-transparent py-10">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="w-8 h-8 border-2 border-[#667eea] border-t-transparent rounded-full animate-spin" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent py-10">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                        Import from GitHub
                    </h1>
                    <p className="text-[#a0a0a0] text-lg md:text-xl">
                        Connect your GitHub account and import your repositories
                    </p>
                </div>

                {!connectionStatus?.isConnected ? (
                    <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#22c55e] animate-pulse" />

                        <div className="text-center">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center">
                                <svg
                                    className="w-12 h-12 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                                Connect Your GitHub Account
                            </h2>
                            <p className="text-[#a0a0a0] mb-8 max-w-md mx-auto">
                                Connect your GitHub account to import your
                                repositories and start collaborating with
                                AI-powered insights.
                            </p>

                            <Button
                                type="button"
                                onClick={handleConnect}
                                disabled={connectMutation.isPending}
                                variant="primary"
                                size="lg"
                                className="inline-flex items-center gap-2 !w-1/2 mx-auto !text-center justify-center"
                            >
                                {connectMutation.isPending ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Connecting...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>Connect with GitHub</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Connected Status */}
                        <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#22c55e] animate-pulse" />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {connectionStatus.avatarUrl && (
                                        <img
                                            src={connectionStatus.avatarUrl}
                                            alt={connectionStatus.username}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    )}
                                    <div>
                                        <p className="text-white font-semibold">
                                            Connected as{" "}
                                            <span className="text-[#667eea]">
                                                {connectionStatus.username}
                                            </span>
                                        </p>
                                        <p className="text-[#a0a0a0] text-sm">
                                            GitHub account is connected
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    onClick={() => refetchConnection()}
                                    variant="outline"
                                    size="sm"
                                >
                                    Refresh
                                </Button>
                            </div>
                        </div>

                        {/* Repositories List */}
                        <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#22c55e] animate-pulse" />

                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                                Your Repositories
                            </h2>

                            {isLoadingRepositories ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="w-8 h-8 border-2 border-[#667eea] border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : repositoriesData?.repositories &&
                              repositoriesData.repositories.length > 0 ? (
                                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                    {repositoriesData.repositories.map(
                                        (repo) => (
                                            <div
                                                key={repo.id}
                                                className="flex items-start justify-between gap-4 p-6 bg-[rgba(255,255,255,0.05)] rounded-xl hover:bg-[rgba(255,255,255,0.08)] transition-colors"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-semibold text-white truncate">
                                                            {repo.name}
                                                        </h3>
                                                        {repo.private && (
                                                            <span className="px-2 py-0.5 text-xs font-medium bg-[rgba(255,255,255,0.1)] text-[#a0a0a0] rounded">
                                                                Private
                                                            </span>
                                                        )}
                                                    </div>
                                                    {repo.description && (
                                                        <p className="text-[#a0a0a0] text-sm mb-3 line-clamp-2">
                                                            {repo.description}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-4 text-sm text-[#a0a0a0]">
                                                        {repo.language && (
                                                            <span className="flex items-center gap-1">
                                                                <span className="w-3 h-3 rounded-full bg-[#667eea]" />
                                                                {repo.language}
                                                            </span>
                                                        )}
                                                        <span className="flex items-center gap-1">
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                                            </svg>
                                                            {repo.stars}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                                            </svg>
                                                            {repo.forks}
                                                        </span>
                                                        <span>
                                                            Updated{" "}
                                                            {formatDate(
                                                                repo.updatedAt
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        handleImport(repo)
                                                    }
                                                    disabled={
                                                        importMutation.isPending
                                                    }
                                                    variant="primary"
                                                    size="sm"
                                                    className="flex-shrink-0"
                                                >
                                                    {importMutation.isPending
                                                        ? "Importing..."
                                                        : "Import"}
                                                </Button>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-[#a0a0a0]">
                                        No repositories found. Make sure you
                                        have repositories in your GitHub
                                        account.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GithubProject;
