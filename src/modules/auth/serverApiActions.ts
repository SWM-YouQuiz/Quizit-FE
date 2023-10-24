"use server"
import {requestApi} from "@/util/fetcher";
import 'server-only';
import {cookies} from "next/headers";

type LoginApi = {
    body: {
        email: string,
        password: string
    }
}
export const loginApi = async ({body}: LoginApi): Promise<Response> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/auth/auth/login`,
        method: 'POST',
        body
    });
}

export const logoutApi = async (): Promise<Response> => {
    return requestApi({
        endpoint: `${process.env.API_URL}/api/auth/logout`,
        method: 'POST',
    });
}

type registerApiProps = {
    password: string,
    email: string,
    allowPush: boolean,
    username: string,
    image: string,
    dailyTarget: number
}
export const registerApi = async (body: registerApiProps): Promise<Response> => {
    const response = requestApi({
        endpoint: `${process.env.API_URL}/api/user/user`,
        method: 'POST',
        body
    })

    return response;
}

export const postRefresh = async (): Promise<Token> => {
    const cookie = cookies();
    const refreshToken = cookie.get('refreshToken');
    const accessToken = cookie.get('accessToken');

    if(refreshToken === undefined) throw new Error("세션이 만료되었습니다.");
    if(accessToken) return {
        accessToken: accessToken.value,
        refreshToken: refreshToken.value
    }

    const response = requestApi({
        endpoint: `${process.env.API_URL}/api/auth/refresh`,
        method: 'POST',
        body: {
            userId: "6536b6d117e7d1777e2d84cf",
            refreshToken: refreshToken.value
        }
    })

    return response;
}