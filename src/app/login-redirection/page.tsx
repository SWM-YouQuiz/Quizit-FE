"use client"
import Image from "next/image";
import React, {useContext, useEffect} from "react";
import {QuizContext} from "@/lib/context/Context";
import {getUser} from "@/modules/profile/serverApiActions";
import {setCookie} from "@/modules/serverActions";
import {useRouter} from "next/navigation";

const OAuth = ({searchParams}: {searchParams: any}) => {
    const router = useRouter();
    const {user, accessToken, dispatch } = useContext(QuizContext);
    const _accessToken: string = searchParams.accessToken;
    const isSignUp: string = searchParams.isSignUp;

    const setUser = async () => {
        if (!dispatch) return;
        try {
            const user = await getUser({accessToken: _accessToken});
            dispatch({ type: 'SET_USER', payload: user });
            dispatch({ type: 'SET_TOKEN', payload: _accessToken });
        } catch (error) {
            console.error("An error occurred when setting the user:", error);
        }
    }

    const setAccessToken = async () => {
        if (!_accessToken) return;
        try {
            await setCookie({key: "accessToken", value: _accessToken});
        } catch (error) {
            console.error("An error occurred when setting the access token:", error);
        }
    }

    useEffect(() => {
        const initializeUser = async () => {
            await Promise.all([setUser(), setAccessToken()]);
            if (isSignUp==="true") {
                router.replace(`/onboarding/0`);
            } else {
                router.replace(`/curriculum`);
            }
        }

        initializeUser();
    }, [])


    return (
        <div className="flex flex-col items-center space-y-2">
            <Image
                className="mt-40"
                src="/characters/coding.svg"
                alt="열심히 공부하는 퀴즈보"
                width={240}
                height={240}
            />
            <div className="text-center text-secondary-800 text-lg mb-10 font-semibold">잠시만 기다려주세요</div>
        </div>
    )
}

export default OAuth;