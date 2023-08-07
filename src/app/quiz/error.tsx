'use client'

import {useEffect} from 'react'
import Button from "@/components/ui/Button";

export default function Error({error, reset}: { error: Error, reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div>
            <h2 className="p-4">{error.message}</h2>
            <Button
                onClick={() => reset()}
                context={"다시 요청하기"}/>
        </div>
    )
}