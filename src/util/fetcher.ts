import { cookies } from "next/headers";

export const makeToken = (token: string) => {
    return `Bearer ${token}`;
};

export interface RequestParams {
    endpoint: string;
    method: string;
    body?: Record<string, unknown> | any[];
    token?: string;
    tags?: string[];
    cache?: RequestCache;
    credentials?: RequestCredentials;
}

export const requestApi = async ({ endpoint, method, body, token, cache, tags, credentials }: RequestParams) => {
    let headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(credentials === "include" && { Cookie: cookies().toString() }),
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

    const rawCookie: string | null = response.headers.get("set-cookie");

    if (rawCookie) {
        const cookieParts = rawCookie.split(";").map((part) => part.trim());
        const [nameValue, ...rest] = cookieParts;
        const [name, value] = nameValue.split("=");

        cookies().set({
            name,
            value,
            path: "/",
            maxAge: 600000,
            secure: true,
            httpOnly: true,
        });
    }

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
