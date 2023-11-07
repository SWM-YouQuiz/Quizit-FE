"use client";

export const makeToken = (token: string) => {
    return `Bearer ${token}`;
};

export interface RequestParams {
    endpoint: string;
    method: string;
    body?: Record<string, unknown>;
    token?: string;
    tags?: string[];
    cache?: RequestCache;
    credentials?: RequestCredentials;
}

export const clientRequestApi = async ({ endpoint, method, body, token, cache, tags, credentials }: RequestParams) => {
    let headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = makeToken(token);
    }

    const response = await fetch(`${endpoint}`, {
        method,
        headers,
        ...(credentials && { credentials }),
        ...(cache && { cache }),
        ...(tags && { next: { tags } }),
        ...(body && { body: JSON.stringify(body) }),
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.error("Invalid JSON in response", error);
        throw new Error(`Response body not founded ${response.status} - ${response.statusText}`);
    }

    console.log("response", JSON.stringify(response));

    if (response.ok) {
        return data;
    } else {
        throw new Error(JSON.stringify(data));
    }
};
