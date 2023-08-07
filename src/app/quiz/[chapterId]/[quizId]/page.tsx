
import React, {cache, Suspense} from "react";
import QuizComponent from "@/app/quiz/[chapterId]/[quizId]/quiz";
import QuizSwiper from "@/app/quiz/[chapterId]/[quizId]/quiz-swiper";
import {getQuizOfChapter} from "@/modules/quiz/apiServices";

// const quizIds: string[] = ["64ccaffd3670d05612c7b5cd", "64ccaffd3670d05612c7b5cd", "64ccaffd3670d05612c7b5cd"]

const getQuizIds = async (chapterId: string) => {
    const quizzes =  await getQuizOfChapter({chapterId: chapterId});
    const quizIds = quizzes.map(quiz => quiz.id);
    return quizIds;
}
const QuizPage = async ({ params }: { params: { chapterId: string, quizId: string } }) => {
    const quizIds: string[] = await getQuizIds(params.chapterId);

    const quizExplanationComponents: QuizComponents[] = quizIds.map((id, idx) => ({
            id: id,
            quizComponent: (
                <Suspense key={`quiz-suspense-${id}-${idx}`} fallback={<QuizComponent id={"-1"}/>}>
                    <QuizComponent id={id}/>
                </Suspense>
            )
        })
    );

    return (
        <QuizSwiper quizExplanationComponents={quizExplanationComponents}/>
    )
}

export default QuizPage;

