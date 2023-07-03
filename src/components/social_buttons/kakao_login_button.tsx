"use client"

import {signIn} from "next-auth/react";
import Image from "next/image";
import React from "react";

export const KakaoLoginButton = () => {
    return (
        <button className="w-full h-auto" onClick={() => signIn()}>
            <Image
                className="w-full h-auto"
                src="/images/kakao_login_large_wide.png"
                alt="kakao"
                width={0}
                height={0}
                sizes="100vw"
            />
        </button>
    )
}