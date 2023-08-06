import {requestApi} from "@/util/fetcher";

const BASE_URL = `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_API_URL}`;

type LoginApi = {
    body: {
        username: string,
        password: string
    }
}
export const loginApi = async ({body}: LoginApi): Promise<Response> => {
    return requestApi({
        endpoint: `${BASE_URL}/api/auth/login`,
        method: 'POST',
        body
    });
}

export const logoutApi = async ({token}: {token: string}): Promise<Response> => {
    return requestApi({
        endpoint: '/api/auth/logout',
        method: 'POST',
        token
    });
}

type registerApiProps = {
    password: string,
    nickname: string,
    allowPush: boolean,
    username: string
}
export const registerApi = async (body: registerApiProps): Promise<Response> => {
    const response = requestApi({
        endpoint: '/api/auth/register',
        method: 'POST',
        body
    })

    return response;
}