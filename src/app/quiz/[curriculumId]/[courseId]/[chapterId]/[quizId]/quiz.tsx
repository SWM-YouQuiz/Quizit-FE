
import React, {cache, ReactNode} from "react";
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

const getQuizHtml = async (quizId: string) => {
    if(quizId === "-1") return nonData;
    const quiz = await getQuiz({quizId: quizId});
    const quizContentHtmlString = await markdownToHtmlString(quiz.question);
    const quizContentHtml = changeQuizContentString(quiz, quizContentHtmlString);
    return quizContentHtml;
}

const QuizComponent = async ({id}: {id: string}) => {
    const quizHtml = await getQuizHtml(id);

    return (
        <div className="flex flex-col h-full justify-between w-full">
            <TopSideContainer>
                <QuizHeader quizHtml={quizHtml}/>
                <QuizContent quizContentHtml={quizHtml.question}/>
            </TopSideContainer>
            <BottomSideContainer>
                <QuizItems quizHtml={quizHtml}/>
            </BottomSideContainer>
        </div>
    )
}

export default QuizComponent;


const TopSideContainer = ({children}: {children: ReactNode}) => (
    <div className="w-full flex flex-col">
        {children}
    </div>
)


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
    <div className="mt-2 flex-auto overflow-y-auto min-h-0 text-secondary-800" dangerouslySetInnerHTML={{ __html: quizContentHtml }}/>
)

const BottomSideContainer = ({children} : {children: ReactNode}) => {
    return (
        <div className="w-full flex flex-col">
            {children}
        </div>
    )
}