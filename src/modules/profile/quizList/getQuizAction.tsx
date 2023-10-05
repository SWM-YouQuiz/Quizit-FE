"use server"
import QuizCard from "@/modules/profile/components/QuizCard";
import {ReactNode, Suspense} from "react";

const getQuizAction = async ({quizIds, markedQuizIds}: {quizIds: string[], markedQuizIds: string[]}) => {
    return quizIds.map(quizId => ({
        id: quizId,
        component: (
            <Suspense key={`quizId-${quizId}`} fallback={<QuizCard quizId={"-1"} markedQuizIds={markedQuizIds}/> }>
                <QuizCard quizId={quizId} markedQuizIds={markedQuizIds}/>
            </Suspense>
        )}
    ))
}

export default getQuizAction;