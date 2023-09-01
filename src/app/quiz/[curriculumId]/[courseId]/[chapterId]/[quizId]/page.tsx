import React, {cache, Suspense} from "react";
import Link from "next/link";
import {BackArrow, Filter, Share} from "@/components/svgs";
import {Header} from "@/components/Header";
import QuizComponent from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz";
import QuizSwiper from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz-swiper";

type QuizPageParams = {
    curriculumId: string,
    courseId: string,
    chapterId: string,
    quizId: string
}
const QuizPage = ({ params }: { params: QuizPageParams }) => {
    const quizExplanationComponents: QuizComponents[] = [{
            id: params.quizId,
            quizComponent: (
                <Suspense key={`quiz-suspense-${params.quizId}`} fallback={<QuizComponent id={"-1"}/>}>
                    <QuizComponent id={params.quizId}/>
                </Suspense>
            )
        }]

    return (
        <div className="flex flex-col h-full">
            <Header>
                <Link href={`/curriculum/${params.curriculumId}/${params.courseId}`} replace={true}>
                    <BackArrow/>
                </Link>
                <div className="font-bold">퀴즈</div>
                <Share/>
            </Header>
            <div className="flex-grow px-5 pb-5 pt-2.5 overflow-y-scroll">
                <QuizSwiper quizExplanationComponents={quizExplanationComponents} chapterId={params.chapterId}/>
            </div>
        </div>
    )
}

export default QuizPage;

