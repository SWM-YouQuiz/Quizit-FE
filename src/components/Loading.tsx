import Image from "next/image";
import React from "react";

const Loading = () => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <Image
                className="mt-40"
                src="/characters/coding.svg"
                alt="열심히 공부하는 퀴즈보"
                width={240}
                height={240}
            />
            <div className="text-center text-secondary-800 text-lg mb-10 font-semibold">퀴즈를 불러오는 중이에요.</div>
        </div>
    )
}

export default Loading;