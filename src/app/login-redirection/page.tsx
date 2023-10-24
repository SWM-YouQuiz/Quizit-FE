"use client"
import Image from "next/image";
import React, {useContext, useEffect} from "react";
import {QuizContext} from "@/modules/Context";
import {getUser} from "@/modules/profile/serverApiActions";
import {setCookie} from "@/modules/serverActions";
import {useRouter} from "next/navigation";

const serviceUrl = process.env.NEXT_PUBLIC_SERVICE_URL ?? "https://quizit.org";

const OAuth = ({searchParams}: {searchParams: any}) => {
    const router = useRouter();
    const {user, accessToken, dispatch } = useContext(QuizContext);
    const _accessToken: string = searchParams.accessToken;
    const _refreshToken: string = searchParams.refreshToken;
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

    const setRefeshToken = async () => {
        if (!_refreshToken) return;
        try {
            await setCookie({key: "refreshToken", value: _refreshToken});
        } catch (error) {
            console.error("An error occurred when setting the refresh token:", error);
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
            await Promise.all([setUser(), setRefeshToken(), setAccessToken()]); // 각 함수가 반환할 프로미스를 기다립니다.
            if (isSignUp==="true") {
                router.replace(`${serviceUrl}/onboarding/0`);
            } else {
                router.replace(`${serviceUrl}/curriculum`);
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