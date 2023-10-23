"use server"
import 'server-only';
import {authenticateSession} from "@/util/session";
import {authOptions} from "@/modules/auth/auth";
import {requestApi} from "@/util/fetcher";

type UpdateUserProps = {
    image: string,
    dailyTarget: number,
    username: string,
    allowPush: boolean
}
export const updateUser = async ({body}: {body: UpdateUserProps}): Promise<UserInfo> => {
    const session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/user/user/${session.user.user.id}`,
        method: 'PUT',
        token: session.user.accessToken,
        body: body
    });
};

export const getUser = async (): Promise<UserInfo> => {
    const session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/user/user/${session.user.user.id}`,
        method: 'GET',
        token: session.user.accessToken,
    });
};

export const getUserFromId = async ({id, accessToken}: {id: string, accessToken: string}): Promise<UserInfo> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/user/user/${id}`,
        method: 'GET',
        token: accessToken,
    });
};