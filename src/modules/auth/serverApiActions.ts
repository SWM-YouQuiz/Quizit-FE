"use server";
import { requestApi } from "@/util/fetcher";
import "server-only";

export const postRefresh = async (): Promise<AccessToken> => {
    const response = requestApi({
        endpoint: `${process.env.API_URL}/api/auth/refresh`,
        method: "POST",
        credentials: "include",
    });

    return response;
};
