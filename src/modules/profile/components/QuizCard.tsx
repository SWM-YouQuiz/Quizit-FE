import Link from "next/link";
import {cn} from "@/util/tailwind";
import {ReactNode} from "react";
import Image from "next/image";
import {getQuiz} from "@/modules/quiz/serverApiActions";
import {nonData} from "@/modules/quiz/quizDummy";
import Heartbutton from "@/components/Heartbutton";
import {calculateDateDifference} from "@/util/etc";

type CardProps = {
    href?: string,
    className?: string,
    quizId: string
}

const QuizCard = async ({href="", quizId, className=""}: CardProps) => {
    const quiz = await getQuiz({quizId: quizId})
        .catch(e => nonData);

    return (
        <Link
            href={href}
            className={cn("flex flex-col justify-between rounded-xl drop-shadow p-4 bg-white space-y-4", className)}
        >
            <div className="flex space-x-2">
                <div className="grid place-items-center border border-neutral-100 w-12 h-12 rounded-full">
                    <Image
                        src={"./next.svg"}
                        width={48}
                        height={48}
                        alt={"퀴즈가 포함된 코스 로고"}
                    />
                </div>
                <div className="flex-grow space-y-3">
                    <div className="flex items-start">
                        <div className="flex-grow flex flex-col justify-evenly">
                            <div className="text-secondary-400 text-[13px]">
                                임시 path
                            </div>
                            <div className="font-semibold text-sm">
                                {quiz.question}
                            </div>
                        </div>
                        <Heartbutton quizId={quiz.id} markedUserIds={quiz.markedUserIds}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="text-secondary-400 text-[13px]">
                    {calculateDateDifference(new Date(), new Date(quiz.createdDate))}일전
                </div>
            </div>
        </Link>
    )
}

export default QuizCard;
