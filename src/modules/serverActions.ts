'use server'

import {cookies} from "next/headers";

export const setCookie = async ({key, value}: {key: string, value: string}) => {
    cookies().set({
        name: key,
        value: value,
        httpOnly: true,
        path: '/',
    })
}

export const getAccessToken = () => {
    const accessToken =  cookies().get('accessToken');
    if(!accessToken) {
        console.log("accessToken is null!!", accessToken)
        throw new Error('401');
    }
    return accessToken.value;
}

export const signOut = () => {
    cookies().delete('accessToken');
    cookies().delete('refreshToken');
}