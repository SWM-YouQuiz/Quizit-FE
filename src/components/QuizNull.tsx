import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const QuizNull = ({ curriculumId, courseId }: { curriculumId: string; courseId: string }) => {
    return (
        <div className="h-full flex flex-col items-center space-y-2 justify-between p-5">
            <div className="mt-[180px] flex flex-col items-center">
                <Image src="/characters/question.svg" alt="궁금해하는 퀴즈보" width={240} height={240} />
                <div className="text-center text-secondary-800 text-lg mb-10 font-semibold px-16 whitespace-break-spaces">
                    조건에 맞는 퀴즈가 없어요
                </div>
            </div>
            <Link className="relative bottom-0 w-full" href={`/curriculum/${curriculumId}/${courseId}`}>
                <Button context="돌아가기" />
            </Link>
        </div>
    );
};

export default QuizNull;
