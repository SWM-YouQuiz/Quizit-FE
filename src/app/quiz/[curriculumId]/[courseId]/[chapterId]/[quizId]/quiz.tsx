"use client"
import React, {cache, ReactNode, useEffect, useState} from "react";
import {nonData, quizDummy} from "@/modules/quiz/quizDummy";
import {markdownToHtmlString} from "@/util/markdown";
import {getQuiz, revalidateTagAction} from "@/modules/quiz/serverApiActions";
import "@/modules/quiz/styles/one-light.css";
import {QuizItems} from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz-items";
import QuizTools from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz-tools";
import quizTools from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz-tools";

const changeQuizContentString = (quiz: Quiz, quizContentHtmlString: string): Quiz => {
    return {
        ...quiz,
        question: quizContentHtmlString
    }
}



const QuizComponent = ({quiz}: {quiz: Quiz}) => {
    const [quizHtml, setQuizHtml] = useState(quiz);

    useEffect(() => {
        const getQuizHtml = async (quiz: Quiz) => {
            const quizContentHtmlString = await markdownToHtmlString(quiz.question);
            const quizContentHtml = changeQuizContentString(quiz, quizContentHtmlString);
            return quizContentHtml;
        }

        getQuizHtml(quiz)
            .then(quizContentHtml => setQuizHtml(quizContentHtml));
    }, [quiz])

    return (
        <div className="flex flex-col h-full justify-between w-full">
            <QuizHeader quizHtml={quizHtml}/>
            <QuizContent quizContentHtml={quizHtml.question}/>
            <BottomSideContainer>
                <QuizItems quizHtml={quizHtml}/>
            </BottomSideContainer>
        </div>
    )
}

export default QuizComponent;


const QuizHeader = ({quizHtml}: {quizHtml: Quiz}) => (
    <div className="h-[22px] w-full flex justify-between">
        <QuizAnswerRate answerRate={quizHtml.answerRate}/>
        <QuizTools
            quizId={quizHtml.id}
            likedUserIds={quizHtml.likedUserIds}
            unlikedUserIds={quizHtml.unlikedUserIds}
        />
    </div>
)

const QuizAnswerRate = ({answerRate}: {answerRate: number}) => (
    <div className="rounded bg-point3 font-semibold text-white px-1.5 grid place-items-center">
        <p className="text-xs text-center leading-[16px]">정답률:&nbsp;{answerRate.toFixed(1)}%</p>
    </div>
)

const QuizContent = ({quizContentHtml}: {quizContentHtml: string}) => (
    <div className="mt-2 flex-1 overflow-y-auto text-secondary-800" dangerouslySetInnerHTML={{ __html: quizContentHtml }}/>
)

const BottomSideContainer = ({children} : {children: ReactNode}) => {
    return (
        <div className="w-full flex flex-col">
            {children}
        </div>
    )
}