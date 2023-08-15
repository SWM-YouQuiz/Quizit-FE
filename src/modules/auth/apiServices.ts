import {requestApi} from "@/util/fetcher";

type LoginApi = {
    body: {
        username: string,
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
        endpoint: '/api/auth/logout',
        method: 'POST',
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
        endpoint: '/api/auth/auth/register',
        method: 'POST',
        body
    })

    return response;
}