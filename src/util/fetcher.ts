export const makeToken = (token: string) => {
    return `Bearer ${token};`
}

export interface RequestParams {
    endpoint: string;
    method: string;
    body?: Record<string, unknown>;
    token?: string;
}

export const requestApi = async ({endpoint, method, body, token}: RequestParams) => {
    let headers: HeadersInit = {"Content-Type": "application/json"};

    if (token) {
        headers["Authorization"] = makeToken(token);
    }

    const response = await fetch(`${endpoint}`, {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) })
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.error('Invalid JSON in response', error);
    }

    console.log("response", JSON.stringify(response));

    if (response.ok) {
        return data;
    } else {
        throw new Error(`Response returned with status ${response.status} - ${response.statusText}`);
    }
}
