"use client"

import {signIn} from "next-auth/react";
import Image from "next/image";
import React from "react";

const OAuth = ({searchParams}: {searchParams: any}) => {
    signIn("credentials", {
        username: searchParams.accessToken,
        password: searchParams.refreshToken,
        type: searchParams.id,
        callbackUrl: "https://quizit.org/onboarding/0",
    });

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