"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const setCookie = async ({ key, value }: { key: string; value: string }) => {
    cookies().set({
        name: key,
        value: value,
        httpOnly: true,
        path: "/",
    });
};

export const getAccessToken = async () => {
    const accessToken = cookies().get("accessToken");
    if (!accessToken) {
        throw new Error("401");
    }
    return accessToken.value;
};

export const deleteToken = () => {
    console.log("delete all token!!!");
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
};

export const getCookie = async () => {
    return cookies().get("test");
};

export const revalidate = (tag: string) => {
    revalidateTag(tag);
};
