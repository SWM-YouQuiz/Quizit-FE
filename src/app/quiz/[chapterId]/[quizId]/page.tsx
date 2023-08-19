import React, {cache, Suspense} from "react";
import QuizComponent from "@/app/quiz/[chapterId]/[quizId]/quiz";
import QuizSwiper from "@/app/quiz/[chapterId]/[quizId]/quiz-swiper";
import Link from "next/link";
import {BackArrow, Filter, Share} from "@/components/svgs";
import {Header} from "@/components/Header";

// TODO: header를 퀴즈가 아닌 챕터 명으로 바꿔야 함.
const QuizPage = async ({ params }: { params: { chapterId: string, quizId: string } }) => {
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
                <Link href={`/curriculum/mvp`}>
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

