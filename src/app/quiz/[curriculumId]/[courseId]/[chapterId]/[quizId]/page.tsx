import React from "react";
import Link from "next/link";
import {BackArrow} from "@/components/svgs";
import {Header} from "@/components/Header";
import QuizSwiper from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz-swiper";
import ShareButton from "@/modules/quiz/components/ShareButton";
import MotionDiv from "@/lib/animation/MotionDiv";

type QuizPageParams = {
    curriculumId: string,
    courseId: string,
    chapterId: string,
    quizId: string
}

const QuizPage = async ({ params }: { params: QuizPageParams }) => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <Link href={`/curriculum/${params.curriculumId}/${params.courseId}`}>
                    <BackArrow/>
                </Link>
                <div className="font-bold">퀴즈</div>
                <ShareButton/>
            </Header>
            <MotionDiv className="flex-grow bg-white overflow-y-auto p-5">
                <QuizSwiper
                    quizId={params.quizId}
                    chapterId={params.chapterId}
                    couseId={params.courseId}
                    curriculumId={params.curriculumId}
                />
            </MotionDiv>
        </div>
    )
}

export default QuizPage;

