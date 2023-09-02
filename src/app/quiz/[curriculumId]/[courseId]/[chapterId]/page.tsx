
import React, {cache, Suspense} from "react";
import {redirect} from "next/navigation";
import {getQuizOfChapter} from "@/modules/quiz/serverApiActions";
import {Header} from "@/components/Header";
import Link from "next/link";
import {BackArrow, Share} from "@/components/svgs";
import QuizComponent from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz";
import QuizSwiper from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz-swiper";

type QuizPageParams = {
    curriculumId: string,
    courseId: string,
    chapterId: string,
    quizId: string
}

const getQuizzes = async (chapterId: string) => {
    const quizzes =  await getQuizOfChapter({chapterId: chapterId, page: 0, size: 3, range: "-1,101"});
    return quizzes;
}
const QuizPage = async ({ params }: { params: QuizPageParams }) => {
    const quizzes= await getQuizzes(params.chapterId);

    if(quizzes.length===0) {
        throw new Error("퀴즈가 없거나 불러오는 중 오류가 발생했습니다.");
    }

    const quizExplanationComponents: QuizComponents[] = quizzes.map(quiz => (
        {
            id: quiz.id,
            quizComponent: (
                <Suspense key={`quiz-suspense-${quiz.id}`} fallback={<QuizComponent id={"-1"}/>}>
                    <QuizComponent id={quiz.id}/>
                </Suspense>
            )
        })
    );

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
                <QuizSwiper
                    quizExplanationComponents={quizExplanationComponents}
                    chapterId={params.chapterId}
                    couseId={params.courseId}
                    curriculumId={params.curriculumId}
                />
            </div>
        </div>
    )
}

export default QuizPage;

