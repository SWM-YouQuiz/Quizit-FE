export const makeToken = (token: string) => {
    return `Bearer ${token};`
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestParams {
    endpoint: string;
    method: RequestMethod;
    body?: any;
    token?: string;
}

export const requestApi = async ({endpoint, method, body, token}: RequestParams): Promise<Response> => {
    let headers: HeadersInit = {"Content-Type": "application/json"};

    if (token) {
        headers["Authorization"] = makeToken(token);
    }

    const response = await fetch(`${endpoint}`, {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) })
    });

    const data = await response.json();

    if(response.ok) {
        return data;
    }
    throw new Error(data.message);
}