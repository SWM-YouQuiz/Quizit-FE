
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

    const quizExplanationComponents: QuizComponents[] = quizIds.map((id, idx) => ({
            id: id,
            quizComponent: (
                <Suspense key={`quiz-suspense-${id}`} fallback={<QuizComponent id={"-1"}/>}>
                    <QuizComponent id={id}/>
                </Suspense>
            )
        })
    );

    return (
        <QuizSwiper quizExplanationComponents={quizExplanationComponents} chapterId={params.chapterId}/>
    )
}

export default QuizPage;

