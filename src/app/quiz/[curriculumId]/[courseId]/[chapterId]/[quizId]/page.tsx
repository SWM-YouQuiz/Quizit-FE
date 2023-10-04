import React, {cache, Suspense} from "react";
import Link from "next/link";
import {BackArrow, Filter, Share} from "@/components/svgs";
import {Header} from "@/components/Header";
import QuizComponent from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz";
import QuizSwiper from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz-swiper";
import ShareButton from "@/modules/quiz/components/ShareButton";
import {getQuiz, getQuizOfChapter} from "@/modules/quiz/serverApiActions";

type QuizPageParams = {
    curriculumId: string,
    courseId: string,
    chapterId: string,
    quizId: string
}

const _getQuiz = async ({quizId}: {quizId: string}) => {
    const quiz = await getQuiz({quizId: quizId});
    return quiz;
}

const QuizPage = async ({ params }: { params: QuizPageParams }) => {
    const quizzes = [await _getQuiz({quizId: params.quizId})];

    return (
        <div className="flex flex-col h-full">
            <Header>
                <Link href={`/curriculum/${params.curriculumId}/${params.courseId}`}>
                    <BackArrow/>
                </Link>
                <div className="font-bold">퀴즈</div>
                <ShareButton/>
            </Header>
            <div className="flex-grow px-5 pb-5 pt-2.5 overflow-y-scroll bg-white">
                <QuizSwiper
                    quizzes={quizzes}
                    chapterId={params.chapterId}
                    couseId={params.courseId}
                    curriculumId={params.curriculumId}
                />
            </div>
        </div>
    )
}

export default QuizPage;

