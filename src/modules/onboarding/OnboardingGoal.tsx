"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const OnboardingGoal = () => {
    return (
        <div className="flex-grow flex flex-col items-center bg-secondary-50 overflow-y-auto p-5 justify-evenly">
            <div className="text-center text-secondary-800 text-lg mb-10 font-semibold px-16 whitespace-break-spaces">목표 시간을 선택해주세요</div>
            <Image src="../characters/onboarding4.svg" alt="열심히 공부하는 퀴즈보" width={240} height={240} />
            <div className="w-full flex flex-col space-y-2.5">
                <GoalEditItem title="캐주얼" goalCount={5} />
                <GoalEditItem title="보통" goalCount={10} />
                <GoalEditItem title="열심히" goalCount={20} />
                <GoalEditItem title="하드코어" goalCount={40} />
            </div>
        </div>
    );
};

export default OnboardingGoal;

const GoalEditItem = ({ title, goalCount }: { title: string; goalCount: number }) => {
    const router = useRouter();

    return (
        <div className="w-full flex justify-between p-5 rounded-xl drop-shadow bg-white items-center" onClick={() => router.replace("/onboarding/4")}>
            <div className="text-secondary-900 leading-[16px]">{title}</div>
            <div className="text-secondary-800 text-[13px] leading-[16px]">하루 {goalCount}문제 이상</div>
        </div>
    );
};
