
import React, {cache, Suspense} from "react";
import "../../../modules/quiz/styles/one-light.css";
import QuizComponent from "@/app/quiz/[id]/quiz";
import QuizSwiper from "@/app/quiz/[id]/quiz-swiper";
import ExplanationComponent from "@/app/quiz/[id]/explanation";

const quizIds: string[] = ["64ccaffd3670d05612c7b5cd", "64ccaffd3670d05612c7b5cd", "64ccaffd3670d05612c7b5cd"]
const QuizPage = async ({ params }: { params: { id: string } }) => {

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

