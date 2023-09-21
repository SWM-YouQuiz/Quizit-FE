"use server"
import QuizCard from "@/modules/profile/components/QuizCard";
import {ReactNode, Suspense} from "react";

const getQuizAction = async ({quizIds}: {quizIds: string[]}) => {
    return quizIds.map(quizId => ({
        id: quizId,
        component: (
            <Suspense key={quizId} fallback={null}>
                <QuizCard quizId={quizId}/>
            </Suspense>
        )}
    ))
}

export default getQuizAction;