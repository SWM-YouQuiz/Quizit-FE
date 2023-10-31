import Image from "next/image";
import React from "react";

const Ready = () => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <Image className="mt-40" src="/characters/coding.svg" alt="열심히 공부하는 퀴즈보" width={240} height={240} />
            <div className="text-center text-secondary-800 text-lg mb-10 font-semibold">아직 준비 중인 페이지입니다!</div>
        </div>
    );
};

export default Ready;
