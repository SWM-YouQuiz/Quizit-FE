
import React, {cache, Suspense} from "react";
import "../../../modules/quiz/styles/one-light.css";
import QuizComponent from "@/app/quiz/[id]/quiz";
import QuizSwiper from "@/app/quiz/[id]/quiz-swiper";
import ExplanationComponent from "@/app/quiz/[id]/explanation";

const quizIds: number[] = [0,1,2,3,4,5,6,7,8,9,10]
const QuizPage = async ({ params }: { params: { id: string } }) => {

    const quizExplanationComponents: QuizExplanationComponents[] = quizIds.map(id => ({
            id: id,
            quizComponent: (
                <Suspense key={`quiz-suspense-${id}`} fallback={<QuizComponent id={-1}/>}>
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

