
import React, {cache, Suspense} from "react";
import QuizComponent from "@/app/quiz/[chapterId]/[quizId]/quiz";
import QuizSwiper from "@/app/quiz/[chapterId]/[quizId]/quiz-swiper";
import {getQuizOfChapter} from "@/modules/quiz/serverApiActions";

const getQuizIds = async (chapterId: string) => {
    const quizzes =  await getQuizOfChapter({chapterId: chapterId, page: 0, size: 3, range: "-1,101"});
    const quizIds = quizzes.map(quiz => quiz.id);
    return quizIds;
}
const QuizPage = async ({ params }: { params: { chapterId: string, quizId: string } }) => {
    const quizIds: string[] = await getQuizIds(params.chapterId);

    const quizExplanationComponents: QuizComponents[] = [{
            id: params.quizId,
            quizComponent: (
                <Suspense key={`quiz-suspense-${params.quizId}`} fallback={<QuizComponent id={"-1"}/>}>
                    <QuizComponent id={params.quizId}/>
                </Suspense>
            )
        }]

    return (
        <QuizSwiper quizExplanationComponents={quizExplanationComponents} chapterId={params.chapterId}/>
    )
}

export default QuizPage;

