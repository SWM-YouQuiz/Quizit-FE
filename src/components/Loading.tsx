import Image from "next/image";
import React from "react";
import MotionDiv from "@/lib/animation/MotionDiv";

const Loading = () => {
    return (
        <MotionDiv className="flex flex-col items-center space-y-2">
            <Image className="mt-[calc(50dvh-240px)]" src="/characters/coding.svg" alt="열심히 공부하는 퀴즈보" width={240} height={240} />
            <div className="text-center text-secondary-800 text-lg mb-10 font-semibold">잠시만 기다려주세요</div>
        </MotionDiv>
    );
};

export default Loading;
