
import React, {cache, ReactNode} from "react";
import {Share, ThumbDown, ThumbUp} from "@/components/svgs";
import {nonData, quizDummy} from "@/modules/quiz/quizDummy";
import {markdownToHtmlString} from "@/util/markdown";
import {getQuiz} from "@/modules/quiz/serverApiActions";
import "@/modules/quiz/styles/one-light.css";
import {QuizItems} from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/quiz-items";

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
                <QuizHeader/>
                <QuizContent quizContentHtml={quizHtml.question}/>
            </TopSideContainer>
            <BottomSideContainer>
                <QuizItems quizHtml={quizHtml} />
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


const QuizHeader = () => (
    <div className="h-[22px] w-full flex justify-between">
        <QuizAnswerRate/>
        <QuizTools/>
    </div>
)

const QuizAnswerRate = () => (
    <div className="rounded bg-point3 font-semibold text-white px-1.5 grid place-items-center">
        <p className="text-xs text-center leading-[16px]">정답률: 50%</p>
    </div>
)

const QuizTools = () => (
    <div className="flex space-x-1.5">
        <ThumbUpButton/>
        <ThumbDownButton/>
    </div>
)

const ThumbUpButton = () => (
    <div className="w-10 inner-border-[1px] p-[3px] rounded flex justify-evenly">
        <ThumbUp/>
        <span className="text-center text-xs text-bg-secondary">3</span>
    </div>
)

const ThumbDownButton = () => (
    <div className="w-10 inner-border-[1px] p-[3px] rounded flex justify-evenly">
        <ThumbDown/>
        <span className="text-center text-xs text-bg-secondary">3</span>
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