"use client"

import {signIn} from "next-auth/react";
import {CodingCharacter} from "@/components/character";

const OAuth = ({searchParams}: {searchParams: any}) => {
    signIn("credentials", {
        username: searchParams.accessToken,
        password: searchParams.refreshToken,
        type: searchParams.id,
        callbackUrl: `${process.env.NEXT_PUBLIC_SERVICE_URL}`,
    });

    return (
        <div className="flex flex-col items-center space-y-2">
            <CodingCharacter className="mt-40"/>
            <div className="text-center text-secondary-800 text-lg mb-10 font-semibold">잠시만 기다려주세요</div>
        </div>
    )
}

export default OAuth;