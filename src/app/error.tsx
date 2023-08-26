'use client'

import {useEffect} from 'react'
import Button from "@/components/ui/Button";
import {useRouter} from "next/navigation";

export default function Error({error, reset}: { error: Error, reset: () => void }) {
    const router = useRouter();

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="p-5 space-y-2">
            <div className="text-center text-secondary-800 text-base mb-10">{error.message}</div>
            <Button
                onClick={() => reset()}
                context={"다시 요청하기"}
            />
            <Button
                className="bg-secondary-900"
                onClick={() => router.back()}
                context={"돌아가기"}
            />
        </div>
    )
}