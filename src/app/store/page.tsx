import Image from "next/image";
import React from "react";
import Link from "next/link";

const Store = () => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="flex flex-col items-center ">
                <Image className="mt-40" src="/characters/onboarding1.svg" alt="탐구하는 퀴즈보" width={240} height={240} />
                <div className="px-5 text-center text-secondary-800 text-lg mb-10 break-keep">
                    <span className="font-semibold">구글 플레이 스토어</span> 또는 <span className="font-semibold">앱 스토어</span>에서
                    <br /> 퀴즈잇을 만나보세요!
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Link href="https://apps.apple.com/kr/app/%ED%80%B4%EC%A6%88%EC%9E%87-quizit/id6470782793">
                    <Image src="/appstore.png" alt="앱스토어 다운로드" width={160} height={240} />
                </Link>
                <Link href="https://play.google.com/store/apps/details?id=org.quizit.quizit&pcampaignid=web_share">
                    <Image src="/googleplaystore.png" alt="구글 플레이 스토어 다운로드" width={160} height={240} />
                </Link>
            </div>
        </div>
    );
};

export default Store;
