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

export const checkRefreshToken = async () => {
    const refreshToken = cookies().get("refreshToken");
    return Boolean(refreshToken);
};

export const deleteToken = async () => {
    console.log("delete all token!!!");
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
};

export const revalidate = (tag: string) => {
    revalidateTag(tag);
};
