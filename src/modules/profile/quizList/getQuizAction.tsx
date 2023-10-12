"use server"
import QuizCard from "@/modules/profile/components/QuizCard";
import {ReactNode, Suspense} from "react";

const getQuizAction = async ({quizIds, userId}: {quizIds: string[], userId: string}) => {
    return quizIds.map(quizId => ({
        id: quizId,
        component: (
            <Suspense key={`quizId-${quizId}`} fallback={<QuizCard quizId={"-1"} userId={userId}/> }>
                <QuizCard quizId={quizId} userId={userId}/>
            </Suspense>
        )}
    ))
}

export default getQuizAction;