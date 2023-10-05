"use server"

import {authenticateSession} from "@/util/session";
import {authOptions} from "@/modules/auth/auth";
import {requestApi} from "@/util/fetcher";

export const getUserRanking = async (): Promise<UserInfo[]> => {
    const session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/user/user/ranking`,
        method: 'GET',
        token: session.user.accessToken,
    });
}