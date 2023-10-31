"use server";
import "server-only";
import { requestApi } from "@/util/fetcher";

type UpdateUserProps = {
    image: string;
    dailyTarget: number;
    username: string;
    allowPush: boolean;
};
export const updateUser = async ({
    body,
    accessToken,
    userId,
}: {
    body: UpdateUserProps;
    userId: string;
} & AccessToken): Promise<UserInfo> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/user/user/${userId}`,
        method: "PUT",
        token: accessToken,
        body: body,
    });
};

export const getUser = async ({ accessToken, cache }: { cache?: RequestCache } & AccessToken): Promise<UserInfo> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/user/user/authentication`,
        method: "GET",
        token: accessToken,
        tags: ["user"],
        cache,
    });
};

export const getUserFromId = async ({ id, accessToken }: { id: string; accessToken: string }): Promise<UserInfo> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/user/user/${id}`,
        method: "GET",
        token: accessToken,
    });
};

export const getUserDeletion = async ({
    provider,
    accessToken,
}: {
    provider: string;
} & AccessToken): Promise<UserInfo> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/auth/oauth2/revoke/${provider}`,
        method: "GET",
        token: accessToken,
    });
};
