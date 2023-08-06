import React, {Suspense, useState} from "react";
import QuizComponent from "@/app/quiz/[id]/quiz";

export const useQuizQueue = (quizComponents: QuizComponents[]) => {
    const [quizQueue, setQuizQueue] = useState(quizComponents);

    const addQuiz = async (quizIds: string[]) => {
        const newQuizComponents = quizIds.map((id, idx) => ({
            id: id,
            quizComponent: (
                <Suspense key={`quiz-suspense-${id}-${idx}`} fallback={<QuizComponent id={"-1"}/>}>
                    <QuizComponent id={id}/>
                </Suspense>
            )
        }));

        setQuizQueue(prev => [
            ...prev,
            ...newQuizComponents
        ])
    }

    return {quizQueue, addQuiz};
}