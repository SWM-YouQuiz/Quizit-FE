"use server"
import QuizCard from "@/modules/profile/components/QuizCard";
import {ReactNode, Suspense} from "react";

const getQuizAction = async ({quizIds}: {quizIds: string[]}) => {
    return quizIds.map(quizId => ({
        id: quizId,
        component: (
            <Suspense key={`quizId-${quizId}`} fallback={<QuizCard quizId={"64ebc9321f9b0f1197e967a3"}/> }>
                <QuizCard quizId={quizId}/>
            </Suspense>
        )}
    ))
}

export default getQuizAction;