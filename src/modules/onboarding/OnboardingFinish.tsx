import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";

const OnboardingFinish = ({page}: {page: number}) => {

    return (
        <div className="flex-grow overflow-y-auto p-5 bg-white">
            <div className="h-full flex flex-col items-center space-y-2 justify-between">
                <div className="mt-[160px] flex flex-col items-center">
                    <Image
                        src="/characters/onboarding5.svg"
                        alt="목표를 달성한 퀴즈보"
                        sizes="100vw"
                        fill
                        style={{
                            objectFit: 'none',
                        }}
                    />
                    <div className="text-center text-secondary-800 text-lg mb-10 font-semibold px-16 whitespace-break-spaces">{"모든 준비가 끝났어요.\n시작해볼까요?"}</div>
                </div>
                <Link
                    href={`/curriculum`}
                    className="w-full z-50"
                >
                    <Button context="다음"/>
                </Link>
            </div>
        </div>
    )
}

export default OnboardingFinish;

