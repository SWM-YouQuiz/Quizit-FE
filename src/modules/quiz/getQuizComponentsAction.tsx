"use server"
import React, {Suspense} from "react";
import QuizComponent from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz";
import 'server-only';


export const getQuizComponentsAction = async (quizIds: string[]) => {
    return quizIds.map((id, idx) => ({
        id: id,
        quizComponent: (
            <Suspense key={`quiz-suspense-${id}-${idx}`} fallback={<QuizComponent id={"-1"}/>}>
                <QuizComponent id={id}/>
            </Suspense>
        )
    }));
}
