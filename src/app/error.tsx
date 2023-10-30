'use client'

import React from 'react'
import Button from "@/components/ui/Button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {deleteToken} from "@/modules/serverActions";

export default function Error({error, reset}: { error: Error, reset: () => void }) {
    const router = useRouter();
    console.error(error)

    return (
        <div className="p-5 space-y-2 flex flex-col items-center">
            <p>죄송합니다. 예상치 못한 에러가 발생했어요.</p>
            <Image
                className="mt-40"
                src="/characters/question.svg"
                alt="궁금해하는 퀴즈보"
                width={240}
                height={240}
            />
            <Button
                onClick={() => window.location.reload()}
                context={"다시 요청하기"}
            />
            <Button
                className="bg-secondary-900"
                onClick={() => router.back()}
                context={"돌아가기"}
            />
            <Button
                className="bg-secondary-900"
                onClick={() => {
                    router.replace("/auth/login")
                    deleteToken();
                }}
                context={"로그아웃"}
            />
        </div>
    )
}